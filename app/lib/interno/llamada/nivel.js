// La sugerencia de nivel de la llamada (lote 25), solo para Carlos. Pura:
// recibe los `niveles` de la ficha y las reglas que marcó (sus índices).
// Gana el nivel de las reglas marcadas; si quedan dos o más, el más chico.
// Sin reglas marcadas, el nivel por defecto de la ficha ("caso típico"), o
// ninguno.

export const ORDEN = ["responde", "organiza", "automatiza", "controla", "empresa"];

export function sugerirNivelNicho(niveles, marcadas = []) {
  const candidatas = niveles.reglas
    .map((r, i) => ({ ...r, i }))
    .filter((r) => marcadas.includes(r.i))
    .sort((a, b) => ORDEN.indexOf(a.nivel) - ORDEN.indexOf(b.nivel));
  if (candidatas.length) {
    const nivel = candidatas[0].nivel;
    return { nivel, razones: candidatas.filter((r) => r.nivel === nivel).map((r) => r.regla), porDefecto: false };
  }
  if (niveles.porDefecto) return { nivel: niveles.porDefecto, razones: [], porDefecto: true };
  return { nivel: null, razones: [], porDefecto: false };
}
