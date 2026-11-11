"use client";

import { m, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { MoonMark } from "@/components/icons";
import { Reveal, RevealText } from "@/components/motion/reveal";
import type { Role } from "@/content/experience";
import { cn } from "@/lib/utils";

function StarMarker() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        d="M12 3.2l2.5 5.3 5.8.7-4.3 4 1.1 5.7L12 16.1l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7Z"
        fill="#fbf3dc"
        stroke="#fbf3dc"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const dots = "bg-[radial-gradient(circle,currentColor_1.6px,transparent_2.2px)] bg-[length:6px_12px] bg-repeat-y";

function RoleCard({ role, index }: { role: Role; index: number }) {
  return (
    <Reveal delay={0.05 * index}>
      <article className="springy group relative rounded-[2rem] bg-story p-6 ring-1 ring-cream/10 hover:-translate-y-1.5 hover:-rotate-[0.4deg] hover:bg-story-2 sm:p-8">
        <span aria-hidden className="absolute top-9 -left-[37px] hidden -translate-x-1/2 md:block">
          <span className="springy block group-hover:scale-125 group-hover:rotate-[24deg]">
            <StarMarker />
          </span>
        </span>
        <header className="flex flex-wrap items-start gap-4">
          <Image
            src={role.logo.src}
            alt={role.logo.alt}
            width={56}
            height={56}
            className="wiggle-on-hover size-12 shrink-0 rounded-2xl object-cover ring-1 ring-cream/10 sm:size-14"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">{role.company}</h3>
            <p className="mt-0.5 font-bold text-lavender sm:text-lg">{role.role}</p>
            {role.subtitle ? <p className="mt-1 text-sm text-mist">{role.subtitle}</p> : null}
          </div>
          <p className="w-full text-sm font-semibold text-subtle sm:w-auto sm:pt-2">{role.period}</p>
        </header>
        <ul className="mt-5 space-y-3">
          {role.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-pretty text-cream/80">
              <span aria-hidden className="mt-[0.62em] size-1.5 shrink-0 rounded-full bg-lavender" />
              {bullet}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export function Experience({
  roles,
  earlier,
}: {
  roles: Role[];
  earlier: { role: string; org: string; period: string; summary: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="font-hand text-3xl text-lavender">the story so far</p>
            <RevealText
              as="h2"
              id="experience-title"
              text="Where I've built"
              className="mt-1 font-display text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[0.98] font-semibold"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-sm leading-relaxed text-mist">
                Production engineering in crypto, and the short-form growth work that taught me what makes people share.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div ref={ref} className="relative md:pl-10">
            <div aria-hidden className="absolute top-4 bottom-4 left-0 hidden w-1.5 md:block">
              <div className={cn("absolute inset-0 text-cream/15", dots)} />
              <m.div className={cn("absolute inset-0 origin-top text-lavender", dots)} style={{ scaleY: fill }} />
            </div>
            <div className="space-y-6">
              {roles.map((role, i) => (
                <RoleCard key={role.company} role={role} index={i} />
              ))}
            </div>
          </div>

          <Reveal className="mt-16">
            <h3 className="mb-6 font-hand text-3xl text-lavender">Earlier growth work</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {earlier.map((item, i) => (
                <article
                  key={item.role}
                  className={cn(
                    "springy relative rounded-[1.6rem] bg-story-2 p-2 ring-1 ring-cream/10 hover:-translate-y-1.5 hover:rotate-0",
                    i % 2 ? "rotate-[1.2deg]" : "-rotate-[1.2deg]",
                  )}
                >
                  <div className="h-full rounded-[1.2rem] border-2 border-dashed border-cream/15 p-5 pr-16">
                    <p className="text-sm font-semibold text-subtle">{item.period}</p>
                    <h4 className="mt-2 font-display text-xl font-semibold">
                      {item.role} <span className="text-mist/80">· {item.org}</span>
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-mist">{item.summary}</p>
                  </div>
                  <span
                    aria-hidden
                    className="absolute top-5 right-5 grid size-10 rotate-6 place-items-center rounded-lg border-2 border-dashed border-lantern/40"
                  >
                    <MoonMark className="size-5" />
                  </span>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
