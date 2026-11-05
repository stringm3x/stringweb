import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { LaminaBoaz } from "@/app/components/productos/LaminaBoaz";
import { TAMANO } from "@/app/lib/imagenCompartir";

// Imagen para compartir de /boaz (lote 18): la identidad de Boaz sobre papel.
// El logotipo real (public/marca) y la lámina real (LaminaBoaz), sin nada
// dibujado nuevo; debajo del logotipo, "El sistema para gimnasios" (docs/textos.md
// § Boaz). El texto va en Geist: el generador no lee woff2, así que Archivo y
// Ubuntu Mono no entran aquí.
export const alt = "Boaz, el sistema para gimnasios, con la lámina de la columna y el disco.";
export const size = TAMANO;
export const contentType = "image/png";

const PAPEL = "#F4F2EC";
const TINTA = "#1A1A1A";

const comoImagen = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

// La lámina de la página, pasada a texto SVG sin react-dom/server (Next no lo
// deja importar en app/). Las cotas (<text>) se quedan fuera: el generador no
// pinta texto dentro de un SVG y en la página ya son solo dibujo.
const atributo = (nombre) => (nombre === "viewBox" ? nombre : nombre.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`));
function aSvg(nodo) {
  if (nodo == null || typeof nodo === "boolean") return "";
  if (typeof nodo === "string" || typeof nodo === "number") return String(nodo);
  if (Array.isArray(nodo)) return nodo.map(aSvg).join("");
  const { type, props } = nodo;
  if (type === "text") return "";
  const { children, className, style, ...resto } = props;
  const attrs = Object.entries(resto)
    .filter(([k, v]) => !k.startsWith("aria-") && v !== undefined && v !== false)
    .map(([k, v]) => ` ${atributo(k)}="${String(v).replaceAll("currentColor", TINTA)}"`)
    .join("");
  const extra = type === "svg" ? ' xmlns="http://www.w3.org/2000/svg"' : "";
  return `<${type}${extra}${attrs}>${aSvg(children)}</${type}>`;
}

export default async function Image() {
  const raiz = process.cwd();
  const geist = fs.readFileSync(path.join(raiz, "app/fonts/Geist-SemiBold.woff"));
  const logotipo = fs.readFileSync(path.join(raiz, "public/marca/boaz-logotipo-positivo.svg"), "utf8");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: PAPEL,
          padding: "0 64px 0 96px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={comoImagen(logotipo)} width={492} height={130} alt="Boaz" />
          <div
            style={{
              fontFamily: "Geist",
              fontWeight: 600,
              color: TINTA,
              fontSize: 52,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
            }}
          >
            El sistema para gimnasios
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={comoImagen(aSvg(LaminaBoaz({ decorativa: true })))} width={400} height={600} alt="" />
      </div>
    ),
    {
      ...TAMANO,
      fonts: [{ name: "Geist", data: geist, style: "normal", weight: 600 }],
    }
  );
}
