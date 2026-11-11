"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";

export function RotatingWords({ words, interval = 2600 }: { words: readonly string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-grid overflow-hidden pb-[0.08em] align-bottom">
      <span className="sr-only">{words.join(", ")}</span>
      {/* Every phrase sits invisibly in the same cell, so the box is as big as the longest one. */}
      {words.map((word) => (
        <span key={word} aria-hidden className="invisible col-start-1 row-start-1 sm:whitespace-nowrap">
          {word}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={words[index]}
          aria-hidden
          className="col-start-1 row-start-1 sm:whitespace-nowrap"
          initial={{ y: "90%", opacity: 0, rotate: -4 }}
          animate={{ y: "0%", opacity: 1, rotate: 0 }}
          exit={{ y: "-80%", opacity: 0, rotate: 3 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          {words[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
