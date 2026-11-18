import type { Metadata } from "next";
import { Sparkle } from "@/components/doodles";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { CornerWeb, HangingSpider } from "@/components/SpiderWeb";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: `Projects — ${profile.name}`,
  description: "Full-stack web applications, developer tooling & interactive experiences — the full stack of notes.",
};

export default function ProjectsPage() {
  return (
    <div className="relative">
      {/* spider webs in the corners of the page */}
      <CornerWeb className="absolute left-0 top-0 h-24 w-24 sm:h-36 sm:w-36 lg:h-44 lg:w-44" />
      <CornerWeb className="absolute right-0 top-0 h-20 w-20 -scale-x-100 sm:h-32 sm:w-32 lg:h-40 lg:w-40" />
      <CornerWeb className="absolute bottom-0 right-0 hidden h-36 w-36 rotate-180 lg:block" />
      <CornerWeb className="absolute bottom-0 left-0 hidden h-28 w-28 -scale-y-100 xl:block" />
      <HangingSpider className="absolute left-[24%] top-0 hidden md:block" thread={110} />
      <HangingSpider className="absolute right-[18%] top-0 hidden xl:block" thread={56} />
      <span className="absolute left-[27%] top-[124px] hidden -rotate-6 font-hand text-lg text-ink-soft lg:block">
        resident bug hunter 🕷️
      </span>

      <main className="relative mx-auto max-w-6xl px-5 py-16">
        <Sparkle className="absolute left-[6%] top-10 h-8 w-8 rotate-6 opacity-70" />
        <Sparkle className="absolute right-[8%] top-24 h-6 w-6 -rotate-12 opacity-60" color="var(--color-teal)" />
        <SectionHeading kicker="everything glued in so far" title="Projects" underline="var(--color-teal)" />
        <p className="mx-auto -mt-8 mb-14 max-w-lg text-center font-hand text-xl text-ink-soft">
          Production web applications, developer tooling &amp; interactive platforms built with modern full-stack technologies.
        </p>
        <ProjectsGrid projects={projects} defaultCount={6} />
      </main>
    </div>
  );
}
