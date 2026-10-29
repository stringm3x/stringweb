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
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    // Rutas viejas al destino final, sin cadenas (CLAUDE.md § Rutas).
    // statusCode: 301 en vez de permanent: true porque permanent emite 308.
    const r301 = (source, destination) => ({ source, destination, statusCode: 301 });
    return [
      {
        // /gym/empezar duplicaba los planes que ya muestra /saas#planes
        // (con más contexto: problema, comparativa, caso real) — se consolida
        // en un solo lugar en vez de mantener dos páginas de precios.
        // Sigue en 308: deuda técnica (docs/estado.md).
        source: "/gym/empezar",
        destination: "/saas#planes",
        permanent: true,
      },
      r301("/servicios", "/#niveles"),
      r301("/servicios/:id", "/#niveles"),
      r301("/Services", "/#niveles"),
      r301("/Services/:id", "/#niveles"),
      r301("/proyectos", "/#galeria"),
      r301("/Proyects", "/#galeria"),
      r301("/cotizacion", "/diagnostico"),
      r301("/quote", "/diagnostico"),
      r301("/Us", "/nosotros"),
      r301("/privacy-policy", "/aviso-de-privacidad"),
      r301("/terms", "/terminos"),
    ];
  },
};

export default nextConfig;
