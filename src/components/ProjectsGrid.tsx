"use client";

import Link from "next/link";
import { useState } from "react";
import { NOTE_TINT, type Project } from "@/data/projects";
import { Reveal } from "./Reveal";
import { TornCard } from "./TornCard";
import { WashiTape, type TapeColor } from "./WashiTape";

const ROTATIONS = [-1.8, 1.4, -1.1, 2.2, -1.5, 1];
const TAPES: TapeColor[] = ["amber", "teal", "kraft"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={(index % 3) * 0.08} rotate={ROTATIONS[index % ROTATIONS.length]} className="h-full">
      <div className="h-full transition-transform duration-300 hover:-translate-y-1.5">
        <TornCard tint={NOTE_TINT[project.color]} className="h-full" contentClassName="flex h-full flex-col p-6">
          <WashiTape color={TAPES[index % TAPES.length]} className="-top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2" />

          <div className="mb-2 flex items-start justify-between gap-2">
            <div className="min-w-0 pr-1">
              <h3 className="font-heading text-xl font-bold leading-snug text-ink">
                <Link
                  href={`/projects/${project.slug}`}
                  className="transition-colors hover:text-accent-deep hover:underline hover:decoration-accent-deep decoration-2 underline-offset-2"
                >
                  {project.name}
                </Link>
              </h3>
              {project.subtitle && <p className="mt-0.5 font-hand text-sm font-bold text-accent-deep">{project.subtitle}</p>}
            </div>
            <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`GitHub repo for ${project.name}`}
                  className="rounded-full border border-ink/25 bg-white/60 px-2.5 py-1 font-hand text-sm font-bold text-ink/70 transition-colors hover:border-ink hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  GitHub ↗
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Live site for ${project.name}`}
                  className="rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 font-hand text-sm font-bold text-accent-deep transition-colors hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Live ↗
                </a>
              )}
            </div>
          </div>

          <p className="font-hand text-sm font-bold text-ink-soft/75">{project.date}</p>
          <p className="mt-3 text-[15px] leading-snug text-ink/85">{project.blurb}</p>

          <div className="mt-auto flex items-center justify-between gap-2 pt-5">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-ink/20 bg-white/50 px-2.5 py-0.5 text-xs font-semibold text-ink/80">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="shrink-0 font-hand text-sm font-bold text-ink-soft hover:text-accent-deep hover:underline"
            >
              details →
            </Link>
          </div>
        </TornCard>
      </div>
    </Reveal>
  );
}

/** Grid of project notes; shows `defaultCount` and unfolds the rest. */
export function ProjectsGrid({ projects, defaultCount = 6 }: { projects: Project[]; defaultCount?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? projects : projects.slice(0, defaultCount);
  const hasMore = projects.length > defaultCount;

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-14 flex flex-col items-center justify-center text-center">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="group inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white/80 px-7 py-3 font-heading text-sm font-semibold text-ink shadow-[0_3px_10px_rgba(58,47,47,0.12)] transition-all hover:-translate-y-0.5 hover:rotate-[-1deg] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-expanded={expanded}
          >
            <span>{expanded ? `Show default ${defaultCount} projects ↑` : `View all projects (${projects.length} notes) ↓`}</span>
            <span className="font-hand text-base text-accent-deep transition-transform group-hover:scale-110">
              {expanded ? "✦ fold" : "✦ unfold"}
            </span>
          </button>
          <p className="mt-2.5 font-hand text-base text-ink-soft">
            {expanded ? "All project notes pinned to the board ✨" : `Showing ${defaultCount} of ${projects.length} projects`}
          </p>
        </div>
      )}
    </div>
  );
}
