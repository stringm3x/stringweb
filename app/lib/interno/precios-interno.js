import { BOAZ, BOAZ_FUNDADOR, CONTINUIDAD, DESDE, IVA } from "@/app/lib/precios";

// Precios que solo usa la herramienta de diagnóstico de /interno (lote 20).
// No se publican: no van en app/lib/precios.js porque ese archivo lo leen las
// páginas públicas. Lo público (niveles, continuidad, Boaz y, desde el lote
// 21, el Pro fundador) se toma de allá.

export { BOAZ, BOAZ_FUNDADOR, CONTINUIDAD, DESDE, IVA };

// El boceto: $3,500 en Automatiza y Controla; en Empresa, desde $7,500.
export const BOCETO = { chico: "$3,500", empresaDesde: "$7,500" };

// Empresa se cotiza, pero nunca menos de esto.
export const EMPRESA_MINIMO = "$80,000";
