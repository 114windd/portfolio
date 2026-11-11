import { RevealText } from "@/components/motion/reveal";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "./project-card";

export function Work({ projects }: { projects: Project[] }) {
  return (
    <section id="work" aria-labelledby="work-title" className="relative mx-auto max-w-6xl px-4 pt-28 sm:px-8 sm:pt-36">
      <div className="mb-12 px-1 sm:mb-16">
        <p className="font-hand text-3xl text-lavender">things I&apos;ve made</p>
        <RevealText
          as="h2"
          id="work-title"
          text="Selected work"
          className="mt-1 font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.98] font-semibold"
        />
      </div>

      <div className="flex flex-col gap-10 sm:gap-14">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
