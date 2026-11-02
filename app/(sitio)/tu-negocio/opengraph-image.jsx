import { TAMANO, imagenCompartir } from "@/app/lib/imagenCompartir";

// Imagen para compartir de /tu-negocio: el logo y su titular.
export const alt = "Tu negocio · STRING — Elige tu giro. Te mostramos tu escalera.";
export const size = TAMANO;
export const contentType = "image/png";

export default function Image() {
  return imagenCompartir("Elige tu giro. Te mostramos tu escalera.");
}
