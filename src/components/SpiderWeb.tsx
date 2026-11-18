/** Hand-drawn spider webs + a dangling spider for the scrapbook pages. */

const WEB_COLOR = "var(--color-ink-soft)";

// tiny deterministic wobble so threads look hand-drawn (same on server and client)
const wobble = (n: number) => Math.sin(n * 12.9898) * 2.2;
const r1 = (n: number) => Math.round(n * 10) / 10;

/**
 * Builds web paths centred on (cx, cy): straight spokes between `fromDeg` and `toDeg`,
 * plus rings of threads that sag toward the centre. `closed` joins the last spoke to the first.
 */
function buildWeb({
  cx = 0,
  cy = 0,
  fromDeg,
  toDeg,
  spokes,
  rings,
  reach,
  closed = false,
}: {
  cx?: number;
  cy?: number;
  fromDeg: number;
  toDeg: number;
  spokes: number;
  rings: number[];
  reach: number;
  closed?: boolean;
}) {
  const step = closed ? (toDeg - fromDeg) / spokes : (toDeg - fromDeg) / (spokes - 1);
  const angles = Array.from({ length: spokes }, (_, i) => ((fromDeg + i * step) * Math.PI) / 180);
  const pt = (a: number, r: number) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  const s = reach / 118; // keep the wobble proportional to the web size

  const radial = angles
    .map((a, i) => {
      const [x, y] = pt(a, reach + wobble(i) * s);
      return `M${cx} ${cy}L${r1(x)} ${r1(y)}`;
    })
    .join("");

  const pairs = angles.map((a, i) => [a, angles[(i + 1) % spokes]] as const).slice(0, closed ? spokes : spokes - 1);
  const spiral = rings
    .map((r, k) =>
      pairs
        .map(([a, b], i) => {
          const [x1, y1] = pt(a, r + wobble(k * 7 + i) * s);
          const [x2, y2] = pt(b, r + wobble(k * 7 + i + 1) * s);
          const qx = cx + ((x1 + x2) / 2 - cx) * 0.86; // sag toward the centre
          const qy = cy + ((y1 + y2) / 2 - cy) * 0.86;
          return `M${r1(x1)} ${r1(y1)}Q${r1(qx)} ${r1(qy)} ${r1(x2)} ${r1(y2)}`;
        })
        .join(""),
    )
    .join("");

  return { radial, spiral };
}

function buildCornerWeb() {
  return buildWeb({ fromDeg: 4, toDeg: 86, spokes: 7, rings: [16, 31, 48, 66, 86, 106], reach: 118 });
}

const MINI = buildWeb({ cx: 30, cy: 30, fromDeg: -90, toDeg: 270, spokes: 9, rings: [7, 13, 19, 25], reach: 28, closed: true });

/** A small round web — used as the anchor point for a spider's thread. */
export function MiniWeb({ className = "" }: { className?: string }) {
  return (
    <svg className={`sketch pointer-events-none select-none ${className}`} viewBox="0 0 60 60" fill="none" aria-hidden>
      <path d={MINI.radial} stroke={WEB_COLOR} strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
      <path d={MINI.spiral} stroke={WEB_COLOR} strokeWidth="1.1" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

/** The spider itself, head up, hanging from the top-centre of its box (viewBox 40×36). */
export function SpiderBody({ className = "" }: { className?: string }) {
  return (
    <svg className={`sketch ${className}`} viewBox="0 0 40 36" fill="none" aria-hidden>
      <SpiderShapes t={2} />
    </svg>
  );
}

function SpiderShapes({ t }: { t: number }) {
  const leg = (side: 1 | -1, y: number, reach: number, drop: number) =>
    `M${20 + side * 5} ${t + y}Q${20 + side * (reach * 0.6)} ${t + y - 6} ${20 + side * reach} ${t + y + drop}`;
  return (
    <>
      <path
        d={[leg(-1, 8, 15, 6), leg(-1, 12, 17, 10), leg(-1, 16, 16, 14), leg(-1, 19, 13, 16), leg(1, 8, 15, 6), leg(1, 12, 17, 10), leg(1, 16, 16, 14), leg(1, 19, 13, 16)].join("")}
        stroke={WEB_COLOR}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <ellipse cx="20" cy={t + 18} rx="7" ry="8" fill={WEB_COLOR} />
      <circle cx="20" cy={t + 6} r="4.6" fill={WEB_COLOR} />
      <path
        d={`M17.5 ${t + 16}L20 ${t + 19}L22.5 ${t + 16}M17.5 ${t + 22}L20 ${t + 19}L22.5 ${t + 22}`}
        stroke="var(--color-accent)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="18.3" cy={t + 5.6} r="1.2" fill="var(--color-paper)" />
      <circle cx="21.7" cy={t + 5.6} r="1.2" fill="var(--color-paper)" />
    </>
  );
}

const CORNER = buildCornerWeb();

/** A web spun into a corner. Anchored top-left; flip it with className (e.g. -scale-x-100). */
export function CornerWeb({ className = "" }: { className?: string }) {
  return (
    <svg className={`sketch pointer-events-none select-none ${className}`} viewBox="0 0 120 120" fill="none" aria-hidden>
      <path d={CORNER.radial} stroke={WEB_COLOR} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      <path d={CORNER.spiral} stroke={WEB_COLOR} strokeWidth="1.1" strokeLinecap="round" opacity="0.42" />
      {/* a couple of dew drops */}
      <circle cx="52" cy="27" r="1.8" fill="var(--color-teal)" opacity="0.55" />
      <circle cx="30" cy="70" r="1.4" fill="var(--color-teal)" opacity="0.45" />
    </svg>
  );
}

/** A little spider hanging on its thread; sways gently (static on phones / reduced motion). */
export function HangingSpider({ className = "", thread = 90 }: { className?: string; thread?: number }) {
  return (
    <div className={`spider-dangle pointer-events-none select-none ${className}`} aria-hidden>
      <svg className="sketch" width="40" height={thread + 34} viewBox={`0 0 40 ${thread + 34}`} fill="none">
        <path d={`M20 0V${thread}`} stroke={WEB_COLOR} strokeWidth="1.2" opacity="0.6" />
        <SpiderShapes t={thread} />
      </svg>
    </div>
  );
}
