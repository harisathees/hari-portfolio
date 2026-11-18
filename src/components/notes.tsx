import type { ReactNode } from "react";
import { TornCard } from "./TornCard";

const TONES = { soft: "text-ink-soft", accent: "text-accent-deep", teal: "text-teal-deep" } as const;

/** A handwritten margin note. */
export function HandNote({
  tone = "soft",
  className = "",
  children,
}: {
  tone?: keyof typeof TONES;
  className?: string;
  children: ReactNode;
}) {
  return <span className={`font-hand text-xl ${TONES[tone]} ${className}`}>{children}</span>;
}

/** A tiny torn sticky note with scribbled lines (pure decoration). */
export function NoteLines({
  tint = "var(--color-note-pink)",
  rotate = 0,
  className = "",
  lines = 3,
}: {
  tint?: string;
  rotate?: number;
  className?: string;
  lines?: number;
}) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <TornCard tint={tint} rotate={rotate} contentClassName="px-4 py-3">
        <svg width="64" height={11 * lines} viewBox={`0 0 64 ${11 * lines}`} fill="none">
          {Array.from({ length: lines }, (_, i) => (
            <path
              key={i}
              d={`M3 ${7 + 11 * i}C14 ${4 + 11 * i} 30 ${9 + 11 * i} ${i % 2 === 0 ? 60 : 46} ${6 + 11 * i}`}
              stroke="var(--color-ink)"
              strokeOpacity="0.22"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </TornCard>
    </div>
  );
}
