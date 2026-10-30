/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  compress: true,
  reactStrictMode: true,
  // Transiciones entre páginas con la API nativa View Transitions, sin
  // librerías (docs/calidad.md § 3). El fundido vive en globals.css.
  experimental: {
    viewTransition: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    // Rutas viejas al destino final, sin cadenas (CLAUDE.md § Rutas).
    // statusCode: 301 en vez de permanent: true porque permanent emite 308.
    const r301 = (source, destination) => ({ source, destination, statusCode: 301 });
    return [
      // /gym/empezar duplicaba los planes de Boaz; desde el lote 9a va
      // directo a /productos#boaz, sin pasar por /saas.
      r301("/gym/empezar", "/productos#boaz"),
      r301("/servicios", "/sistemas"),
      r301("/servicios/:id", "/sistemas"),
      r301("/Services", "/sistemas"),
      r301("/Services/:id", "/sistemas"),
      r301("/proyectos", "/#galeria"),
      r301("/Proyects", "/#galeria"),
      r301("/cotizacion", "/diagnostico"),
      r301("/quote", "/diagnostico"),
      r301("/Us", "/nosotros"),
      r301("/privacy-policy", "/aviso-de-privacidad"),
      r301("/terms", "/terminos"),
      // /saas se volvió /productos (lote 9a): Boaz vive en su bloque.
      r301("/saas", "/productos#boaz"),
    ];
  },
};

export default nextConfig;
