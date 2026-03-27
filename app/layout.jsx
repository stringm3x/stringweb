import { Geist, Anton, Ubuntu } from "next/font/google";
import { Providers } from "./provider";
import "./globals.css";
import Footer from "./Footer";
import Header from "./header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton-sans",
  weight: "400",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu-sans",
  weight: "500",
  subsets: ["latin"],
});

export const metadata = {
  // Título y descripción principal
  title: {
    default: "STRING | Desarrollo Web Profesional",
    template: "%s | STRING - Desarrollo Web",
  },
  description:
    "STRING: Agencia de desarrollo web en México. Creamos sitios web profesionales, tiendas online y aplicaciones web a medida. Diseño UX/UI, SEO y desarrollo con Codigo puro.",

  // Palabras clave para SEO
  keywords: [
    "desarrollo web",
    "diseño web",
    "crear página web",
    "desarrollador web",
    "páginas web profesionales",
    "tiendas online",
    "e-commerce",
    "aplicaciones web",
    "React",
    "Next.js",
    "México",
    "CDMX",
  ],

  // Autor
  authors: [{ name: "STRING", url: "https://www.stringwebs.com/" }],

  // Iconos
  icons: {
    icon: "/ico.png",
    shortcut: "/ico.png",
    apple: "/ico.png",
  },

  // Open Graph (para redes sociales)
  openGraph: {
    title: "STRING | Desarrollo Web Profesional",
    description:
      "Creamos experiencias digitales que transforman negocios. Desarrollo web a medida con código puro.",
    url: "https://www.stringwebs.com/",
    siteName: "STRING",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "STRING - Desarrollo Web Profesional",
      },
    ],
    locale: "es_MX",
    type: "website",
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "STRING | Desarrollo Web Profesional",
    description: "Creamos experiencias digitales que transforman negocios.",
    images: ["/og-image.png"],
    creator: "@stringmx",
  },

  // Robots (control de indexación)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verificación de Google Search Console
  verification: {
    google: "tu-codigo-de-verificacion", // Agrega tu código de Search Console
  },

  // Canonical URL
  alternates: {
    canonical: "https://www.stringwebs.com/",
    languages: {
      "es-MX": "https://www.stringwebs.com/",
    },
  },

  // Otros metadatos útiles
  category: "technology",
  generator: "Next.js",
  applicationName: "STRING",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX" className="dark">
      <head>
        {/* Favicon adicional para diferentes dispositivos */}
        <link rel="apple-touch-icon" href="/ico.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Meta tags adicionales útiles */}
        <meta name="theme-color" content="#50ff05" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        {/* Geo tags para México */}
        <meta name="geo.region" content="MX" />
        <meta name="geo.placename" content="Ciudad de México" />
      </head>
      <body
        className={`${geistSans.variable} ${anton.variable} ${ubuntu.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
