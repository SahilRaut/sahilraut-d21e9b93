import { useEffect, useRef } from "react";

const CHARS = " .:-=+*#%@";

type Seg = [number, number, number, number, number]; // x1,y1,x2,y2,thickness

function distSeg(px: number, py: number, s: Seg) {
  const [x1, y1, x2, y2] = s;
  const dx = x2 - x1, dy = y2 - y1;
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

/** Live ASCII-rendered robot arm doing a pick-and-place loop. */
export function AsciiRobotArm({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const color = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();

    const draw = (now: number) => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== w * dpr) { canvas.width = w * dpr; canvas.height = h * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cell = w < 500 ? 7 : 9;
      const cols = Math.floor(w / (cell * 0.6)), rows = Math.floor(h / cell);
      const cw = w / cols;
      ctx.font = `${cell}px ui-monospace, monospace`;
      ctx.textBaseline = "top";

      // world units: x 0..1 (aspect corrected), y 0..1
      const ease = (v: number) => 0.5 - Math.cos(Math.PI * Math.max(0, Math.min(1, v))) / 2;
      const FLOOR = 0.9, BOX = 0.05, BY = FLOOR - BOX / 2;
      const AX = 0.22, BX = 0.78, HI = 0.6, OPEN = 0.045, SHUT = BOX / 2 + 0.006;
      // keyframes: tip x, tip y, grip width, carrying, duration
      const K: [number, number, number, boolean, number][] = [
        [0.5, 0.42, OPEN, false, 1.6], // wait while block slides in
        [AX, HI, OPEN, false, 0.7],
        [AX, BY, OPEN, false, 0.4],
        [AX, BY, SHUT, true, 0.5],
        [AX, HI, SHUT, true, 1.0],
        [BX, HI, SHUT, true, 0.7],
        [BX, BY, SHUT, true, 0.4],
        [BX, BY, OPEN, false, 0.5],
        [BX, HI, OPEN, false, 0.9],
        [0.5, 0.42, OPEN, false, 1.0], // return home while block slides out
      ];
      const total = K.reduce((s, k) => s + k[4], 0);
      let tt = reduce ? 0 : (now / 1000) % total;
      let i = 0;
      while (tt > K[i][4]) { tt -= K[i][4]; i++; }
      const cur = K[i], nxt = K[(i + 1) % K.length];
      const e = ease(tt / cur[4]);
      const px = cur[0] + (nxt[0] - cur[0]) * e;
      const py = cur[1] + (nxt[1] - cur[1]) * e;
      const grip = cur[2] + (nxt[2] - cur[2]) * e;
      const carry = cur[3] && i !== 7;

      const TOOL = 0.08;
      const wr = { x: px, y: py - TOOL };
      const base = { x: 0.5, y: FLOOR }, sh = { x: 0.5, y: 0.6 };
      const L1 = 0.27, L2 = 0.25;
      const dx = wr.x - sh.x, dy = wr.y - sh.y;
      const d = Math.max(Math.abs(L1 - L2) + 0.01, Math.min(Math.hypot(dx, dy), L1 + L2 - 0.001));
      const a = Math.atan2(dy, dx);
      const b = Math.acos((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d));
      const e1 = { x: sh.x + L1 * Math.cos(a - b), y: sh.y + L1 * Math.sin(a - b) };
      const e2 = { x: sh.x + L1 * Math.cos(a + b), y: sh.y + L1 * Math.sin(a + b) };
      const elb = e1.y < e2.y ? e1 : e2; // elbow up

      const fy = wr.y + 0.035;
      const segs: Seg[] = [
        [0.42, FLOOR - 0.015, 0.58, FLOOR - 0.015, 0.018], // base plate
        [base.x, FLOOR - 0.03, sh.x, sh.y, 0.03], // pedestal
        [sh.x, sh.y, elb.x, elb.y, 0.022], // upper arm
        [elb.x, elb.y, wr.x, wr.y, 0.016], // forearm
        [wr.x, wr.y, wr.x, fy, 0.012], // wrist
        [wr.x - grip, fy, wr.x + grip, fy, 0.007], // gripper bar
        [wr.x - grip, fy, wr.x - grip, py + 0.02, 0.006], // fingers
        [wr.x + grip, fy, wr.x + grip, py + 0.02, 0.006],
      ];
      // box: slides in from left → rests at A → carried → rests at B → slides out right
      let box: { x: number; y: number };
      if (carry) box = { x: px, y: py };
      else if (i === 0) box = { x: -0.08 + (AX + 0.08) * ease(tt / cur[4]), y: BY };
      else if (i < 7) box = { x: AX, y: BY };
      else if (i === 8) box = { x: BX, y: BY };
      else box = { x: BX + (1.1 - BX) * ease(tt / cur[4]), y: BY };
      const hb = BOX / 2 - 0.01;
      segs.push([box.x - hb, box.y, box.x + hb, box.y, BOX / 2 - 0.004]);
      const joints = [sh, elb, wr];

      const aspect = w / h;
      // auto-fit: zoom so the artwork fills the canvas at any aspect ratio
      const ART_W = 0.78;  // world width the arm + block need (x ≈ 0.11..0.89)
      const ART_TOP = 0.28; // highest world y the artwork reaches (with headroom)
      const Z = Math.min(aspect / ART_W, FLOOR / (FLOOR - ART_TOP));
      for (let r = 0; r < rows; r++) {
        const py = (r + 0.5) / rows;
        const wy = FLOOR - (FLOOR - py) / Z; // pixel → world y, anchored at the floor
        for (let c = 0; c < cols; c++) {
          const u = (c + 0.5) / cols;
          const wx = 0.5 + (u - 0.5) * (aspect / Z); // pixel → world x
          let v = 0;
          for (const s of segs) {
            const dd = distSeg(wx, wy, s);
            if (dd < s[4]) v = Math.max(v, 1 - (dd / s[4]) * 0.6);
            else if (dd < s[4] * 2) v = Math.max(v, 0.25 * (1 - (dd - s[4]) / s[4]));
          }
          for (const j of joints) {
            const dd = Math.hypot(wx - j.x, wy - j.y);
            if (dd < 0.03) v = Math.max(v, 1);
          }
          // floor line, fading out toward both edges
          const fd = Math.abs(wy - (FLOOR + 0.008));
          if (fd < 0.007) {
            const edge = Math.min(u / 0.24, (1 - u) / 0.24, 1);
            if (edge > 0) {
              const f = edge * edge * (3 - 2 * edge);
              v = Math.max(v, (1 - fd / 0.007) * 0.95 * f);
            }
          }
          // soft glow pooling under the base
          const gd = Math.hypot(wx - 0.5, (wy - (FLOOR + 0.035)) * 2.4);
          if (gd < 0.17) v = Math.max(v, (1 - gd / 0.17) * 0.3);
          if (v <= 0.02) continue;
          ctx.fillStyle = `hsl(${color} / ${0.35 + v * 0.65})`;
          ctx.fillText(CHARS[Math.min(CHARS.length - 1, Math.floor(v * CHARS.length))], c * cw, r * cell);
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
