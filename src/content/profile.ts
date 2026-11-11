import { CONTACT_EMAIL } from "./links";

export interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
  context: string;
}

export const profile = {
  name: "Korede Odubanjo",
  firstName: "Korede",
  lastName: "Odubanjo",
  role: "Software engineer",
  availability: "Open to growth internships at consumer and crypto apps",
  intro:
    "Software engineer at BNB Chain, previously at Pudgy Penguins. I also grow audiences: one six-month short-form campaign added 44K+ followers and 80M+ views.",
  rotating: [
    "multi-chain trading bots",
    "market intelligence dashboards",
    "GTM tools for growth teams",
    "short-form that hits 20M views",
  ],
  about:
    "I'm a software engineer who knows how to grow an audience. I build production systems on Solana, Ethereum and BNB Chain, and I've run short-form content for creators: one six-month campaign added 44K+ followers and 80M+ views. I own complex projects end to end, learn unfamiliar technologies fast and ship working solutions in fast-moving teams.",
  /** Underlined in the About text; each must appear in `about` exactly. */
  aboutHighlights: ["grow an audience", "44K+ followers and 80M+ views"],
  photo: { src: "/images/korede.webp", alt: "Korede Odubanjo's profile picture" },
  contactNote:
    "I'm looking for growth internships at consumer and crypto apps. Message me on LinkedIn, X or email and I'll get back to you.",
  socials: [
    {
      label: "LinkedIn",
      handle: "Korede Odubanjo",
      href: "https://www.linkedin.com/in/korede-odubanjo-15b49a220/",
      ariaLabel: "Korede on LinkedIn",
    },
    { label: "X", handle: "@kxrede_", href: "https://x.com/kxrede_", ariaLabel: "Korede on X" },
    { label: "Email", handle: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, ariaLabel: "Email Korede" },
  ],
} as const;

export const stats: Stat[] = [
  {
    value: 80,
    suffix: "M+",
    label: "views",
    context: "from a six-month short-form growth campaign",
  },
  {
    value: 44,
    suffix: "K+",
    label: "followers added",
    context: "across the creators' Instagram and TikTok, doubling the following",
  },
  {
    value: 20.2,
    decimals: 1,
    suffix: "M",
    label: "views on one video",
    context: "the campaign's top-performing clip",
  },
  {
    value: 10,
    suffix: "x",
    label: "max concurrent viewers",
    context: "for the streamer, with average viewers up 105%",
  },
  {
    value: 13,
    suffix: "M+",
    label: "views in a month",
    context: "growing my own Instagram and TikTok to 20K+ followers",
  },
  {
    value: 15,
    suffix: "%",
    label: "faster API responses",
    context: "at Pudgy Penguins across Solana, Ethereum and Abstract",
  },
];
