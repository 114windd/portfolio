import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

describe("next.config", () => {
  it("builds without Turbopack's file-system cache, which served a stale globals.css after a restore", () => {
    expect(nextConfig.experimental?.turbopackFileSystemCacheForBuild).toBe(false);
  });
});
