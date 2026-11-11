import { Cloud, Stars } from "./sky";

const clouds = [
  { top: "3%", side: { right: "4%" }, variant: 0, width: "max(180px,20vw)", opacity: 0.2, t: "90s" },
  { top: "21%", side: { left: "2%" }, variant: 1, width: "max(200px,24vw)", opacity: 0.15, t: "110s" },
  { top: "43%", side: { right: "-3%" }, variant: 1, width: "max(220px,26vw)", opacity: 0.14, t: "100s" },
  { top: "64%", side: { left: "-4%" }, variant: 0, width: "max(200px,22vw)", opacity: 0.16, t: "120s" },
  { top: "85%", side: { right: "8%" }, variant: 0, width: "max(160px,16vw)", opacity: 0.16, t: "95s" },
] as const;

/** The night sky behind the sections between the hero and contact, from the hero's hills down to the contact sky. */
export function NightBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[linear-gradient(180deg,var(--night)_0%,#110d2c_30%,#150f35_70%,var(--night)_100%)]"
    >
      <Stars count={220} seed={9} className="inset-0" />
      {clouds.map((cloud, i) => (
        <Cloud
          key={cloud.top}
          variant={cloud.variant}
          className="max-sm:hidden"
          style={{
            top: cloud.top,
            ...cloud.side,
            width: cloud.width,
            opacity: cloud.opacity,
            "--t": cloud.t,
            "--d": `-${i * 17}s`,
            "--drift": "7vw",
          }}
        />
      ))}
    </div>
  );
}
