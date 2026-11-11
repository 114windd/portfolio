import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/content/profile";
import { SocialLinks } from "./social-links";

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function withHighlights(text: string, phrases: readonly string[]) {
  const pattern = new RegExp(`(${phrases.map(escape).join("|")})`);
  return text.split(pattern).map((part, i) =>
    phrases.includes(part) ? (
      <span
        key={i}
        className="underline decoration-lavender decoration-wavy decoration-2 underline-offset-[0.24em] [text-decoration-skip-ink:none]"
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <figure className="relative mx-auto w-[min(72vw,320px)]">
            <div className="bob" style={{ "--t": "7s", "--bob": "-12px" } as Vars}>
              <div className="relative aspect-square rounded-full bg-story-2 p-3 ring-1 ring-cream/15">
                <div className="relative size-full overflow-hidden rounded-full ring-4 ring-night">
                  <Image
                    src={profile.photo.src}
                    alt={profile.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 320px, 72vw"
                    className="object-cover [image-rendering:pixelated]"
                  />
                </div>
              </div>
            </div>
            <span aria-hidden className="absolute -top-9 -left-2 -rotate-12 font-hand text-3xl text-lantern sm:-left-12">
              that&apos;s me!
            </span>
            <svg
              aria-hidden
              viewBox="0 0 60 60"
              className="absolute -top-1 left-12 size-14 text-cream/70 sm:left-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8c14 2 26 12 30 30" />
              <path d="M27 33l9 7 4-11" />
            </svg>
            <span aria-hidden className="twinkle absolute top-[12%] -right-3 size-2 rounded-full bg-moon" style={{ "--t": "3.4s" } as Vars} />
            <span aria-hidden className="twinkle absolute -right-7 bottom-[30%] size-1.5 rounded-full bg-moon" style={{ "--t": "4.6s", "--d": "-2s" } as Vars} />
            <span aria-hidden className="twinkle absolute bottom-[8%] -left-5 size-1.5 rounded-full bg-lantern" style={{ "--t": "5.2s", "--d": "-1s" } as Vars} />
            <figcaption className="mt-8 flex flex-col items-center gap-4 text-center">
              <span>
                <span className="block font-display text-2xl font-semibold">{profile.name}</span>
                <span className="block text-mist">{profile.role} · Growth</span>
              </span>
              <SocialLinks />
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <h2 id="about-title" className="font-hand text-3xl text-lavender sm:text-4xl">
            a little about me
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-5 font-display text-[clamp(1.55rem,2.9vw,2.45rem)] leading-[1.32] font-medium text-pretty text-cream">
              {withHighlights(profile.about, profile.aboutHighlights)}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
