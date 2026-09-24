import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* ---------------------------------------------------------------- geometry */

const BASE_H = 0.62;
const L1 = 1.05;
const L2 = 0.95;
const WRIST_LEN = 0.3;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function solveIK(target: THREE.Vector3) {
  const yaw = Math.atan2(target.x, target.z);
  const r = Math.hypot(target.x, target.z);
  const dy = target.y + WRIST_LEN - BASE_H;
  const d = Math.min(Math.hypot(r, dy), L1 + L2 - 0.02);
  const elbowInterior = Math.acos(clamp((L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2), -1, 1));
  const elbow = Math.PI - elbowInterior;
  const shoulder =
    Math.atan2(dy, r) + Math.acos(clamp((d * d + L1 * L1 - L2 * L2) / (2 * d * L1), -1, 1));
  return { yaw, shoulder, elbow, wrist: shoulder - elbow };
}

/* ------------------------------------------------------------------- types */

export type Phase =
  | "IDLE"
  | "PERCEPTION"
  | "APPROACH"
  | "DESCEND"
  | "GRASP"
  | "LIFT"
  | "TRANSFER"
  | "PLACE"
  | "RELEASE"
  | "RETRACT"
  | "COMPLETE";

export interface Telemetry {
  phase: Phase;
  joints: [number, number, number, number];
  gripper: number;
  target: string | null;
  confidence: number;
  moves: number;
  placed: number;
  total: number;
}

export interface CubeSpec {
  id: string;
  label: string;
  color: string;
  bin: "LEFT" | "RIGHT";
  home: [number, number];
}

export const CUBES: CubeSpec[] = [
  { id: "red", label: "Red", color: "#e5484d", bin: "LEFT", home: [-0.5, 1.15] },
  { id: "amber", label: "Amber", color: "#d8a12a", bin: "LEFT", home: [-0.98, 0.78] },
  { id: "blue", label: "Blue", color: "#3b82f6", bin: "RIGHT", home: [0.52, 1.18] },
  { id: "green", label: "Green", color: "#22c55e", bin: "RIGHT", home: [0.05, 0.82] },
];

const CUBE_SIZE = 0.2;
const BIN_POS: Record<"LEFT" | "RIGHT", [number, number]> = {
  LEFT: [-1.65, 0.35],
  RIGHT: [1.65, 0.35],
};
const HOME_TARGET = new THREE.Vector3(0, 1.35, 0.85);

interface SceneProps {
  running: boolean;
  speed: number;
  queue: string[];
  resetKey: number;
  onTelemetry: (t: Telemetry) => void;
  onMissionEnd: () => void;
}

/* ------------------------------------------------------------------- scene */

