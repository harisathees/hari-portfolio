import { timeline, type TimelineAside } from "@/data/timeline";
import { Arrow, CatDoodle, ChipDoodle, MechBotDoodle, RobotDoodle, ScribbleUnderline, Sparkle } from "./doodles";
import { Reveal } from "./Reveal";
import { Sticker } from "./Sticker";
import { TimelineSpider } from "./TimelineSpider";
import { TornCard } from "./TornCard";

const DOODLE_CLASS = "text-ink-soft opacity-90 transition-transform duration-300 hover:scale-105 shrink-0";

function AsideDoodle({ doodle }: { doodle: TimelineAside["doodle"] }) {
  switch (doodle) {
    case "cat":
      return <CatDoodle className={`h-16 w-16 -rotate-3 ${DOODLE_CLASS}`} />;
    case "robot":
      return <RobotDoodle className={`h-16 w-16 rotate-6 ${DOODLE_CLASS}`} />;
    case "chip":
      return <ChipDoodle className={`h-16 w-16 -rotate-6 ${DOODLE_CLASS}`} />;
    default:
      return <MechBotDoodle className={`h-18 w-18 rotate-3 ${DOODLE_CLASS}`} />;
  }
}

/** Doodle + stickers beside each card (desktop only), on whichever side the card isn't. */
function Aside({ aside, side }: { aside: TimelineAside; side: "left" | "right" }) {
  const onRight = side === "right";
  const box = onRight
    ? "absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex sm:w-[calc(50%-2.25rem)] items-center gap-3 pl-6 select-none"
    : "absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex sm:w-[calc(50%-2.25rem)] items-center justify-end gap-3 pr-6 select-none";

  const labels = (
    <div className={`flex flex-col gap-1.5 ${onRight ? "" : "items-end"}`}>
      {aside.stickers.map((s, i) => (
        <Sticker key={s.text} rotate={(i % 2 === 0) === onRight ? 3 : -3} tint={s.tint}>
          <span className="font-hand text-base font-bold text-ink">{s.text}</span>
        </Sticker>
      ))}
      {aside.note && <span className={`font-hand text-sm text-ink-soft ${onRight ? "pl-1" : "pr-1"}`}>{aside.note}</span>}
    </div>
  );

  return (
    <div aria-hidden className={box}>
      {onRight ? (
        <>
          <AsideDoodle doodle={aside.doodle} />
          {labels}
        </>
      ) : (
        <>
          {labels}
          <AsideDoodle doodle={aside.doodle} />
          <Arrow className="h-6 w-8 rotate-[25deg] text-ink-soft opacity-55 shrink-0" />
        </>
      )}
    </div>
  );
}

export function Timeline() {
  return (
    <section className="relative mx-auto max-w-4xl px-4 py-12 sm:px-5 sm:py-16">
      <Sparkle className="absolute left-[6%] top-16 hidden sm:block h-6 w-6 -rotate-6 opacity-70" color="var(--color-teal)" />
      <div aria-hidden className="absolute right-[6%] top-16 hidden lg:flex items-center gap-2 select-none">
        <span className="font-hand text-base text-ink-soft -rotate-3">the journey begins ↓</span>
        <Arrow className="h-6 w-8 rotate-[75deg] text-ink-soft opacity-65" />
      </div>

      <div className="mb-14 text-center ">
        <p className="mb-1 font-hand text-xl text-ink-soft">the journey so far</p>
        <h2 className="relative inline-block font-heading text-3xl font-bold text-ink sm:text-4xl">
          Career Path
          <ScribbleUnderline className="absolute -bottom-4 left-0 h-5 w-full" color="var(--color-teal)" />
        </h2>
      </div>

      <div className="relative">
        <div aria-hidden className="sketch absolute bottom-2 left-3.5 top-2 border-l-2 border-dashed border-ink/25 sm:left-1/2" />
        <TimelineSpider />
        <ol className="space-y-10 sm:space-y-12">
          {timeline.map((entry, i) => {
            const cardOnLeft = i % 2 === 0;
            return (
              <li key={`${entry.period}-${entry.place}`} className="relative pl-8 sm:pl-0">
                <span
                  aria-hidden
                  className="absolute left-3.5 top-7 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-paper bg-ink-soft/55 shadow-sm sm:left-1/2"
                />
                <Aside aside={entry.aside} side={cardOnLeft ? "right" : "left"} />
                <div className={`sm:w-[calc(50%-2.25rem)] ${cardOnLeft ? "" : "sm:ml-auto"}`}>
                  <Reveal rotate={cardOnLeft ? -1.2 : 1.2}>
                    <TornCard tint="#fffdf6" contentClassName="p-4 sm:p-5">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Sticker rotate={cardOnLeft ? -2 : 2} className="font-hand text-sm font-bold text-teal-deep">
                          {entry.badge}
                        </Sticker>
                        <span className="font-hand text-sm sm:text-base text-ink-soft">{entry.period}</span>
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-ink">{entry.title}</h3>
                      <p className="font-hand text-lg text-ink-soft">{entry.place}</p>
                      <p className="mt-1.5 text-[15px] leading-snug text-ink/85">{entry.description}</p>
                      {entry.bullets && (
                        <ul className="mt-3 space-y-1.5">
                          {entry.bullets.map((b) => (
                            <li key={b} className="flex gap-2 text-sm leading-snug text-ink/80">
                              <span aria-hidden className="mt-0.5 text-accent-deep">
                                ✦
                              </span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </TornCard>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="relative mt-10 sm:mt-12 flex items-center justify-start pl-8 sm:justify-center sm:pl-0">
          <div className="flex items-center gap-2 select-none">
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-accent" />
            </span>
            <Sticker rotate={-1} tint="var(--color-paper)">
              <span className="font-hand text-sm sm:text-base font-bold text-ink whitespace-nowrap">more chapters in progress... ⏳✨</span>
            </Sticker>
          </div>
        </div>
      </div>
    </section>
  );
}
