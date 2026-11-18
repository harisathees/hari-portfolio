import type { Metadata } from "next";
import { CatPeekDoodle, PenDoodle, RobotDoodle, Sparkle } from "@/components/doodles";
import { PolaroidFrame } from "@/components/PolaroidFrame";
import { Reveal } from "@/components/Reveal";
import { SkillsSection } from "@/components/SkillsSection";
import { Sticker } from "@/components/Sticker";
import { Timeline } from "@/components/Timeline";
import { TornCard } from "@/components/TornCard";
import { WashiTape } from "@/components/WashiTape";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `About — ${profile.name}`,
  description: `Who ${profile.name} is — the journey and the toolkit.`,
};

export default function AboutPage() {
  return (
    <main className="relative overflow-x-hidden">
      <section className="relative mx-auto max-w-4xl px-4 pb-8 pt-10 sm:px-5 sm:pt-16">
        <Sparkle className="absolute -top-1 left-[2%] h-7 w-7 rotate-12 opacity-70" color="var(--color-accent)" />
        <Sparkle className="absolute top-8 right-[3%] h-6 w-6 -rotate-12 opacity-65" color="var(--color-teal)" />

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-12">
          <Reveal rotate={2} className="relative shrink-0">
            <CatPeekDoodle
              variant="demon"
              className="pointer-events-none absolute -top-7 sm:-top-8 left-1/2 z-20 block h-8 w-20 sm:h-9 sm:w-24 -translate-x-1/2"
            />
            <PolaroidFrame src={profile.photo} alt={`Photo of ${profile.name}`} caption={profile.photoCaption} rotate={0} width={210} />
            <span className="font-hand text-xl text-teal-deep absolute -bottom-9 left-2 hidden -rotate-2 sm:block">hi again ✌️</span>
          </Reveal>

          <Reveal delay={0.15} rotate={-0.8} className="relative w-full">
            <div aria-hidden className="hidden sm:flex absolute -top-11 right-2 z-20 items-end gap-1.5 select-none">
              <RobotDoodle className="h-12 w-12 sm:h-14 sm:w-14 -rotate-6 opacity-90 transition-transform duration-300 hover:rotate-3" />
              <Sticker rotate={4} tint="var(--color-note-yellow)">
                <span className="font-hand text-sm font-bold text-ink">hello from the lab! 🤖⚡</span>
              </Sticker>
            </div>
            <TornCard tint="#fffdf6" contentClassName="px-5 py-6 sm:px-9 sm:py-8">
              <WashiTape color="kraft" className="-top-3 right-10 h-6 w-24 rotate-3" />
              <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">About me</h1>
              <p className="mt-4 font-hand text-xl leading-relaxed text-ink/90 sm:text-2xl">{profile.introAbout}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 border-t border-ink/10 pt-3.5">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-hand text-sm sm:text-base text-ink-soft leading-snug">
                    open to full-stack &amp; frontend engineering roles
                  </span>
                </div>
                <PenDoodle className="hidden sm:block h-5 w-16 rotate-3 text-ink-soft opacity-60" />
              </div>
            </TornCard>
          </Reveal>
        </div>
      </section>

      <Timeline />
      <SkillsSection />
    </main>
  );
}
