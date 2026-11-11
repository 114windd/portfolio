"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal, RevealText } from "@/components/motion/reveal";
import type { Stat } from "@/content/profile";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

const blobs = [
  "58% 42% 55% 45% / 52% 48% 52% 48%",
  "45% 55% 48% 52% / 56% 44% 56% 44%",
  "52% 48% 40% 60% / 45% 55% 45% 55%",
  "60% 40% 52% 48% / 50% 50% 50% 50%",
  "47% 53% 58% 42% / 54% 46% 54% 46%",
  "55% 45% 45% 55% / 48% 52% 48% 52%",
];
const fills = ["#5b47b5", "#241d5c", "#2d2268", "#1f2a5e", "#33256c", "#262062"];

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

function Bubble({ stat, index }: { stat: Stat; index: number }) {
  const accent = index === 0;
  return (
    <div className="bob" style={{ "--t": `${6 + (index % 3)}s`, "--d": `-${index * 0.9}s`, "--bob": "-10px" } as Vars}>
      <div
        className="springy grid size-60 place-items-center p-8 text-center ring-1 ring-cream/10 hover:scale-105 hover:-rotate-3 sm:size-[16.5rem]"
        style={{
          borderRadius: blobs[index % blobs.length],
          background: `radial-gradient(circle at 32% 26%, rgb(255 255 255 / 0.1), transparent 46%), ${fills[index % fills.length]}`,
        }}
      >
        <div>
          <p className="font-display text-[3.1rem] leading-none font-semibold text-cream sm:text-[3.4rem]">
            <Counter stat={stat} />
          </p>
          <p className="mt-2 font-bold text-cream">{stat.label}</p>
          <p className={cn("mt-1 text-[13px] leading-snug", accent ? "text-cream/90" : "text-mist")}>{stat.context}</p>
        </div>
      </div>
    </div>
  );
}

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section aria-labelledby="numbers-title" className="relative mx-auto max-w-6xl px-5 pb-28 sm:px-8 sm:pb-36">
      <div className="mb-12 text-center sm:mb-16">
        <RevealText
          as="h2"
          id="numbers-title"
          text="Growth in numbers"
          className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] font-semibold"
        />
        <p className="mx-auto mt-4 max-w-md text-mist">
          Results from short-form growth campaigns and production engineering work.
        </p>
      </div>
      <ul className="mx-auto grid max-w-5xl sm:flex sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-6">
        {stats.map((stat, i) => (
          <li
            key={stat.label}
            className={cn(
              "flex max-sm:w-full",
              i % 2 ? "max-sm:justify-end" : "max-sm:justify-start",
              i > 0 && "max-sm:-mt-12",
              i % 3 === 1 && "sm:translate-y-10",
            )}
          >
            <Reveal delay={(i % 3) * 0.08}>
              <Bubble stat={stat} index={i} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
