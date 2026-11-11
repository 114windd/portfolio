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
  photo: { src: "/images/korede.webp", alt: "Korede Odubanjo's profile picture" },
  socials: [
    {
      label: "LinkedIn",
      handle: "Korede Odubanjo",
      href: "https://www.linkedin.com/in/korede-odubanjo-15b49a220/",
    },
    { label: "X", handle: "@kxrede_", href: "https://x.com/kxrede_" },
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

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "Go", "Python", "SQL"] },
  {
    group: "Backend & APIs",
    items: ["FastAPI", "REST APIs", "Asynchronous processing", "HTTP connection pooling"],
  },
  { group: "Data & messaging", items: ["PostgreSQL", "Redis", "NATS JetStream", "RabbitMQ"] },
  {
    group: "Blockchain",
    items: [
      "Ethereum",
      "Solana",
      "BNB Chain",
      "Abstract",
      "Solidity contract integration",
      "Web3.py",
      "Solana SDK",
      "Jupiter Trigger API",
    ],
  },
  {
    group: "Market data",
    items: [
      "DefiLlama",
      "Dune",
      "GeckoTerminal",
      "CoinGecko",
      "CoinMarketCap",
      "PancakeSwap",
      "Birdeye",
      "Helius RPC",
    ],
  },
  {
    group: "Growth",
    items: [
      "Short-form editing",
      "Competitor format research",
      "Hooks & retention",
      "Klaviyo email & SMS",
      "Lead magnets & outreach",
    ],
  },
];

export const marquee = [
  "TypeScript",
  "Go",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "NATS JetStream",
  "RabbitMQ",
  "Solana",
  "Ethereum",
  "BNB Chain",
  "Abstract",
  "Dune",
  "DefiLlama",
  "GeckoTerminal",
  "Short-form",
  "Klaviyo",
];
