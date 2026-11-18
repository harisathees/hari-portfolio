"use client";

import { useIsMobile } from "@/lib/useIsMobile";

/**
 * Global SVG filters: `sketchy` wobbles doodles, `torn-edge` rips paper edges.
 * Phones get empty filters (they are expensive to render).
 */
export function SketchDefs() {
  const isMobile = useIsMobile();

  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        {isMobile ? (
          <>
            <filter id="sketchy" />
            <filter id="sketchy-strong" />
            <filter id="torn-edge" />
          </>
        ) : (
          <>
            <filter id="sketchy" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves={2} seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={3.2} />
            </filter>
            <filter id="sketchy-strong" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves={2} seed="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={5} />
            </filter>
            <filter id="torn-edge" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={2} seed="11" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={10} />
            </filter>
          </>
        )}
      </defs>
    </svg>
  );
}
