export interface Star {
  x: number;
  y: number;
  r: number;
  group: 0 | 1 | 2;
}

export interface Firefly {
  x: number;
  y: number;
  delay: number;
  duration: number;
  path: 0 | 1 | 2;
}

/** Mulberry32. The sky is drawn during server render, so it has to come out the same in the browser. */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 100) / 100;

/** Positions are percentages of the sky; squaring y crowds the stars toward the top. */
export function starField(count: number, seed: number): Star[] {
  const random = seededRandom(seed);
  return Array.from({ length: count }, (_, i) => ({
    x: round(random() * 100),
    y: round(random() ** 2 * 100),
    r: round(0.5 + random() ** 3 * 1.3),
    group: (i % 3) as Star["group"],
  }));
}

export function fireflies(count: number, seed: number): Firefly[] {
  const random = seededRandom(seed);
  return Array.from({ length: count }, (_, i) => ({
    x: round(4 + random() * 92),
    y: round(10 + random() * 80),
    delay: round(random() * 6),
    duration: round(6 + random() * 6),
    path: (i % 3) as Firefly["path"],
  }));
}
