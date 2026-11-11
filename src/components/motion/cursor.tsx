"use client";

import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * A soft ring that trails the pointer on mouse devices and grows over anything marked
 * with data-cursor (its value becomes the label). The native cursor stays visible.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target ? target.dataset.cursor || "" : null);
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const active = label !== null;

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-normal"
      style={{ x: sx, y: sy }}
    >
      <m.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-violet-300/60 bg-violet-500/10 backdrop-blur-[2px]"
        animate={{
          width: active ? (label ? 84 : 52) : 28,
          height: active ? (label ? 84 : 52) : 28,
          opacity: visible ? 1 : 0,
          backgroundColor: label ? "rgba(124, 58, 237, 0.9)" : "rgba(139, 92, 246, 0.08)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <AnimatePresence>
          {label ? (
            <m.span
              key={label}
              className="font-mono text-[10px] font-medium tracking-[0.18em] text-white uppercase"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </m.span>
          ) : null}
        </AnimatePresence>
      </m.div>
    </m.div>
  );
}
