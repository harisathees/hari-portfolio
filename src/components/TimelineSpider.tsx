"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { MiniWeb, SpiderBody } from "./SpiderWeb";

/**
 * A spider that lets out its thread as you scroll through the timeline — and swings on it.
 * Place it inside the timeline's `relative` wrapper: it rides the centre line on desktop
 * (sm and up) and the left line on phones, matching the dashed timeline.
 */
export function TimelineSpider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const spiderRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // ---- dropping down the line ----
  const progress = useMotionValue(0); // 0 = top of timeline, 1 = bottom
  const travel = useMotionValue(0); // px the spider can drop
  const smooth = useSpring(progress, { stiffness: 140, damping: 24, mass: 0.6 });
  const p = reduce ? progress : smooth;
  const y = useTransform(() => p.get() * travel.get());

  // ---- swinging sideways ----
  // scroll speed sets a sideways "push"; a loose spring overshoots, so the spider keeps
  // swinging back and forth after you stop scrolling, then settles.
  const push = useMotionValue(0);
  const swing = useSpring(push, { stiffness: 38, damping: 2.6, mass: 1 });
  // thread end point (attach point on the spider's head)
  const threadEndY = useTransform(() => y.get() + 6);
  // spider leans along its thread (exaggerated a little so short drops still look swingy)
  const tilt = useTransform(() => (-Math.atan2(swing.get(), Math.min(Math.max(threadEndY.get(), 40), 120)) * 180) / Math.PI);

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const kick = useCallback(
    (amount: number) => {
      if (reduce) return;
      const max = window.innerWidth >= 640 ? 42 : 12; // stay clear of the screen edge on phones
      push.set(Math.max(-max, Math.min(max, amount)));
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => push.set(0), 90); // let go → it swings back
    },
    [push, reduce],
  );

  useEffect(() => {
    const scroller = document.getElementById("page-scroll-region");
    const track = trackRef.current;
    if (!scroller || !track) return;

    let lastTop = scroller.scrollTop;
    let lastTime = performance.now();

    const measure = () => {
      const box = track.getBoundingClientRect();
      const spiderH = spiderRef.current?.offsetHeight ?? 40;
      travel.set(Math.max(0, box.height - spiderH - 12));
      // the spider follows the middle of the screen while the timeline scrolls past
      const anchor = window.innerHeight * 0.5;
      progress.set(Math.min(1, Math.max(0, (anchor - box.top) / box.height)));
    };

    const onScroll = () => {
      measure();
      const now = performance.now();
      const dt = Math.max(16, now - lastTime);
      const velocity = ((scroller.scrollTop - lastTop) / dt) * 1000; // px per second
      lastTop = scroller.scrollTop;
      lastTime = now;
      const box = track.getBoundingClientRect();
      // only swing while the timeline is on screen
      if (box.bottom > 0 && box.top < window.innerHeight) kick(velocity * 0.035);
    };

    measure();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro.disconnect();
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [progress, travel, kick]);

  // poke it with the mouse (or a tap) for a swing
  const nudge = () => kick((Math.random() < 0.5 ? -1 : 1) * 40);

  return (
    <div ref={trackRef} aria-hidden className="pointer-events-none absolute inset-y-0 left-3.5 z-20 w-0 sm:left-1/2">
      {/* the web it hangs from */}
      <MiniWeb className="absolute -top-6 left-1/2 h-10 w-10 -translate-x-1/2 sm:-top-8 sm:h-14 sm:w-14" />

      {/* the thread: a straight line from the web to the spider, so it angles as the spider swings */}
      <svg className="absolute left-0 top-0 overflow-visible" width="1" height="1">
        <motion.line
          x1={0}
          y1={0}
          x2={swing}
          y2={threadEndY}
          stroke="var(--color-ink-soft)"
          strokeOpacity={0.75}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>

      {/* the spider: moves down with the scroll and sideways with the swing */}
      <motion.div className="absolute left-0 top-0" style={{ x: swing, y }}>
        <motion.div
          ref={spiderRef}
          className="pointer-events-auto cursor-grab"
          style={{ x: "-50%", rotate: tilt, originY: 0 }}
          onPointerEnter={nudge}
          onPointerDown={nudge}
        >
          <SpiderBody className="h-7 w-7 sm:h-10 sm:w-10" />
        </motion.div>
      </motion.div>
    </div>
  );
}
