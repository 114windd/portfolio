import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { experience } from "./experience";
import { PROJECT_URLS } from "./links";
import { projects } from "./projects";
import { profile } from "./profile";

const publicFile = (src: string) => existsSync(join(process.cwd(), "public", src));
const bySlug = (slug: string) => {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`missing project ${slug}`);
  return project;
};

describe("projects", () => {
  it("has the five showcased projects with unique slugs", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "creator-scout",
      "competitor-review-radar",
      "kioku",
      "saff",
      "meme-market-monitor",
    ]);
  });

  it("only references media that exists in public/", () => {
    for (const project of projects) {
      const files = [
        project.demo?.src,
        project.demo?.poster,
        project.icon?.src,
        ...project.screenshots.map((s) => s.src),
      ].filter((f): f is string => Boolean(f));
      for (const file of files) expect(publicFile(file), `${project.slug}: ${file}`).toBe(true);
    }
  });

  it("takes Competitor Review Radar's live site from the single config value", () => {
    expect(bySlug("competitor-review-radar").links.live).toBe(PROJECT_URLS.reviewRadarLive);
  });

  it("presents Competitor Review Radar as live, with its live site and public repo", () => {
    const radar = bySlug("competitor-review-radar");
    expect(radar.status).toBe("live");
    expect(radar.links).toEqual({
      live: "https://competitor-review-radar.vercel.app",
      code: "https://github.com/koredeBNB/competitor-review-radar",
    });
  });

  it("presents Kioku as shipped, with its live site and public repo", () => {
    const kioku = bySlug("kioku");
    expect(kioku.name).toBe("Kioku");
    expect(kioku.status).toBe("shipped");
    expect(kioku.links).toEqual({
      live: "https://kikou-kappa.vercel.app",
      code: "https://github.com/koredeBNB/kikou",
    });
    expect(kioku.demo?.src).toBeTruthy();
  });

  it("presents saff as in progress with a live link and no code link", () => {
    const saff = bySlug("saff");
    expect(saff.status).toBe("building");
    expect(saff.links.live).toBe("https://saff-khutbah.vercel.app");
    expect(saff.links.code).toBeUndefined();
    expect(saff.codePrivate).toBeTruthy();
  });

  it("shows the meme monitoring system's walkthrough and screenshots but links neither code nor dashboard", () => {
    const mms = bySlug("meme-market-monitor");
    expect(mms.status).toBe("internal");
    expect(mms.links).toEqual({});
    expect(mms.codePrivate).toBeTruthy();
    expect(mms.demo?.src).toBeTruthy();
    expect(mms.screenshots.length).toBeGreaterThan(0);
  });
});

describe("experience and profile", () => {
  it("shows BNB Chain, Pudgy Penguins and FryingPan with logos that exist", () => {
    expect(experience.map((e) => e.company)).toEqual(["BNB Chain", "Pudgy Penguins", "FryingPan"]);
    for (const role of experience) expect(publicFile(role.logo.src), role.logo.src).toBe(true);
  });

  it("links Korede's LinkedIn and X and uses his photo", () => {
    expect(profile.socials.map((s) => s.href)).toEqual([
      "https://www.linkedin.com/in/korede-odubanjo-15b49a220/",
      "https://x.com/kxrede_",
    ]);
    expect(publicFile(profile.photo.src)).toBe(true);
  });
});
