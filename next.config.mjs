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
    return [
      {
        // /gym/empezar duplicaba los planes que ya muestra /saas#gym-detalle
        // (con más contexto: problema, comparativa, caso real) — se consolida
        // en un solo lugar en vez de mantener dos páginas de precios.
        source: "/gym/empezar",
        destination: "/saas#gym-detalle",
        permanent: true,
      },
      // Rutas migradas a español (Tarea 1). statusCode: 301 en vez de
      // permanent: true porque permanent emite 308, no 301.
      {
        source: "/Proyects",
        destination: "/proyectos",
        statusCode: 301,
      },
      {
        source: "/Services",
        destination: "/servicios",
        statusCode: 301,
      },
      {
        source: "/Services/:id",
        destination: "/servicios/:id",
        statusCode: 301,
      },
      {
        source: "/Us",
        destination: "/nosotros",
        statusCode: 301,
      },
      {
        source: "/quote",
        destination: "/cotizacion",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
