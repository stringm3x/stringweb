import { NIVELES } from "./lib/niveles";

const BASE = "https://www.stringwebs.com";

// Rutas públicas del sitio (las privadas/internas no se indexan).
// /gym/gracias tiene noindex — no va aquí.
const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/sistemas", priority: 0.9, changeFrequency: "monthly" },
  ...NIVELES.map((n) => ({ path: `/sistemas/${n.slug}`, priority: 0.8, changeFrequency: "monthly" })),
  { path: "/nosotros", priority: 0.7, changeFrequency: "monthly" },
  { path: "/diagnostico", priority: 0.8, changeFrequency: "monthly" },
  { path: "/saas", priority: 0.9, changeFrequency: "weekly" },
  { path: "/gym/registro", priority: 0.8, changeFrequency: "monthly" },
  { path: "/aviso-de-privacidad", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terminos", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap() {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
