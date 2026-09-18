export const metadata = {
  title: "Proyectos",
  description:
    "Portafolio de STRING: landing pages, e-commerce, menús digitales y portafolios entregados para negocios en México.",
  alternates: {
    canonical: "https://www.stringwebs.com/proyectos",
  },
  openGraph: {
    title: "Proyectos | STRING",
    description:
      "Portafolio de sistemas digitales entregados por STRING para negocios en México.",
    url: "https://www.stringwebs.com/proyectos",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "STRING — Sistemas Digitales Estratégicos",
      },
    ],
  },
};

export default function ProyectsLayout({ children }) {
  return children;
}
