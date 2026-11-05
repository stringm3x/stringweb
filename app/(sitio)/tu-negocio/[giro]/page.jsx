import { notFound } from "next/navigation";
import { PaginaGiroGrande } from "@/app/components/tu-negocio/PaginaGiroGrande";
import { PaginaGiroLocal } from "@/app/components/tu-negocio/PaginaGiroLocal";
import { GIROS, giroPorSlug } from "@/app/lib/giros";
import { JsonLd } from "@/app/components/JsonLd";
import { metadatosPagina } from "@/app/lib/compartir";
import { migas } from "@/app/lib/jsonld";

// /tu-negocio/<giro> (lote 11): los nueve giros se generan al construir, cada
// uno con la plantilla de su grupo; cualquier otro es 404. /tu-negocio/empresas
// es su propia página.
export const dynamicParams = false;

export function generateStaticParams() {
  return GIROS.map((g) => ({ giro: g.slug }));
}

// Título y descripción de Google (lote 18): viven en giros.js.
export async function generateMetadata({ params }) {
  const { giro: slug } = await params;
  const giro = giroPorSlug(slug);
  if (!giro) return {};
  return metadatosPagina({
    titulo: giro.tituloSeo,
    descripcion: giro.descripcionSeo,
    ruta: `/tu-negocio/${giro.slug}`,
    imagenPropia: true,
  });
}

export default async function GiroPage({ params }) {
  const { giro: slug } = await params;
  const giro = giroPorSlug(slug);
  if (!giro) notFound();
  return (
    <>
      <JsonLd datos={migas([["Inicio", "/"], ["Tu negocio", "/tu-negocio"], [giro.nombre, giro.href]])} />
      {giro.grupo === "local" ? <PaginaGiroLocal giro={giro} /> : <PaginaGiroGrande giro={giro} />}
    </>
  );
}
