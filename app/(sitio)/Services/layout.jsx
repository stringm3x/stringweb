const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Desarrollo de sistemas digitales de conversión",
  provider: {
    "@type": "Organization",
    name: "STRING",
    url: "https://www.stringwebs.com",
  },
  areaServed: {
    "@type": "Country",
    name: "México",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sistemas STRING",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Sistema de Conversión — Nivel 1",
        url: "https://www.stringwebs.com/Services/1",
        priceCurrency: "MXN",
        price: "8000",
      },
      {
        "@type": "Offer",
        name: "Sistema de Captación — Nivel 2",
        url: "https://www.stringwebs.com/Services/2",
        priceCurrency: "MXN",
        price: "18000",
      },
      {
        "@type": "Offer",
        name: "Sistema Automatizado — Nivel 3",
        url: "https://www.stringwebs.com/Services/3",
        priceCurrency: "MXN",
        price: "28000",
      },
      {
        "@type": "Offer",
        name: "Sistema Especializado — Nivel 4",
        url: "https://www.stringwebs.com/Services/4",
        priceCurrency: "MXN",
        price: "40000",
      },
    ],
  },
};

export const metadata = {
  title: "Servicios",
  description:
    "4 niveles de sistemas digitales de conversión para negocios en México, desde $8,000 MXN: captación, automatización y sistemas especializados a medida.",
  alternates: {
    canonical: "https://www.stringwebs.com/Services",
  },
  openGraph: {
    title: "Servicios | STRING",
    description:
      "4 niveles de sistemas digitales de conversión, desde $8,000 MXN. Diagnóstico gratuito en 24h.",
    url: "https://www.stringwebs.com/Services",
  },
};

export default function ServicesLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {children}
    </>
  );
}
