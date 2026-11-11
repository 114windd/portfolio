import { fireflies, starField } from "@/lib/scene";
import { cn } from "@/lib/utils";

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

const twinkle: Vars[] = [{}, { "--t": "4.2s", "--d": "-1.3s" }, { "--t": "6.5s", "--d": "-3.1s" }];

export function Stars({ count, seed, className }: { count: number; seed: number; className?: string }) {
  const stars = starField(count, seed);
  return (
    <div aria-hidden className={cn("pointer-events-none absolute", className)}>
      {twinkle.map((style, group) => (
        <div key={group} className={cn("absolute inset-0", group > 0 && "twinkle")} style={style}>
          {stars
            .filter((star) => star.group === group)
            .map((star, i) => (
              <span
                key={i}
                className={cn("absolute rounded-full bg-moon", star.r > 1.3 && "shadow-[0_0_6px_1px_rgb(251_243_220/0.5)]")}
                style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.r * 2, height: star.r * 2 }}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

export function Moon({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute", className)}>
      <div className="absolute -inset-[140%] rounded-full bg-[radial-gradient(closest-side,rgb(251_243_220/0.17),rgb(187_169_255/0.07)_50%,transparent)]" />
      <div className="relative size-full rounded-full bg-[radial-gradient(circle_at_36%_34%,#fffbf2,#fbf3dc_48%,#e7d8b6)]">
        <span className="absolute top-[24%] left-[52%] size-[18%] rounded-full bg-[#eadcbb]" />
        <span className="absolute top-[56%] left-[26%] size-[24%] rounded-full bg-[#ecdfc0]" />
        <span className="absolute top-[62%] left-[62%] size-[11%] rounded-full bg-[#e8d9b8]" />
      </div>
    </div>
  );
}

export function ShootingStar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "shooting-star pointer-events-none absolute h-[2px] w-28 rounded-full bg-[linear-gradient(90deg,#fbf3dc,rgb(251_243_220/0))]",
        className,
      )}
    />
  );
}

const cloudPaths = [
  {
    viewBox: "0 0 240 90",
    d: "M30 78C12 78 4 62 16 54C12 40 28 30 42 36C46 20 68 12 82 24C92 6 124 4 136 22C148 12 172 16 176 34C192 28 212 38 208 54C226 56 232 74 214 78C170 84 74 84 30 78Z",
  },
  {
    viewBox: "0 0 220 84",
    d: "M24 70C8 70 6 54 20 50C22 38 40 34 50 42C58 28 80 26 90 38C100 26 120 26 128 38C138 30 156 32 160 44C176 40 196 46 194 58C210 60 212 72 196 74C150 80 70 78 24 70Z",
  },
];

/** A night cloud, lit from below by the town and the moon. */
export function Cloud({
  variant = 0,
  className,
  style,
}: {
  variant?: 0 | 1;
  className?: string;
  style?: Vars;
}) {
  const shape = cloudPaths[variant];
  return (
    <div aria-hidden className={cn("drift pointer-events-none absolute", className)} style={style}>
      <svg viewBox={shape.viewBox} className="block h-auto w-full">
        <path d={shape.d} fill="url(#cloud-lit)" />
      </svg>
    </div>
  );
}

export function Fireflies({
  count,
  seed,
  mobileCount = count,
  className,
}: {
  count: number;
  seed: number;
  mobileCount?: number;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute", className)}>
      {fireflies(count, seed).map((fly, i) => (
        <span
          key={i}
          className={cn(
            "firefly absolute size-[18px] rounded-full bg-[radial-gradient(circle,#fff6cf_0_2px,rgb(255_214_120/0.55)_3px,rgb(255_199_115/0)_9px)]",
            i >= mobileCount && "max-sm:hidden",
          )}
          style={
            {
              left: `${fly.x}%`,
              top: `${fly.y}%`,
              "--path": `firefly-${fly.path}`,
              "--t": `${fly.duration}s`,
              "--d": `-${fly.delay}s`,
            } as Vars
          }
        />
      ))}
    </div>
  );
}
