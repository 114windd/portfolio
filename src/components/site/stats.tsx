"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal, RevealText } from "@/components/motion/reveal";
import type { Stat } from "@/content/profile";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = usePrefersReducedMotion();
  const decimals = stat.decimals ?? 0;
  const [animated, setAnimated] = useState(0);
  const value = reduce ? stat.value : animated;

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, stat.value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setAnimated,
    });
    return () => controls.stop();
  }, [inView, reduce, stat.value]);

  const final = `${stat.prefix ?? ""}${stat.value.toFixed(decimals)}${stat.suffix}`;
  return (
    <>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden className="tabular-nums">
        {stat.prefix}
        {value.toFixed(decimals)}
        {stat.suffix}
      </span>
    </>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <Reveal delay={(index % 3) * 0.08}>
      <div
        onPointerMove={onPointerMove}
        className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-ink-2/80 p-6 transition-colors duration-500 hover:border-violet-400/40 sm:p-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(360px circle at var(--x) var(--y), rgb(139 92 246 / 0.18), transparent 60%)" }}
        />
        <p className="relative font-display text-[clamp(3rem,6vw,5.5rem)] leading-none font-extrabold tracking-[-0.05em]">
          <span className="text-gradient">
            <Counter stat={stat} />
          </span>
        </p>
        <p className="relative mt-4 text-base font-medium text-white sm:text-lg">{stat.label}</p>
        <p className="relative mt-1 text-sm leading-relaxed text-muted-foreground">{stat.context}</p>
      </div>
    </Reveal>
  );
}

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section aria-labelledby="numbers-title" className="relative mx-auto max-w-[90rem] px-5 pb-28 sm:px-8 sm:pb-40">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
        <RevealText
          as="h2"
          id="numbers-title"
          text="Growth, in numbers."
          className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-bold tracking-[-0.045em]"
        />
        <p className="max-w-sm text-sm text-muted-foreground">
          Results from short-form growth campaigns and production engineering work.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}
