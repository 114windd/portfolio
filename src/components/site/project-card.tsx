"use client";

import { ArrowUpRight, Lock, Play } from "lucide-react";
import { m, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { isHttpsUrl, projectActions, statusLabel, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { DemoDialog, GalleryDialog } from "./media-dialogs";

export const STACK_QUERY = "(min-width: 64rem) and (min-height: 48rem)";

const statusStyles: Record<Project["status"], string> = {
  live: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  shipped: "border-violet-300/30 bg-violet-400/10 text-violet-100",
  building: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  internal: "border-white/15 bg-white/[0.06] text-white/80",
};

function StatusBadge({ status }: { status: Project["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.16em] uppercase",
        statusStyles[status],
      )}
    >
      <span className="relative flex size-1.5">
        {status === "building" || status === "live" ? (
          <span className="ping-soft absolute inline-flex size-full rounded-full bg-current" />
        ) : null}
        <span className="relative inline-flex size-1.5 rounded-full bg-current" />
      </span>
      {statusLabel[status]}
    </span>
  );
}

function ProjectGlyph({ project }: { project: Project }) {
  if (project.icon) {
    return (
      <Image
        src={project.icon.src}
        alt={project.icon.alt}
        width={40}
        height={40}
        className="size-10 rounded-xl border border-white/10"
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
      className="grid size-10 place-items-center rounded-xl border border-violet-300/20 bg-gradient-to-br from-violet-500/40 to-violet-900/40 font-display text-sm font-bold"
    >
      {initials}
    </span>
  );
}

function frameLabel(project: Project) {
  if (isHttpsUrl(project.links.live)) return new URL(project.links.live).host;
  return project.status === "internal" ? "internal dashboard" : "demo recording";
}

function Media({ project }: { project: Project }) {
  const [gallery, setGallery] = useState<number | null>(null);
  const { demo, screenshots } = project;
  const cover = demo?.poster ?? screenshots[0]?.src;

  if (!cover) {
    return (
      <div className="relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgb(124_58_237/0.35),transparent_60%)] p-6">
        <p className="font-mono text-[11px] tracking-[0.2em] text-violet-200/80 uppercase">Demo coming soon</p>
        {project.keyFacts ? (
          <dl className="grid grid-cols-2 gap-4">
            {project.keyFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd className="font-display text-5xl font-extrabold tracking-[-0.05em]">{fact.value}</dd>
                <dd className="text-sm text-muted-foreground">{fact.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    );
  }

  const poster = (
    <span className="group/poster relative block w-full overflow-hidden rounded-b-2xl text-left">
      <span className="relative block aspect-[16/9] overflow-hidden">
        <Image
          src={cover}
          alt={demo ? `${project.name} demo video poster` : screenshots[0].alt}
          fill
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/poster:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      </span>
      {demo ? (
        <span className="absolute inset-0 grid place-items-center">
          <Magnetic strength={0.5} as="span">
            <span className="relative grid size-20 place-items-center rounded-full bg-white text-ink shadow-[0_0_60px_-6px_rgb(139_92_246/0.9)] transition-transform duration-500 group-hover/poster:scale-110 sm:size-24">
              <span className="ping-soft absolute inset-0 rounded-full border border-white/60" />
              <Play className="ml-1 size-7 fill-current" />
            </span>
          </Magnetic>
          <span className="absolute right-4 bottom-4 rounded-full bg-ink/70 px-3 py-1 font-mono text-[11px] text-white/90 backdrop-blur">
            Watch demo{demo.duration ? ` · ${demo.duration}` : ""}
          </span>
        </span>
      ) : null}
    </span>
  );

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_30px_80px_-40px_rgb(124_58_237/0.6)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-3 truncate rounded-md bg-white/[0.06] px-2.5 py-0.5 font-mono text-[11px] text-white/60">
            {frameLabel(project)}
          </span>
        </div>
        {demo ? (
          <DemoDialog demo={demo} projectName={project.name} summary={project.summary}>
            <button type="button" className="block w-full" data-cursor="Play" aria-label={`Play the ${project.name} demo`}>
              {poster}
            </button>
          </DemoDialog>
        ) : (
          <button
            type="button"
            className="block w-full"
            data-cursor="View"
            aria-label={`View ${project.name} screenshots`}
            onClick={() => setGallery(0)}
          >
            {poster}
          </button>
        )}
      </div>

      {screenshots.length > 0 ? (
        <ul className="grid grid-cols-3 gap-3">
          {screenshots.map((shot, i) => (
            <li key={shot.src}>
              <button
                type="button"
                data-cursor="View"
                onClick={() => setGallery(i)}
                aria-label={`View screenshot: ${shot.alt}`}
                className="group/thumb relative block aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-violet-400/60"
              >
                <Image
                  src={shot.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 18vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover/thumb:scale-110"
                />
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
                className="group inline-flex h-10 items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/15 px-4 text-sm font-medium text-violet-100 transition-colors hover:bg-violet-500/30"
              >
                <Play className="size-3.5 fill-current" />
                <span className="roll">
                  <span>{action.label}</span>
                  <span aria-hidden>{action.label}</span>
                </span>
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
              "group inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors",
              primary
                ? "bg-white text-ink hover:bg-violet-200"
                : "border border-white/15 text-white hover:border-white/40 hover:bg-white/[0.06]",
            )}
          >
            <span className="roll">
              <span>{action.label}</span>
              <span aria-hidden>{action.label}</span>
            </span>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">(opens {project.name} in a new tab)</span>
          </a>
        );
      })}
      {project.codePrivate ? (
        <span className="inline-flex items-center gap-1.5 text-xs text-subtle">
          <Lock className="size-3.5" />
          {project.codePrivate}
        </span>
      ) : null}
    </div>
  );
}

export function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const stacking = useMediaQuery(STACK_QUERY);
  const reduce = usePrefersReducedMotion();
  const animate = stacking && !reduce;
  const depth = total - 1 - index;
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - depth * 0.04]);
  const shade = useTransform(progress, [start, 1], [0, depth * 0.14]);

  return (
    <div className="stack:sticky stack:top-0 stack:flex stack:h-svh stack:items-center">
      <m.article
        aria-labelledby={`${project.slug}-title`}
        className="relative w-full origin-top overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#130d1f] via-ink-2 to-ink stack:h-[min(46rem,calc(100svh-5.5rem))]"
        style={{
          scale: animate ? scale : 1,
          top: stacking ? `${index * 1.4}rem` : undefined,
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 size-96 rounded-full bg-violet-600/20 blur-3xl"
        />
        <div className="relative grid h-full gap-8 p-5 sm:p-7 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:col-span-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <ProjectGlyph project={project} />
                <span className="font-mono text-xs text-subtle">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
              <StatusBadge status={project.status} />
            </div>

            <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-violet-300 uppercase">{project.kicker}</p>
            <h3
              id={`${project.slug}-title`}
              className="mt-2 font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[0.98] font-bold tracking-[-0.04em] text-balance"
            >
              {project.name}
            </h3>
            <p className="mt-3 text-base leading-snug text-pretty text-white/80 xl:text-lg">{project.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground stack:hidden">{project.summary}</p>

            <ul className="mt-5 space-y-2.5">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-snug text-pretty text-muted-foreground">
                  <span aria-hidden className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-violet-400" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-4 lg:mt-auto lg:pt-6">
              <p className="font-mono text-[11px] leading-relaxed text-subtle">
                <span className="sr-only">Built with: </span>
                {project.stack.join("  ·  ")}
              </p>
              <Actions project={project} />
            </div>
          </div>

          <div className="order-first lg:order-none lg:col-span-7">
            <Media project={project} />
          </div>
        </div>
        {animate ? (
          <m.div aria-hidden className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />
        ) : null}
      </m.article>
    </div>
  );
}
