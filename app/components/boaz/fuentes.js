import localFont from "next/font/local";
import { Ubuntu_Mono } from "next/font/google";

// Archivo 900 al 62 %: el mismo archivo local del lote 9a. En /boaz y /gym
// el titular en Archivo está arriba de todo, así que aquí sí se precarga:
// sin precarga llega tarde, el titular cambia de líneas y mueve la página.
export const archivo = localFont({
  src: "../../fonts/Archivo-900-62-latin.woff2",
  weight: "900",
  style: "normal",
  display: "swap",
  preload: true,
  declarations: [{ prop: "font-stretch", value: "62%" }],
});

// Ubuntu Mono: etiquetas, precios y planes de Boaz (G). Solo se carga en
// /boaz y /gym, con swap y sin precarga: ningún texto en mono es el LCP.
export const ubuntuMono = Ubuntu_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-boaz-mono",
});

// Clases que comparten /boaz y /gym. Titulares en Archivo 900 al 62 %
// (la clase de `archivo` y este estilo), etiquetas en Ubuntu Mono.
export const ARCHIVO = { fontStretch: "62%" };
export const ETIQUETA_BOAZ = "font-boaz-mono text-[13px] uppercase leading-[1.4] tracking-[0.18em] text-texto-suave";
