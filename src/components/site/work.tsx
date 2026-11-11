"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";
import { RevealText } from "@/components/motion/reveal";
import { Reveal } from "@/components/motion/reveal";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "./project-card";

export function Work({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] });

  return (
    <section id="work" aria-labelledby="work-title" className="relative mx-auto max-w-[90rem] px-3 pt-28 sm:px-6 sm:pt-36">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6 px-2 sm:mb-16">
        <h2 id="work-title" className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.88] font-extrabold tracking-[-0.055em]">
          <RevealText text="Selected" />
          <span className="flex items-start gap-3">
            <RevealText text="work" wordClassName="font-serif font-normal tracking-[-0.02em] text-violet-300 italic" delay={0.1} />
            <sup className="mt-[0.4em] font-mono text-sm font-normal tracking-normal text-subtle sm:text-base">
              ({String(projects.length).padStart(2, "0")})
            </sup>
          </span>
        </h2>
        <Reveal className="max-w-sm pb-2">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Two GTM tools, an AI search visibility checker, a community app I&apos;m building now and an internal market
            intelligence system at BNB Chain. Every card has the live product, code or demo where I can share it.
          </p>
        </Reveal>
      </div>

      <div ref={listRef} className="relative flex flex-col gap-6 stack:gap-0">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
