const BASE = "https://www.stringwebs.com";

// Rutas públicas del sitio (las privadas/cliente/internas no se indexan).
// /diagnostico, /cliente, /alta y /gym/gracias tienen noindex — no van aquí.
const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/nosotros", priority: 0.7, changeFrequency: "monthly" },
  { path: "/servicios", priority: 0.8, changeFrequency: "monthly" },
  { path: "/servicios/1", priority: 0.7, changeFrequency: "monthly" },
  { path: "/servicios/2", priority: 0.7, changeFrequency: "monthly" },
  { path: "/servicios/3", priority: 0.7, changeFrequency: "monthly" },
  { path: "/servicios/4", priority: 0.7, changeFrequency: "monthly" },
  { path: "/proyectos", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cotizacion", priority: 0.8, changeFrequency: "monthly" },
  { path: "/saas", priority: 0.9, changeFrequency: "weekly" },
  { path: "/gym/registro", priority: 0.8, changeFrequency: "monthly" },
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
