"use client";

import type { CSSProperties, ReactNode } from "react";
import { useIsMobile } from "@/lib/useIsMobile";

type Props = {
  tint?: string;
  rotate?: number;
  torn?: boolean;
  hoverTilt?: boolean;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
};

/** A paper note with ripped edges (SVG filter on desktop, soft corners on phones). */
export function TornCard({
  tint = "#ffffff",
  rotate = 0,
  torn = true,
  hoverTilt = false,
  className = "",
  contentClassName = "",
  children,
}: Props) {
  const isMobile = useIsMobile();

  const paper: CSSProperties = {
    background: tint,
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
    contain: "paint layout",
    ...(torn
      ? isMobile
        ? {
            borderRadius: "12px 10px 14px 8px",
            boxShadow: "0 1px 2px rgba(58,47,47,0.08), 0 10px 24px -6px rgba(58,47,47,0.16)",
          }
        : {
            filter:
              "url(#torn-edge) drop-shadow(0 1px 2px rgba(58,47,47,0.08)) drop-shadow(0 14px 30px rgba(58,47,47,0.14))",
            borderRadius: "10px",
          }
      : {
          borderRadius: "24px",
          boxShadow: "0 1px 2px rgba(58,47,47,0.06), 0 14px 30px -12px rgba(58,47,47,0.25)",
        }),
  };

  return (
    <div
      className={`scrap-tilt relative ${hoverTilt ? "scrap-tilt-hover" : ""} ${className}`}
      style={{ "--tilt-rotate": `${rotate}deg` } as CSSProperties}
    >
      <div aria-hidden className="absolute inset-0" style={paper} />
      <div className={`relative ${contentClassName}`}>{children}</div>
    </div>
  );
}
