"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { ProjectDemo, ProjectImage } from "@/lib/projects";

const contentClass =
  "max-w-[calc(100%-1.5rem)] gap-0 overflow-hidden rounded-2xl border border-white/10 bg-ink p-0 ring-0 sm:max-w-6xl";

/** The <video> only mounts once the dialog opens, so nothing downloads until then. */
export function DemoDialog({
  demo,
  projectName,
  summary,
  children,
}: {
  demo: ProjectDemo;
  projectName: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={contentClass} data-lenis-prevent>
        <div className="flex items-start justify-between gap-6 border-b border-white/10 px-5 py-4 pr-14">
          <div>
            <DialogTitle className="font-display text-lg font-semibold tracking-tight">{projectName} demo</DialogTitle>
            <DialogDescription className="mt-1 max-w-3xl text-sm text-muted-foreground">{demo.title}</DialogDescription>
          </div>
        </div>
        <div className="bg-black">
          <video
            className="aspect-[16/10] max-h-[78svh] w-full bg-black object-contain"
            controls
            autoPlay
            playsInline
            preload="metadata"
            poster={demo.poster}
            aria-label={`${projectName} demo video`}
          >
            <source src={demo.src} type="video/mp4" />
            Your browser can&apos;t play this video. <a href={demo.src}>Download the {projectName} demo</a>.
          </video>
        </div>
        <p className="sr-only">{summary}</p>
      </DialogContent>
    </Dialog>
  );
}

export function GalleryDialog({
  images,
  index,
  onIndexChange,
  projectName,
}: {
  images: ProjectImage[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
  projectName: string;
}) {
  const open = index !== null;
  const current = open ? images[index] : null;
  const step = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + images.length) % images.length);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onIndexChange(null)}>
      <DialogContent className={contentClass} data-lenis-prevent>
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 pr-14">
          <DialogTitle className="font-display text-lg font-semibold tracking-tight">{projectName}</DialogTitle>
          <span className="font-mono text-xs text-muted-foreground">
            {(index ?? 0) + 1} / {images.length}
          </span>
        </div>
        {current ? (
          <div className="relative max-h-[78svh] overflow-y-auto bg-black">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="h-auto w-full"
            />
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-3">
          <DialogDescription className="text-sm text-muted-foreground">{current?.alt}</DialogDescription>
          {images.length > 1 ? (
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                className="grid size-9 place-items-center rounded-full border border-white/15 transition-colors hover:border-violet-400 hover:bg-violet-500/20"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="grid size-9 place-items-center rounded-full border border-white/15 transition-colors hover:border-violet-400 hover:bg-violet-500/20"
                aria-label="Next screenshot"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
