import { useEffect, useRef } from "react";

/**
 * Fixed full-page red grid with a sweeping light beam, a soft pointer
 * spotlight and a vignette. Rendered behind all pages except Home.
 */
export function RedGrid({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const primary = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "354 88% 55%";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cell = 44;
    let w = 0, h = 0, raf = 0, t0 = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (!t0) t0 = t;
      const time = (t - t0) / 1000;

      ctx.clearRect(0, 0, w, h);

      // Vignette mask: grid fades toward the edges.
      const cx = w / 2, cy = h / 2, maxR = Math.hypot(cx, cy);

      const vign = (x: number, y: number) =>
        Math.max(0, 1 - Math.hypot(x - cx, y - cy) / maxR * 1.25);

      // Grid lines.
      ctx.lineWidth = 1;
      for (let x = 0; x <= w; x += cell) {
        ctx.strokeStyle = `hsl(${primary} / ${0.09 + vign(x, 0) * 0.18})`;
        ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); ctx.stroke();
      }
      for (let y = 0; y <= h; y += cell) {
        ctx.strokeStyle = `hsl(${primary} / ${0.09 + vign(0, y) * 0.18})`;
        ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); ctx.stroke();
      }

      // Sweeping vertical light beam.
      if (!reduce) {
        const beamX = ((time * 140) % (w + 400)) - 200;
        const g = ctx.createLinearGradient(beamX - 120, 0, beamX + 120, 0);
        g.addColorStop(0, `hsl(${primary} / 0)`);
        g.addColorStop(0.5, `hsl(${primary} / 0.12)`);
        g.addColorStop(1, `hsl(${primary} / 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(beamX - 120, 0, 240, h);

        // Brightened grid segment at the beam.
        ctx.lineWidth = 1.5;
        for (let y = 0; y <= h; y += cell) {
          const a = 0.22 * vign(beamX, y);
          if (a <= 0.01) continue;
          ctx.strokeStyle = `hsl(${primary} / ${a})`;
          ctx.beginPath(); ctx.moveTo(beamX - 120, y + 0.5); ctx.lineTo(beamX + 120, y + 0.5); ctx.stroke();
        }
      }

      // Pointer spotlight.
      if (mx > -999) {
        const s = ctx.createRadialGradient(mx, my, 0, mx, my, 220);
        s.addColorStop(0, `hsl(${primary} / 0.10)`);
        s.addColorStop(1, `hsl(${primary} / 0)`);
        ctx.fillStyle = s;
        ctx.fillRect(mx - 220, my - 220, 440, 440);
      }
    };

    let mx = -9999, my = -9999;
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
