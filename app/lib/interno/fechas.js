// Fechas y horas para los resúmenes de /interno. Puro y sin contenido: lo
// pueden importar los componentes de cliente. formatoDia viene del lote 20
// (diagnostico/resumen.js lo re-exporta); formatoHora es del lote 25.

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

// "2026-11-12" → "el jueves 12 de noviembre". En hora local: new Date(texto)
// lo leería en UTC y en México se correría un día.
export function formatoDia(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!m) return null;
  const fecha = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (fecha.getMonth() !== Number(m[2]) - 1) return null;
  return `el ${DIAS[fecha.getDay()]} ${fecha.getDate()} de ${MESES[fecha.getMonth()]}`;
}

// "17:00" → "5 pm", "17:30" → "5:30 pm", "00:15" → "12:15 am" (aprobado el
// 25 nov: "a las 5 pm" / "a las 5:30 pm").
export function formatoHora(hhmm) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm || "");
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${min ? `:${m[2]}` : ""} ${h < 12 ? "am" : "pm"}`;
}
