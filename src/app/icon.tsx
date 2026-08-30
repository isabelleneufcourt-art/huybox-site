import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon généré dynamiquement (cube du logo HUYBOX) — à remplacer par le
// fichier logo officiel du client si un favicon dédié est fourni.
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
          <polygon points="26,0 52,13 26,26 0,13" fill="#1b2740" />
          <polygon points="0,13 26,26 26,52 0,39" fill="#c41e2a" />
          <polygon points="52,13 26,26 26,52 52,39" fill="#1b2740" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
