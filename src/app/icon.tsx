import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon généré dynamiquement (cube du logo HUYBOX, couleurs exactes de
// la charte cliente : #0f273f / #d70c2a).
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 6,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 52 52">
          <polygon points="26,0 52,13 26,26 0,13" fill="#0f273f" />
          <polygon points="0,13 26,26 26,52 0,39" fill="#d70c2a" />
          <polygon points="52,13 26,26 26,52 52,39" fill="#0f273f" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
