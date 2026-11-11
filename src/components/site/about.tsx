"use client";

import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { socialIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/content/profile";
import { externalLinkProps } from "@/lib/external-link";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const highlight = /\d/.test(children);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <m.span style={{ opacity }} className={highlight ? "text-violet-300" : undefined}>
        {children}
      </m.span>
    </span>
  );
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = profile.about.split(" ");

  return (
    <section id="about" className="relative mx-auto max-w-[90rem] px-5 py-28 sm:px-8 sm:py-40">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="group relative mx-auto max-w-xs lg:sticky lg:top-28 lg:mx-0">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-violet-600/25 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-2 p-3">
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem]">
                <Image
                  src={profile.photo.src}
                  alt={profile.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 320px, 80vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [image-rendering:pixelated] group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-2 pt-4 pb-1">
                <div>
                  <p className="font-display text-lg font-semibold tracking-tight">{profile.name}</p>
                  <p className="text-sm text-muted-foreground">{profile.role} · Growth</p>
                </div>
                <div className="flex gap-1.5">
                  {profile.socials.map((social) => {
                    const Icon = socialIcon(social.label);
                    return (
                      <a
                        key={social.href}
                        href={social.href}
                        {...externalLinkProps(social.href)}
                        aria-label={social.ariaLabel}
                        className="grid size-9 place-items-center rounded-full border border-white/10 transition-colors hover:border-violet-400 hover:bg-violet-500/20"
                      >
                        <Icon className="size-3.5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <p className="mb-8 font-mono text-[11px] tracking-[0.22em] text-violet-300 uppercase">(About)</p>
          <p
            ref={ref}
            className="font-display text-[clamp(1.75rem,3.6vw,3.4rem)] leading-[1.12] font-semibold tracking-[-0.03em] text-balance"
          >
            {reduce ? (
              profile.about
            ) : (
              <>
                <span className="sr-only">{profile.about}</span>
                <span aria-hidden>
                  {words.map((word, i) => (
                    <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                      {word}
                    </Word>
                  ))}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
