"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useIsMobile } from "@/lib/useIsMobile";
import { WashiTape } from "./WashiTape";

function Placeholder() {
  return (
    <svg viewBox="0 0 200 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="200" height="250" fill="#f5f5f4" />
      <g className="sketch" fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="100" cy="95" r="38" />
        <path d="M48 220c4-40 24-60 52-60s48 20 52 60" />
      </g>
    </svg>
  );
}

type Props = {
  src?: string;
  alt: string;
  caption: string;
  rotate?: number;
  width?: number;
  hoverTilt?: boolean;
  className?: string;
};

/** Taped instant-photo frame with a handwritten caption. */
export function PolaroidFrame({ src, alt, caption, rotate = -3, width = 250, hoverTilt = false, className = "" }: Props) {
  const isMobile = useIsMobile();

  return (
    <div
      className={`scrap-tilt relative shrink-0 ${hoverTilt ? "scrap-tilt-hover" : ""} ${className}`}
      style={{ "--tilt-rotate": `${rotate}deg`, width } as CSSProperties}
    >
      <div
        className={`relative bg-white p-3 pb-14 ${isMobile ? "shadow-[0_4px_16px_-2px_rgba(58,47,47,0.22)]" : "shadow-[0_10px_30px_-10px_rgba(58,47,47,0.35)]"}`}
      >
        <WashiTape color="kraft" className="-top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3" />
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
          {src ? <Image src={src} alt={alt} fill priority sizes={`${width}px`} className="object-cover" /> : <Placeholder />}
        </div>
        <p className="absolute inset-x-0 bottom-3 text-center font-hand text-2xl text-ink/80">{caption}</p>
      </div>
    </div>
  );
}
