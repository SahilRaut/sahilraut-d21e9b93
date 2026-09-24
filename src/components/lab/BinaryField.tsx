import { useEffect, useRef } from "react";

/** Fixed full-page grid of flickering 0/1 digits with a soft spotlight vignette. */
export function BinaryField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const primary = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "354 88% 55%";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cell = 14;
    let cols = 0, rows = 0, w = 0, h = 0;
    let bits: Uint8Array, glow: Float32Array;
    let mx = -9999, my = -9999, raf = 0, last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / cell); rows = Math.ceil(h / cell);
      bits = new Uint8Array(cols * rows).map(() => (Math.random() < 0.5 ? 1 : 0));
      glow = new Float32Array(cols * rows);
    };

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 70) return;
      last = t;
      ctx.clearRect(0, 0, w, h);
      ctx.font = `600 11px "JetBrains Mono", monospace`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      const cx = w / 2, cy = h / 2, maxR = Math.hypot(cx, cy);
      for (let i = 0; i < bits.length; i++) {
        if (!reduce && Math.random() < 0.02) { bits[i] ^= 1; glow[i] = 1; }
        glow[i] *= 0.9;
        const x = (i % cols) * cell + cell / 2, y = Math.floor(i / cols) * cell + cell / 2;
        const d = Math.hypot(x - cx, y - cy) / maxR;
        const vign = Math.max(0, 1 - d * 1.15);
        const md = Math.hypot(x - mx, y - my);
        const hover = md < 140 ? 1 - md / 140 : 0;
        const a = 0.05 + vign * 0.22 + glow[i] * 0.35 + hover * 0.6;
        ctx.fillStyle = `hsl(${primary} / ${Math.min(a, 0.95)})`;
        ctx.fillText(bits[i] ? "1" : "0", x, y);
      }
    };

    const move = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none fixed inset-0 z-0 ${className}`} />;
}
