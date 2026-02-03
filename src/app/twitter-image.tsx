import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #364f6b 0%, #2c3e50 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 760 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#3fc1c9" }}>
            Leap Transformation Services
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05 }}>
            Data &amp; AI
            <br />
            that actually ships
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.25, opacity: 0.92 }}>
            Financial services consulting—from strategy to production.
          </div>
        </div>
        <div
          style={{
            width: 360,
            height: 360,
            borderRadius: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: 2 }}>LEAP</div>
        </div>
      </div>
    ),
    size
  );
}

