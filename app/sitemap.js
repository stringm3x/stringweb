import { GIROS } from "./lib/giros";
import { NIVELES } from "./lib/niveles";

const BASE = "https://www.stringwebs.com";

// Rutas públicas del sitio (las privadas/internas no se indexan).
// /gym/gracias tiene noindex — no va aquí.
//
// lastmod real (lote 18): la fecha del último lote que cambió lo que la ruta
// muestra o dice a Google. Fija, no la del build: cuando un lote cambie una
// página, se actualiza aquí su fecha a mano.
const LOTE_13 = "2026-11-04"; // legales y /diagnostico: su descripción propia
const LOTE_17 = "2026-11-04"; // /tu-negocio: los precios con IVA de las tarjetas
const LOTE_18 = "2026-11-04"; // títulos, descripciones y JSON-LD
const LOTE_21 = "2026-11-06"; // /boaz: Escala próximamente y Programa Fundadores
// TODO(lote): número y fecha al mezclar (orden de fusión).
const PAGOS = "2026-11-06"; // portada y fichas de nivel: formas de pago y continuidad por nivel

const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly", lastmod: PAGOS },
  { path: "/sistemas", priority: 0.9, changeFrequency: "monthly", lastmod: LOTE_18 },
  ...NIVELES.map((n) => ({ path: `/sistemas/${n.slug}`, priority: 0.8, changeFrequency: "monthly", lastmod: PAGOS })),
  { path: "/tu-negocio", priority: 0.9, changeFrequency: "monthly", lastmod: LOTE_17 },
  { path: "/tu-negocio/empresas", priority: 0.8, changeFrequency: "monthly", lastmod: LOTE_18 },
  ...GIROS.map((g) => ({ path: `/tu-negocio/${g.slug}`, priority: 0.8, changeFrequency: "monthly", lastmod: LOTE_18 })),
  { path: "/nosotros", priority: 0.7, changeFrequency: "monthly", lastmod: LOTE_18 },
  { path: "/diagnostico", priority: 0.8, changeFrequency: "monthly", lastmod: LOTE_13 },
  { path: "/productos", priority: 0.9, changeFrequency: "weekly", lastmod: LOTE_18 },
  { path: "/boaz", priority: 0.9, changeFrequency: "weekly", lastmod: LOTE_21 },
  // index, follow desde el lote 18: se queda.
  { path: "/gym/registro", priority: 0.8, changeFrequency: "monthly", lastmod: LOTE_18 },
  { path: "/aviso-de-privacidad", priority: 0.3, changeFrequency: "yearly", lastmod: LOTE_13 },
  { path: "/terminos", priority: 0.3, changeFrequency: "yearly", lastmod: LOTE_13 },
];

export default function sitemap() {
  return ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: r.lastmod,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
