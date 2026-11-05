// Vercel Analytics y Speed Insights no miden /interno (CLAUDE.md § Rutas):
// ni visitas ni métricas de la herramienta privada salen del navegador.
// /internos u otras rutas que solo empiecen igual sí se miden.
const INTERNO = /^\/interno(\/|$)/;

export function esInterno(url) {
  try {
    return INTERNO.test(new URL(url, "https://www.stringwebs.com").pathname);
  } catch {
    // Si la URL no se puede leer, mejor no mandarla.
    return true;
  }
}

export const descartarInterno = (evento) => (esInterno(evento?.url) ? null : evento);
