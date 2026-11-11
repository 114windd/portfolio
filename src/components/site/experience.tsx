"use client";

import { m, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Reveal, RevealText } from "@/components/motion/reveal";
import type { Role } from "@/content/experience";

function RoleCard({ role, index }: { role: Role; index: number }) {
  return (
    <Reveal delay={0.05 * index}>
      <article className="group relative rounded-3xl border border-white/10 bg-ink-2/70 p-5 transition-[border-color,background-color] duration-500 hover:border-violet-400/40 hover:bg-[#120c1c] sm:p-7">
        <span
          aria-hidden
          className="absolute top-9 -left-[calc(1.5rem+5px)] hidden size-2.5 rounded-full border-2 border-ink bg-violet-400 shadow-[0_0_0_4px_rgb(139_92_246/0.2)] transition-transform duration-500 group-hover:scale-150 md:block"
        />
        <header className="flex flex-wrap items-start gap-4">
          <Image
            src={role.logo.src}
            alt={role.logo.alt}
            width={56}
            height={56}
            className="size-12 shrink-0 rounded-2xl border border-white/10 object-cover transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-6 group-hover:scale-110 sm:size-14"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{role.company}</h3>
            <p className="mt-0.5 text-sm font-medium text-violet-200 sm:text-base">{role.role}</p>
            {role.subtitle ? <p className="mt-1 text-sm text-muted-foreground">{role.subtitle}</p> : null}
          </div>
          <p className="w-full font-mono text-xs text-subtle sm:w-auto sm:pt-2">{role.period}</p>
        </header>
        <ul className="mt-5 space-y-3">
          {role.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-pretty text-white/75 sm:text-[15px]">
              <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-violet-400" />
              {bullet}
            </li>
          ))}
        </ul>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools">
          {role.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] text-white/70">
              {tag}
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
    <section id="experience" aria-labelledby="experience-title" className="relative mx-auto max-w-[90rem] px-5 py-28 sm:px-8 sm:py-40">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="mb-6 font-mono text-[11px] tracking-[0.22em] text-violet-300 uppercase">(Experience)</p>
            <RevealText
              as="h2"
              id="experience-title"
              text="Where I've built."
              className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.92] font-extrabold tracking-[-0.05em]"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                Production engineering in crypto, and the short-form growth work that taught me what makes people share.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div ref={ref} className="relative md:pl-6">
            <div aria-hidden className="absolute top-0 bottom-0 left-0 hidden w-px bg-white/10 md:block">
              <m.div className="h-full w-full origin-top bg-gradient-to-b from-violet-300 via-violet-500 to-violet-800" style={{ scaleY: fill }} />
            </div>
            <div className="space-y-5">
              {roles.map((role, i) => (
                <RoleCard key={role.company} role={role} index={i} />
              ))}
            </div>
          </div>

          <Reveal className="mt-14">
            <h3 className="mb-5 font-mono text-[11px] tracking-[0.22em] text-subtle uppercase">Earlier growth work</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {earlier.map((item) => (
                <article
                  key={item.role}
                  className="rounded-2xl border border-white/10 p-5 transition-colors duration-500 hover:border-violet-400/40"
                >
                  <p className="font-mono text-[11px] text-subtle">{item.period}</p>
                  <h4 className="mt-2 font-display text-lg font-semibold tracking-tight">
                    {item.role} <span className="text-white/50">· {item.org}</span>
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
