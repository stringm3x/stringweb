import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Lote 25 (ajuste E): las fichas de nicho y el guion solo se importan dentro
// de /interno. Mismo patrón que precios.test.js ("lo público no importa
// precios-interno"): se leen todas las fuentes de app/ sin comentarios.
// Además, ningún componente de cliente los importa: llegan como props desde
// el servidor después de exigirCarlos(), para que no queden en un archivo
// estático de JS que cualquiera pueda bajar.
const APP = path.resolve(__dirname, "../../..");
const ESTE = path.resolve(__filename);

function archivos(dir = APP) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const ruta = path.join(dir, e.name);
    if (e.isDirectory()) return archivos(ruta);
    if (!/\.(jsx?|mjs)$/.test(e.name) || /\.test\.js$/.test(e.name) || ruta === ESTE) return [];
    return [ruta];
  });
}
const sinComentarios = (t) =>
  t
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:"'`])\/\/.*$/gm, "$1");

const FUENTES = archivos().map((ruta) => ({
  ruta: path.relative(APP, ruta).split(path.sep).join("/"),
  texto: sinComentarios(fs.readFileSync(ruta, "utf8")),
}));

// El contenido: el guion y las fichas (no llenar.js, que es puro y sin texto).
const IMPORTA_CONTENIDO = /lib\/interno\/llamada\/(nichos|guion)|from\s+["']\.{1,2}\/(nichos|guion)|from\s+["']\.["']/;
// Dentro de /interno (o el banco de desarrollo, 404 en producción).
const PERMITIDO = (ruta) =>
  ruta.startsWith("(interno)/") || ruta.startsWith("lib/interno/") || ruta === "muestrario/diagnostico/page.jsx";

describe("las fichas de nicho solo viven en /interno", () => {
  it("hay fuentes que revisar", () => {
    expect(FUENTES.length).toBeGreaterThan(50);
  });

  it("ninguna página pública importa las fichas ni el guion", () => {
    const importan = FUENTES.filter(({ ruta, texto }) => !PERMITIDO(ruta) && /lib\/interno\/llamada/.test(texto));
    expect(importan.map(({ ruta }) => ruta)).toEqual([]);
  });

  it("los importa solo el servidor: la página de /interno y el banco", () => {
    const importan = FUENTES.filter(
      ({ ruta, texto }) => !ruta.startsWith("lib/interno/llamada/") && IMPORTA_CONTENIDO.test(texto),
    ).map(({ ruta }) => ruta);
    expect(importan.sort()).toEqual(["(interno)/interno/(protegido)/diagnostico/page.jsx", "muestrario/diagnostico/page.jsx"]);
  });

  it("ningún componente de cliente importa las fichas ni el guion", () => {
    const cliente = FUENTES.filter(({ texto }) => /^\s*["']use client["']/.test(texto));
    expect(cliente.length).toBeGreaterThan(0);
    expect(cliente.filter(({ texto }) => IMPORTA_CONTENIDO.test(texto)).map(({ ruta }) => ruta)).toEqual([]);
  });
});
