import { notFound } from "next/navigation";
import { PaginaGiroGrande } from "@/app/components/tu-negocio/PaginaGiroGrande";
import { PaginaGiroLocal } from "@/app/components/tu-negocio/PaginaGiroLocal";
import { GIROS, giroPorSlug } from "@/app/lib/giros";

// /tu-negocio/<giro> (lote 11): los nueve giros se generan al construir, cada
// uno con la plantilla de su grupo; cualquier otro es 404. /tu-negocio/empresas
// es su propia página.
export const dynamicParams = false;

export function generateStaticParams() {
  return GIROS.map((g) => ({ giro: g.slug }));
}

// "{Giro} · Tu negocio · STRING"; descripción, el titular y la cita del dueño.
export async function generateMetadata({ params }) {
  const { giro: slug } = await params;
  const giro = giroPorSlug(slug);
  if (!giro) return {};
  const url = `https://www.stringwebs.com/tu-negocio/${giro.slug}`;
  const description = `${giro.titular} “${giro.cita}”`;
  return {
    title: `${giro.nombre} · Tu negocio`,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${giro.nombre} · Tu negocio · STRING`, description, url },
  };
}

export default async function GiroPage({ params }) {
  const { giro: slug } = await params;
  const giro = giroPorSlug(slug);
  if (!giro) notFound();
  return giro.grupo === "local" ? <PaginaGiroLocal giro={giro} /> : <PaginaGiroGrande giro={giro} />;
}
