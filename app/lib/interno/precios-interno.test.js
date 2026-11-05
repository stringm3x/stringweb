import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import * as publicos from "../precios";
import { BOAZ, BOAZ_FUNDADOR, BOCETO, CONTINUIDAD, DESDE, EMPRESA_MINIMO } from "./precios-interno";

// Lote 20: los precios que no se publican (boceto, Pro fundador, mínimo de
// Empresa) viven solo en /interno.
const RAIZ = path.resolve(__dirname, "../../..");
const rel = (f) => path.relative(RAIZ, f).split(path.sep).join("/");

function archivos(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const ruta = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === "node_modules" ? [] : archivos(ruta);
    return /\.(m?js|jsx)$/.test(e.name) && !/\.test\.js$/.test(e.name) ? [ruta] : [];
  });
}

// Lo que no es /interno ni el muestrario (que da 404 en producción).
const PRIVADO = /^app\/(\(interno\)\/|lib\/interno\/|muestrario\/diagnostico\/)/;
// $3,500 no entra: también es el "desde" público de Mejora.
const SIN_PRECIOS = /7,500|80,000|799 fijo/;

describe("precios internos", () => {
  it("tiene el boceto, el precio fundador y el mínimo de Empresa", () => {
    expect(BOCETO).toEqual({ chico: "$3,500", empresaDesde: "$7,500" });
    expect(BOAZ_FUNDADOR).toEqual({ mes: "$799", meses: 12 });
    expect(EMPRESA_MINIMO).toBe("$80,000");
  });

  it("lo público sale de precios.js, sin copias", () => {
    expect(DESDE).toBe(publicos.DESDE);
    expect(CONTINUIDAD).toBe(publicos.CONTINUIDAD);
    expect(BOAZ).toBe(publicos.BOAZ);
  });

  it("precios.js no trae los precios internos", () => {
    const texto = fs.readFileSync(path.join(RAIZ, "app/lib/precios.js"), "utf8");
    expect(texto).not.toMatch(/7,500|80,000|BOCETO|FUNDADOR|EMPRESA_MINIMO/);
  });

  it("ningún archivo público importa precios-interno.js", () => {
    const fuera = archivos(path.join(RAIZ, "app")).filter(
      (f) => !PRIVADO.test(rel(f)) && /precios-interno/.test(fs.readFileSync(f, "utf8")),
    );
    expect(fuera.map(rel)).toEqual([]);
  });

  it("ningún archivo público escribe los precios internos", () => {
    const fuera = archivos(path.join(RAIZ, "app")).filter(
      (f) => !PRIVADO.test(rel(f)) && SIN_PRECIOS.test(fs.readFileSync(f, "utf8")),
    );
    expect(fuera.map(rel)).toEqual([]);
  });
});

// Con un build hecho (npm run build), el JS que cargan las páginas públicas
// prerenderizadas no trae los precios internos. Sin build, se salta.
const SERVIDOR = path.join(RAIZ, ".next/server/app");
const HAY_BUILD = fs.existsSync(SERVIDOR) && fs.existsSync(path.join(RAIZ, ".next/static"));

describe.skipIf(!HAY_BUILD)("JS del build público", () => {
  it('no contiene "7,500", "80,000" ni "799 fijo"', () => {
    const paginas = fs
      .readdirSync(SERVIDOR, { recursive: true })
      .filter((f) => f.endsWith(".html") && !/interno|muestrario/.test(f))
      .map((f) => path.join(SERVIDOR, f));
    expect(paginas.length).toBeGreaterThan(10);
    const scripts = new Set(
      paginas.flatMap((f) =>
        [...fs.readFileSync(f, "utf8").matchAll(/\/_next\/(static\/[^"'?\s]+\.js)/g)].map((m) => m[1]),
      ),
    );
    expect(scripts.size).toBeGreaterThan(0);
    const hallados = [...scripts].flatMap((s) => {
      const texto = fs.readFileSync(path.join(RAIZ, ".next", decodeURIComponent(s)), "utf8");
      return ["7,500", "80,000", "799 fijo"].filter((p) => texto.includes(p)).map((p) => `${s}: ${p}`);
    });
    expect(hallados).toEqual([]);
  });
});
