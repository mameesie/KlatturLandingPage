import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Klattur";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const fontData = await readFile(
    path.join(process.cwd(), "public", "fonts", "Smooth_Circulars.otf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "64px",
          background:
            "linear-gradient(135deg, rgb(18, 53, 64) 0%, rgb(86, 113, 12) 48%, rgb(153, 204, 143) 100%)",
          color: "white",
          fontFamily: "SmoothCirculars",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "2px solid rgba(255, 255, 255, 0.25)",
            borderRadius: "36px",
            padding: "48px",
            background: "rgba(18, 53, 64, 0.2)",
          }}
        >
          <div style={{ fontSize: 42, letterSpacing: 4, textTransform: "uppercase" }}>Klattur</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "760px" }}>
            <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.05 }}>
              Less mind clutter, more peace of mind
            </div>
            <div style={{ fontSize: 32, lineHeight: 1.35, color: "rgba(255, 255, 255, 0.92)" }}>
              Ten minutes. One thought. A guided way to examine stressful thoughts.
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "SmoothCirculars",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
