import type { NextConfig } from "next";
import { LEGACY_SITE_HOST, SITE_URL } from "./src/content/links";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // With Vercel's restored build cache, the Tailwind loader returned the previous globals.css after it changed.
    turbopackFileSystemCacheForBuild: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async headers() {
    return [
      {
        // Filenames aren't content-hashed, so a replaced demo must not stay cached for long.
        source: "/videos/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: LEGACY_SITE_HOST }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
