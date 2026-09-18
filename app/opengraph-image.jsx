import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const alt = "STRING — Sistemas Digitales Estratégicos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAGLINE =
  "NO NECESITAS MÁS SEGUIDORES. NECESITAS UN SISTEMA QUE CONVIERTA.";

export default async function Image() {
  const antonFont = fs.readFileSync(
    path.join(process.cwd(), "app/fonts/Anton-Regular.ttf")
  );
  const wordmark = fs.readFileSync(
    path.join(process.cwd(), "public/marca/string-wordmark-horizontal.png")
  );
  const wordmarkSrc = `data:image/png;base64,${wordmark.toString("base64")}`;

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
          backgroundColor: "#000000",
          padding: "80px",
          gap: "48px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={wordmarkSrc} width={360} height={185} alt="STRING" />
        <div
          style={{
            width: 980,
            fontFamily: "Anton",
            textTransform: "uppercase",
            color: "#50ff05",
            fontSize: 48,
            lineHeight: 1.15,
            textAlign: "center",
          }}
        >
          {TAGLINE}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Anton",
          data: antonFont,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
