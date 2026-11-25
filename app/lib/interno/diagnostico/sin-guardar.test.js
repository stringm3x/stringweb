import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Lote 20: la herramienta de diagnóstico no guarda nada y no escribe
// precios a mano (salen de precios.js y precios-interno.js).
// Lote 25 (ajuste A): las notas de la llamada viven en sessionStorage, solo
// en useLlamada.js. Lo demás sigue prohibido: localStorage, indexedDB,
// cookies, fetch, server actions y Supabase.
const RAIZ = path.resolve(__dirname, "../../../..");
const CARPETAS = [
  "app/lib/interno/diagnostico",
  "app/lib/interno/llamada",
  "app/(interno)/interno/(protegido)/diagnostico",
  "app/muestrario/diagnostico",
];

const archivos = CARPETAS.flatMap((c) => {
  const dir = path.join(RAIZ, c);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { recursive: true })
    .filter((f) => /\.(m?js|jsx)$/.test(f) && !/\.test\.js$/.test(f))
    .map((f) => path.join(c, f).split(path.sep).join("/"));
});
const NOTAS = "app/(interno)/interno/(protegido)/diagnostico/llamada/useLlamada.js";
// Las fichas llevan "$" en el filtro (criterio del prospecto, no un precio):
// las revisa nichos/datos.test.js sin el filtro.
const FICHAS = "app/lib/interno/llamada/nichos/";
const leer = (f) => fs.readFileSync(path.join(RAIZ, f), "utf8");

describe("el diagnóstico no guarda nada", () => {
  it("hay archivos que revisar", () => {
    expect(archivos.length).toBeGreaterThanOrEqual(3);
    expect(archivos).toContain(NOTAS);
  });

  it("sin localStorage, indexedDB, document.cookie ni fetch", () => {
    const prohibido = /\b(localStorage|indexedDB)\b|document\.cookie|\bfetch\s*\(/;
    expect(archivos.filter((f) => prohibido.test(leer(f)))).toEqual([]);
  });

  it("sessionStorage solo en el archivo de las notas", () => {
    expect(archivos.filter((f) => /\bsessionStorage\b/.test(leer(f)))).toEqual([NOTAS]);
  });

  it("sin server actions ni Supabase", () => {
    const prohibido = /["']use server["']|@supabase\/|\/acciones["']/;
    expect(archivos.filter((f) => prohibido.test(leer(f)))).toEqual([]);
  });

  it("sin precios escritos a mano", () => {
    expect(archivos.filter((f) => !f.startsWith(FICHAS) && /\$\d/.test(leer(f)))).toEqual([]);
  });
});
