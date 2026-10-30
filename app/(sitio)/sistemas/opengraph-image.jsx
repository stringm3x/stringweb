import { TAMANO, imagenCompartir } from "@/app/lib/imagenCompartir";

// Imagen para compartir de /sistemas: el logo y su titular.
export const alt = "Sistemas · STRING — Cinco niveles. La misma calidad.";
export const size = TAMANO;
export const contentType = "image/png";

export default function Image() {
  return imagenCompartir("Cinco niveles. La misma calidad.");
}
