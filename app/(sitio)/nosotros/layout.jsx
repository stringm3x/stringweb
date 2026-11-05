import { metadatosPagina } from "@/app/lib/compartir";

// Título y descripción de docs/textos.md § Nosotros · lote 10.
const DESCRIPCION =
  "STRING es un taller de software en Ciudad de México. La historia, el método, el equipo y la fe detrás de cada sistema.";

export const metadata = metadatosPagina({
  titulo: "Nosotros · Carlos Avilés y el taller STRING",
  descripcion: DESCRIPCION,
  ruta: "/nosotros",
});

export default function UsLayout({ children }) {
  return children;
}
