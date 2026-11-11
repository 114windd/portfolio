"use client";

import { ArrowUpRight, Lock, Play } from "lucide-react";
import { m } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Moon, Stars } from "@/components/scene/sky";
import { isHttpsUrl, projectActions, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { DemoDialog, GalleryDialog } from "./media-dialogs";

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

const thumbTilts = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1"];

function ProjectGlyph({ project }: { project: Project }) {
  if (project.icon) {
    return (
      <Image
        src={project.icon.src}
        alt={project.icon.alt}
        width={44}
        height={44}
        className="wiggle-on-hover size-11 rounded-full ring-2 ring-cream/15"
      />
    );
  }
  const initials = project.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <span
      aria-hidden
      className="wiggle-on-hover grid size-11 shrink-0 place-items-center rounded-full bg-lavender-deep font-display text-sm font-semibold text-cream"
    >
      {initials}
    </span>
  );
}

function frameLabel(project: Project) {
  if (isHttpsUrl(project.links.live)) return new URL(project.links.live).host;
  return project.frameLabel ?? "demo recording";
}

function Media({ project, flip }: { project: Project; flip: boolean }) {
  const [gallery, setGallery] = useState<number | null>(null);
  const { demo, screenshots } = project;
  const cover = demo?.poster ?? screenshots[0]?.src;

  if (!cover) {
    return (
      <div className="relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-[1.75rem] bg-night-2 p-6 ring-1 ring-cream/10">
        <Stars count={30} seed={7} className="inset-0" />
        <Moon className="top-6 right-6 size-12" />
        <p className="relative font-hand text-2xl text-lavender">demo coming soon</p>
        {project.keyFacts ? (
          <dl className="relative grid grid-cols-2 gap-4">
            {project.keyFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd className="font-display text-5xl font-semibold">{fact.value}</dd>
                <dd className="text-sm text-mist">{fact.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    );
  }

  const poster = (
    <span className="group/poster relative block overflow-hidden rounded-[1.3rem] text-left">
      <span className="relative block aspect-[16/9]">
        <Image
          src={cover}
          alt={demo ? `${project.name} demo video poster` : screenshots[0].alt}
          fill
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover object-top transition-transform duration-[1.2s] ease-[var(--soft)] group-hover/poster:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
      </span>
      {demo ? (
        <span className="absolute inset-0 grid place-items-center">
          <span className="bob" style={{ "--t": "4s", "--bob": "-6px" } as Vars}>
            <span className="springy grid size-18 place-items-center rounded-full bg-cream text-night shadow-[0_12px_30px_-10px_rgb(0_0_0/0.6)] group-hover/poster:-rotate-6 group-hover/poster:scale-115 sm:size-22">
              <Play className="ml-1 size-7 fill-current" />
            </span>
          </span>
          <span className="absolute right-3 bottom-3 rounded-full bg-night/85 px-3 py-1 text-xs font-bold text-cream sm:right-4 sm:bottom-4">
            Watch demo{demo.duration ? ` · ${demo.duration}` : ""}
          </span>
        </span>
      ) : null}
    </span>
  );

  return (
    <div className="flex h-full flex-col gap-5">
      <div
        className={cn(
          "relative rounded-[1.75rem] bg-story-2 p-2.5 ring-1 ring-cream/10 sm:p-3",
          flip ? "rotate-[0.6deg]" : "-rotate-[0.6deg]",
        )}
      >
        <span
          className={cn(
            "absolute -top-4 z-10 max-w-[80%] truncate rounded-full bg-cream px-3.5 py-0.5 font-hand text-lg leading-snug text-night shadow-[0_6px_14px_-8px_rgb(0_0_0/0.7)]",
            flip ? "right-6 rotate-3" : "left-6 -rotate-3",
          )}
        >
          {frameLabel(project)}
        </span>
        {demo ? (
          <DemoDialog demo={demo} projectName={project.name} summary={project.summary}>
            <button type="button" className="block w-full rounded-[1.3rem]" aria-label={`Play the ${project.name} demo`}>
              {poster}
            </button>
          </DemoDialog>
        ) : (
          <button
            type="button"
            className="block w-full rounded-[1.3rem]"
            aria-label={`View ${project.name} screenshots`}
            onClick={() => setGallery(0)}
          >
            {poster}
          </button>
        )}
      </div>

      {screenshots.length > 0 ? (
        <ul className="grid grid-cols-3 gap-3 px-1 sm:gap-4">
          {screenshots.map((shot, i) => (
            <li key={shot.src}>
              <button
                type="button"
                onClick={() => setGallery(i)}
                aria-label={`View screenshot: ${shot.alt}`}
                className={cn(
                  "springy block w-full rounded-[0.9rem] bg-cream p-1 pb-3 shadow-[0_12px_24px_-14px_rgb(0_0_0/0.8)] hover:-translate-y-1.5 hover:scale-105 hover:rotate-0 sm:p-1.5 sm:pb-4",
                  thumbTilts[i % thumbTilts.length],
                )}
              >
                <span className="relative block aspect-[16/9] overflow-hidden rounded-[0.55rem]">
                  <Image src={shot.src} alt="" fill sizes="(min-width: 1024px) 18vw, 33vw" className="object-cover object-top" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <GalleryDialog images={screenshots} index={gallery} onIndexChange={setGallery} projectName={project.name} />
    </div>
  );
}

function Actions({ project }: { project: Project }) {
  const actions = projectActions(project);
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {actions.map((action) => {
        if (action.kind === "demo") {
          return (
            <DemoDialog key="demo" demo={action.demo} projectName={project.name} summary={project.summary}>
              <button
                type="button"
                className="springy inline-flex h-11 items-center gap-2 rounded-full bg-lavender-deep px-5 text-[15px] font-bold text-cream hover:-translate-y-1 hover:rotate-2 hover:bg-[#7a64d8]"
              >
                <Play className="size-3.5 fill-current" />
                {action.label}
              </button>
            </DemoDialog>
          );
        }
        const primary = action.kind === "live";
        return (
          <a
            key={action.kind}
            href={action.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "springy group inline-flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-bold hover:-translate-y-1",
              primary
                ? "bg-cream text-night hover:-rotate-2 hover:bg-moon"
                : "text-cream ring-2 ring-cream/25 hover:rotate-1 hover:bg-cream/10 hover:ring-cream/45",
            )}
          >
            {action.label}
            <ArrowUpRight className="springy size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">(opens {project.name} in a new tab)</span>
          </a>
        );
      })}
      {project.codePrivate ? (
        <span className="inline-flex items-center gap-1.5 text-sm text-subtle">
          <Lock className="size-3.5" />
          {project.codePrivate}
        </span>
      ) : null}
    </div>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <m.article
      aria-labelledby={`${project.slug}-title`}
      className="relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(165deg,#221b52_0%,#191440_45%,#141034_100%)] p-4 ring-1 ring-cream/10 sm:p-6 lg:p-8"
      initial={{ opacity: 0, y: 60, rotate: flip ? 1.5 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      <Stars count={14} seed={50 + index} className={cn("top-0 h-24 w-1/3", flip ? "left-0" : "right-0")} />
      <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className={cn("flex flex-col lg:col-span-5", flip && "lg:order-2")}>
          <div className="flex items-center gap-3">
            <ProjectGlyph project={project} />
            <p className="text-[15px] font-bold text-lavender">{project.kicker}</p>
          </div>
          <h3 id={`${project.slug}-title`} className="mt-5 font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] font-semibold text-balance">
            {project.name}
          </h3>
          <p className="mt-3 text-lg leading-snug text-pretty text-cream/90">{project.tagline}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-pretty text-mist">{project.summary}</p>

          <ul className="mt-5 space-y-2.5">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-snug text-pretty text-mist">
                <span aria-hidden className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-lavender" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-4 lg:mt-auto lg:pt-6">
            <p className="text-sm leading-relaxed text-subtle">
              <span className="font-bold text-mist">Built with </span>
              {project.stack.join(" · ")}
            </p>
            <Actions project={project} />
          </div>
        </div>

        <div className="order-first lg:order-none lg:col-span-7">
          <Media project={project} flip={flip} />
        </div>
      </div>
    </m.article>
  );
}
