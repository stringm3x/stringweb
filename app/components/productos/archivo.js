import localFont from "next/font/local";

// Archivo 900 al 62 % de ancho: la letra de títulos de Boaz. Solo la usa
// /productos; se carga sin precarga y con swap para no pesar en el LCP (el
// h1 de la página va en Geist). Instancia estática de Google Fonts (OFL),
// solo latín, en app/fonts.
export const archivo = localFont({
  src: "../../fonts/Archivo-900-62-latin.woff2",
  weight: "900",
  style: "normal",
  display: "swap",
  preload: false,
  declarations: [{ prop: "font-stretch", value: "62%" }],
});
