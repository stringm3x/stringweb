import { TAMANO, imagenCompartir } from "@/app/lib/imagenCompartir";
import { nivelPorSlug } from "@/app/lib/niveles";

// Imagen para compartir de cada nivel: el logo y el titular del nivel.
export const alt = "El logo de STRING sobre noche y el titular del nivel.";
export const size = TAMANO;
export const contentType = "image/png";

export default async function Image({ params }) {
  const { nivel } = await params;
  return imagenCompartir(nivelPorSlug(nivel).titular);
}
