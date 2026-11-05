import { NIVELES } from "./niveles";
import { DESDE } from "./precios";

// Opciones del formulario de diagnóstico (docs/textos.md § Formulario de
// diagnóstico). Cada respuesta de "¿Qué te pasa hoy?" es la frase de un
// nivel, así que sale de NIVELES y no se escribe dos veces.
export const GIROS = [
  "Barbería o estética",
  "Clínica o consultorio",
  "Restaurante",
  "Gimnasio",
  "Tienda en línea",
  "Empresa mediana o grande",
  "Otro",
];

export const GIRO_GIMNASIO = "Gimnasio";

// La marca que el correo le pone a Carlos según el giro (docs/textos.md §
// Correo que recibe Carlos): Gimnasio desde el lote 4; tienda y empresa desde
// el lote 11.
export const MARCAS_GIRO = {
  [GIRO_GIMNASIO]: "Es gimnasio: ofrécele Boaz.",
  "Tienda en línea":
    `Es tienda en línea: la tienda propia va en Controla (desde ${DESDE.controla}). Si solo vende por redes, empieza en Responde u Organiza.`,
  "Empresa mediana o grande": "Es empresa: se cotiza. Ofrécele el boceto y pide el mapa de procesos antes de cotizar.",
};
export const OTRA_COSA = "Otra cosa";

const NIVELES_CON_FRASE = NIVELES.filter((n) => n.cita);

export const SITUACIONES = [...NIVELES_CON_FRASE.map((n) => n.dices), OTRA_COSA];

// El nivel que el correo le sugiere a Carlos; "por definir" si fue Otra cosa.
export function nivelSugerido(situacion) {
  return NIVELES_CON_FRASE.find((n) => n.dices === situacion)?.nombre ?? "por definir";
}
