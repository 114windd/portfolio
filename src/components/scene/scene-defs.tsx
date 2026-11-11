/** Gradients shared by every scene SVG, defined once so the ids don't repeat. Not display:none, or they won't paint. */
export function SceneDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="pointer-events-none absolute">
      <defs>
        <linearGradient id="cloud-lit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#281f60" />
          <stop offset="0.48" stopColor="#3a2c79" />
          <stop offset="0.8" stopColor="#7863b6" />
          <stop offset="1" stopColor="#b99fd9" />
        </linearGradient>
        <linearGradient id="hill-distant" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a479c" />
          <stop offset="0.5" stopColor="#47378a" />
        </linearGradient>
        <linearGradient id="hill-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#47378a" />
          <stop offset="0.3" stopColor="#382a6d" />
          <stop offset="1" stopColor="#2b215f" />
        </linearGradient>
        <linearGradient id="hill-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#31276b" />
          <stop offset="1" stopColor="#221a50" />
        </linearGradient>
        <linearGradient id="hill-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#201a4a" />
          <stop offset="1" stopColor="#161236" />
        </linearGradient>
        <linearGradient id="hill-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16122f" />
          <stop offset="0.7" stopColor="#0d0a22" />
        </linearGradient>
        <radialGradient id="warm-glow">
          <stop offset="0" stopColor="#ffe3a6" stopOpacity="0.85" />
          <stop offset="0.35" stopColor="#ffc773" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ffc773" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
