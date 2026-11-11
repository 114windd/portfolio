import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Cursor } from "@/components/motion/cursor";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import "lenis/dist/lenis.css";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

const description =
  "Korede Odubanjo: software engineer at BNB Chain, previously Pudgy Penguins, who also grows audiences (80M+ views from one short-form campaign). GTM tools, crypto systems and growth work.";

export const metadata: Metadata = {
  title: `${profile.name} · Software engineer & growth`,
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: "https://x.com/kxrede_" }],
  openGraph: {
    title: `${profile.name} · Software engineer & growth`,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · Software engineer & growth`,
    description,
    creator: "@kxrede_",
  },
};

export const viewport: Viewport = {
  themeColor: "#07050b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("dark", display.variable, sans.variable, mono.variable, serif.variable)}>
      <body className="min-h-svh overflow-x-clip">
        {/* Motion renders reveals at opacity 0 and only animates them in with JavaScript. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>[style*="opacity:0"]{opacity:1!important}[style*="translateY("]{transform:none!important}</style>`,
          }}
        />
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to work
        </a>
        <MotionProvider>
          <SmoothScroll>
            {children}
            <Cursor />
          </SmoothScroll>
        </MotionProvider>
        <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.06] mix-blend-overlay" />
      </body>
    </html>
  );
}
