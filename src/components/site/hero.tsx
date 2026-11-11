"use client";

import { m, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { socialIcon } from "@/components/icons";
import { Magnetic } from "@/components/motion/magnetic";
import { profile } from "@/content/profile";
import { externalLinkProps } from "@/lib/external-link";
import { cn } from "@/lib/utils";
import { RotatingWords } from "./rotating-words";

function Letters({ word, offset = 0, className }: { word: string; offset?: number; className?: string }) {
  return (
    <>
      {word.split("").map((char, i) => (
        <span key={i} className={cn("hero-letter", className)} style={{ "--i": i + offset } as React.CSSProperties}>
          {char}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lineA = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const lineB = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative isolate min-h-svh overflow-hidden"
      style={{ "--mx": "70%", "--my": "30%" } as React.CSSProperties}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_35%,black_20%,transparent_70%)]" />
        <div className="aurora-a absolute -top-[20%] -left-[10%] size-[60vmax] rounded-full bg-[radial-gradient(circle,rgb(124_58_237/0.5),transparent_68%)]" />
        <div className="aurora-b absolute top-[10%] -right-[15%] size-[55vmax] rounded-full bg-[radial-gradient(circle,rgb(168_85_247/0.36),transparent_66%)]" />
        <div className="aurora-c absolute -bottom-[30%] left-[20%] size-[50vmax] rounded-full bg-[radial-gradient(circle,rgb(76_29_149/0.55),transparent_66%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--mx)_var(--my),rgb(167_139_250/0.16),transparent_60%)]" />
        {/* Glow drawn with gradients rather than a blurred box-shadow, which is costly to raster at this size. */}
        <div className="hero-horizon absolute top-[78%] left-1/2 aspect-square w-[180vw] sm:w-[140vw]">
          <div className="absolute -inset-[10%] rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.55)_83%,transparent_97%)]" />
          <div className="absolute inset-0 rounded-full border-t border-violet-300/50 bg-ink bg-[radial-gradient(closest-side,transparent_88%,rgb(167_139_250/0.28))]" />
        </div>
      </div>

      <m.div
        className="relative mx-auto flex min-h-svh max-w-[90rem] flex-col justify-between px-5 pt-24 pb-8 sm:px-8 sm:pt-28 sm:pb-10"
        style={{ y: lift, opacity: fade }}
      >
        <div className="hero-fade flex flex-wrap items-center justify-between gap-3" style={{ "--d": "200ms" } as React.CSSProperties}>
          <p className="font-mono text-[11px] tracking-[0.22em] text-white/60 uppercase">
            {profile.role} <span className="text-violet-300">/</span> Growth
          </p>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/80 backdrop-blur">
            <span className="relative flex size-2">
              <span className="ping-soft absolute inline-flex size-full rounded-full bg-violet-400" />
              <span className="relative inline-flex size-2 rounded-full bg-violet-400" />
            </span>
            {profile.availability}
          </p>
        </div>

        <h1 className="my-10 font-display leading-[0.84] font-extrabold tracking-[-0.055em] select-none">
          <span className="sr-only">{profile.name}</span>
          <m.span aria-hidden className="flex items-center gap-[0.08em] text-[17.5vw] lg:text-[min(14.5vw,15rem)]" style={{ x: lineA }}>
            <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] whitespace-nowrap">
              <Letters word={profile.firstName} />
            </span>
            <span className="hero-pop inline-block shrink-0" style={{ "--d": "650ms" } as React.CSSProperties}>
              <m.span
                className="relative block h-[0.7em] w-[1.15em] overflow-hidden rounded-full border border-white/20 shadow-[0_0_60px_-10px_rgb(139_92_246/0.9)]"
                style={{ rotate: spin }}
              >
                <Image
                  src={profile.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 220px, 30vw"
                  className="object-cover"
                  preload
                />
              </m.span>
            </span>
          </m.span>
          <m.span
            aria-hidden
            className="block text-right text-[17.5vw] lg:text-[min(14.5vw,15rem)]"
            style={{ x: lineB }}
          >
            <span className="-mb-[0.14em] inline-block overflow-hidden pr-[0.04em] pb-[0.14em] whitespace-nowrap">
              <Letters word={profile.lastName} offset={profile.firstName.length} className="text-gradient" />
            </span>
          </m.span>
        </h1>

        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="hero-fade lg:col-span-5" style={{ "--d": "900ms" } as React.CSSProperties}>
            <p className="mb-3 font-mono text-[11px] tracking-[0.22em] text-violet-300 uppercase">(Intro)</p>
            <p className="max-w-md text-base leading-relaxed text-pretty text-white/75 sm:text-lg">{profile.intro}</p>
          </div>
          <div
            className="hero-fade flex flex-col gap-6 lg:col-span-7 lg:items-end"
            style={{ "--d": "1050ms" } as React.CSSProperties}
          >
            <p className="font-display text-2xl leading-tight font-semibold tracking-tight sm:text-3xl lg:text-right">
              <span className="text-white/60">I build</span>
              <span className="block font-serif text-[1.15em] font-normal tracking-normal text-violet-300 italic">
                <RotatingWords words={profile.rotating} />
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#work"
                  data-cursor="View"
                  className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full bg-white pr-2 pl-6 text-sm font-medium text-ink"
                >
                  <span className="absolute inset-0 translate-y-full rounded-full bg-violet-600 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0" />
                  <span className="relative transition-colors duration-500 group-hover:text-white">See my work</span>
                  <span className="relative grid size-8 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-90 group-hover:bg-white group-hover:text-ink">
                    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                      <path d="M8 2v12M3 9l5 5 5-5" />
                    </svg>
                  </span>
                </a>
              </Magnetic>
              {profile.socials.map((social) => {
                const Icon = socialIcon(social.label);
                return (
                  <Magnetic key={social.href}>
                    <a
                      href={social.href}
                      {...externalLinkProps(social.href)}
                      aria-label={social.ariaLabel}
                      className="grid size-12 place-items-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur transition-colors duration-300 hover:border-violet-400 hover:bg-violet-500/20"
                    >
                      <Icon className="size-4" />
                    </a>
                  </Magnetic>
                );
              })}
            </div>
          </div>
        </div>
      </m.div>

      <div
        aria-hidden
        className="hero-fade pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        style={{ "--d": "1400ms" } as React.CSSProperties}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="scroll-cue absolute inset-0 bg-violet-300" />
        </span>
      </div>
    </section>
  );
}
