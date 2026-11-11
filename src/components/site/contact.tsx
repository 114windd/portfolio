import { ArrowUp, ArrowUpRight } from "lucide-react";
import { socialIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { ContactScene } from "@/components/scene/contact-scene";
import { Stars } from "@/components/scene/sky";
import { profile } from "@/content/profile";
import { externalLinkProps } from "@/lib/external-link";
import { cn } from "@/lib/utils";
import { SocialLinks } from "./social-links";

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

function Bounce({ text }: { text: string }) {
  return (
    <span className="letter-bounce" aria-hidden>
      {text.split("").map((char, i) => (
        <span key={i}>{char === " " ? "\u00a0" : char}</span>
      ))}
    </span>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden pt-28 sm:pt-36"
      style={{ "--scene-h": "clamp(240px, 30vw, 380px)" } as Vars}
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--night)_0%,#141036_40%,#251b57_78%,#3a2b73_100%)]" />
      <Stars count={70} seed={12} className="inset-x-0 top-[16%] bottom-[22%] -z-10" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="font-hand text-3xl text-lavender">say hello</p>
        <h2 id="contact-title" className="mt-1 font-display text-[clamp(3.6rem,12vw,9.5rem)] leading-[0.95] font-semibold">
          <span className="sr-only">Let&apos;s talk</span>
          <Bounce text="Let's talk" />
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-cream/85">{profile.contactNote}</p>
          </Reveal>
          <ul className="space-y-3 lg:col-span-7">
            {profile.socials.map((social, i) => {
              const Icon = socialIcon(social.label);
              return (
                <li key={social.href}>
                  <Reveal delay={i * 0.08} y={20}>
                    <a
                      href={social.href}
                      {...externalLinkProps(social.href)}
                      className={cn(
                        "springy group flex items-center justify-between gap-4 rounded-[1.75rem] bg-story px-4 py-4 ring-1 ring-cream/10 hover:-translate-y-1 hover:bg-story-2 sm:px-6 sm:py-5",
                        i % 2 ? "hover:rotate-[0.6deg]" : "hover:-rotate-[0.6deg]",
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-4">
                        <span className="springy grid size-12 shrink-0 place-items-center rounded-full bg-night-2 ring-1 ring-cream/15 group-hover:-rotate-12 group-hover:bg-lavender-deep sm:size-14">
                          <Icon className="size-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display text-2xl font-semibold sm:text-4xl">{social.label}</span>
                          <span className="block truncate text-sm text-mist sm:text-base">{social.handle}</span>
                        </span>
                      </span>
                      <span className="springy grid size-11 shrink-0 place-items-center rounded-full bg-cream text-night group-hover:scale-110 group-hover:rotate-45">
                        <ArrowUpRight className="size-5" />
                      </span>
                    </a>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="relative mt-16 h-[var(--scene-h)] sm:mt-20">
        <ContactScene />
        <footer className="absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 pb-6 sm:px-8 sm:pb-8">
            <SocialLinks size="sm" />
            <a
              href="#top"
              className="springy group inline-flex items-center gap-2.5 rounded-full bg-story py-1.5 pr-1.5 pl-4 text-sm font-bold text-cream ring-1 ring-cream/15 hover:-translate-y-1 hover:bg-story-2"
            >
              Back to top
              <span className="springy grid size-7 place-items-center rounded-full bg-cream text-night group-hover:-translate-y-0.5">
                <ArrowUp className="size-3.5" />
              </span>
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
