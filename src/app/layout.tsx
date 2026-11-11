import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Nunito } from "next/font/google";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SceneDefs } from "@/components/scene/scene-defs";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import "lenis/dist/lenis.css";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
const sans = Nunito({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });

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
  themeColor: "#0d0a22",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("dark", display.variable, sans.variable, hand.variable)}>
      <body className="min-h-svh overflow-x-clip">
        <SceneDefs />
        {/* Motion renders reveals at opacity 0 and only animates them in with JavaScript. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>[style*="opacity:0"]{opacity:1!important}[style*="translateY("]{transform:none!important}</style>`,
          }}
        />
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:font-bold focus:text-night"
        >
          Skip to work
        </a>
        <MotionProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </MotionProvider>
        <div aria-hidden className="paper pointer-events-none fixed inset-0 z-[90] opacity-20" />
      </body>
    </html>
  );
}
