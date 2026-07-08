import { Geist, Anton, Ubuntu } from "next/font/google";
import { Providers } from "./provider";
import "./globals.css";

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
  metadataBase: new URL("https://www.stringwebs.com"),
  title: {
    default: "STRING — Sistemas Digitales Estratégicos",
    template: "%s | STRING",
  },
  description:
    "Agencia de sistemas digitales en México. CRM para gimnasios, e-commerce y automatizaciones.",
  keywords: [
    "sistemas digitales",
    "captación de clientes",
    "automatización de ventas",
    "sistema de conversión",
    "landing page que convierte",
    "CRM automatizado",
    "agencia digital México",
    "sistemas de captación CDMX",
    "automatización WhatsApp",
    "Next.js México",
  ],
  authors: [{ name: "STRING", url: "https://www.stringwebs.com/" }],
  icons: {
    icon: "/ico.png",
    shortcut: "/ico.png",
    apple: "/ico.png",
  },
  openGraph: {
    title: "STRING — Sistemas Digitales Estratégicos",
    description:
      "Agencia de sistemas digitales en México. CRM para gimnasios, e-commerce y automatizaciones.",
    url: "https://www.stringwebs.com/",
    siteName: "STRING",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "STRING — Sistemas Digitales Estratégicos",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STRING — Sistemas Digitales Estratégicos",
    description:
      "Agencia de sistemas digitales en México. CRM para gimnasios, e-commerce y automatizaciones.",
    images: ["/og-image.png"],
    creator: "@stringmx",
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
  verification: {
    google: "tu-codigo-de-verificacion",
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
    <html lang="es-MX" className="dark">
      <head>
        <link rel="apple-touch-icon" href="/ico.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#50ff05" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="geo.region" content="MX" />
        <meta name="geo.placename" content="Ciudad de México" />
      </head>
      <body
        className={`${geistSans.variable} ${anton.variable} ${ubuntu.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
