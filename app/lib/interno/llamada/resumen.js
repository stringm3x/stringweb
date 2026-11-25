import { formatoDia, formatoHora } from "../fechas";
import { calcular, cuerpoNumero } from "./calculadora";
import { llenar } from "./llenar";

// El resumen de la llamada para WhatsApp (lote 25). Puro y sin contenido: lo
// arma el cliente con lo que Carlos anotó y los textos del guion (props).
// Estructura: su problema con sus palabras, su número, su prioridad, "Algo
// que noté" y la cita de la propuesta. Nunca lleva precios de STRING, ni el
// nivel, ni el boceto, ni el mínimo de Empresa (resumen.test.js): no los
// recibe.

// Ids de las notas del tramo 5 (Siguiente paso).
export const NOTA_PROBLEMA = "g-problema";
export const NOTA_NOTO = "g-noto";

const limpio = (t) => (typeof t === "string" ? t.trim() : "");
const sinPunto = (t) => t.replace(/[.\s]+$/, "");
const minuscula = (t) => t.charAt(0).toLowerCase() + t.slice(1);

// Lo que llena "[problema]", "[número]", "[prioridad]", "[día]" y "[hora]".
// Lo que falta queda vacío (llenar() deja la pista entre corchetes).
export function valoresLlamada(llamada, nicho, textos) {
  // Va a media frase ("Lo que entendí: …", "Te digo lo que escuché: …").
  const problema = minuscula(sinPunto(limpio(llamada.notas?.[NOTA_PROBLEMA])));
  const numero = cuerpoNumero(calcular(nicho.cuenta, llamada.cuenta?.[nicho.id] ?? {}), textos.cuenta);
  const elegida = nicho.prioridades.find((p) => p.id === llamada.prioridad?.[nicho.id]);
  const dia = formatoDia(llamada.cita?.dia) ?? "";
  return {
    dueño: limpio(llamada.dueno),
    negocio: limpio(llamada.negocio),
    problema,
    número: numero ?? "",
    // "lo más urgente es [prioridad]" (guion) lleva la etiqueta; el resumen,
    // su frase aprobada ("lo que más quieres es que nadie se quede sin respuesta").
    prioridad: elegida?.nombre ?? "",
    prioridadResumen: elegida?.resumen ?? "",
    // "¿Te queda el [día]…?": el guion ya trae el "el".
    día: dia.replace(/^el /, ""),
    diaConEl: dia,
    hora: formatoHora(llamada.cita?.hora) ?? "",
  };
}

export function armarResumenLlamada(llamada, nicho, textos) {
  const T = textos.resumen;
  const v = valoresLlamada(llamada, nicho, textos);
  const nota = sinPunto(limpio(llamada.notas?.[NOTA_NOTO]));

  const entendi = [
    v.problema,
    v.número && llenar(T.numero, { número: v.número }),
    v.prioridadResumen && llenar(T.prioridad, { prioridad: v.prioridadResumen }),
  ].filter(Boolean);
  // "a; b, y c": el último va con ", y".
  const lista =
    entendi.length > 1 ? `${entendi.slice(0, -1).join(T.separador)}${T.y}${entendi.at(-1)}` : entendi[0];

  let cita = null;
  if (v.diaConEl) cita = v.hora ? llenar(T.cita, { día: v.diaConEl, hora: v.hora }) : llenar(T.citaSinHora, { día: v.diaConEl });

  return [
    v.dueño ? llenar(T.saludoCon, { dueño: v.dueño }) : T.saludoSin,
    lista && `${T.entendi}${lista}.`,
    nota && `${llenar(T.noto, { nota })}.`,
    cita,
  ]
    .filter(Boolean)
    .join(" ");
}
