"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { socialIcon } from "@/components/icons";
import { Magnetic } from "@/components/motion/magnetic";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(!open && y > 320 && y > previous + 2);
    if (y < previous - 2) setHidden(false);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <m.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-violet-700 via-violet-400 to-white"
        style={{ scaleX: progress }}
      />
      <m.header
        className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6"
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          aria-label="Main"
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-2 pl-4 transition-[background-color,border-color,box-shadow] duration-500",
            scrolled || open
              ? "border-white/10 bg-ink/70 shadow-[0_10px_40px_-12px_rgb(124_58_237/0.35)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <a href="#top" className="group flex items-center gap-2.5" aria-label="Korede Odubanjo, back to top">
            <span className="relative grid size-8 place-items-center rounded-full bg-white font-display text-[13px] font-extrabold text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
              KO
            </span>
            <span className="roll hidden font-display text-[15px] font-semibold tracking-tight sm:inline-flex">
              <span>Korede Odubanjo</span>
              <span aria-hidden className="text-violet-300">
                Korede Odubanjo
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group block rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <span className="roll">
                    <span>{link.label}</span>
                    <span aria-hidden>{link.label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:inline-flex">
              <a
                href="#contact"
                className="group relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-full bg-white px-5 text-sm font-medium text-ink transition-colors"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-violet-600 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0" />
                <span className="relative transition-colors duration-500 group-hover:text-white">Let&apos;s talk</span>
                <span className="relative size-1.5 rounded-full bg-violet-600 transition-colors duration-500 group-hover:bg-white" />
              </a>
            </Magnetic>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-4 rounded bg-white transition-all duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-4 rounded bg-white transition-all duration-300",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink/95 px-6 pt-28 pb-10 backdrop-blur-2xl md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <ul className="space-y-2">
              {links.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <m.a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 font-display text-5xl font-bold tracking-tight"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="font-mono text-xs text-violet-300">0{i + 1}</span>
                    {link.label}
                  </m.a>
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              {profile.socials.map((social) => {
                const Icon = socialIcon(social.label);
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm"
                  >
                    <Icon className="size-4" />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
