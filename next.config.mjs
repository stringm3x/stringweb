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
    ];
  },
};

export default nextConfig;
