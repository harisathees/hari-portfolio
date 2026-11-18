import Link from "next/link";
import { profile } from "@/data/profile";
import {
  Arrow,
  CatDoodle,
  CatPeekDoodle,
  ChipDoodle,
  LossCurve,
  NeuralNet,
  PenDoodle,
  RobotDoodle,
  ScribbleUnderline,
  Sparkle,
} from "./doodles";
import { NoteLines } from "./notes";
import { PolaroidFrame } from "./PolaroidFrame";
import { Reveal } from "./Reveal";
import { Sticker } from "./Sticker";
import { TornCard } from "./TornCard";
import { WashiTape } from "./WashiTape";

/** A sticker pinned somewhere on the hero (decorative). */
function HeroSticker({
  className,
  tint,
  rotate,
  label,
  emoji,
  mono = false,
}: {
  className: string;
  tint: string;
  rotate: number;
  label: string;
  emoji: string;
  mono?: boolean;
}) {
  return (
    <div aria-hidden className={`absolute hidden select-none ${className}`}>
      <Sticker rotate={rotate} tint={tint}>
        <span className={mono ? "font-mono text-xs font-semibold text-ink/80" : "font-hand text-lg font-bold text-ink/85"}>
          {label}
        </span>
        {emoji}
      </Sticker>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative mx-auto flex min-h-auto sm:min-h-[min(90vh,900px)] max-w-6xl items-center px-4 sm:px-5 pt-6 pb-12 sm:py-16">
      {/* ---------- scattered scrapbook decorations (desktop only) ---------- */}
      <div aria-hidden className="absolute left-[1.5%] top-[6%] hidden select-none xl:block">
        <TornCard tint="var(--color-note-yellow)" rotate={-5} hoverTilt className="w-44" contentClassName="px-4 py-4">
          <WashiTape color="kraft" className="-top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-2" />
          {["monolithic bloat", "manual deploys", "spaghetti state"].map((t) => (
            <p key={t} className="font-hand text-base font-bold text-ink/55 line-through decoration-2">
              {t}
            </p>
          ))}
          <p className="mt-2 font-hand text-lg font-bold leading-tight text-accent-deep">1 realization: full-stack type safety ✨</p>
        </TornCard>
      </div>

      <div aria-hidden className="absolute bottom-[5%] right-[2%] hidden select-none xl:block">
        <TornCard tint="#fffdf6" rotate={2} hoverTilt className="w-48" contentClassName="px-5 py-5">
          <WashiTape color="teal" className="-top-2.5 right-6 h-5 w-16 rotate-6" />
          <p className="font-hand text-xl leading-snug text-ink/85">
            “the best software feels effortless, fast, and beautifully engineered.”
          </p>
        </TornCard>
      </div>

      <Arrow className="absolute bottom-[13%] right-[20%] hidden h-14 w-14 rotate-[30deg] opacity-60 xl:block" color="var(--color-teal)" />

      <div aria-hidden className="absolute bottom-[4%] left-[30%] hidden select-none xl:block">
        <TornCard tint="var(--color-note-yellow)" rotate={-3} hoverTilt className="w-44" contentClassName="px-4 py-3">
          <WashiTape color="kraft" className="-top-2 left-6 h-4 w-12 rotate-2" />
          <p className="font-hand text-xs font-bold uppercase tracking-wider text-ink/55">status log</p>
          <p className="mt-1 font-hand text-base font-bold leading-tight text-ink/85">shipping snappy web apps with Next.js &amp; AI ✨</p>
        </TornCard>
      </div>

      <CatDoodle className="absolute bottom-[3%] left-[51%] hidden h-16 w-16 rotate-2 opacity-80 xl:block" />
      <span className="font-hand text-xl text-ink-soft absolute bottom-[1.5%] left-[58%] hidden -rotate-2 xl:block">
        chief bug inspector 🐾
      </span>
      <PenDoodle className="absolute bottom-[12%] left-[44%] hidden h-7 w-20 -rotate-6 opacity-75 lg:block" />
      <NoteLines tint="var(--color-note-green)" rotate={-8} className="absolute left-[11%] top-[36%] hidden xl:block" />

      <div
        aria-hidden
        className="absolute bottom-[22%] left-[2.5%] hidden rotate-6 select-none border-2 border-dashed border-ink/30 bg-white/80 p-2 shadow-[0_2px_6px_rgba(58,47,47,0.15)] lg:block"
      >
        <RobotDoodle className="h-10 w-10" />
        <p className="mt-1 text-center font-hand text-xs font-bold tracking-wide text-ink/60">DEV DISPATCH</p>
      </div>

      <WashiTape color="teal" className="left-[36%] top-[5%] hidden h-7 w-28 -rotate-[24deg] md:block" />
      <WashiTape color="amber" className="right-[3%] top-[20%] hidden h-6 w-24 rotate-[18deg] lg:block" />
      <Sparkle className="absolute left-[8%] top-[26%] hidden h-9 w-9 rotate-6 opacity-80 md:block" />
      <Sparkle className="absolute right-[10%] top-[14%] hidden h-6 w-6 -rotate-12 opacity-70 sm:block" color="var(--color-teal)" />
      <Sparkle className="absolute bottom-[8%] left-[30%] hidden h-6 w-6 rotate-12 opacity-70 lg:block" color="var(--color-teal)" />
      <WashiTape color="amber" className="bottom-[17%] left-[41%] hidden h-5 w-20 -rotate-[14deg] xl:block" />
      <Sparkle className="absolute bottom-[15%] left-[46%] hidden h-6 w-6 rotate-45 opacity-65 lg:block" color="var(--color-accent)" />
      <Sparkle className="absolute bottom-[6%] right-[32%] hidden h-7 w-7 -rotate-12 opacity-60 xl:block" color="var(--color-teal)" />
      <NeuralNet className="absolute right-[2%] top-[26%] hidden h-24 w-32 rotate-3 opacity-80 xl:block" />
      <span className="font-hand text-xl text-teal-deep absolute right-[3%] top-[44%] hidden -rotate-3 xl:block">
        ↑ clean code in action
      </span>
      <ChipDoodle className="absolute left-[3%] top-[44%] hidden h-16 w-16 -rotate-6 opacity-85 lg:block" />
      <RobotDoodle className="absolute bottom-[7%] left-[8%] hidden h-20 w-20 rotate-6 opacity-90 md:block" />
      <span className="font-hand text-xl text-ink-soft absolute bottom-[4%] left-[15%] hidden rotate-2 md:block">
        hi, fellow builder 👋
      </span>
      <LossCurve className="absolute bottom-[36%] right-[3%] hidden h-20 w-28 -rotate-2 xl:block" />

      <HeroSticker className="left-[16%] top-[7%] lg:block" tint="var(--color-note-blue)" rotate={-7} label="next dev --turbopack" emoji="⚡" mono />
      <HeroSticker className="right-[6%] top-[3%] sm:block md:right-[16%] md:top-[6%]" tint="var(--color-note-orange)" rotate={5} label="type-safe end-to-end" emoji="🛡️" />
      <HeroSticker className="right-[34%] top-[3%] lg:block" tint="var(--color-note-pink)" rotate={-4} label="ship it" emoji="🚀" />
      <HeroSticker className="hero-lighthouse-sticker bottom-[27%] right-[5%] xl:block" tint="var(--color-note-yellow)" rotate={4} label="lighthouse 100" emoji="💯" />
      <HeroSticker className="bottom-[9%] right-[24%] lg:block" tint="var(--color-note-green)" rotate={-4} label="react 19 + next 16" emoji="🔥" />
      <HeroSticker className="hero-coffee-sticker bottom-[14%] left-[22%] lg:block" tint="var(--color-note-pink)" rotate={-5} label="coffee → code" emoji="☕" />
      <HeroSticker className="hero-pixel-sticker bottom-[18%] right-[31%] xl:block" tint="var(--color-note-blue)" rotate={3} label="pixel-perfect UI" emoji="🎨" />

      {/* ---------- photo + intro ---------- */}
      <div className="mx-auto flex w-full flex-col items-center gap-7 sm:gap-12 md:flex-row md:justify-center md:gap-16 text-center md:text-left">
        <Reveal rotate={-3} className="relative">
          <CatPeekDoodle className="absolute -top-7 sm:-top-8 left-1/2 block h-8 w-20 sm:h-9 sm:w-24 -translate-x-1/2" />
          <PolaroidFrame
            src={profile.photo}
            alt={`Photo of ${profile.name}`}
            caption={profile.photoCaption}
            rotate={0}
            hoverTilt
            className="!w-[215px] sm:!w-[250px]"
          />
          <span className="font-hand text-xl text-accent-deep absolute -bottom-9 right-0 hidden -rotate-3 md:block">↑ that&apos;s me</span>
        </Reveal>

        <div className="flex flex-col items-center md:items-start">
          <Reveal delay={0.1}>
            <p className="mb-2 sm:mb-3 font-hand text-lg sm:text-xl text-ink-soft">✂️ pasted fresh into the scrapbook —</p>
            <div className="relative inline-block">
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-ink">{profile.name}</h1>
              <ScribbleUnderline className="absolute -bottom-2 left-0 h-5 w-full" />
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <h2 className="mt-5 sm:mt-8 font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-ink">
              <span className="highlight">{profile.title}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mt-4 sm:mt-6 max-w-md font-hand text-xl sm:text-2xl leading-snug text-ink/85">{profile.tagline}</p>
            <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2 font-hand text-base sm:text-lg text-ink-soft md:justify-start">
              <span aria-hidden>📍</span>
              {profile.location}
            </div>
            <div className="relative mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:justify-start">
              <Link
                href="/projects"
                className="rounded-full bg-ink px-5 py-2 font-heading text-xs font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:rotate-[-1deg] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                see projects →
              </Link>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white/75 px-3 py-1 font-hand text-sm font-bold text-ink/75 shadow-[0_1px_3px_rgba(58,47,47,0.08)]">
                <span className="inline-block h-2 w-2 rounded-full bg-teal animate-pulse" />
                open for projects
              </span>
              {/* on short laptop screens this sticker moves under the buttons */}
              <span aria-hidden className="hero-pixel-sticker-compact select-none">
                <Sticker rotate={3} tint="var(--color-note-blue)">
                  <span className="font-hand text-lg font-bold text-ink/85">pixel-perfect UI</span>🎨
                </Sticker>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
