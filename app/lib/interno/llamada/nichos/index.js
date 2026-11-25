import { ACADEMIAS } from "./academias";
import { B2B } from "./b2b";
import { DESARROLLADORAS } from "./desarrolladoras";
import { TIENDAS } from "./tiendas";

// Los nichos de la llamada (lote 25), en el orden del selector. Clínicas
// aparece deshabilitada, "en pausa", sin ficha. Para agregarla: su archivo en
// esta carpeta y cambiar su línea aquí; los componentes no se tocan.
//
// Solo se importa en el servidor de /interno y en el banco de desarrollo
// (nichos-solo-interno.test.js).
export const NICHOS = [
  ACADEMIAS,
  DESARROLLADORAS,
  B2B,
  TIENDAS,
  { id: "clinicas", nombre: "Clínicas", enPausa: true },
];

export const nichoPorId = (id) => NICHOS.find((n) => n.id === id && !n.enPausa);
