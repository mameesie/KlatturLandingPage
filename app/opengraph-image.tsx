import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import BuzzBoos from "@/public/BuzzBoos";

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
  const noNameData = await readFile(
    path.join(process.cwd(), "public", "fonts", "no_name_37_Regular.otf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#98BDBD",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
            width: "100%",
            borderRadius: "36px",
            background: "#98BDBD",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              flex: 1,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 112,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginLeft: "60px",
                marginTop: "148px",
                fontFamily: "SmoothCirculars",
              }}
            >
              Klattur
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: "58vw" }}>
              <div
                style={{
                  fontSize: 60,
                  fontWeight: 700,
                  marginBottom: "120px",
                  fontFamily: "NoName",
                  marginLeft: "60px",
                  lineHeight: 1.05,
                }}
              >
                Less mind clutter, more peace of mind
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "320px",
              height: "320px",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <BuzzBoos style={{ marginRight: "240px", width: "125%", height: "158%" }} />
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
        {
          name: "NoName",
          data: noNameData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
