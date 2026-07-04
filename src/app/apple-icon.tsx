import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#06070a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 132,
            height: 132,
            borderRadius: 32,
            background: "linear-gradient(135deg, #2ee6c0 0%, #22d3ee 100%)",
            color: "#06070a",
            fontSize: 60,
            fontWeight: 800,
            letterSpacing: "-0.06em",
            fontFamily: "sans-serif",
          }}
        >
          HDA
        </div>
      </div>
    ),
    { ...size }
  );
}
