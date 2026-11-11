"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { MoonMark, socialIcon } from "@/components/icons";
import { Moon, Stars } from "@/components/scene/sky";
import { navLinks } from "@/content/navigation";
import { profile } from "@/content/profile";
import { externalLinkProps } from "@/lib/external-link";
import { cn } from "@/lib/utils";

const spring = { type: "spring", stiffness: 260, damping: 24 } as const;

export function Nav() {
  const { scrollY } = useScroll();
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
      <m.header
        className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6"
        animate={{ y: hidden ? -100 : 0 }}
        transition={spring}
      >
        <nav
          aria-label="Main"
          className={cn(
            "mx-auto flex h-15 max-w-6xl items-center justify-between rounded-full px-2 pl-2.5 transition-[background-color,box-shadow] duration-500",
            scrolled || open ? "bg-story shadow-[0_16px_30px_-20px_rgb(0_0_0/0.8)] ring-1 ring-cream/10" : "bg-transparent",
          )}
        >
          <a href="#top" className="group flex items-center gap-2.5" aria-label="Korede Odubanjo, back to top">
            <span className="springy grid size-10 place-items-center rounded-full bg-night-2 ring-1 ring-cream/15 group-hover:-rotate-12 group-hover:scale-110">
              <MoonMark className="size-5" />
            </span>
            <span className="hidden font-display text-lg font-semibold sm:inline">{profile.firstName}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="springy inline-block rounded-full px-4 py-2 text-[15px] font-bold text-mist hover:-translate-y-0.5 hover:bg-cream/[0.07] hover:text-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="springy hidden h-11 items-center rounded-full bg-cream px-5 text-[15px] font-extrabold text-night hover:-translate-y-0.5 hover:-rotate-2 hover:bg-moon sm:inline-flex"
            >
              Let&apos;s talk
            </a>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full bg-story-2 ring-1 ring-cream/15 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 h-[2px] w-4 rounded-full bg-cream transition-all duration-300",
                    open ? "top-[5px] rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-[2px] w-4 rounded-full bg-cream transition-all duration-300",
                    open ? "top-[5px] -rotate-45" : "top-2.5",
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
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-night px-6 pt-28 pb-10 md:hidden"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={spring}
          >
            <Stars count={50} seed={31} className="inset-0" />
            <Moon className="top-24 right-8 size-14" />
            <svg aria-hidden viewBox="0 0 390 160" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-44 w-full">
              <path d="M0 78C80 48 160 44 240 64C300 78 350 68 390 58V160H0Z" fill="url(#hill-far)" />
              <path d="M0 118C90 98 180 102 260 114C320 122 360 114 390 108V160H0Z" fill="url(#hill-near)" />
            </svg>
            <ul className="relative space-y-1">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <m.a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="inline-block py-1 font-display text-5xl font-semibold text-cream"
                    initial={{ opacity: 0, y: 30, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ ...spring, delay: 0.08 + i * 0.06 }}
                  >
                    {link.label}
                  </m.a>
                </li>
              ))}
            </ul>
            <div className="relative flex flex-wrap gap-2.5">
              {profile.socials.map((social) => {
                const Icon = socialIcon(social.label);
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    {...externalLinkProps(social.href)}
                    className="inline-flex items-center gap-2 rounded-full bg-story px-4 py-2.5 text-sm font-bold ring-1 ring-cream/15"
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
