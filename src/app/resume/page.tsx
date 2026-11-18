import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PrintButton } from "@/components/PrintButton";
import { WashiTape } from "@/components/WashiTape";
import { profile, skillGroups } from "@/data/profile";
import { projects } from "@/data/projects";
import { certifications, education, experience } from "@/data/resume";

export const metadata: Metadata = {
  title: `Resume — ${profile.name}`,
  description: `${profile.name}'s resume — ${profile.title}.`,
};

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-4 sm:mt-5 ">
      <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-ink">{title}</h2>
      <div aria-hidden className="resume-accent mt-1 h-[2.5px] w-12 rounded-full bg-teal" />
      <div className="mt-2">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  const resumeProjects = projects.filter((p) => p.resume).slice(0, 4);
  const githubLabel = profile.socials.github.replace(/^https?:\/\//, "");

  return (
    <main className="relative mx-auto max-w-4xl px-3 py-8 sm:px-5 sm:py-14 print:m-0 print:max-w-full print:p-0 overflow-x-hidden">
      <div className="no-print mb-6 sm:mb-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
        <span className="font-hand text-xl text-ink-soft sm:text-2xl">the official page of the scrapbook ↓</span>
        <PrintButton />
      </div>

      <div className="resume-sheet relative mx-auto max-w-[820px] rotate-0 sm:rotate-[-0.3deg] rounded-sm sm:rounded-none bg-white px-4 py-7 sm:px-12 sm:py-10 shadow-[0_1px_2px_rgba(58,47,47,0.06),0_18px_40px_-14px_rgba(58,47,47,0.3)] print:m-0 print:max-w-full print:rotate-0 print:p-0 print:shadow-none">
        <div aria-hidden className="no-print print:hidden">
          <WashiTape color="amber" className="no-print print:hidden -top-3 left-1/2 h-6 w-28 sm:w-32 -translate-x-1/2 -rotate-1" />
        </div>

        <header className="border-b border-ink/10 pb-3 sm:pb-3.5">
          <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-ink">{profile.name}</h1>
          <p className="mt-0.5 font-hand text-xl sm:text-2xl font-bold text-accent-deep">{profile.title}</p>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-soft">
            <a href={`mailto:${profile.email}`} className="hover:text-ink hover:underline break-all">
              {profile.email}
            </a>
            <span className="text-ink/25">|</span>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink hover:underline">
              LinkedIn
            </a>
            <span className="text-ink/25">|</span>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink hover:underline truncate max-w-[200px] sm:max-w-none"
            >
              {githubLabel}
            </a>
          </p>
        </header>

        <ResumeSection title="Summary">
          <p className="text-[12.5px] sm:text-[13px] leading-relaxed text-ink/85">{profile.resumeSummary}</p>
        </ResumeSection>

        {experience.length > 0 && (
          <ResumeSection title="Experience">
            <div className="space-y-3 sm:space-y-3.5">
              {experience.map((job) => (
                <div key={`${job.role}-${job.company}`} className="print:break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <h3 className="text-[13px] sm:text-[13.5px] font-semibold text-ink">
                      {job.role} — <span className="font-normal text-ink-soft">{job.company}</span>
                    </h3>
                    <span className="font-hand text-sm text-ink-soft">{job.dates}</span>
                  </div>
                  <ul className="mt-1 space-y-1 sm:space-y-0.5">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-[12px] sm:text-[12.5px] leading-relaxed sm:leading-snug text-ink/85">
                        <span aria-hidden className="text-teal-deep shrink-0 mt-0.5">
                          –
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        <ResumeSection title="Technical Skills">
          <div className="space-y-1 sm:space-y-1">
            {skillGroups.map((g) => (
              <p key={g.label} className="text-[12px] sm:text-[12.5px] leading-snug text-ink/85">
                <span className="font-semibold text-ink">{g.label}:</span> {g.items.join(", ")}
              </p>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Projects">
          <div className="space-y-3 sm:space-y-3.5">
            {resumeProjects.map((p) => {
              const r = p.resume!;
              return (
                <div key={p.name} className="print:break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <h3 className="text-[13px] sm:text-[13.5px] font-semibold text-ink">
                      {p.name} — <span className="font-normal text-ink-soft">{r.subtitle}</span>
                    </h3>
                    <span className="font-hand text-sm text-ink-soft">{r.dates}</span>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 text-[11px] sm:text-[11.5px]">
                    <p className="font-mono text-ink/75 leading-tight">{r.stack}</p>
                    <div className="flex items-center gap-1.5 font-medium text-accent-deep shrink-0">
                      {p.link && (
                        <>
                          <a href={p.link} target="_blank" rel="noreferrer" className="hover:underline">
                            Live
                          </a>
                          <span className="text-ink/30">|</span>
                        </>
                      )}
                      <a href={p.repo} target="_blank" rel="noreferrer" className="hover:underline">
                        GitHub
                      </a>
                    </div>
                  </div>
                  <ul className="mt-1 space-y-1 sm:space-y-0.5">
                    {r.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-[12px] sm:text-[12.5px] leading-relaxed sm:leading-snug text-ink/85">
                        <span aria-hidden className="text-teal-deep shrink-0 mt-0.5">
                          –
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </ResumeSection>

        <ResumeSection title="Certifications">
          <ul className="space-y-1 sm:space-y-1">
            {certifications.map((c) => (
              <li key={c.name} className="text-[12px] sm:text-[12.5px] leading-relaxed sm:leading-snug text-ink/85">
                <span className="font-semibold text-ink">
                  • {c.issuer} — {c.name} ({c.year}){c.note ? ":" : ""}
                </span>
                {c.note && <> <span>{c.note}</span></>}
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection title="Education">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="text-[13px] sm:text-[13.5px] font-semibold text-ink">{education.degree}</h3>
              <span className="font-hand text-sm text-ink-soft">{education.dates}</span>
            </div>
            <p className="text-[12px] sm:text-[12.5px] text-ink-soft">{education.school}</p>
            {education.specialization && (
              <p className="text-[12px] sm:text-[12.5px] text-ink-soft">Specialization: {education.specialization}</p>
            )}
          </div>
        </ResumeSection>
      </div>
    </main>
  );
}
