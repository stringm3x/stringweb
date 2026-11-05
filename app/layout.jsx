import localFont from "next/font/local";
import Medicion from "./components/Medicion";
import { PORTADA } from "./lib/compartir";
import "./globals.css";
import "./salas.css";

// Título y descripción por omisión: los de la portada (lote 18).
const TITULO = PORTADA.titulo;
const DESCRIPCION = PORTADA.descripcion;

// Geist para titulares y texto; Geist Mono para cifras, precios y
// etiquetas. Anton no se carga: el logo la trae a trazo en su SVG.
// Las fuentes viven en app/fonts (paquete oficial `geist` 1.8.2, OFL): una
// variable por familia, recortada al rango latin de Google Fonts y a los
// pesos que usa el sitio, para que el build no dependa de la red y pesen
// menos que cinco archivos fijos.
const geistSans = localFont({
  variable: "--font-sans",
  src: "./fonts/Geist-Variable-latin.woff2",
  weight: "400 600",
  style: "normal",
});

const geistMono = localFont({
  variable: "--font-mono",
  src: "./fonts/GeistMono-Variable-latin.woff2",
  weight: "400 500",
  style: "normal",
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
        <meta name="geo.region" content="MX" />
        <meta name="geo.placename" content="Ciudad de México" />
      </head>
      <body
        className="font-sans bg-fondo text-texto antialiased"
      >
        {children}
        <Medicion />
      </body>
    </html>
  );
}
