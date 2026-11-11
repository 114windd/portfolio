import { ImageResponse } from "next/og";

export const alt = "Korede Odubanjo, software engineer and growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stars = [
  [90, 60, 3],
  [210, 140, 2],
  [330, 50, 2.5],
  [470, 110, 2],
  [600, 40, 3],
  [720, 150, 2],
  [820, 70, 2],
  [1120, 210, 2.5],
  [1040, 300, 2],
  [560, 220, 1.8],
  [150, 250, 1.8],
  [940, 230, 2],
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(180deg, #05041a 0%, #141036 34%, #2c2163 66%, #4b3787 100%)",
          color: "#f6efdc",
          fontFamily: "serif",
        }}
      >
        {stars.map(([x, y, r]) => (
          <div
            key={`${x}-${y}`}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: r * 2,
              height: r * 2,
              borderRadius: 999,
              background: "#fbf3dc",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            right: 70,
            top: -30,
            width: 420,
            height: 420,
            borderRadius: 999,
            background: "radial-gradient(closest-side, rgba(251,243,220,0.2), rgba(187,169,255,0.06) 55%, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 210,
            top: 110,
            width: 140,
            height: 140,
            borderRadius: 999,
            background: "radial-gradient(circle at 36% 34%, #fffbf2, #fbf3dc 48%, #e7d8b6)",
          }}
        />
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          <path d="M0 430C140 390 260 380 380 400C520 424 640 360 780 356C920 352 1040 396 1200 380L1200 630 0 630Z" fill="#382a6d" />
          <path d="M0 500C160 470 300 462 440 480C600 500 720 460 860 452C980 446 1100 470 1200 466L1200 630 0 630Z" fill="#221a50" />
          <rect x="900" y="402" width="74" height="52" rx="6" fill="#1b1546" />
          <path d="M890 408C892 402 900 398 904 394L930 372C934 368 940 368 944 372L970 394C974 398 982 402 984 408C964 412 910 412 890 408Z" fill="#140f35" />
          <rect x="912" y="418" width="16" height="16" rx="4" fill="#ffc773" />
          <path d="M0 560C200 540 420 548 640 560C860 572 1040 548 1200 552L1200 630 0 630Z" fill="#0d0a22" />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 72,
            top: 92,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", fontSize: 34, color: "#bba9ff", fontFamily: "sans-serif" }}>
            Software engineer and growth
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 128, fontWeight: 700, lineHeight: 1, marginTop: 18 }}>
            <span>Korede</span>
            <span>Odubanjo</span>
          </div>
          <div style={{ display: "flex", fontSize: 28, marginTop: 28, color: "rgba(246,239,220,0.82)", fontFamily: "sans-serif" }}>
            BNB Chain · Pudgy Penguins · 80M+ views from one short-form campaign
          </div>
        </div>
      </div>
    ),
    size,
  );
}
