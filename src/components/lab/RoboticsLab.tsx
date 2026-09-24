import { Suspense, useCallback, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Play, Pause, RotateCcw } from "lucide-react";
import { CUBES, RobotScene, type Telemetry } from "./RobotScene";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PHASES = ["PERCEPTION", "POLICY INFERENCE", "TRAJECTORY EXEC"] as const;

const phaseGroup = (p: Telemetry["phase"]) => {
  if (p === "PERCEPTION" || p === "IDLE") return 0;
  if (p === "APPROACH" || p === "TRANSFER" || p === "RETRACT") return 1;
  return 2;
};

const fmt = (n: number) => `${n >= 0 ? "+" : "-"}${Math.abs(n).toFixed(1).padStart(5, "0")}`;

export function RoboticsLab({ className }: { className?: string }) {
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [resetKey, setResetKey] = useState(0);
  const [queue, setQueue] = useState<string[]>(CUBES.map((c) => c.id));
  const [tel, setTel] = useState<Telemetry>({
    phase: "IDLE",
    joints: [0, 0, 0, 0],
    gripper: 0,
    target: null,
    confidence: 0.9,
    moves: 0,
    placed: 0,
    total: 4,
  });

  const frame = useRef(0);
  const onTelemetry = useCallback((t: Telemetry) => {
    frame.current += 1;
    setTel(t);
  }, []);

  const onMissionEnd = useCallback(() => setRunning(false), []);

  const runMission = (ids: string[]) => {
    setResetKey((k) => k + 1);
    setQueue(ids);
    setRunning(true);
  };

  const active = phaseGroup(tel.phase);
  const progress = useMemo(() => (tel.total ? tel.placed / tel.total : 0), [tel]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card/60 backdrop-blur",
        className
      )}
    >
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Live simulation
          </p>
          <h3 className="font-mono text-sm text-foreground">
            <span className="text-primary">{"//"}</span> Autonomous Sorting Cell
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          {CUBES.map((c) => (
            <span
              key={c.id}
              className="h-2.5 w-2.5 rounded-[2px]"
              style={{
                backgroundColor: c.color,
                opacity: CUBES.indexOf(c) < tel.placed ? 1 : 0.28,
              }}
            />
          ))}
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            {tel.placed}/{tel.total}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px]">
        {/* viewport */}
        <div className="relative min-h-[320px] lg:min-h-[420px]">
          <Canvas
            shadows
            dpr={[1, 1.6]}
            camera={{ position: [3.2, 2.6, 3.6], fov: 45 }}
            gl={{ antialias: true }}
          >
            <Suspense fallback={null}>
              <RobotScene
                running={running}
                speed={speed}
                queue={queue}
                resetKey={resetKey}
                onTelemetry={onTelemetry}
                onMissionEnd={onMissionEnd}
              />
              <ContactShadows
                position={[0, 0.005, 0]}
                opacity={0.55}
                scale={9}
                blur={2.4}
                far={4}
              />
            </Suspense>
            <OrbitControls
              enablePan={false}
              minDistance={3}
              maxDistance={8}
              minPolarAngle={0.35}
              maxPolarAngle={Math.PI / 2.25}
              target={[0, 0.7, 0.4]}
            />
          </Canvas>

          {/* pipeline pills */}
          <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
            {PHASES.map((p, i) => (
              <span
                key={p}
                className={cn(
                  "rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors",
                  i === active && running
                    ? "border-primary/70 bg-primary/15 text-primary"
                    : "border-border bg-background/70 text-muted-foreground"
                )}
              >
                0{i + 1} {p}
              </span>
            ))}
          </div>

          <p className="pointer-events-none absolute bottom-3 right-4 font-mono text-[10px] text-muted-foreground">
            drag to orbit · scroll to zoom
          </p>
        </div>

        {/* telemetry + controls */}
        <div className="border-t border-border p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Telemetry
          </p>
          <dl className="mt-3 space-y-1.5 font-mono text-[11px]">
            {(["θ1 base", "θ2 shoulder", "θ3 elbow", "θ4 wrist"] as const).map((label, i) => (
              <div key={label} className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="text-foreground">{fmt(tel.joints[i])}°</dd>
              </div>
            ))}
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">gripper</dt>
              <dd className="text-primary">{tel.gripper > 0.6 ? "CLAMPED" : "OPEN"}</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">target</dt>
              <dd className="text-foreground">{tel.target ?? "—"}</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">policy p</dt>
              <dd className="text-foreground">{tel.confidence.toFixed(3)}</dd>
            </div>
          </dl>

          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-[width] duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Mission
          </p>
          <Button
            size="sm"
            className="mt-2 w-full font-mono text-xs"
            onClick={() => runMission(CUBES.map((c) => c.id))}
          >
            Sort all four cubes
          </Button>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {CUBES.map((c) => (
              <button
                key={c.id}
                onClick={() => runMission([c.id])}
                className="flex items-center gap-2 rounded border border-border px-2 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                <span
                  className="h-2.5 w-2.5 rounded-[2px]"
                  style={{ backgroundColor: c.color }}
                />
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="flex-1 font-mono text-xs"
              onClick={() => setRunning((r) => !r)}
            >
              {running ? <Pause className="mr-1.5 h-3.5 w-3.5" /> : <Play className="mr-1.5 h-3.5 w-3.5" />}
              {running ? "Pause" : "Resume"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="font-mono text-xs"
              onClick={() => runMission(CUBES.map((c) => c.id))}
              aria-label="Reset cell"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={cn(
                  "flex-1 rounded border px-2 py-1 font-mono text-[11px] transition-colors",
                  speed === s
                    ? "border-primary/70 bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {s}x
              </button>
            ))}
          </div>

          <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted-foreground">
            Red + amber → left bin. Blue + green → right bin. Motion solved with
            2-link inverse kinematics.
          </p>
        </div>
      </div>
    </div>
  );
}
