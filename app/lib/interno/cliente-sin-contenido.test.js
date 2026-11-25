import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Lote 25: los precios internos y los textos de /interno (la herramienta del
// lote 20, el guion y las fichas) se leen en el servidor, después de
// exigirCarlos(), y llegan como props. Ningún componente de cliente los
// importa, ni directo ni a través de otro archivo: si lo hiciera, quedarían
// en un archivo estático de JS que cualquiera puede bajar sin sesión.
// e2e/interno.spec.js lo comprueba además en el build de producción.

const RAIZ = path.resolve(__dirname, "../../..");
const APP = path.join(RAIZ, "app");

const PROHIBIDOS = [
  "app/lib/interno/precios-interno.js",
  "app/lib/interno/diagnostico/contenido.js",
  "app/lib/interno/diagnostico/ofertas.js",
  "app/lib/interno/llamada/guion.js",
];
const PROHIBIDA_CARPETA = "app/lib/interno/llamada/nichos/";

const sinComentarios = (t) =>
  t
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:"'`])\/\/.*$/gm, "$1");

function archivos(dir = APP) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const ruta = path.join(dir, e.name);
    if (e.isDirectory()) return archivos(ruta);
    return /\.(jsx?|mjs)$/.test(e.name) && !/\.test\.js$/.test(e.name) ? [ruta] : [];
  });
}

// "@/app/x" o "./x" → archivo real (con .js, .jsx o index), o null si es un paquete.
function resolver(desde, especificador) {
  let base;
  if (especificador.startsWith("@/")) base = path.join(RAIZ, especificador.slice(2));
  else if (especificador.startsWith(".")) base = path.resolve(path.dirname(desde), especificador);
  else return null;
  const candidatos = [base, `${base}.js`, `${base}.jsx`, path.join(base, "index.js"), path.join(base, "index.jsx")];
  return candidatos.find((c) => fs.existsSync(c) && fs.statSync(c).isFile()) ?? null;
}

const importsDe = (archivo) => {
  const texto = sinComentarios(fs.readFileSync(archivo, "utf8"));
  const especificadores = [...texto.matchAll(/(?:import|export)\s[^;]*?from\s+["']([^"']+)["']|import\s+["']([^"']+)["']/g)].map(
    (m) => m[1] ?? m[2],
  );
  return especificadores.map((e) => resolver(archivo, e)).filter(Boolean);
};

// Todo lo que alcanza un archivo, siguiendo sus imports.
function alcanzables(inicio) {
  const vistos = new Set();
  const pila = [inicio];
  while (pila.length) {
    const actual = pila.pop();
    if (vistos.has(actual)) continue;
    vistos.add(actual);
    pila.push(...importsDe(actual));
  }
  return vistos;
}

const relativo = (r) => path.relative(RAIZ, r).split(path.sep).join("/");
const CLIENTE = archivos().filter((r) => /^\s*["']use client["']/.test(fs.readFileSync(r, "utf8")));

describe("ningún componente de cliente arrastra contenido ni precios de /interno", () => {
  it("revisa los componentes de /interno y del banco", () => {
    const rutas = CLIENTE.map(relativo);
    for (const r of [
      "app/(interno)/interno/(protegido)/diagnostico/Diagnostico.jsx",
      "app/(interno)/interno/(protegido)/diagnostico/PasoNivel.jsx",
      "app/(interno)/interno/(protegido)/diagnostico/llamada/Llamada.jsx",
      "app/muestrario/diagnostico/Banco.jsx",
    ]) {
      expect(rutas).toContain(r);
    }
  });

  it("ni directo ni a través de otro archivo", () => {
    const fallas = CLIENTE.flatMap((r) =>
      [...alcanzables(r)]
        .map(relativo)
        .filter((a) => PROHIBIDOS.includes(a) || a.startsWith(PROHIBIDA_CARPETA))
        .map((a) => `${relativo(r)} → ${a}`),
    );
    expect(fallas).toEqual([]);
  });

  it("la prueba sí detecta un import prohibido (control)", () => {
    // El servidor sí los importa: la página de /interno los alcanza.
    const pagina = path.join(APP, "(interno)/interno/(protegido)/diagnostico/page.jsx");
    const desdePagina = [...alcanzables(pagina)].map(relativo);
    for (const p of PROHIBIDOS) expect(desdePagina).toContain(p);
  });
});
