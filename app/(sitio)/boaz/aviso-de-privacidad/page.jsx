import { DocumentoLegal } from "@/app/components/ui/DocumentoLegal";
import { AVISO, documento } from "@/app/lib/legal-boaz/documento";
import { metadatosPagina } from "@/app/lib/compartir";

// Aviso de privacidad de Boaz (lote 24). Texto en app/lib/legal-boaz/, palabra
// por palabra. La descripción sale de su primera frase, recortada a 160
// caracteres (por aprobar). Imagen al compartir: la del sitio, como /terminos.
export const DESCRIPCION =
  "Boaz trata dos grupos de datos con papeles distintos: los del gimnasio y su equipo, y los de los socios de cada gimnasio.";

export const metadata = metadatosPagina({
  titulo: "Aviso de privacidad de Boaz · STRING",
  descripcion: DESCRIPCION,
  ruta: "/boaz/aviso-de-privacidad",
});

export default function AvisoBoazPage() {
  return <DocumentoLegal titulo={AVISO} bloques={documento(AVISO)} />;
}
