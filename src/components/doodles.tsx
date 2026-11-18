"use client";

import { motion, useReducedMotion } from "motion/react";
import { useIsMobile } from "@/lib/useIsMobile";

type DoodleProps = { className?: string; color?: string; accent?: string };

const INK = "var(--color-ink-soft)";

export function Arrow({ className = "", color = INK }: DoodleProps) {
  return (
    <svg className={`sketch ${className}`} viewBox="0 0 80 66" fill="none" aria-hidden>
      <path d="M6 10C22 42 44 54 70 50" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M70 50C62 46 56 42 50 36" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M70 50C62 54 56 57 50 60" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function CatDoodle({ className = "", color = INK, accent = "var(--color-accent)" }: DoodleProps) {
  return (
    <svg className={`sketch ${className}`} viewBox="0 0 92 84" fill="none" aria-hidden>
      <path d="M18 21L14 6L29 13" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill={accent} fillOpacity="0.15" />
      <path d="M40 12L50 2L52 18" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill={accent} fillOpacity="0.15" />
      <path d="M15 32C13 20 22 12 33 12C45 12 51 20 50 31C49 40 42 45 32 45C23 45 16 40 15 32Z" stroke={color} strokeWidth="3" />
      <path d="M23 28C25 31 28 31 30 28" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M37 28C39 31 42 31 44 28" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 33L3 31M12 37L4 38" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M52 32L61 30M52 36L60 37" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M28 45C26 56 26 68 28 76M45 44C58 48 68 56 68 68L68 76" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M22 76H74" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 76C34 72 40 72 40 76" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M68 72C80 74 86 66 82 56C80 51 74 49 70 53" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

/** A head peeking over the top edge of a photo card: a cat, or a little demon. */
export function CatPeekDoodle({
  className = "",
  color = INK,
  variant = "cat",
}: DoodleProps & { variant?: "cat" | "demon" }) {
  if (variant === "demon") {
    return (
      <svg className={`sketch ${className}`} viewBox="0 0 100 46" fill="none" aria-hidden>
        {/* horns */}
        <path d="M28 20C22 13 21 6 26 1C27 7 32 12 40 15.5" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill="var(--color-accent)" fillOpacity="0.35" />
        <path d="M72 20C78 13 79 6 74 1C73 7 68 12 60 15.5" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill="var(--color-accent)" fillOpacity="0.35" />
        {/* head + angry brows */}
        <path d="M12 46C14 22 34 14 50 14C66 14 86 22 88 46" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M27 26L42 31M73 26L58 31" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
        {/* glowing slit eyes */}
        <circle cx="36" cy="35" r="3.8" fill="#d6453d" />
        <circle cx="64" cy="35" r="3.8" fill="#d6453d" />
        <path d="M36 32.5V37.5M64 32.5V37.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        {/* fanged grin */}
        <path d="M42 41C46 44.5 54 44.5 58 41" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M45 42.6L46.5 46L48 43.6M52 43.6L53.5 46L55 42.6" stroke={color} strokeWidth="1.6" strokeLinejoin="round" fill="var(--color-paper)" />
        {/* clawed hands */}
        <path d="M24 46C24 40 32 40 32 46" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M68 46C68 40 76 40 76 46" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24.6 43L21.5 41.5M25.8 41.2L23.4 38.6M28 40.4L27 37.2M75.4 43L78.5 41.5M74.2 41.2L76.6 38.6M72 40.4L73 37.2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={`sketch ${className}`} viewBox="0 0 100 46" fill="none" aria-hidden>
      <path d="M22 22L18 4L34 14" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M66 14L82 4L78 22" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M12 46C14 22 34 14 50 14C66 14 86 22 88 46" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="36" cy="34" r="3.5" fill={color} />
      <circle cx="64" cy="34" r="3.5" fill={color} />
      <path d="M24 46C24 40 32 40 32 46" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M68 46C68 40 76 40 76 46" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChipDoodle({ className = "", color = INK, accent = "var(--color-accent-deep)" }: DoodleProps) {
  return (
    <svg className={`sketch ${className}`} viewBox="0 0 84 84" fill="none" aria-hidden>
      {[26, 42, 58].map((p) => (
        <g key={p} stroke={color} strokeWidth="2.5" strokeLinecap="round">
          <line x1={p} y1="12" x2={p} y2="22" />
          <line x1={p} y1="62" x2={p} y2="72" />
          <line x1="12" y1={p} x2="22" y2={p} />
          <line x1="62" y1={p} x2="72" y2={p} />
        </g>
      ))}
      <rect x="22" y="22" width="40" height="40" rx="7" stroke={color} strokeWidth="3" fill="var(--color-paper)" />
      <text x="42" y="49" textAnchor="middle" fontFamily="var(--font-caveat), cursive" fontWeight="700" fontSize="20" fill={accent}>
        AI
      </text>
    </svg>
  );
}

const CIRCLE_PATH = "M100 6C150 4 196 18 196 45C196 74 140 86 96 84C42 81 6 66 6 43C6 19 56 8 110 7";

/** Hand-drawn loop around a heading; draws itself in on desktop. */
export function CircleScribble({ className = "", color = "var(--color-teal)" }: DoodleProps) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  return (
    <svg className={className} viewBox="0 0 200 90" fill="none" preserveAspectRatio="none" aria-hidden>
      {isMobile ? (
        <path d={CIRCLE_PATH} stroke={color} strokeWidth="3" strokeLinecap="round" />
      ) : (
        <motion.path
          d={CIRCLE_PATH}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={reduce ? { duration: 0 } : { duration: 0.9, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}

const LOSS_PATH = "M18 14C24 44 32 28 42 46C50 58 72 58 98 61";

export function LossCurve({ className = "", color = INK, accent = "var(--color-teal)" }: DoodleProps) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  return (
    <svg className={`sketch ${className}`} viewBox="0 0 110 80" fill="none" aria-hidden>
      <path d="M14 8V66H102" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {isMobile ? (
        <path d={LOSS_PATH} stroke={accent} strokeWidth="3" strokeLinecap="round" />
      ) : (
        <motion.path
          d={LOSS_PATH}
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? { duration: 0 } : { duration: 1.1, ease: "easeInOut" }}
        />
      )}
      <text x="66" y="30" fontFamily="var(--font-caveat), cursive" fontWeight="700" fontSize="15" fill={color}>
        loss ↓
      </text>
    </svg>
  );
}

export function MechBotDoodle({ className = "", color = INK, accent = "var(--color-teal)" }: DoodleProps) {
  return (
    <svg className={`sketch ${className}`} viewBox="0 0 90 100" fill="none" aria-hidden>
      <path d="M45 3L39 14H51L45 3Z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" fill={accent} fillOpacity="0.3" />
      <path d="M25 22C25 15 65 15 65 22L67 44C67 54 58 60 45 60C32 60 23 54 23 44L25 22Z" stroke={color} strokeWidth="3" />
      <rect x="29" y="30" width="32" height="11" rx="5.5" stroke={color} strokeWidth="2.4" fill={accent} fillOpacity="0.35" />
      <circle cx="38" cy="35.5" r="2" fill={color} />
      <circle cx="52" cy="35.5" r="2" fill={color} />
      <path d="M39 48V53M45 49V54M51 48V53" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M23 70L10 78V92" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M67 70L80 78V92" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="27" y="64" width="36" height="31" rx="7" stroke={color} strokeWidth="3" />
      <path d="M48 69L40 81H46L42 91L52 78H46L50 69Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill={accent} fillOpacity="0.35" />
    </svg>
  );
}

const LAYERS = [
  { x: 14, ys: [20, 46, 72] },
  { x: 62, ys: [10, 34, 58, 82] },
  { x: 110, ys: [32, 60] },
];

export function NeuralNet({
  className = "",
  color = INK,
  nodeColor = "var(--color-accent)",
}: DoodleProps & { nodeColor?: string }) {
  return (
    <svg className={`sketch ${className}`} viewBox="0 0 124 92" fill="none" aria-hidden>
      {LAYERS.slice(0, -1).map((layer, li) =>
        layer.ys.flatMap((y1) =>
          LAYERS[li + 1].ys.map((y2) => (
            <line
              key={`${li}-${y1}-${y2}`}
              x1={layer.x}
              y1={y1}
              x2={LAYERS[li + 1].x}
              y2={y2}
              stroke={color}
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.45"
            />
          )),
        ),
      )}
      {LAYERS.map((layer, li) =>
        layer.ys.map((y) => (
          <circle
            key={`${li}-${y}`}
            cx={layer.x}
            cy={y}
            r="5.5"
            stroke={color}
            strokeWidth="2.2"
            fill={li === LAYERS.length - 1 ? nodeColor : "var(--color-paper)"}
            fillOpacity={li === LAYERS.length - 1 ? 0.35 : 1}
          />
        )),
      )}
    </svg>
  );
}

export function PenDoodle({ className = "", color = INK, accent = "var(--color-accent)" }: DoodleProps) {
  return (
    <svg className={`sketch ${className}`} viewBox="0 0 90 30" fill="none" aria-hidden>
      <path d="M8 22L64 8" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M40 13.5L48 11.4" stroke={accent} strokeWidth="4" strokeLinecap="round" />
      <path d="M64 8L82 3L70 17L64 8Z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="var(--color-paper)" />
      <path d="M72 8L74.5 6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6 24C4 25.5 3 27 5 27.5" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function RobotDoodle({ className = "", color = INK, accent = "var(--color-accent)" }: DoodleProps) {
  return (
    <svg className={`sketch ${className}`} viewBox="0 0 80 78" fill="none" aria-hidden>
      <line x1="40" y1="18" x2="40" y2="9" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="6.5" r="3.5" stroke={color} strokeWidth="2" fill={accent} fillOpacity="0.4" />
      <rect x="5" y="34" width="8" height="15" rx="3" stroke={color} strokeWidth="2.5" />
      <rect x="67" y="34" width="8" height="15" rx="3" stroke={color} strokeWidth="2.5" />
      <rect x="14" y="18" width="52" height="46" rx="11" stroke={color} strokeWidth="3" />
      <circle cx="30" cy="39" r="4" fill={color} />
      <circle cx="50" cy="39" r="4" fill={color} />
      <path d="M30 51C34 56 46 56 50 51" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const UNDERLINE_A = "M3 11C46 5 92 4 138 7c44 3 88 6 159 2";
const UNDERLINE_B = "M14 15C70 12 150 13 286 11";

/** Double-stroke marker underline that draws itself under headings. */
export function ScribbleUnderline({ className = "", color = "var(--color-accent)" }: DoodleProps) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <svg className={className} viewBox="0 0 300 18" fill="none" preserveAspectRatio="none" aria-hidden>
        <path d={UNDERLINE_A} stroke={color} strokeWidth="4" strokeLinecap="round" />
        <path d={UNDERLINE_B} stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 300 18" fill="none" preserveAspectRatio="none" aria-hidden>
      <motion.path
        d={UNDERLINE_A}
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? { duration: 0 } : { duration: 0.7, ease: "easeInOut" }}
      />
      <motion.path
        d={UNDERLINE_B}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? { duration: 0 } : { duration: 0.7, delay: 0.12, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function Sparkle({ className = "", color = "var(--color-accent)" }: DoodleProps) {
  return (
    <svg className={`sketch ${className}`} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M20 3C21 13 27 19 37 20C27 21 21 27 20 37C19 27 13 21 3 20C13 19 19 13 20 3Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.12"
      />
    </svg>
  );
}
