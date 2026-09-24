import { useEffect, useRef } from "react";

/** Subtle falling 0/1 data-rain rendered on a canvas, tinted with the accent color. */
export function BinaryRain({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let columns = 0;
    let drops: number[] = [];
    const fontSize = 13;

    const accent =
      getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() ||
      "354 88% 55%";

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(parent.clientWidth / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
    };

    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 70) return;
      last = now;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.fillStyle = "rgba(8, 8, 10, 0.16)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < columns; i++) {
        const y = drops[i] * fontSize;
        const bit = Math.random() > 0.5 ? "1" : "0";
        ctx.fillStyle = `hsl(${accent} / ${Math.random() > 0.94 ? 0.75 : 0.22})`;
        ctx.fillText(bit, i * fontSize, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
