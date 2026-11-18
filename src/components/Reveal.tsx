"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useIsMobile } from "@/lib/useIsMobile";

type Props = {
  delay?: number;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** Fades + lifts its children into view once. Static on phones. */
export function Reveal({ delay = 0, rotate = 0, className = "", style, children }: Props) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className={className} style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.25 }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, delay, ease: "easeOut" }}
      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", ...style }}
    >
      {children}
    </motion.div>
  );
}
