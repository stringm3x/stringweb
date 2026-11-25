// Llena "[clave]" con su valor (lote 25). Sin valor, la pista se queda entre
// corchetes para que Carlos la diga a su modo. Puro y sin contenido: lo
// pueden importar los componentes de cliente.
export function llenar(texto, valores = {}) {
  return String(texto ?? "").replace(/\[([^\]]+)\]/g, (todo, clave) => {
    const v = valores[clave];
    return typeof v === "string" && v.trim() ? v.trim() : todo;
  });
}
