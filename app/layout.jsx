import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Grano } from "./components/Grano";
import { CORREO, WHATSAPP_TELEFONO } from "./lib/contacto";
import "./globals.css";

// Título y descripción de docs/textos.md § Textos que faltaban.
const TITULO = "STRING — Software hecho con oficio. Y con arte.";
const DESCRIPCION =
  "Taller de software en la Ciudad de México. Sistemas que contestan, ordenan y trabajan por tu negocio, desde un local hasta una empresa grande.";

// Las redes sociales solo viven aquí (sameAs), no en el pie.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "STRING",
  url: "https://www.stringwebs.com",
  logo: "https://www.stringwebs.com/logo/string-noche.svg",
  description: DESCRIPCION,
  email: CORREO,
  telephone: WHATSAPP_TELEFONO,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ciudad de México",
    addressCountry: "MX",
  },
  areaServed: "MX",
  sameAs: [
    "https://www.instagram.com/stringwebmx/",
    "https://www.facebook.com/profile.php?id=61576042750915",
    "https://www.tiktok.com/@stringmx",
  ],
};

// Geist para titulares y texto; Geist Mono para cifras, precios y
// etiquetas. Anton no se carga: el logo la trae a trazo en su SVG.
const geistSans = Geist({
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.stringwebs.com"),
  title: {
    default: TITULO,
    template: "%s · STRING",
  },
  description: DESCRIPCION,
  authors: [{ name: "STRING", url: "https://www.stringwebs.com/" }],
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
    url: "https://www.stringwebs.com/",
    siteName: "STRING",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
  },
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
  alternates: {
    canonical: "https://www.stringwebs.com/",
    languages: {
      "es-MX": "https://www.stringwebs.com/",
    },
  },
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
    <html lang="es-MX" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="geo.region" content="MX" />
        <meta name="geo.placename" content="Ciudad de México" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className="font-sans bg-fondo text-texto antialiased"
      >
        {children}
        <Grano />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
