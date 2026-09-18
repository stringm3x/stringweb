import servicios from "../data";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const servicio = servicios.find((s) => s.id === id);

  if (!servicio) {
    return { title: "Servicio no encontrado" };
  }

  const url = `https://www.stringwebs.com/servicios/${id}`;
  const title = `${servicio.service} — ${servicio.title2}`;

  return {
    title,
    description: servicio.intro,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | STRING`,
      description: servicio.intro,
      url,
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
}

export default function ServiceDetailLayout({ children }) {
  return children;
}
