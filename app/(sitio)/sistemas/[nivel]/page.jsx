import { notFound } from "next/navigation";
import { PaginaNivel, SLUGS } from "@/app/components/sistemas/PaginaNivel";

// /sistemas/<nivel> (docs/pagina-nivel.md): las cinco páginas se generan al
// construir; cualquier otro nivel es 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((nivel) => ({ nivel }));
}

export default async function NivelPage({ params }) {
  const { nivel } = await params;
  if (!SLUGS.includes(nivel)) notFound();
  return <PaginaNivel slug={nivel} />;
}
