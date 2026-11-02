import { TAMANO, imagenCompartir } from "@/app/lib/imagenCompartir";

// Imagen para compartir de /tu-negocio/empresas: el logo y su titular.
export const alt = "Empresas · Tu negocio · STRING — Toda la operación, conectada.";
export const size = TAMANO;
export const contentType = "image/png";

export default function Image() {
  return imagenCompartir("Toda la operación, conectada.");
}
