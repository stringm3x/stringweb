import { TAMANO, imagenCompartir } from "@/app/lib/imagenCompartir";
import { giroPorSlug } from "@/app/lib/giros";

// Imagen para compartir de cada giro: el logo y el titular del giro.
export const alt = "El logo de STRING sobre noche y el titular del giro.";
export const size = TAMANO;
export const contentType = "image/png";

export default async function Image({ params }) {
  const { giro } = await params;
  return imagenCompartir(giroPorSlug(giro).titular);
}
