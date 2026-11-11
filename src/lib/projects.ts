export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectDemo {
  src: string;
  poster: string;
  title: string;
  duration?: string;
}

export interface Project {
  slug: string;
  name: string;
  kicker: string;
  tagline: string;
  summary: string;
  highlights: string[];
  stack: string[];
  icon?: { src: string; alt: string };
  links: { live?: string; code?: string };
  /** Shown in the preview frame's address bar when there's no live site to name. */
  frameLabel?: string;
  /** Set when the code can't be shared; the card says why instead of linking it. */
  codePrivate?: string;
  demo?: ProjectDemo;
  screenshots: ProjectImage[];
  /** Shown in place of media when a project has no demo or screenshots to share. */
  keyFacts?: { value: string; label: string }[];
}

export type ProjectAction =
  | { kind: "live"; label: string; href: string }
  | { kind: "code"; label: string; href: string }
  | { kind: "demo"; label: string; demo: ProjectDemo };

export function isHttpsUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function projectActions(project: Project): ProjectAction[] {
  const actions: ProjectAction[] = [];
  if (isHttpsUrl(project.links.live)) {
    actions.push({ kind: "live", label: "Live site", href: project.links.live });
  }
  if (!project.codePrivate && isHttpsUrl(project.links.code)) {
    actions.push({ kind: "code", label: "Code", href: project.links.code });
  }
  if (project.demo?.src) {
    actions.push({ kind: "demo", label: "Watch demo", demo: project.demo });
  }
  return actions;
}

export function missingPieces(project: Project): string[] {
  const missing: string[] = [];
  if (!isHttpsUrl(project.links.live)) missing.push("Live site URL");
  if (!project.codePrivate && !isHttpsUrl(project.links.code)) missing.push("Code link");
  if (!project.demo?.src) missing.push("Demo video");
  if (project.screenshots.length === 0) missing.push("Screenshots");
  return missing;
}
