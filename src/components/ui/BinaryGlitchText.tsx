import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BinaryGlitchTextProps {
  text: string;
  className?: string;
  /** ms between scramble frames */
  speed?: number;
  /** frames each character stays scrambled before resolving */
  hold?: number;
  /** delay before the decode starts on mount */
  delay?: number;
  /** re-run the decode automatically every N ms (0 = never) */
  loop?: number;
  as?: "span" | "div";
}

const BITS = ["0", "1"];

export function BinaryGlitchText({
  text,
  className,
  speed = 35,
  hold = 3,
  delay = 0,
  loop = 0,
  as: Tag = "span",
}: BinaryGlitchTextProps) {
  const [frame, setFrame] = useState<string[]>(() => text.split(""));
  const [resolved, setResolved] = useState<boolean[]>(() => text.split("").map(() => false));
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const run = useCallback(() => {
    const chars = text.split("");
    const total = chars.length;
    let tick = 0;
    let last = 0;

    const step = (now: number) => {
      if (now - last >= speed) {
        last = now;
        tick += 1;
        const revealed = Math.floor(tick / hold);
        setFrame(
          chars.map((char, i) => {
            if (char === " ") return " ";
            if (i < revealed) return char;
            return BITS[Math.random() > 0.5 ? 1 : 0];
          })
        );
        setResolved(chars.map((_, i) => i < revealed));
      }
      if (tick / hold <= total) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setFrame(chars);
        setResolved(chars.map(() => true));
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);
  }, [text, speed, hold]);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(run, delay);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [run, delay]);

  useEffect(() => {
    if (!loop) return;
    const id = window.setInterval(run, loop);
    return () => window.clearInterval(id);
  }, [loop, run]);

  return (
    <Tag
      className={cn("relative inline-block cursor-default align-bottom", className)}
      onMouseEnter={run}
      aria-label={text}
    >
      {/* invisible copy reserves the final layout so decoding never reflows the page;
          per-char spans match the overlay's metrics so both wrap identically */}
      <span className="invisible whitespace-pre-wrap" aria-hidden="true">
        {text.split("").map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </span>
      <span
        className="absolute left-0 top-0 right-0 whitespace-pre-wrap overflow-hidden"
        aria-hidden="true"
      >
        {frame.map((char, i) => (
          <span
            key={`${i}-${char}`}
            className={
              resolved[i]
                ? undefined
                : "text-primary/80 [text-shadow:0_0_12px_hsl(var(--primary)/0.55)]"
            }
          >
            {char}
          </span>
        ))}
      </span>
    </Tag>
  );
}

