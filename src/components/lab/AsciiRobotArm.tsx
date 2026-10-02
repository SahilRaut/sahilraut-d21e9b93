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
      const t = reduce ? 0.3 : ((now / 1000) % 8) / 8;
      const ease = (v: number) => 0.5 - Math.cos(Math.PI * Math.max(0, Math.min(1, v))) / 2;
      const A = { x: 0.3, y: 0.82 }, B = { x: 0.7, y: 0.82 };
      let tx: number, ty: number, carry = false;
      if (t < 0.15) { tx = 0.5 + (A.x - 0.5) * ease(t / 0.15); ty = 0.45 + (A.y - 0.06 - 0.45) * ease(t / 0.15); }
      else if (t < 0.25) { tx = A.x; ty = A.y - 0.06; }
      else if (t < 0.6) { const k = ease((t - 0.25) / 0.35); carry = true; tx = A.x + (B.x - A.x) * k; ty = A.y - 0.06 - Math.sin(Math.PI * k) * 0.3; }
      else if (t < 0.7) { tx = B.x; ty = B.y - 0.06; carry = true; }
      else { const k = ease((t - 0.7) / 0.3); tx = B.x + (0.5 - B.x) * k; ty = B.y - 0.06 + (0.45 - B.y + 0.06) * k; }

      const base = { x: 0.5, y: 0.82 }, sh = { x: 0.5, y: 0.7 };
      const L1 = 0.3, L2 = 0.28;
      const dx = tx - sh.x, dy = ty - sh.y;
      const d = Math.min(Math.hypot(dx, dy), L1 + L2 - 0.001);
      const a = Math.atan2(dy, dx);
      const b = Math.acos((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d));
      const elb = { x: sh.x + L1 * Math.cos(a - b), y: sh.y + L1 * Math.sin(a - b) };
      const wr = { x: elb.x + L2 * Math.cos(Math.atan2(ty - elb.y, tx - elb.x)), y: elb.y + L2 * Math.sin(Math.atan2(ty - elb.y, tx - elb.x)) };
      const grip = carry ? 0.018 : 0.035;

      const segs: Seg[] = [
        [0.38, 0.86, 0.62, 0.86, 0.02],
        [base.x, base.y, sh.x, sh.y, 0.035],
        [sh.x, sh.y, elb.x, elb.y, 0.03],
        [elb.x, elb.y, wr.x, wr.y, 0.022],
        [wr.x - grip, wr.y, wr.x + grip, wr.y, 0.008],
        [wr.x - grip, wr.y, wr.x - grip, wr.y + 0.04, 0.007],
        [wr.x + grip, wr.y, wr.x + grip, wr.y + 0.04, 0.007],
        [0.05, 0.9, 0.95, 0.9, 0.004],
      ];
      const box = carry ? { x: wr.x, y: wr.y + 0.05 } : t < 0.25 || t >= 0.95 ? { x: A.x, y: A.y + 0.04 } : { x: B.x, y: B.y + 0.04 };
      if (t >= 0.7 && t < 0.95) { box.x = B.x; box.y = B.y + 0.04; }
      segs.push([box.x - 0.012, box.y, box.x + 0.012, box.y, 0.02]);
      const joints = [sh, elb, wr];

      const aspect = w / h;
      for (let r = 0; r < rows; r++) {
        const py = (r + 0.5) / rows;
        for (let c = 0; c < cols; c++) {
          const px = 0.5 + (((c + 0.5) / cols) - 0.5) * aspect;
          let v = 0;
          for (const s of segs) {
            const dd = distSeg(px, py, s);
            if (dd < s[4]) v = Math.max(v, 1 - (dd / s[4]) * 0.6);
            else if (dd < s[4] * 2) v = Math.max(v, 0.25 * (1 - (dd - s[4]) / s[4]));
          }
          for (const j of joints) {
            const dd = Math.hypot(px - j.x, py - j.y);
            if (dd < 0.03) v = Math.max(v, 1);
          }
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
