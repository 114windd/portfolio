import { describe, expect, it } from "vitest";
import { fireflies, seededRandom, starField } from "./scene";

const decimals = (n: number) => (n.toString().split(".")[1] ?? "").length;

describe("seededRandom", () => {
  it("repeats the same sequence for the same seed", () => {
    const a = seededRandom(7);
    const b = seededRandom(7);
    const seqA = Array.from({ length: 5 }, a);
    expect(Array.from({ length: 5 }, b)).toEqual(seqA);
    expect(seqA.every((n) => n >= 0 && n < 1)).toBe(true);
  });

  it("gives a different sequence for a different seed", () => {
    expect(seededRandom(1)()).not.toBe(seededRandom(2)());
  });
});

describe("starField", () => {
  it("draws the same sky for the same seed, so server and browser markup match", () => {
    expect(starField(40, 3)).toEqual(starField(40, 3));
    expect(starField(40, 3)).not.toEqual(starField(40, 4));
  });

  it("places every star inside the sky with a small, rounded radius", () => {
    const stars = starField(120, 11);
    expect(stars).toHaveLength(120);
    for (const star of stars) {
      expect(star.x).toBeGreaterThanOrEqual(0);
      expect(star.x).toBeLessThanOrEqual(100);
      expect(star.y).toBeGreaterThanOrEqual(0);
      expect(star.y).toBeLessThanOrEqual(100);
      expect(star.r).toBeGreaterThanOrEqual(0.5);
      expect(star.r).toBeLessThanOrEqual(1.8);
      expect(decimals(star.x)).toBeLessThanOrEqual(2);
      expect(decimals(star.y)).toBeLessThanOrEqual(2);
      expect(decimals(star.r)).toBeLessThanOrEqual(2);
    }
  });

  it("splits stars across three twinkle groups and crowds them toward the top", () => {
    const stars = starField(150, 5);
    expect(new Set(stars.map((s) => s.group))).toEqual(new Set([0, 1, 2]));
    const meanY = stars.reduce((sum, s) => sum + s.y, 0) / stars.length;
    expect(meanY).toBeLessThan(45);
  });
});

describe("fireflies", () => {
  it("is deterministic and keeps each light inside its area with a staggered start", () => {
    const flies = fireflies(12, 9);
    expect(flies).toEqual(fireflies(12, 9));
    expect(flies).toHaveLength(12);
    for (const fly of flies) {
      expect(fly.x).toBeGreaterThanOrEqual(0);
      expect(fly.x).toBeLessThanOrEqual(100);
      expect(fly.y).toBeGreaterThanOrEqual(0);
      expect(fly.y).toBeLessThanOrEqual(100);
      expect(fly.delay).toBeGreaterThanOrEqual(0);
      expect(fly.duration).toBeGreaterThanOrEqual(6);
      expect([0, 1, 2]).toContain(fly.path);
    }
    expect(new Set(flies.map((f) => f.delay)).size).toBeGreaterThan(1);
  });
});
