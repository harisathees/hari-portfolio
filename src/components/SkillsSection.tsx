"use client";

import { skillGroups } from "@/data/profile";
import { useIsMobile } from "@/lib/useIsMobile";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Skill tag with a hand-sketched box (plain border on phones). */
function SkillChip({ label }: { label: string }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <span className="relative inline-flex cursor-default rounded-md border border-ink/25 px-2.5 py-0.5 text-xs text-ink/85">
        {label}
      </span>
    );
  }

  return (
    <span className="relative inline-flex cursor-default px-2.5 py-0.5 sm:px-3 sm:py-1 transition-transform duration-200 hover:scale-105">
      <svg className="sketch pointer-events-none absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" aria-hidden>
        <rect
          x="1.5"
          y="1.5"
          width="calc(100% - 3px)"
          height="calc(100% - 3px)"
          rx="3"
          ry="3"
          fill="transparent"
          stroke="var(--color-ink)"
          strokeOpacity="0.35"
          strokeWidth="1.8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="relative text-xs sm:text-sm text-ink/85">{label}</span>
    </span>
  );
}

export function SkillsSection() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 py-12 sm:px-5 sm:py-16">
      <SectionHeading kicker="the toolkit" title="Skills" />
      <div className="divide-y divide-ink/10">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={0.05 * i}>
            <div className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-[200px_1fr] sm:gap-8 sm:py-7">
              <p className="font-hand text-base sm:text-lg font-bold text-ink-soft sm:pt-0.5">{group.label}</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {group.items.map((item) => (
                  <SkillChip key={item} label={item} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
