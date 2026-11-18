import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/doodles";
import { Sticker } from "@/components/Sticker";
import { TornCard } from "@/components/TornCard";
import { WashiTape } from "@/components/WashiTape";
import { profile } from "@/data/profile";
import { NOTE_TINT, getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: `${project.name} — ${project.subtitle} — ${profile.name}`, description: project.blurb };
}

const NAV_LINK =
  "group inline-flex items-center justify-between sm:justify-start gap-2 rounded-full border border-ink/20 bg-white/60 px-4 sm:px-5 py-2 sm:py-2.5 font-heading text-xs sm:text-sm font-semibold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white";

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = getProject(slug);
  if (!project) notFound();

  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <main className="relative mx-auto max-w-5xl px-3.5 sm:px-5 py-6 sm:py-12">
      <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white/70 px-3.5 sm:px-4 py-1.5 sm:py-2 font-heading text-xs sm:text-sm font-semibold text-ink shadow-[0_2px_6px_rgba(58,47,47,0.08)] transition-all hover:-translate-y-0.5 hover:-rotate-1 hover:border-ink hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Arrow className="h-3.5 w-3.5 sm:h-4 sm:w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
          <span>all projects</span>
        </Link>
        <div className="flex items-center gap-2">
          {project.featured && (
            <Sticker rotate={-2} tint="var(--color-note-yellow)">
              <span className="font-hand text-xs sm:text-sm font-bold text-accent-deep">✦ featured</span>
            </Sticker>
          )}
          <Sticker rotate={2} tint="var(--color-note-blue)">
            <span className="font-hand text-xs sm:text-sm font-bold text-teal-deep">{project.date}</span>
          </Sticker>
        </div>
      </div>

      <article className="relative">
        <TornCard tint={NOTE_TINT[project.color]} contentClassName="p-4 sm:p-10 lg:p-12">
          <WashiTape color="amber" className="-top-3 left-1/2 -translate-x-1/2 h-5 w-24 -rotate-1 sm:hidden" />
          <WashiTape color="amber" className="-top-3 left-12 hidden h-6 w-28 -rotate-2 sm:block" />
          <WashiTape color="teal" className="-top-3 right-14 hidden h-6 w-28 rotate-3 sm:block" />

          <div className="mb-6 sm:mb-8 flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">{project.name}</h1>
              <p className="mt-1.5 sm:mt-2 font-hand text-xl sm:text-3xl font-bold text-accent-deep">{project.subtitle}</p>
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg leading-relaxed text-ink/85">{project.blurb}</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2.5 sm:gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-accent px-4.5 sm:px-6 py-2 sm:py-2.5 font-heading text-xs sm:text-sm font-semibold text-white shadow-[0_3px_8px_rgba(201,114,42,0.3)] transition-transform hover:-translate-y-0.5 hover:rotate-1 hover:bg-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Live Site ↗
                </a>
              )}
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border-2 border-ink bg-white/80 px-4.5 sm:px-6 py-2 sm:py-2.5 font-heading text-xs sm:text-sm font-semibold text-ink shadow-[0_2px_6px_rgba(58,47,47,0.1)] transition-transform hover:-translate-y-0.5 hover:-rotate-1 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          <div className="relative my-6 sm:my-8 overflow-hidden rounded-xl border border-ink/20 bg-white p-2 sm:p-5 shadow-[0_10px_30px_-10px_rgba(58,47,47,0.22)] sm:shadow-[0_14px_40px_-12px_rgba(58,47,47,0.28)]">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-stone-100">
              <Image
                src={project.image}
                alt={`Interface screenshot of ${project.name}`}
                fill
                priority
                sizes="(max-width: 640px) 94vw, (max-width: 1024px) 100vw, 960px"
                className="object-cover"
              />
            </div>
            <p className="mt-2.5 sm:mt-3 text-center font-hand text-sm sm:text-lg font-bold text-ink-soft">
              📸 Interface preview · {project.name}
            </p>
          </div>

          <div className="mt-7 sm:mt-10 rounded-xl border border-ink/15 bg-white/65 p-4 sm:p-8 shadow-sm">
            <h2 className="font-heading text-lg sm:text-2xl font-bold text-ink">Key Engineering Highlights</h2>
            <ul className="mt-3.5 sm:mt-4 space-y-2.5 sm:space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 sm:gap-3 text-sm sm:text-base leading-relaxed text-ink/90">
                  <span aria-hidden className="mt-0.5 text-sm sm:text-base text-accent-deep shrink-0">
                    ✦
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-1.5 sm:gap-2 pt-3 sm:pt-4">
            <span className="mr-1.5 sm:mr-2 font-hand text-base sm:text-lg font-bold text-ink-soft">Tech Stack:</span>
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-ink/20 bg-white/80 px-2.5 sm:px-3.5 py-0.5 sm:py-1 font-mono text-[11px] sm:text-xs font-semibold text-ink shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </TornCard>
      </article>

      <nav className="mt-8 sm:mt-12 flex flex-col items-stretch sm:items-center justify-between gap-3 sm:gap-4 border-t border-ink/10 pt-6 sm:pt-8 sm:flex-row">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className={`${NAV_LINK} hover:-rotate-1`}>
            <div className="flex items-center gap-2">
              <Arrow className="h-3.5 w-3.5 sm:h-4 sm:w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
              <span>Previous:</span>
            </div>
            <span className="font-hand text-sm sm:text-base text-accent-deep font-bold">{prev.name}</span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
        {next ? (
          <Link href={`/projects/${next.slug}`} className={`${NAV_LINK} hover:rotate-1`}>
            <span>Next:</span>
            <div className="flex items-center gap-2">
              <span className="font-hand text-sm sm:text-base text-accent-deep font-bold">{next.name}</span>
              <Arrow className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </nav>
    </main>
  );
}
