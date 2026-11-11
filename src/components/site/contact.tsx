import { ArrowUpRight } from "lucide-react";
import { socialIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/content/profile";
import { externalLinkProps } from "@/lib/external-link";

function Lift({ text }: { text: string }) {
  return (
    <span className="letter-lift" aria-hidden>
      {text.split("").map((char, i) => (
        <span key={i}>{char === " " ? "\u00a0" : char}</span>
      ))}
    </span>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden px-5 pt-28 pb-10 sm:px-8 sm:pt-40">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[80%] bg-[radial-gradient(ellipse_at_50%_100%,rgb(124_58_237/0.45),transparent_65%)]"
      />
      <div className="mx-auto max-w-[90rem]">
        <p className="mb-6 font-mono text-[11px] tracking-[0.22em] text-violet-300 uppercase">(Contact)</p>
        <h2
          id="contact-title"
          className="font-display text-[clamp(4rem,16vw,15rem)] leading-[0.85] font-extrabold tracking-[-0.06em]"
        >
          <span className="sr-only">Let&apos;s talk.</span>
          <Lift text="Let's" />
          <br />
          <span className="font-serif font-normal tracking-[-0.03em] text-violet-300 italic">
            <Lift text="talk." />
          </span>
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
              {profile.contactNote}
            </p>
          </Reveal>
          <div className="lg:col-span-7">
            <ul className="border-t border-white/10">
              {profile.socials.map((social, i) => {
                const Icon = socialIcon(social.label);
                return (
                  <li key={social.href} className="border-b border-white/10">
                    <Reveal delay={i * 0.08} y={16}>
                      <a
                        href={social.href}
                        {...externalLinkProps(social.href)}
                        data-cursor="Open"
                        className="group relative flex items-center justify-between gap-4 overflow-hidden px-2 py-6 sm:py-8"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 -z-10 origin-left scale-x-0 bg-violet-600 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
                        />
                        <span className="flex items-center gap-4 sm:gap-6">
                          <Icon className="size-6 sm:size-8" />
                          <span className="font-display text-3xl font-bold tracking-tight sm:text-5xl">{social.label}</span>
                        </span>
                        <span className="flex items-center gap-3 text-sm text-white/70 group-hover:text-white sm:text-base">
                          <span className="hidden sm:inline">{social.handle}</span>
                          <span className="grid size-11 place-items-center rounded-full border border-white/20 transition-transform duration-500 group-hover:rotate-45 group-hover:border-white sm:size-14">
                            <ArrowUpRight className="size-5" />
                          </span>
                        </span>
                      </a>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <footer className="mt-28 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-8 text-sm text-subtle sm:flex-row sm:items-center">
          <ul className="flex gap-2" aria-label="Social links">
            {profile.socials.map((social) => {
              const Icon = socialIcon(social.label);
              return (
                <li key={social.href}>
                  <a
                    href={social.href}
                    {...externalLinkProps(social.href)}
                    aria-label={social.ariaLabel}
                    className="grid size-9 place-items-center rounded-full border border-white/10 text-white/80 transition-colors hover:border-violet-400 hover:bg-violet-500/20 hover:text-white"
                  >
                    <Icon className="size-3.5" />
                  </a>
                </li>
              );
            })}
          </ul>
          <a href="#top" className="group inline-flex items-center gap-2 text-white/80 hover:text-white">
            <span className="roll">
              <span>Back to top</span>
              <span aria-hidden>Back to top</span>
            </span>
            <span aria-hidden className="grid size-8 place-items-center rounded-full border border-white/15 transition-transform duration-500 group-hover:-translate-y-1">
              ↑
            </span>
          </a>
        </footer>
      </div>
    </section>
  );
}
