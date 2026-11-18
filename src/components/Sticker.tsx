import type { CSSProperties, ReactNode } from "react";

type Props = {
  rotate?: number;
  tint?: string;
  className?: string;
  children: ReactNode;
};

/** Rounded paper sticker that wiggles on hover. */
export function Sticker({ rotate = 0, tint = "#ffffff", className = "", children }: Props) {
  return (
    <span
      className={`scrap-tilt scrap-tilt-hover inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-3 py-1 shadow-[0_2px_6px_rgba(58,47,47,0.18)] ${className}`}
      style={{ background: tint, "--tilt-rotate": `${rotate}deg` } as CSSProperties}
    >
      {children}
    </span>
  );
}
