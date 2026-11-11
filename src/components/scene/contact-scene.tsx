import { CoverBox, Hill, LanternPost, place, Tree } from "./landscape";
import { Fireflies } from "./sky";

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

const box = { width: 1440, height: 420 };

const ridges = {
  far: "M0 190C150 160 280 150 420 170C560 190 640 150 780 140C920 130 1000 170 1140 166C1280 162 1360 140 1440 150",
  near: "M0 300C180 280 340 270 500 284C660 298 760 262 900 240C1000 226 1080 236 1180 256C1300 280 1380 286 1440 282",
  ground: "M0 360C200 346 420 352 640 362C860 372 1100 350 1440 356",
};

const closed = (ridge: string) => `${ridge}L${box.width} ${box.height} 0 ${box.height}Z`;

/** The hill at the foot of the page: a tree, a lantern post and fireflies. The parent sets --scene-h. */
export function ContactScene() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <CoverBox {...box}>
        <Hill {...box} d={closed(ridges.far)} fill="url(#hill-far)" rim={ridges.far} />
        <Hill {...box} d={closed(ridges.near)} fill="url(#hill-near)" />
        <Tree style={place(560, 292, 70, box)} />
        <LanternPost style={place(764, 272, 60, box)} />
        <Tree sway style={{ ...place(958, 242, 150, box), "--t": "8s", "--sway": "1.5deg" } as Vars} />
        <Tree kind="tall" style={place(1040, 242, 30, box)} />
        <Tree kind="tall" style={place(300, 290, 34, box)} />
        <Hill {...box} d={closed(ridges.ground)} fill="url(#hill-ground)" />
      </CoverBox>
      <Fireflies count={10} seed={33} mobileCount={6} className="inset-x-0 top-[25%] bottom-[15%]" />
    </div>
  );
}
