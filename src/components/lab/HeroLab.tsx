import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { CUBES, RobotScene } from "./RobotScene";

const dark = { color: "#16191f", metalness: 0.8, roughness: 0.35 };
const BLUE = "#4da3ff";
const RED = "#ff2b44";

function LookAt({ target }: { target: [number, number, number] }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(...target);
  }, [camera, target]);
  return null;
}

function Humanoid(props: JSX.IntrinsicElements["group"]) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const foreR = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (root.current) root.current.position.y = Math.sin(t * 1.6) * 0.012;
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.5) * 0.6;
      head.current.rotation.x = Math.sin(t * 0.8) * 0.08;
    }
    if (armL.current) armL.current.rotation.x = Math.sin(t * 0.9) * 0.12;
    if (armR.current) armR.current.rotation.x = -0.6 + Math.sin(t * 0.7) * 0.25;
    if (foreR.current) foreR.current.rotation.x = -0.9 + Math.sin(t * 1.3) * 0.2;
  });

  const limb = (len: number, r: number) => (
    <mesh position-y={-len / 2} castShadow>
      <capsuleGeometry args={[r, len - r * 2, 6, 16]} />
      <meshStandardMaterial {...dark} />
    </mesh>
  );

  return (
    <group {...props}>
      <group ref={root}>
        {/* legs */}
        {[-0.13, 0.13].map((x) => (
          <group key={x} position={[x, 0.95, 0]}>
            {limb(0.48, 0.075)}
            <mesh position-y={-0.48}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={1.2} />
            </mesh>
            <group position-y={-0.48}>{limb(0.45, 0.065)}</group>
            <RoundedBox args={[0.14, 0.06, 0.24]} radius={0.02} position={[0, -0.93, 0.04]}>
              <meshStandardMaterial {...dark} />
            </RoundedBox>
          </group>
        ))}
        {/* pelvis + torso */}
        <RoundedBox args={[0.38, 0.16, 0.22]} radius={0.05} position-y={1.0} castShadow>
          <meshStandardMaterial {...dark} />
        </RoundedBox>
        <RoundedBox args={[0.5, 0.55, 0.28]} radius={0.1} position-y={1.4} castShadow>
          <meshStandardMaterial color="#d7dade" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 1.45, 0.145]}>
          <circleGeometry args={[0.06, 24]} />
          <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={2} toneMapped={false} />
        </mesh>
        {/* arms */}
        <group ref={armL} position={[-0.32, 1.6, 0]}>
          {limb(0.42, 0.06)}
          <group position-y={-0.42}>{limb(0.4, 0.052)}</group>
        </group>
        <group ref={armR} position={[0.32, 1.6, 0]}>
          {limb(0.42, 0.06)}
          <group ref={foreR} position-y={-0.42}>
            {limb(0.4, 0.052)}
          </group>
        </group>
        {/* head */}
        <mesh position-y={1.74}>
          <cylinderGeometry args={[0.05, 0.06, 0.1, 16]} />
          <meshStandardMaterial {...dark} />
        </mesh>
        <group ref={head} position-y={1.9}>
          <RoundedBox args={[0.26, 0.26, 0.26]} radius={0.09} castShadow>
            <meshStandardMaterial {...dark} />
          </RoundedBox>
          <RoundedBox args={[0.22, 0.07, 0.02]} radius={0.02} position={[0, 0.01, 0.13]}>
            <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={2.5} toneMapped={false} />
          </RoundedBox>
        </group>
      </group>
    </group>
  );
}

function LabRoom() {
  const monitors: [number, number, number, string][] = [
    [-1.2, 1.9, -2.9, BLUE],
    [0.9, 2.1, -2.9, RED],
    [2.8, 1.8, -2.9, BLUE],
    [4.6, 2.0, -2.9, RED],
  ];
  return (
    <group>
      {/* back wall */}
      <mesh position={[1.5, 2, -3]} receiveShadow>
        <planeGeometry args={[16, 6]} />
        <meshStandardMaterial color="#0b1222" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* shelves */}
      {[0.9, 1.5].map((y) => (
        <mesh key={y} position={[1.5, y, -2.8]}>
          <boxGeometry args={[9, 0.04, 0.35]} />
          <meshStandardMaterial color="#1c2436" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={i} position={[-2.5 + i * 0.6, i % 2 ? 1.02 : 1.62, -2.8]}>
          <boxGeometry args={[0.35, 0.2, 0.25]} />
          <meshStandardMaterial color={i % 3 ? "#2a3244" : "#3a3f4c"} metalness={0.5} roughness={0.5} />
        </mesh>
      ))}
      {/* monitors */}
      {monitors.map(([x, y, z, c], i) => (
        <group key={i} position={[x, y + 0.6, z + 0.1]}>
          <mesh>
            <boxGeometry args={[0.9, 0.55, 0.04]} />
            <meshStandardMaterial color="#0a0a0c" />
          </mesh>
          <mesh position-z={0.025}>
            <planeGeometry args={[0.82, 0.47]} />
            <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.8} toneMapped={false} />
          </mesh>
        </group>
      ))}
      {/* ceiling light strips */}
      {[-1.5, 0.3, 2.1].map((z) => (
        <mesh key={z} position={[1.5, 3.6, z]}>
          <boxGeometry args={[6, 0.04, 0.12]} />
          <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={3} toneMapped={false} />
        </mesh>
      ))}
      <pointLight position={[1.5, 3.2, -1]} intensity={10} color={BLUE} distance={10} />
      <pointLight position={[4.5, 1.5, 0]} intensity={6} color={BLUE} distance={6} />
    </group>
  );
}

const LOOK: [number, number, number] = [1.3, 1.0, 0];

export function HeroLab({ className }: { className?: string }) {
  const [resetKey, setResetKey] = useState(0);
  const queue = useMemo(() => CUBES.map((c) => c.id), []);
  const onTelemetry = useCallback(() => {}, []);
  const onMissionEnd = useCallback(() => {
    setTimeout(() => setResetKey((k) => k + 1), 1500);
  }, []);

  return (
    <div className={className}>
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [-0.6, 2.3, 5], fov: 45 }}>
        <LookAt target={LOOK} />
        <Suspense fallback={null}>
          <group position={[1.8, 0, 0]}>
            <RobotScene
              running
              speed={1}
              queue={queue}
              resetKey={resetKey}
              onTelemetry={onTelemetry}
              onMissionEnd={onMissionEnd}
            />
          </group>
          <LabRoom />
          <Humanoid position={[4.3, 0, -0.8]} rotation-y={-0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
