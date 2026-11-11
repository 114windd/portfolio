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
    <span className="relative inline-grid overflow-hidden align-bottom">
      <span className="sr-only">{words.join(", ")}</span>
      {/* Every phrase sits invisibly in the same cell, so the box is as wide as the longest one. */}
      {words.map((word) => (
        <span key={word} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {word}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={words[index]}
          aria-hidden
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
