import { describe, expect, it } from "vitest";
import { isHttpsUrl, missingPieces, projectActions, type Project } from "./projects";

const base: Project = {
  slug: "sample",
  name: "Sample",
  kicker: "GTM tool",
  tagline: "A sample project.",
  summary: "Summary.",
  highlights: ["One"],
  stack: ["Next.js"],
  links: {},
  screenshots: [],
};

describe("isHttpsUrl", () => {
  it("accepts https URLs only", () => {
    expect(isHttpsUrl("https://example.com")).toBe(true);
    expect(isHttpsUrl("http://example.com")).toBe(false);
    expect(isHttpsUrl("")).toBe(false);
    expect(isHttpsUrl(undefined)).toBe(false);
    expect(isHttpsUrl("not a url")).toBe(false);
  });
});

describe("projectActions", () => {
  it("lists live site, code and demo in that order when all are present", () => {
    const actions = projectActions({
      ...base,
      links: { live: "https://sample.app", code: "https://github.com/x/sample" },
      demo: { src: "/videos/sample.mp4", poster: "/videos/sample.webp", title: "Sample demo" },
    });
    expect(actions.map((a) => a.kind)).toEqual(["live", "code", "demo"]);
    expect(actions[0]).toMatchObject({ href: "https://sample.app", label: "Live site" });
    expect(actions[1]).toMatchObject({ href: "https://github.com/x/sample", label: "Code" });
  });

  it("drops links that are empty or not https, so a config value can be filled in later", () => {
    const actions = projectActions({ ...base, links: { live: "", code: "http://insecure.dev" } });
    expect(actions).toEqual([]);
  });

  it("never offers a code link for private code, even if a URL is set", () => {
    const actions = projectActions({
      ...base,
      links: { live: "https://sample.app", code: "https://github.com/x/private" },
      codePrivate: "Internal to the company",
    });
    expect(actions.map((a) => a.kind)).toEqual(["live"]);
  });
});

describe("missingPieces", () => {
  it("reports nothing for a complete project", () => {
    expect(
      missingPieces({
        ...base,
        links: { live: "https://sample.app", code: "https://github.com/x/sample" },
        demo: { src: "/videos/sample.mp4", poster: "/videos/sample.webp", title: "Sample demo" },
        screenshots: [{ src: "/images/a.webp", alt: "A", width: 10, height: 10 }],
      }),
    ).toEqual([]);
  });

  it("names each missing piece, and skips the code link when code is private by design", () => {
    expect(missingPieces(base)).toEqual(["Live site URL", "Code link", "Demo video", "Screenshots"]);
    expect(missingPieces({ ...base, codePrivate: "Internal" })).toEqual([
      "Live site URL",
      "Demo video",
      "Screenshots",
    ]);
  });
});
