import { ImageResponse } from "next/og";

export const alt = "Korede Odubanjo, software engineer and growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "radial-gradient(circle at 80% 10%, #6d28d9 0%, #1e0b3a 40%, #07050b 75%)",
          color: "#f4f1fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#c4b5fd", letterSpacing: 4 }}>
          SOFTWARE ENGINEER / GROWTH
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, fontWeight: 800, lineHeight: 0.9, letterSpacing: -6 }}>
          <span>Korede</span>
          <span style={{ color: "#a78bfa" }}>Odubanjo</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "rgba(244,241,250,0.8)" }}>
          BNB Chain · Pudgy Penguins · 80M+ views from one short-form campaign
        </div>
      </div>
    ),
    size,
  );
}
