"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </m.div>
  );
}

/** Splits text into words that rise out of a mask one after another. */
export function RevealText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  as: Tag = "span",
  id,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h2" | "h3" | "p";
  id?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} id={id}>
      <span className="sr-only">{text}</span>
      <m.span
        aria-hidden
        className="inline"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <m.span
              className={cn("inline-block will-change-transform", wordClassName)}
              variants={{
                hidden: { y: "110%", rotate: 4 },
                shown: { y: "0%", rotate: 0, transition: { duration: 0.9, ease } },
              }}
            >
              {word}
            </m.span>
            {i < words.length - 1 ? "\u00a0" : null}
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
