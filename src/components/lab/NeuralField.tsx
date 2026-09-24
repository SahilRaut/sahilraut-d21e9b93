import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  bx: number;
  by: number;
  r: number;
  phase: number;
  layer: number;
};

type Pulse = {
  from: number;
  to: number;
  t: number;
  speed: number;
};

/**
 * Neural Policy Field — a layered network graph with drifting nodes,
 * weighted synapses and signal pulses travelling along them.
 * Reacts subtly to the pointer.
 */
export function NeuralField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const accent =
      getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() ||
      "354 88% 55%";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let edges: { a: number; b: number; wgt: number }[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };

    const build = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const layers = w < 640 ? 4 : w < 1100 ? 5 : 6;
      const perLayer = w < 640 ? 4 : 6;

      nodes = [];
      for (let l = 0; l < layers; l++) {
        const count = l === 0 || l === layers - 1 ? perLayer - 2 : perLayer;
        for (let i = 0; i < count; i++) {
          const x = (w * (l + 0.8)) / (layers + 0.6);
          const y = (h * (i + 1)) / (count + 1) + (Math.random() - 0.5) * 26;
          nodes.push({
            x,
            y,
            bx: x,
            by: y,
            r: 1.6 + Math.random() * 1.9,
            phase: Math.random() * Math.PI * 2,
            layer: l,
          });
        }
      }

      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (nodes[j].layer !== nodes[i].layer + 1) continue;
          if (Math.random() > 0.62) continue;
          edges.push({ a: i, b: j, wgt: 0.25 + Math.random() * 0.75 });
        }
      }

      pulses = Array.from({ length: Math.min(26, edges.length) }, () => {
        const e = edges[Math.floor(Math.random() * edges.length)];
        return { from: e.a, to: e.b, t: Math.random(), speed: 0.004 + Math.random() * 0.008 };
      });
    };

    build();

    const onResize = () => build();
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    if (canvas.parentElement) io.observe(canvas.parentElement);

    let t = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      t += reduced ? 0 : 0.006;

      ctx.clearRect(0, 0, w, h);

      // drift + pointer force field
      for (const n of nodes) {
        const dx = n.bx + Math.sin(t + n.phase) * 9 - n.x;
        const dy = n.by + Math.cos(t * 1.2 + n.phase) * 9 - n.y;
        n.x += dx * 0.05;
        n.y += dy * 0.05;

        const px = n.x - pointer.x;
        const py = n.y - pointer.y;
        const d2 = px * px + py * py;
        if (d2 < 26000) {
          const f = (1 - d2 / 26000) * 16;
          const d = Math.sqrt(d2) || 1;
          n.x += (px / d) * f;
          n.y += (py / d) * f;
        }
      }

      // synapses
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        ctx.strokeStyle = `hsl(${accent} / ${0.07 + e.wgt * 0.16})`;
        ctx.lineWidth = 0.6 + e.wgt * 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // travelling signals
      for (const p of pulses) {
        p.t += reduced ? 0 : p.speed;
        if (p.t > 1) {
          const e = edges[Math.floor(Math.random() * edges.length)];
          p.from = e.a;
          p.to = e.b;
          p.t = 0;
          p.speed = 0.004 + Math.random() * 0.008;
        }
        const a = nodes[p.from];
        const b = nodes[p.to];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const fade = Math.sin(p.t * Math.PI);

        const g = ctx.createRadialGradient(x, y, 0, x, y, 12);
        g.addColorStop(0, `hsl(${accent} / ${0.55 * fade})`);
        g.addColorStop(1, `hsl(${accent} / 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsl(${accent} / ${0.9 * fade})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes
      for (const n of nodes) {
        const act = 0.45 + (Math.sin(t * 2 + n.phase) * 0.5 + 0.5) * 0.5;
        ctx.fillStyle = `hsl(${accent} / ${act})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `hsl(${accent} / ${act * 0.22})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 4.5, 0, Math.PI * 2);
        ctx.stroke();
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
