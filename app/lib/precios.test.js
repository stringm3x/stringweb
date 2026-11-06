import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { BOAZ, BOAZ_ESCALA, BOAZ_FUNDADOR, CONTINUIDAD, CONTINUIDAD_DESDE, DESDE, IVA, SE_COTIZA, precioNivel } from "./precios";

// Lote 17: precios con IVA incluido (decisión del 4 nov). precios.js es la
// fuente única; ningún archivo público de app/ guarda los precios viejos, ni
// Escala ni el paquete GYM, y el JSON-LD no trae precios distintos.
const APP = path.resolve(__dirname, "..");
const ESTE = path.resolve(__filename);

// Todos los archivos de código de app/, fuera de /interno y sin pruebas.
function archivos(dir = APP) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const ruta = path.join(dir, e.name);
    if (e.isDirectory()) return /interno/.test(e.name) ? [] : archivos(ruta);
    if (!/\.(jsx?|mjs|css|json)$/.test(e.name) || /\.test\.js$/.test(e.name) || ruta === ESTE) return [];
    return [ruta];
  });
}
const FUENTES = archivos().map((ruta) => ({ ruta: path.relative(APP, ruta), texto: fs.readFileSync(ruta, "utf8") }));

// Sin comentarios: lo que queda es lo que puede llegar a la página.
const sinComentarios = (t) =>
  t
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:"'`])\/\/.*$/gm, "$1");

const VIEJOS = [
  "$8,000", "$18,000", "$28,000", "$40,000", "$1,800", "$2,500", "$1,799", "17,990", "$2,999", "29,990",
  "$45,000", "$55,000",
];
const VIEJOS_SIN_FORMATO = ["8000", "18000", "28000", "40000", "1800", "1799", "17990", "2999", "29990", "45000", "55000"];

describe("precios", () => {
  it("tiene exactamente los precios con IVA del 4 nov", () => {
    expect(IVA).toBe("IVA incluido");
    expect(DESDE).toEqual({ responde: "$9,500", organiza: "$21,000", automatiza: "$32,500", controla: "$46,500" });
    expect(SE_COTIZA).toBe("Se cotiza");
    expect(precioNivel("responde")).toBe("Desde $9,500");
    expect(precioNivel("empresa")).toBe("Se cotiza");
    expect(CONTINUIDAD_DESDE).toBe("$2,100");
    expect(CONTINUIDAD).toEqual({ cuida: "$2,100", mejora: "$3,500", impulsa: "$5,800" });
    expect(BOAZ).toEqual({
      starter: { mes: "$799", anual: "$7,990" },
      pro: { mes: "$1,299", anual: "$12,990" },
    });
  });

  // Lote 21 (6 nov): Escala y el Pro fundador viven aparte de BOAZ, para que
  // /productos, /gym/registro y el JSON-LD, que leen BOAZ, no los arrastren.
  it("Escala y el Pro fundador están aparte de BOAZ", () => {
    expect(BOAZ_ESCALA).toEqual({ mes: "$1,999", anual: "$19,990" });
    expect(BOAZ_FUNDADOR).toEqual({ mes: "$799", meses: 12 });
    expect(Object.keys(BOAZ)).toEqual(["starter", "pro"]);
    expect(Object.values(BOAZ)).not.toContain(BOAZ_ESCALA);
    expect(Object.values(BOAZ)).not.toContain(BOAZ_FUNDADOR);
  });

  it("ningún archivo de app/ fuera de /interno guarda un precio viejo", () => {
    expect(FUENTES.length).toBeGreaterThan(50);
    const hallados = FUENTES.flatMap(({ ruta, texto }) => [
      ...VIEJOS.filter((v) => texto.includes(v)).map((v) => `${ruta}: ${v}`),
      ...VIEJOS_SIN_FORMATO.filter((v) => new RegExp(`\\b${v}\\b`).test(texto)).map((v) => `${ruta}: ${v}`),
    ]);
    expect(hallados).toEqual([]);
  });

  it("Escala, Pro fundador y el paquete GYM no aparecen en las páginas públicas", () => {
    const hallados = FUENTES.flatMap(({ ruta, texto }) => {
      const codigo = sinComentarios(texto);
      return [/\bEscala\b/, /Pro fundador/i, /paquete\s+gym/i, /paquete[^.\n]{0,40}gimnasio/i]
        .filter((re) => re.test(codigo))
        .map((re) => `${ruta}: ${re}`);
    });
    expect(hallados).toEqual([]);
  });

  it("el JSON-LD no trae precios distintos a los de precios.js", () => {
    const validos = new Set(
      [...Object.values(DESDE), CONTINUIDAD_DESDE, ...Object.values(CONTINUIDAD), ...Object.values(BOAZ).flatMap((p) => [p.mes, p.anual])]
        .map((p) => p.replace(/[$,]/g, "")),
    );
    const conJsonLd = FUENTES.filter(({ texto }) => /ld\+json|schema\.org/.test(texto));
    expect(conJsonLd.length).toBeGreaterThan(0);
    conJsonLd.forEach(({ ruta, texto }) => {
      const cifras = [
        ...[...texto.matchAll(/\$\s?([\d,]+(?:\.\d+)?)/g)].map((m) => m[1]),
        ...[...texto.matchAll(/["']?(?:price|lowPrice|highPrice)["']?\s*:\s*["']?([\d,.]+)/g)].map((m) => m[1]),
      ].map((c) => c.replace(/,/g, "").replace(/\.0+$/, ""));
      cifras.forEach((c) => expect(validos.has(c), `${ruta}: ${c}`).toBe(true));
      // Escala nunca entra al JSON-LD (el fundador se prueba por sus offers en jsonld.test.js).
      expect(texto, ruta).not.toMatch(/1,?999|19,?990|BOAZ_ESCALA|BOAZ_FUNDADOR/);
    });
  });
});
