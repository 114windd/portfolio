export interface Role {
  company: string;
  role: string;
  subtitle?: string;
  period: string;
  logo: { src: string; alt: string };
  bullets: string[];
}

export const experience: Role[] = [
  {
    company: "BNB Chain",
    role: "Software Engineer",
    period: "December 2025 – Present",
    logo: { src: "/images/logos/bnbchain.webp", alt: "BNB Chain logo" },
    bullets: [
      "Delivered market intelligence across four chains and three market categories by integrating DefiLlama, Dune and GeckoTerminal into a production dashboard and scheduled Telegram briefings.",
      "Built a research workflow from topic to cited technical brief, combining source matrices, deterministic citation validation, Mermaid architecture diagrams and human approval gates.",
      "Automated documentation from repository monitoring to validated MkDocs pull requests with a production FastAPI GitHub App that coordinates OpenRouter/DeepSeek review, syncs llms.txt files and runs in Docker with GitHub Container Registry.",
    ],
  },
  {
    company: "Pudgy Penguins",
    role: "Software Engineer (Contract)",
    period: "September 2025 – December 2025",
    logo: { src: "/images/logos/pudgypenguins.webp", alt: "Pudgy Penguins logo" },
    bullets: [
      "Reduced API response time by 15% and improved cache hit rate by 10% across Solana, Ethereum and Abstract with asynchronous execution, HTTP connection pooling, parallel API calls and TTL-based caching.",
      "Delivered five core trading capabilities across three networks: automated buy/sell, copy trading, Jupiter Trigger limit orders, real-time positions and PNL, and cross-chain wallet management.",
      "Improved fault tolerance and transaction visibility with circuit breakers, progressive timeouts with exponential backoff and RabbitMQ-backed WebSocket monitoring.",
    ],
  },
  {
    company: "FryingPan",
    role: "Software Engineer & Clipper",
    subtitle: "Short-form content strategy and editing for a Twitch streamer and YouTuber",
    period: "January 2025 – November 2025",
    logo: { src: "/images/logos/fryingpan.webp", alt: "FryingPan's profile picture" },
    bullets: [
      "During a six-month growth campaign, doubled the creators' combined Instagram and TikTok following, adding 44K+ followers and generating 80M+ views; the top video reached 20.2M views.",
      "Researched high-performing competitor formats, picked moments from long-form VODs, edited for hooks and retention, published consistently and scaled what worked, lifting the streamer's average viewers by 105% and max concurrent viewers 10x.",
    ],
  },
];

export const earlier: { role: string; org: string; period: string; summary: string }[] = [
  {
    role: "Social Content Creator",
    org: "Personal Instagram and TikTok",
    period: "November 2024 – January 2025",
    summary:
      "Grew a personal page to 20K+ combined followers and 13M+ views in a month; the top video reached 5.5M views. Picked the niche through competitor research and iterated on hooks at volume.",
  },
  {
    role: "Founder",
    org: "Influencer & Email Marketing Agency",
    period: "January 2023 – November 2024",
    summary:
      "Won clients with tailored lead magnets and problem-focused email outreach. Led Klaviyo email and SMS for a B2C/DTC e-commerce brand: revenue up 20% month on month, with 30% attributed to email.",
  },
];
