// Lo que cambia a mano en /boaz mientras dura el lanzamiento (lote 21).
//
// CÓMO CAMBIARLO: edita el valor de abajo, haz commit y publica. Si escribes
// un valor que no vale, `npm run build` falla con un error que lo dice, así
// que no llega a producción.

// Lugares de fundadores que quedan: un entero de 0 a 5. Hoy, 5 (nadie lo ha
// tomado). Cada gimnasio que entra, baja uno. Con 0, la sección de
// fundadores dice que los lugares ya tienen dueño y manda a /gym/registro.
export const LUGARES_FUNDADORES = 5;

// Estado de Escala: "desarrollo" (hoy) o "pruebas". Cambia a "pruebas" el día
// que haya número verificado y socios reales recibiendo mensajes.
export const ESCALA_ESTADO = "desarrollo";

// --- De aquí para abajo no se edita. ---

export const TOTAL_FUNDADORES = 5;
export const ESTADOS_ESCALA = ["desarrollo", "pruebas"];

export function validarLugares(n) {
  if (!Number.isInteger(n) || n < 0 || n > TOTAL_FUNDADORES) {
    throw new Error(`LUGARES_FUNDADORES debe ser un entero de 0 a ${TOTAL_FUNDADORES}; vale ${n}.`);
  }
  return n;
}

export function validarEstadoEscala(estado) {
  if (!ESTADOS_ESCALA.includes(estado)) {
    throw new Error(`ESCALA_ESTADO debe ser "desarrollo" o "pruebas"; vale ${JSON.stringify(estado)}.`);
  }
  return estado;
}

validarLugares(LUGARES_FUNDADORES);
validarEstadoEscala(ESCALA_ESTADO);

// El texto que se lee debajo de las casillas (docs/textos.md § Boaz · lote 21).
export function textoLugares(n) {
  validarLugares(n);
  if (n === 0) return `LOS ${TOTAL_FUNDADORES} LUGARES ESTÁN TOMADOS`;
  if (n === 1) return `QUEDA 1 DE ${TOTAL_FUNDADORES} LUGARES`;
  return `QUEDAN ${n} DE ${TOTAL_FUNDADORES} LUGARES`;
}
