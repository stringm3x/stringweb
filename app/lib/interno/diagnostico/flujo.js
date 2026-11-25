// El flujo de preguntas de la herramienta del lote 20. Puro y sin contenido
// (lote 25): recibe el contenido (CONTENIDO_DIAGNOSTICO, por props) en vez de
// importarlo, para que los textos no vayan en el JS del cliente.

export const giroPorId = (contenido, id) => contenido.GIROS.find((g) => g.id === id);

// Las preguntas del flujo, en orden, para un giro. Cada una con su id, el
// paso en el que va (2 o 3) y lo que hace falta para mostrarla.
export function preguntasDelFlujo(contenido, giroId, rapida = false) {
  const { COMUNES, SI_AVECES_NO } = contenido;
  const giro = giroPorId(contenido, giroId);
  if (!giro) return [];
  const sGiro = { id: "sGiro", paso: 2, texto: giro.s, tipo: "texto", opcional: true, corto: true };
  const pGiro = giro.pTexto
    ? { id: "pGiro", paso: 2, texto: giro.p, tipo: "texto", ayuda: COMUNES.i.ayuda }
    : { id: "pGiro", paso: 2, texto: giro.p, tipo: "una", opciones: SI_AVECES_NO };
  const iGiro = { id: "iGiro", paso: 3, texto: giro.i, tipo: "texto", ayuda: COMUNES.i.ayuda };
  const c = (id, paso) => ({ id, paso, ...COMUNES[id] });

  if (giro.id === "gimnasio") return rapida ? [pGiro, c("n", 3)] : [sGiro, pGiro, iGiro, c("n", 3)];
  if (rapida) return [pGiro, c("s2", 2), c("n", 3)];
  return [c("s1", 2), c("s2", 2), c("p1", 2), c("p2", 2), sGiro, pGiro, iGiro, c("i", 3), c("n", 3)];
}
