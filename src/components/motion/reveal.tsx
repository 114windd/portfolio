"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";

const spring = { type: "spring", stiffness: 110, damping: 16, mass: 0.9 } as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 34,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ ...spring, delay }}
    >
      {children}
    </m.div>
  );
}

/** Splits text into words that bounce up one after another. */
export function RevealText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.07,
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
          <span key={`${word}-${i}`}>
            <m.span
              className={cn("inline-block origin-bottom will-change-transform", wordClassName)}
              variants={{
                hidden: { opacity: 0, y: "0.5em", rotate: i % 2 ? 6 : -6, scale: 0.85 },
                shown: { opacity: 1, y: "0em", rotate: 0, scale: 1, transition: { type: "spring", stiffness: 220, damping: 14 } },
              }}
            >
              {word}
            </m.span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
