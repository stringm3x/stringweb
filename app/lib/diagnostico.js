import { NIVELES } from "./niveles";

// Opciones del formulario de diagnóstico (docs/textos.md § Formulario de
// diagnóstico). Cada respuesta de "¿Qué te pasa hoy?" es la frase de un
// nivel, así que sale de NIVELES y no se escribe dos veces.
export const GIROS = [
  "Barbería o estética",
  "Clínica o consultorio",
  "Restaurante",
  "Gimnasio",
  "Otro",
];

export const GIRO_GIMNASIO = "Gimnasio";
export const OTRA_COSA = "Otra cosa";

const NIVELES_CON_FRASE = NIVELES.filter((n) => n.cita);

export const SITUACIONES = [...NIVELES_CON_FRASE.map((n) => n.dices), OTRA_COSA];

// El nivel que el correo le sugiere a Carlos; "por definir" si fue Otra cosa.
export function nivelSugerido(situacion) {
  return NIVELES_CON_FRASE.find((n) => n.dices === situacion)?.nombre ?? "por definir";
}
