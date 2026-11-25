// El nivel sugerido (lote 20, docs/textos.md § Interno). Puro: recibe el
// giro y las respuestas ({ [id]: { valor, nota } }) y devuelve UN nivel con
// su razón. Gana la primera regla que se cumple. Una pregunta saltada (sin
// valor) cuenta como "No sé".
//
// Lote 25: el contenido (CONTENIDO_DIAGNOSTICO) y las ofertas (ofertas.js)
// llegan como argumento, no se importan: no van en el JS del cliente.

export const ORDEN = ["responde", "organiza", "automatiza", "controla", "empresa"];

// Giros cuya P es de citas, pacientes o pedidos: con Sí / A veces, piden
// Automatiza en el descarte.
const GIROS_SEGUIMIENTO = ["barberia", "clinica", "restaurante"];
const CON_PROBLEMA = ["Sí", "A veces"];

const valor = (respuestas, id) => respuestas?.[id]?.valor;

export function sugerirNivel({ giro, respuestas = {} }, contenido) {
  const { N, RAZONES, S2_SIN_SISTEMA } = contenido;
  const n = valor(respuestas, "n");
  if (giro === "gimnasio") return { nivel: "boaz", razon: RAZONES.gimnasio };
  if (giro === "empresa") return { nivel: "empresa", razon: RAZONES.empresa };
  if (n === N.controla) return { nivel: "controla", razon: RAZONES.controla };
  if (giro === "tienda") return { nivel: "controla", razon: RAZONES.tienda };
  if (n === N.automatiza) return { nivel: "automatiza", razon: RAZONES.automatiza };
  if (n === N.organiza) return { nivel: "organiza", razon: RAZONES.organiza };
  if (n === N.responde) return { nivel: "responde", razon: RAZONES.responde };

  // N = "No sé" o saltada: el nivel más chico que cubre lo marcado. Controla
  // y Empresa nunca salen por aquí.
  if (GIROS_SEGUIMIENTO.includes(giro) && CON_PROBLEMA.includes(valor(respuestas, "pGiro"))) {
    return { nivel: "automatiza", razon: RAZONES.noSeGiro };
  }
  if (S2_SIN_SISTEMA.includes(valor(respuestas, "s2"))) return { nivel: "organiza", razon: RAZONES.noSeS2 };
  if (CON_PROBLEMA.includes(valor(respuestas, "p1"))) return { nivel: "responde", razon: RAZONES.noSeP1 };
  return { nivel: "responde", razon: RAZONES.noSeNada };
}

// "Cuando crezca": el nivel siguiente, solo en pantalla. Empresa y Boaz no
// tienen.
export function nivelSiguiente(nivel) {
  const i = ORDEN.indexOf(nivel);
  return i >= 0 && i < ORDEN.length - 1 ? ORDEN[i + 1] : null;
}

// El interruptor "Ofrecer boceto" solo existe en estos niveles.
export const conBoceto = (nivel, ofertas) => !!ofertas[nivel]?.boceto;
