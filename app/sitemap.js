const BASE = "https://www.stringwebs.com";

// Rutas públicas del sitio (las privadas/cliente/internas no se indexan).
// /diagnostico, /cliente, /onboarding y /gym/gracias tienen noindex — no van aquí.
const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/Us", priority: 0.7, changeFrequency: "monthly" },
  { path: "/Services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/Services/1", priority: 0.7, changeFrequency: "monthly" },
  { path: "/Services/2", priority: 0.7, changeFrequency: "monthly" },
  { path: "/Services/3", priority: 0.7, changeFrequency: "monthly" },
  { path: "/Services/4", priority: 0.7, changeFrequency: "monthly" },
  { path: "/Proyects", priority: 0.7, changeFrequency: "monthly" },
  { path: "/quote", priority: 0.8, changeFrequency: "monthly" },
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
