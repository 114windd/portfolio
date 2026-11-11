"use client";

import { ArrowDown } from "lucide-react";
import { m, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { HeroScene } from "@/components/scene/hero-scene";
import { profile } from "@/content/profile";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { RotatingWords } from "./rotating-words";
import { SocialLinks } from "./social-links";

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

function Letters({ word, offset = 0 }: { word: string; offset?: number }) {
  return word.split("").map((char, i) => (
    <span key={i} className="hero-letter" style={{ "--i": i + offset, "--tilt": `${i % 2 ? 7 : -7}deg` } as Vars}>
      {char}
    </span>
  ));
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-svh flex-col overflow-hidden"
      style={{ "--scene-h": "clamp(260px, 46svh, 460px)" } as Vars}
    >
      <HeroScene progress={scrollYProgress} />

      <m.div
        className="relative mx-auto w-full max-w-6xl px-5 pt-28 sm:px-8 sm:pt-36"
        style={reduce ? undefined : { y: lift, opacity: fade }}
      >
        <p
          className="hero-fade inline-flex items-center gap-2.5 rounded-[1.1rem] bg-story px-4 py-1.5 text-sm font-semibold text-cream/90 ring-1 ring-cream/10 sm:rounded-full"
          style={{ "--d": "100ms" } as Vars}
        >
          <span aria-hidden className="flicker size-2 shrink-0 rounded-full bg-lantern shadow-[0_0_10px_2px_rgb(255_199_115/0.55)]" />
          {profile.availability}
        </p>

        <p className="hero-fade mt-7 font-hand text-3xl text-lavender sm:text-4xl" style={{ "--d": "250ms" } as Vars}>
          hello there, I&apos;m
        </p>
        <h1 className="mt-1 font-display text-[clamp(3.4rem,11vw,8.6rem)] leading-[0.95] font-semibold tracking-[-0.02em] text-cream select-none">
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden className="flex items-center gap-x-[0.18em]">
            <span className="whitespace-nowrap">
              <Letters word={profile.firstName} />
            </span>
            <span className="hero-pop inline-block shrink-0" style={{ "--d": "750ms" } as Vars}>
              <span className="bob relative block size-[0.82em] rounded-full bg-story-2 p-[0.05em] ring-[0.04em] ring-cream/80" style={{ "--t": "5s", "--bob": "-0.06em", "--bob-tilt": "4deg" } as Vars}>
                <span className="relative block size-full overflow-hidden rounded-full">
                  <Image
                    src={profile.photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 140px, 25vw"
                    className="object-cover [image-rendering:pixelated]"
                    preload
                  />
                </span>
              </span>
            </span>
          </span>
          <span aria-hidden className="block whitespace-nowrap">
            <Letters word={profile.lastName} offset={profile.firstName.length} />
          </span>
        </h1>

        <p className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-pretty text-mist sm:text-xl" style={{ "--d": "950ms" } as Vars}>
          {profile.intro}
        </p>
        <p className="hero-fade mt-4 text-xl font-bold text-cream sm:text-2xl" style={{ "--d": "1050ms" } as Vars}>
          I build{" "}
          <span className="block font-hand text-[1.4em] leading-tight font-semibold text-lavender sm:inline">
            <RotatingWords words={profile.rotating} />
          </span>
        </p>

        <div className="hero-fade mt-8 flex flex-wrap items-center gap-3" style={{ "--d": "1200ms" } as Vars}>
          <a
            href="#work"
            className="springy group inline-flex h-13 items-center gap-3 rounded-full bg-cream pr-2 pl-6 text-base font-extrabold text-night hover:-translate-y-1 hover:-rotate-2 hover:bg-moon"
          >
            See my work
            <span className="springy grid size-9 place-items-center rounded-full bg-night text-cream group-hover:translate-y-0.5">
              <ArrowDown className="size-4" />
            </span>
          </a>
          <SocialLinks size="lg" />
        </div>
      </m.div>

      <div aria-hidden className="min-h-[calc(var(--scene-h)*0.62)] flex-1" />

      <div
        aria-hidden
        className="hero-fade pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center sm:flex"
        style={{ "--d": "1700ms" } as Vars}
      >
        <span className="bob flex flex-col items-center font-hand text-xl text-cream/70" style={{ "--t": "3s", "--bob": "6px" } as Vars}>
          come and see
          <ArrowDown className="size-4" />
        </span>
      </div>
    </section>
  );
}
