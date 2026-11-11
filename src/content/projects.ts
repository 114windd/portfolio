import type { Project } from "@/lib/projects";
import { PROJECT_URLS } from "./links";

export const projects: Project[] = [
  {
    slug: "creator-scout",
    name: "Creator Scout",
    kicker: "GTM tool · Creator outreach",
    tagline: "Find the YouTube and Twitch creators who already cover games like yours.",
    summary:
      "Type in your game or app and a few comparable titles. Creator Scout searches recent uploads, scores every creator it finds, pulls their public business contacts and drafts a pitch that cites their latest video.",
    highlights: [
      "A 0–100 fit score from reach, engagement, upload cadence and comparable coverage, with every component's raw metric shown.",
      "Outreach drafts by GPT-OSS 120B on Groq in about a second, grounded in one specific recent video. Without a key, a template takes over and neither path invents facts.",
      "Live data with zero API keys and free tiers only, plus a shortlist → contacted → replied pipeline with CSV export.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "Groq", "Vitest"],
    status: "live",
    links: { live: PROJECT_URLS.creatorScoutLive, code: PROJECT_URLS.creatorScoutCode },
    demo: {
      src: "/videos/creator-scout-demo.mp4",
      poster: "/videos/creator-scout-poster.webp",
      duration: "1:29",
      title: "Creator Scout demo: search, score, draft, pipeline and CSV export",
    },
    screenshots: [
      { src: "/images/projects/creator-scout/results.webp", alt: "Creator Scout results table ranking creators for the game Warlord", width: 1600, height: 1000 },
      { src: "/images/projects/creator-scout/breakdown.webp", alt: "Fit score breakdown for one creator", width: 1600, height: 1156 },
      { src: "/images/projects/creator-scout/outreach.webp", alt: "AI outreach draft citing a creator's recent video", width: 1600, height: 1444 },
    ],
  },
  {
    slug: "competitor-review-radar",
    name: "Competitor Review Radar",
    kicker: "GTM tool · Competitor research",
    tagline: "Turn competitors' App Store and Google Play reviews into positioning, ad angles and a daily digest.",
    summary:
      "Pick the apps or games you compete with. Radar pulls their recent reviews from both stores, groups them into themes, tracks how those move over time and across versions, and writes the GTM output a growth team actually uses.",
    highlights: [
      "Themes for complaints, praise, feature requests, bugs and monetisation gripes, with counts, trend sparklines and real quotes.",
      "Positioning lines and ad briefs (hook, format, visual, copy, CTA and proof quote) built from competitors' strongest weaknesses.",
      "A Discord or Slack digest every morning via GitHub Actions or Vercel cron. Every feature works with no API keys.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "SQLite", "Recharts"],
    status: PROJECT_URLS.reviewRadarLive ? "live" : "shipped",
    links: { live: PROJECT_URLS.reviewRadarLive, code: PROJECT_URLS.reviewRadarCode },
    demo: {
      src: "/videos/review-radar-demo.mp4",
      poster: "/videos/review-radar-poster.webp",
      duration: "2:36",
      title: "Competitor Review Radar demo: watchlist, themes, angles and digest",
    },
    screenshots: [
      { src: "/images/projects/review-radar/dashboard.webp", alt: "Review volume and sentiment dashboard for Warlord's rivals", width: 1600, height: 1400 },
      { src: "/images/projects/review-radar/angles.webp", alt: "Positioning lines and ad angles built from competitor reviews", width: 1600, height: 1312 },
      { src: "/images/projects/review-radar/digest.webp", alt: "Preview of the daily Discord digest", width: 1600, height: 1312 },
    ],
  },
  {
    slug: "kioku",
    name: "Kioku",
    kicker: "Growth tool · AI search visibility",
    tagline: "Are you in the AI's memory? A share-of-voice checker for ChatGPT, Claude, Gemini and Perplexity.",
    summary:
      "Tell Pip, the bird who runs the checks, which brand to check. Kioku asks the four assistants the questions your buyers ask, streams each answer as it lands and builds a report: share of voice, rank, rivals, cited sources and next steps.",
    highlights: [
      "An AI intake drafts the brief and reads plain-word corrections like “drop Polygon, add Base”, checked against a schema with a rule-based fallback.",
      "Writes up to 100 unbranded buyer questions, shows the cost and time up front, then runs them as short serverless batches under a daily spend cap.",
      "A recorded Trust Wallet run: 400 answers to 100 questions, 3,744 cited sources and 56 brands found.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Motion", "Upstash Redis", "OpenRouter"],
    status: "shipped",
    links: { live: PROJECT_URLS.kiokuLive, code: PROJECT_URLS.kiokuCode },
    demo: {
      src: "/videos/kioku-demo.mp4",
      poster: "/videos/kioku-poster.webp",
      duration: "0:43",
      title: "Kioku demo: brief, buyer questions, live answers and the share-of-voice report",
    },
    screenshots: [
      { src: "/images/projects/kioku/home.webp", alt: "Kioku landing page with Pip asking “Are you in the AI's memory?”", width: 1600, height: 1000 },
      { src: "/images/projects/kioku/report.webp", alt: "Kioku report overview for a 100-question Trust Wallet check", width: 1600, height: 900 },
      { src: "/images/projects/kioku/live-check.webp", alt: "Answers streaming in from each assistant during a live check", width: 1600, height: 900 },
    ],
  },
  {
    slug: "saff",
    name: "Saff",
    kicker: "Community app · Mosques",
    tagline: "One khutbah. Every heart. Prayer times, the Friday khutbah in your language and your mosque's news in one app.",
    summary:
      "A web app, installable on phones, for a mosque and its community. Members get prayer times, the khutbah with audio, transcript, summary, chapters and translations, plus notices and giving, without an account. Mosque staff sign in to publish.",
    highlights: [
      "A six-step khutbah studio: audio uploads in parts, Whisper on Cloudflare Workers AI transcribes it in resumable 30-second chunks, and AI writes the summary and chapters.",
      "Translations with a human in the loop: AI drafts each of up to 8 languages and a reviewer approves it before members see it.",
      "Now building live khutbah captions: audio is cut at the imam's pauses, transcribed and translated, then broadcast to a mosque screen and phones.",
    ],
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind CSS v4", "Drizzle", "Cloudflare Workers AI", "Web Push"],
    status: "building",
    icon: { src: "/images/projects/saff/icon.webp", alt: "Saff logo" },
    links: { live: PROJECT_URLS.saffLive },
    codePrivate: "Code isn't public yet",
    demo: {
      src: "/videos/saff-demo.mp4",
      poster: "/videos/saff-poster.webp",
      duration: "3:33",
      title: "Saff core features demo, recorded on a preview build with demo data",
    },
    screenshots: [
      { src: "/images/projects/saff/landing.webp", alt: "Saff landing page: “One khutbah. In your language.”", width: 1600, height: 1000 },
      { src: "/images/projects/saff/prayer-times.webp", alt: "Saff member dashboard with today's prayer times", width: 1600, height: 900 },
      { src: "/images/projects/saff/khutbah-reader.webp", alt: "Saff khutbah reader with Whisper transcript and AI summary", width: 1440, height: 1000 },
    ],
  },
  {
    slug: "meme-market-monitor",
    name: "Meme Market Monitoring System",
    kicker: "Market intelligence · BNB Chain",
    tagline: "An internal read on meme-coin launchpads across six chains, refreshed every 4 hours.",
    summary:
      "An internal, read-only market intelligence system for the BNB Chain team. Every 4 hours it reports what competing meme-coin launchpads changed, which meme narratives are spreading on X and how many wallets are trading on each chain's launchpads, as a report and a static dashboard.",
    highlights: [
      "Covers 6 chains and 20 launchpads, including pump.fun, four.meme, Clanker, Zora and Virtuals.",
      "Scores participation from 0 to 100 against each chain's own last 30 days, from Dune SQL per launchpad with a 32-day backfill.",
      "Checks new launchpad mechanisms against official sources and on-chain use, and compares X narratives with actual trading. 339 tests.",
    ],
    stack: ["Python 3.12", "PostgreSQL 17", "Dune SQL", "X API", "OpenRouter", "Docker Compose", "GitHub Actions"],
    status: "internal",
    links: {},
    codePrivate: "Internal BNB Chain work: the code and live dashboard stay private",
    demo: {
      src: "/videos/meme-market-monitor-demo.mp4",
      poster: "/videos/meme-market-monitor-poster.webp",
      duration: "1:15",
      title: "Meme Market Monitor dashboard walkthrough: overview, participation, mechanisms, narratives and data health",
    },
    screenshots: [
      { src: "/images/projects/meme-market-monitor/overview.webp", alt: "Dashboard overview with a participation score and active wallets per chain", width: 1440, height: 900 },
      { src: "/images/projects/meme-market-monitor/participation.webp", alt: "Participation tab with a 30-day chart of active wallets", width: 1400, height: 1400 },
      { src: "/images/projects/meme-market-monitor/mechanisms.webp", alt: "An expanded launchpad mechanism finding with its BNB Chain relevance", width: 1400, height: 1400 },
    ],
    keyFacts: [
      { value: "6", label: "chains" },
      { value: "20", label: "launchpads" },
      { value: "4h", label: "refresh cycle" },
      { value: "30d", label: "baseline per chain" },
    ],
  },
];
