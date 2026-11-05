import { notFound } from "next/navigation";
import { PaginaNivel, SLUGS } from "@/app/components/sistemas/PaginaNivel";
import { nivelPorSlug } from "@/app/lib/niveles";
import { JsonLd } from "@/app/components/JsonLd";
import { metadatosPagina } from "@/app/lib/compartir";
import { migas } from "@/app/lib/jsonld";

// /sistemas/<nivel> (docs/pagina-nivel.md): las cinco páginas se generan al
// construir; cualquier otro nivel es 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((nivel) => ({ nivel }));
}

// Título y descripción de Google (lote 18): viven en niveles.js.
export async function generateMetadata({ params }) {
  const { nivel: slug } = await params;
  const nivel = nivelPorSlug(slug);
  if (!nivel) return {};
  return metadatosPagina({
    titulo: nivel.tituloSeo,
    descripcion: nivel.descripcionSeo,
    ruta: `/sistemas/${nivel.slug}`,
    imagenPropia: true,
  });
}

export default async function NivelPage({ params }) {
  const { nivel } = await params;
  if (!SLUGS.includes(nivel)) notFound();
  const { nombre } = nivelPorSlug(nivel);
  return (
    <>
      <JsonLd datos={migas([["Inicio", "/"], ["Sistemas", "/sistemas"], [nombre, `/sistemas/${nivel}`]])} />
      <PaginaNivel slug={nivel} />
    </>
  );
}
