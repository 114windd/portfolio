"use client";

import { m, useTransform, type MotionValue } from "motion/react";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Cottage, CoverBox, Hill, place, Tree } from "./landscape";
import { Cloud, Fireflies, Moon, ShootingStar, Stars } from "./sky";

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

const box = { width: 1440, height: 560 };

const ridges = {
  distant:
    "M0 230C90 200 150 150 240 160C330 170 360 210 450 200C560 188 600 120 720 128C840 136 860 196 980 190C1100 184 1150 130 1260 140C1350 148 1400 180 1440 186",
  far: "M0 262C120 230 210 214 320 232C430 250 500 206 620 196C740 186 820 226 930 220C1040 214 1110 176 1220 184C1330 192 1390 222 1440 230",
  mid: "M0 352C140 320 260 300 380 316C500 332 600 350 700 340C780 332 820 300 880 298C960 296 1060 316 1160 330C1260 344 1380 334 1440 328",
  near: "M0 420C110 396 220 380 330 392C440 404 520 430 640 426C760 422 820 392 930 388C1040 384 1120 414 1230 420C1330 426 1390 410 1440 404",
  ground: "M0 488C160 470 300 482 460 494C620 506 760 478 920 476C1080 474 1220 498 1440 486",
};

const closed = (ridge: string) => `${ridge}L${box.width} ${box.height} 0 ${box.height}Z`;

/** The painted night behind the hero. Depth parallax only runs on wider screens and never with reduced motion. */
export function HeroScene({ progress }: { progress: MotionValue<number> }) {
  const wide = useMediaQuery("(min-width: 768px)");
  const reduce = usePrefersReducedMotion();
  const parallax = wide && !reduce;

  const sky = useTransform(progress, [0, 1], [0, 170]);
  const clouds = useTransform(progress, [0, 1], [0, 230]);
  const distant = useTransform(progress, [0, 1], [0, 120]);
  const far = useTransform(progress, [0, 1], [0, 86]);
  const mid = useTransform(progress, [0, 1], [0, 52]);
  const near = useTransform(progress, [0, 1], [0, 22]);

  const layer = (y: MotionValue<number>) => (parallax ? { y } : undefined);
  const layerClass = cn("absolute inset-0", parallax && "will-change-transform");

  return (
    <div aria-hidden className="sky pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <m.div className={layerClass} style={layer(sky)}>
        <Stars count={120} seed={4} className="inset-x-0 top-0 h-[64%]" />
        <Moon className="top-[25%] right-[5%] size-[clamp(56px,8vw,116px)] sm:top-[12%] sm:right-[9%]" />
        <ShootingStar className="top-[9%] left-[60%]" />
      </m.div>

      <m.div className={cn(layerClass, "max-sm:opacity-45")} style={layer(clouds)}>
        <Cloud className="top-[8%] left-[36%] w-[max(110px,10vw)] opacity-50 max-sm:hidden" style={{ "--t": "58s", "--drift": "3vw" }} />
        <Cloud className="top-[20%] left-[3%] w-[max(190px,23vw)] opacity-90" style={{ "--t": "64s", "--drift": "3vw" }} />
        <Cloud variant={1} className="top-[17%] right-[1%] w-[max(150px,15vw)]" style={{ "--t": "46s", "--d": "-8s", "--drift": "3vw" }} />
        <Cloud variant={1} className="top-[37%] left-[48%] w-[max(160px,19vw)] opacity-75 max-sm:hidden" style={{ "--t": "52s", "--d": "-20s", "--drift": "4vw" }} />
        <Cloud className="top-[31%] right-[16%] w-[max(120px,11vw)] opacity-55 max-sm:hidden" style={{ "--t": "70s", "--d": "-12s", "--drift": "3vw" }} />
        <Cloud className="top-[52%] -left-[5%] w-[max(220px,28vw)] opacity-60" style={{ "--t": "80s", "--d": "-30s", "--drift": "5vw" }} />
      </m.div>

      <div className="absolute inset-x-0 bottom-0 h-[var(--scene-h)]">
        <CoverBox {...box}>
          <m.div className={layerClass} style={layer(distant)}>
            <Hill {...box} d={closed(ridges.distant)} fill="url(#hill-distant)" />
          </m.div>
          <m.div className={layerClass} style={layer(far)}>
            <Hill {...box} d={closed(ridges.far)} fill="url(#hill-far)" rim={ridges.far} />
          </m.div>
          <m.div className={layerClass} style={layer(mid)}>
            <Hill {...box} d={closed(ridges.mid)} fill="url(#hill-mid)" />
            <Tree kind="tall" tone="mid" style={place(242, 316, 28, box)} />
            <Tree tone="mid" style={place(290, 316, 70, box)} />
            <Tree tone="mid" style={place(797, 322, 56, box)} />
            <Cottage style={place(880, 302, 116, box)} />
            <Tree tone="mid" style={place(984, 308, 62, box)} />
            <Tree kind="tall" tone="mid" style={place(1013, 312, 26, box)} />
          </m.div>
          <m.div className={layerClass} style={layer(near)}>
            <Hill {...box} d={closed(ridges.near)} fill="url(#hill-near)" />
            <Tree sway style={{ ...place(330, 398, 120, box), "--t": "7s" } as Vars} />
            <Tree kind="tall" style={place(393, 404, 40, box)} />
            <Tree sway style={{ ...place(640, 432, 90, box), "--t": "8.5s", "--d": "-2s" } as Vars} />
            <Tree sway style={{ ...place(930, 394, 96, box), "--t": "7.6s", "--d": "-4s" } as Vars} />
            <Tree kind="tall" style={place(1264, 426, 36, box)} />
            <Tree sway style={{ ...place(1333, 424, 110, box), "--t": "9s", "--d": "-1s" } as Vars} />
          </m.div>
          <div className="absolute inset-0">
            <Hill {...box} d={closed(ridges.ground)} fill="url(#hill-ground)" />
          </div>
        </CoverBox>
        <Fireflies count={14} seed={21} mobileCount={7} className="inset-x-0 top-[30%] bottom-0" />
      </div>
    </div>
  );
}
