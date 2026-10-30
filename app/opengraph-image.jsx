import { TAMANO, imagenCompartir } from "./lib/imagenCompartir";

// Imagen para compartir (docs/textos.md § Textos que faltaban): el logo
// sobre noche y debajo el titular de la portada.
const TITULAR = "Software hecho con oficio. Y con arte.";

export const alt = "STRING — Software hecho con oficio. Y con arte.";
export const size = TAMANO;
export const contentType = "image/png";

export default function Image() {
  return imagenCompartir(TITULAR);
}
