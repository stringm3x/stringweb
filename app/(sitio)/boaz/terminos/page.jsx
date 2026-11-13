import { DocumentoLegal } from "@/app/components/ui/DocumentoLegal";
import { TERMINOS, documento } from "@/app/lib/legal-boaz/documento";
import { metadatosPagina } from "@/app/lib/compartir";

// Términos de Boaz (lote 24). Texto en app/lib/legal-boaz/, palabra por
// palabra; la descripción es su primera frase. Imagen al compartir: la del sitio, como /terminos.
export const DESCRIPCION =
  "Al aceptarlos en el producto, el gimnasio contrata Boaz en estas condiciones.";

export const metadata = metadatosPagina({
  titulo: "Términos de Boaz · STRING",
  descripcion: DESCRIPCION,
  ruta: "/boaz/terminos",
});

export default function TerminosBoazPage() {
  return <DocumentoLegal titulo={TERMINOS} bloques={documento(TERMINOS)} />;
}
