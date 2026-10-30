import { notFound } from "next/navigation";
import { PaginaNivel, SLUGS } from "@/app/components/sistemas/PaginaNivel";
import { nivelPorSlug } from "@/app/lib/niveles";

// /sistemas/<nivel> (docs/pagina-nivel.md): las cinco páginas se generan al
// construir; cualquier otro nivel es 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((nivel) => ({ nivel }));
}

// Título derivado ("Responde · STRING") y descripción: su "Para quién es"
// (Carlos, 30 oct).
export async function generateMetadata({ params }) {
  const { nivel: slug } = await params;
  const nivel = nivelPorSlug(slug);
  if (!nivel) return {};
  const url = `https://www.stringwebs.com/sistemas/${nivel.slug}`;
  return {
    title: nivel.nombre,
    description: nivel.paraQuien,
    alternates: { canonical: url },
    openGraph: { title: `${nivel.nombre} · STRING`, description: nivel.paraQuien, url },
  };
}

export default async function NivelPage({ params }) {
  const { nivel } = await params;
  if (!SLUGS.includes(nivel)) notFound();
  return <PaginaNivel slug={nivel} />;
}
