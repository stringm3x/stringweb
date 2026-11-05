import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Lote 20: la herramienta de diagnóstico no guarda nada y no escribe
// precios a mano (salen de precios.js y precios-interno.js).
const RAIZ = path.resolve(__dirname, "../../../..");
const CARPETAS = [
  "app/lib/interno/diagnostico",
  "app/(interno)/interno/(protegido)/diagnostico",
  "app/muestrario/diagnostico",
];

const archivos = CARPETAS.flatMap((c) => {
  const dir = path.join(RAIZ, c);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { recursive: true })
    .filter((f) => /\.(m?js|jsx)$/.test(f) && !/\.test\.js$/.test(f))
    .map((f) => path.join(c, f));
});
const leer = (f) => fs.readFileSync(path.join(RAIZ, f), "utf8");

describe("el diagnóstico no guarda nada", () => {
  it("hay archivos que revisar", () => {
    expect(archivos.length).toBeGreaterThanOrEqual(3);
  });

  it("sin localStorage, sessionStorage, indexedDB, document.cookie ni fetch", () => {
    const prohibido = /\b(localStorage|sessionStorage|indexedDB)\b|document\.cookie|\bfetch\s*\(/;
    expect(archivos.filter((f) => prohibido.test(leer(f)))).toEqual([]);
  });

  it("sin server actions ni Supabase", () => {
    const prohibido = /["']use server["']|@supabase\/|\/acciones["']/;
    expect(archivos.filter((f) => prohibido.test(leer(f)))).toEqual([]);
  });

  it("sin precios escritos a mano", () => {
    expect(archivos.filter((f) => /\$\d/.test(leer(f)))).toEqual([]);
  });
});
