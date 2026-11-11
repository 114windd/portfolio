"use client";

import {
  m,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function Row({ items, speed, outlined }: { items: readonly string[]; speed: number; outlined?: boolean }) {
  const reduce = usePrefersReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    const move = direction.current * speed * (delta / 1000) * (1 + Math.abs(b));
    base.set(base.get() + move);
  });

  const content = [...items, ...items];
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <m.div className="flex shrink-0 items-center gap-8 pr-8 will-change-transform" style={{ x }}>
        {content.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8">
            <span
              className={cn(
                "font-display text-5xl font-bold tracking-tight sm:text-7xl",
                outlined && i % 2 === 0 ? "text-outline" : "text-white",
              )}
            >
              {item}
            </span>
            <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-violet-400 sm:size-8" aria-hidden>
              <path fill="currentColor" d="M12 0c.6 6.5 5.5 11.4 12 12-6.5.6-11.4 5.5-12 12-.6-6.5-5.5-11.4-12-12C6.5 11.4 11.4 6.5 12 0Z" />
            </svg>
          </span>
        ))}
      </m.div>
    </div>
  );
}

export function Marquee({ items }: { items: readonly string[] }) {
  const half = Math.ceil(items.length / 2);
  return (
    <section aria-label="Toolkit highlights" className="relative -rotate-2 border-y border-white/10 bg-violet-950/30 py-6 sm:py-8">
      <div className="flex flex-col gap-4 sm:gap-6">
        <Row items={items.slice(0, half)} speed={-2.2} outlined />
        <Row items={items.slice(half)} speed={2.2} />
      </div>
    </section>
  );
}
