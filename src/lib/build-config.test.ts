import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

describe("next.config", () => {
  it("builds without Turbopack's file-system cache, which served a stale globals.css after a restore", () => {
    expect(nextConfig.experimental?.turbopackFileSystemCacheForBuild).toBe(false);
  });

  it("permanently redirects every path on the old production domain to the same path on the site's domain", async () => {
    const redirects = await nextConfig.redirects?.();
    expect(redirects).toContainEqual({
      source: "/:path*",
      has: [{ type: "host", value: "portfolio-red-iota-81.vercel.app" }],
      destination: "https://korede-odubanjo.vercel.app/:path*",
      permanent: true,
    });
  });
});
