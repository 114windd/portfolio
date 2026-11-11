# Korede Odubanjo — portfolio

Personal site for Korede Odubanjo, a software engineer at BNB Chain who also grows audiences with short-form content. It covers his experience at BNB Chain, Pudgy Penguins and FryingPan, and five projects with live links, code and demo videos.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and shadcn/ui. Motion drives the scroll and hover animations and Lenis handles smooth scrolling. Both turn off when the visitor prefers reduced motion. The page is fully static.

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm test       # content and link checks (Vitest)
pnpm typecheck
pnpm lint
pnpm build
```

## Editing content

All copy lives in `src/content/`:

- `profile.ts`: intro, about, stats, skills and socials
- `experience.ts`: roles and dates
- `projects.ts`: the project cards
- `links.ts`: every project URL in one place

### Adding Competitor Review Radar's live URL

Set `reviewRadarLive` in `src/content/links.ts`:

```ts
reviewRadarLive: "https://your-deployment.vercel.app",
```

The card then shows a "Live site" button and its badge changes from Shipped to Live. Only `https://` links are rendered, and an empty string hides the button.

### Adding a link or demo to any card

Each project in `projects.ts` takes optional `links.live`, `links.code`, `demo` and `screenshots`. A card shows only the buttons it has data for. Without a demo or screenshots it shows `keyFacts` or a "Demo coming soon" panel instead. `codePrivate` replaces the code button with a short note explaining why the code isn't shared.

`missingPieces()` in `src/lib/projects.ts` lists what a card still lacks.

## Media

Demos are H.264 (High profile, yuv420p) with the `moov` atom at the front (faststart). They're capped at 1280px wide and 30 fps, and each has a WebP poster. A video only loads when its dialog opens. Screenshots are WebP and served through `next/image`.

To regenerate everything from the original recordings:

```bash
scripts/prepare-media.sh <source-media-dir> [avatar-dir]
```

`source-media-dir` holds the original `*.mp4` and `*.png` files, plus `portfolio-assets/{saff,kikou,meme-monitoring-system}/`. `avatar-dir` is optional and holds the profile photo and company logos. The script needs `ffmpeg` and `ffprobe`.

## Deploying

The site deploys on Vercel from `main`. Commits must be authored by Korede's GitHub identity, or Vercel blocks the deploy.