export function RobotScene({
  running,
  speed,
  queue,
  resetKey,
  onTelemetry,
  onMissionEnd,
}: SceneProps) {
  const yawRef = useRef<THREE.Group>(null);
  const shoulderRef = useRef<THREE.Group>(null);
  const elbowRef = useRef<THREE.Group>(null);
  const wristRef = useRef<THREE.Group>(null);
  const fingerL = useRef<THREE.Group>(null);
  const fingerR = useRef<THREE.Group>(null);
  const cubeRefs = useRef<Record<string, THREE.Group | null>>({});
  const scanRef = useRef<THREE.Mesh>(null);

  const state = useRef({
    target: HOME_TARGET.clone(),
    goal: HOME_TARGET.clone(),
    joints: { yaw: 0, shoulder: 0.9, elbow: 1.4, wrist: -0.5 },
    grip: 1,
    gripGoal: 1,
    phase: "IDLE" as Phase,
    phaseT: 0,
    qi: 0,
    held: null as string | null,
    placed: [] as string[],
    moves: 0,
    confidence: 0.9,
    emit: 0,
    lastQueue: "",
    lastReset: -1,
    positions: {} as Record<string, THREE.Vector3>,
  });

  // per-cube live positions
  const initPositions = useMemo(() => {
    const map: Record<string, THREE.Vector3> = {};
    CUBES.forEach((c) => {
      map[c.id] = new THREE.Vector3(c.home[0], CUBE_SIZE / 2, c.home[1]);
    });
    return map;
  }, []);

  if (state.current.lastReset !== resetKey) {
    state.current.lastReset = resetKey;
    state.current.positions = Object.fromEntries(
      Object.entries(initPositions).map(([k, v]) => [k, v.clone()])
    );
    state.current.placed = [];
    state.current.held = null;
    state.current.qi = 0;
    state.current.moves = 0;
    state.current.phase = "IDLE";
    state.current.phaseT = 0;
    state.current.goal.copy(HOME_TARGET);
    state.current.gripGoal = 1;
  }

  const queueKey = queue.join(",");
  if (state.current.lastQueue !== queueKey) {
    state.current.lastQueue = queueKey;
    state.current.qi = 0;
    state.current.phase = queue.length ? "PERCEPTION" : "IDLE";
    state.current.phaseT = 0;
  }

  const cubePos = (id: string) => state.current.positions[id] ?? initPositions[id];

  const setPhase = (p: Phase) => {
    state.current.phase = p;
    state.current.phaseT = 0;
  };

  useFrame((_, rawDelta) => {
    const s = state.current;
    const dt = Math.min(rawDelta, 0.05) * (running ? speed : 0);
    s.phaseT += dt;

    const cubeId = queue[s.qi];
    const spec = CUBES.find((c) => c.id === cubeId);

    /* ---- planner state machine ---- */
    if (running && spec) {
      const p = cubePos(spec.id);
      const bin = BIN_POS[spec.bin];
      switch (s.phase) {
        case "IDLE":
        case "COMPLETE":
          setPhase("PERCEPTION");
          break;
        case "PERCEPTION":
          s.goal.set(p.x, 1.05, p.z);
          s.confidence = 0.92 + Math.sin(s.phaseT * 6) * 0.03;
          if (s.phaseT > 0.9) setPhase("APPROACH");
          break;
        case "APPROACH":
          s.goal.set(p.x, 0.62, p.z);
          s.gripGoal = 1;
          if (s.phaseT > 0.9) setPhase("DESCEND");
          break;
        case "DESCEND":
          s.goal.set(p.x, CUBE_SIZE / 2 + 0.035, p.z);
          if (s.phaseT > 0.85) setPhase("GRASP");
          break;
        case "GRASP":
          s.gripGoal = 0.12;
          if (s.phaseT > 0.45) {
            s.held = spec.id;
            setPhase("LIFT");
          }
          break;
        case "LIFT":
          s.goal.set(p.x, 1.05, p.z);
          if (s.phaseT > 0.8) setPhase("TRANSFER");
          break;
        case "TRANSFER":
          s.goal.set(bin[0], 1.15, bin[1]);
          if (s.phaseT > 1.2) setPhase("PLACE");
          break;
        case "PLACE":
          s.goal.set(bin[0], 0.42, bin[1]);
          if (s.phaseT > 0.8) setPhase("RELEASE");
          break;
        case "RELEASE":
          s.gripGoal = 1;
          if (s.phaseT > 0.4) {
            if (s.held) {
              s.placed.push(s.held);
              s.held = null;
              s.moves += 1;
            }
            setPhase("RETRACT");
          }
          break;
        case "RETRACT":
          s.goal.set(bin[0] * 0.6, 1.3, bin[1] + 0.3);
          if (s.phaseT > 0.7) {
            s.qi += 1;
            setPhase(s.qi >= queue.length ? "COMPLETE" : "PERCEPTION");
            if (s.qi >= queue.length) onMissionEnd();
          }
          break;
      }
    } else if (running && !spec) {
      s.goal.copy(HOME_TARGET);
      if (s.phase !== "COMPLETE" && s.phase !== "IDLE") setPhase("COMPLETE");
    }

    /* ---- smooth end-effector motion + IK ---- */
    const k = 1 - Math.exp(-6 * dt);
    s.target.lerp(s.goal, k);
    const ik = solveIK(s.target);
    const jk = 1 - Math.exp(-10 * dt);
    s.joints.yaw += (ik.yaw - s.joints.yaw) * jk;
    s.joints.shoulder += (ik.shoulder - s.joints.shoulder) * jk;
    s.joints.elbow += (ik.elbow - s.joints.elbow) * jk;
    s.joints.wrist += (ik.wrist - s.joints.wrist) * jk;
    s.grip += (s.gripGoal - s.grip) * (1 - Math.exp(-12 * dt));

    if (yawRef.current) yawRef.current.rotation.y = s.joints.yaw;
    if (shoulderRef.current) shoulderRef.current.rotation.x = -s.joints.shoulder;
    if (elbowRef.current) elbowRef.current.rotation.x = s.joints.elbow;
    if (wristRef.current) wristRef.current.rotation.x = s.joints.wrist;
    const open = 0.045 + s.grip * 0.075;
    if (fingerL.current) fingerL.current.position.x = -open;
    if (fingerR.current) fingerR.current.position.x = open;

    /* ---- carried cube follows the gripper tip ---- */
    if (s.held) {
      const held = cubePos(s.held);
      held.set(s.target.x, Math.max(s.target.y, CUBE_SIZE / 2), s.target.z);
    }
    CUBES.forEach((c) => {
      const g = cubeRefs.current[c.id];
      const p = cubePos(c.id);
      if (g) g.position.copy(p);
    });

    if (scanRef.current) {
      const visible = s.phase === "PERCEPTION";
      scanRef.current.visible = visible;
      const m = scanRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = visible ? 0.1 + Math.abs(Math.sin(s.phaseT * 5)) * 0.14 : 0;
    }

    /* ---- telemetry (throttled) ---- */
    s.emit += rawDelta;
    if (s.emit > 0.1) {
      s.emit = 0;
      onTelemetry({
        phase: s.phase,
        joints: [
          THREE.MathUtils.radToDeg(s.joints.yaw),
          THREE.MathUtils.radToDeg(s.joints.shoulder),
          THREE.MathUtils.radToDeg(-s.joints.elbow),
          THREE.MathUtils.radToDeg(s.joints.wrist),
        ],
        gripper: 1 - s.grip,
        target: spec?.label ?? null,
        confidence: s.confidence,
        moves: s.moves,
        placed: s.placed.length,
        total: queue.length || CUBES.length,
      });
    }
  });

  const metal = { metalness: 0.85, roughness: 0.32 };

  return (
    <>
      <color attach="background" args={["#08080a"]} />
      <fog attach="fog" args={["#08080a", 7, 18]} />

      <ambientLight intensity={0.45} />
      <hemisphereLight args={["#8899aa", "#161616", 0.5]} />
      <directionalLight
        position={[4, 7, 4]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <pointLight position={[-3, 2.4, 2]} intensity={12} color="#ff3040" distance={9} />
      <pointLight position={[3, 2.2, -1]} intensity={6} color="#6688ff" distance={9} />

      <Environment>
        <Lightformer intensity={1.6} position={[0, 5, 1]} scale={[8, 8, 1]} />
        <Lightformer
          intensity={0.9}
          color="#ff4455"
          position={[-5, 2, 0]}
          rotation-y={Math.PI / 2}
          scale={[12, 2, 1]}
        />
        <Lightformer
          intensity={0.7}
          color="#88aaff"
          position={[5, 2, 0]}
          rotation-y={-Math.PI / 2}
          scale={[12, 2, 1]}
        />
      </Environment>

      {/* workbench */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow position-y={-0.001}>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial color="#17181b" metalness={0.35} roughness={0.65} />
      </mesh>
      <gridHelper args={[9, 36, "#ff2b44", "#2a2a2f"]} position-y={0.002} />

      {/* bins */}
      {(["LEFT", "RIGHT"] as const).map((side) => {
        const [x, z] = BIN_POS[side];
        return (
          <group key={side} position={[x, 0, z]}>
            <mesh position-y={0.09} receiveShadow castShadow>
              <boxGeometry args={[0.72, 0.18, 0.72]} />
              <meshStandardMaterial color="#202227" metalness={0.6} roughness={0.5} />
            </mesh>
            <mesh position-y={0.185}>
              <boxGeometry args={[0.6, 0.01, 0.6]} />
              <meshStandardMaterial
                color={side === "LEFT" ? "#ff2b44" : "#3b82f6"}
                emissive={side === "LEFT" ? "#ff2b44" : "#3b82f6"}
                emissiveIntensity={0.35}
                toneMapped={false}

              />
            </mesh>
          </group>
        );
      })}

      {/* payload cubes */}
      {CUBES.map((c) => (
        <group key={c.id} ref={(el) => (cubeRefs.current[c.id] = el)}>
          <RoundedBox args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} radius={0.022} smoothness={3} castShadow>
            <meshStandardMaterial color={c.color} metalness={0.45} roughness={0.35} />
          </RoundedBox>
        </group>
      ))}

      {/* perception scan cone */}
      <mesh ref={scanRef} position={[0, 1.6, 0.6]} rotation-x={Math.PI}>
        <coneGeometry args={[0.55, 1.4, 24, 1, true]} />
        <meshBasicMaterial color="#ff2b44" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* ------------------------------ robot arm ------------------------------ */}
      <group ref={yawRef}>
        {/* pedestal */}
        <mesh position-y={0.06} castShadow receiveShadow>
          <cylinderGeometry args={[0.42, 0.5, 0.12, 40]} />
          <meshStandardMaterial color="#26282d" {...metal} />
        </mesh>
        <mesh position-y={0.32} castShadow>
          <cylinderGeometry args={[0.3, 0.34, 0.42, 40]} />
          <meshStandardMaterial color="#c9ccd2" {...metal} />
        </mesh>
        <mesh position-y={0.54} castShadow>
          <cylinderGeometry args={[0.26, 0.26, 0.05, 40]} />
          <meshStandardMaterial color="#ff2b44" emissive="#ff2b44" emissiveIntensity={1.1} />
        </mesh>

        {/* shoulder */}
        <group position={[0, BASE_H, 0]} ref={shoulderRef}>
          <mesh rotation-z={Math.PI / 2} castShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.34, 28]} />
            <meshStandardMaterial color="#3a3d44" metalness={0.9} roughness={0.28} />
          </mesh>
          <mesh position={[0, 0, L1 / 2]} rotation-x={Math.PI / 2} castShadow>
            <cylinderGeometry args={[0.105, 0.125, L1, 24]} />
            <meshStandardMaterial color="#d7dade" {...metal} />
          </mesh>
          <mesh position={[0, 0.115, L1 / 2]} castShadow>
            <boxGeometry args={[0.07, 0.035, L1 * 0.75]} />
            <meshStandardMaterial color="#1b1c20" metalness={0.5} roughness={0.6} />
          </mesh>

          {/* elbow */}
          <group position={[0, 0, L1]} ref={elbowRef}>
            <mesh rotation-z={Math.PI / 2} castShadow>
              <cylinderGeometry args={[0.13, 0.13, 0.28, 28]} />
              <meshStandardMaterial color="#3a3d44" metalness={0.9} roughness={0.28} />
            </mesh>
            <mesh rotation-z={Math.PI / 2}>
              <torusGeometry args={[0.135, 0.016, 12, 28]} />
              <meshStandardMaterial color="#ff2b44" emissive="#ff2b44" emissiveIntensity={1.2} />
            </mesh>
            <mesh position={[0, 0, L2 / 2]} rotation-x={Math.PI / 2} castShadow>
              <cylinderGeometry args={[0.078, 0.1, L2, 24]} />
              <meshStandardMaterial color="#c3c7cd" {...metal} />
            </mesh>

            {/* wrist + gripper */}
            <group position={[0, 0, L2]} ref={wristRef}>
              <mesh rotation-z={Math.PI / 2} castShadow>
                <cylinderGeometry args={[0.095, 0.095, 0.2, 24]} />
                <meshStandardMaterial color="#3a3d44" metalness={0.9} roughness={0.28} />
              </mesh>
              <mesh position={[0, -0.1, 0]} castShadow>
                <cylinderGeometry args={[0.075, 0.09, 0.12, 24]} />
                <meshStandardMaterial color="#d7dade" {...metal} />
              </mesh>
              <mesh position={[0, -0.175, 0]}>
                <cylinderGeometry args={[0.055, 0.055, 0.03, 20]} />
                <meshStandardMaterial color="#ff2b44" emissive="#ff2b44" emissiveIntensity={1.3} />
              </mesh>
              <group ref={fingerL} position={[-0.09, -0.24, 0]}>
                <mesh castShadow>
                  <boxGeometry args={[0.035, 0.14, 0.11]} />
                  <meshStandardMaterial color="#9aa0a8" metalness={0.9} roughness={0.25} />
                </mesh>
              </group>
              <group ref={fingerR} position={[0.09, -0.24, 0]}>
                <mesh castShadow>
                  <boxGeometry args={[0.035, 0.14, 0.11]} />
                  <meshStandardMaterial color="#9aa0a8" metalness={0.9} roughness={0.25} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  );
}
