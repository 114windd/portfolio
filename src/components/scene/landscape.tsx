import { cn } from "@/lib/utils";

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

/**
 * A box with the scene's aspect ratio that covers its parent and sits on its bottom edge, like an SVG's
 * xMidYMax slice. Everything inside is placed in viewBox units, so hills, trees and the cottage stay lined up
 * at every screen size. The parent sets --scene-h.
 */
export function CoverBox({ width, height, children }: { width: number; height: number; children: React.ReactNode }) {
  return (
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2"
      style={{ aspectRatio: `${width} / ${height}`, width: `max(100%, calc(var(--scene-h) * ${width / height}))` }}
    >
      {children}
    </div>
  );
}

/** Positions an element by its bottom-centre point in viewBox units. */
export function place(x: number, y: number, w: number, box: { width: number; height: number }): React.CSSProperties {
  return {
    left: `${(x / box.width) * 100}%`,
    bottom: `${((box.height - y) / box.height) * 100}%`,
    width: `${(w / box.width) * 100}%`,
  };
}

export function Hill({
  d,
  fill,
  rim,
  width,
  height,
}: {
  d: string;
  fill: string;
  /** Moonlight along the ridge: the top edge of `d`, as an open path. */
  rim?: string;
  width: number;
  height: number;
}) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="absolute inset-0 size-full">
      <path d={d} fill={fill} />
      {rim ? <path d={rim} fill="none" stroke="#c9b8ff" strokeOpacity="0.32" strokeWidth="2.5" strokeLinecap="round" /> : null}
    </svg>
  );
}

const tones = {
  near: { body: "#100c2b", rim: "#2c2466" },
  mid: { body: "#1b1546", rim: "#352b72" },
};

const roundCanopy: [number, number, number][] = [
  [50, 56, 32],
  [28, 74, 22],
  [72, 74, 22],
  [50, 84, 24],
  [34, 44, 17],
  [66, 44, 17],
];

/** A fluffy tree or a tall cypress, with the moon catching the top-right of the leaves. */
export function Tree({
  kind = "round",
  tone = "near",
  sway = false,
  className,
  style,
}: {
  kind?: "round" | "tall";
  tone?: keyof typeof tones;
  sway?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { body, rim } = tones[tone];
  return (
    <div aria-hidden className={cn("absolute -translate-x-1/2", sway && "sway", className)} style={style}>
      {kind === "round" ? (
        <svg viewBox="0 0 100 140" className="block h-auto w-full">
          <path d="M46 140 47 98Q50 92 53 98L54 140Z" fill={body} />
          <g fill={rim}>
            {roundCanopy.map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
            ))}
          </g>
          <g fill={body} transform="translate(-3 3)">
            {roundCanopy.map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
            ))}
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 60 160" className="block h-auto w-full">
          <path d="M28 160 29 136H31L32 160Z" fill={body} />
          <ellipse cx="30" cy="82" rx="17" ry="60" fill={rim} />
          <ellipse cx="28" cy="85" rx="17" ry="60" fill={body} />
        </svg>
      )}
    </div>
  );
}

export function Cottage({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div aria-hidden className={cn("absolute -translate-x-1/2", className)} style={style}>
      {[0, 1.7, 3.4].map((delay) => (
        <span
          key={delay}
          className="smoke absolute top-[10%] left-[68%] size-[9%] rounded-full bg-[#6f61a8]"
          style={{ "--d": `${delay}s` } as Vars}
        />
      ))}
      <svg viewBox="0 0 140 124" className="relative block h-auto w-full">
        <rect x="22" y="60" width="88" height="64" rx="7" fill="#1b1546" />
        <rect x="92" y="18" width="13" height="30" rx="2.5" fill="#140f35" />
        <path d="M8 68C10 60 20 56 26 50L60 20C66 14 74 14 80 20L114 50C120 56 130 60 132 68C110 72 30 72 8 68Z" fill="#140f35" />
        <path d="M80 20 114 50C120 56 130 60 132 68" fill="none" stroke="#3b3079" strokeWidth="2" strokeLinecap="round" />
        <circle className="flicker" cx="48" cy="89" r="30" fill="url(#warm-glow)" />
        <rect x="37" y="78" width="22" height="22" rx="5" fill="#ffc773" />
        <path d="M48 78v22M37 89h22" stroke="#1b1546" strokeWidth="2.2" />
        <path d="M76 124V98c0-9 20-9 20 0v26Z" fill="#100c2a" />
        <circle cx="70" cy="44" r="5" fill="#ffd894" />
      </svg>
    </div>
  );
}

/** A wooden post with a paper lantern hanging from its arm, swinging a little in the breeze. */
export function LanternPost({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div aria-hidden className={cn("absolute -translate-x-1/2", className)} style={style}>
      <svg viewBox="0 0 80 200" className="block h-auto w-full">
        <rect x="10" y="10" width="7" height="190" rx="3" fill="#100c2b" />
        <path d="M13 26H62M14 44 34 26" stroke="#100c2b" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <div className="sway absolute top-[13%] left-[73%] w-[46%] -translate-x-1/2" style={{ transformOrigin: "50% 0", "--sway": "4deg", "--t": "5s" } as Vars}>
        <span className="flicker absolute top-[62%] left-1/2 size-[420%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_214_140/0.32),rgb(255_199_115/0.1)_50%,transparent)]" />
        <svg viewBox="0 0 40 74" className="relative block h-auto w-full">
          <path d="M20 0v14" stroke="#100c2b" strokeWidth="2" />
          <rect x="12" y="14" width="16" height="5" rx="2" fill="#100c2b" />
          <rect x="9" y="19" width="22" height="32" rx="9" fill="#ffc773" />
          <rect x="14" y="23" width="12" height="24" rx="5" fill="#ffe3a6" />
          <path d="M9 35h22" stroke="#e8a956" strokeWidth="1.2" strokeOpacity="0.7" />
          <rect x="13" y="51" width="14" height="4" rx="2" fill="#100c2b" />
          <path d="M20 55v9" stroke="#100c2b" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
