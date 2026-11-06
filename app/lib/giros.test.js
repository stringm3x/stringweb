import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import sitemap from "../sitemap";
import { GIMNASIOS, GIROS, GRANDES, LOCAL, PASOS_EMPRESAS, giroPorSlug } from "./giros";
import { NIVELES } from "./niveles";

// Tu negocio (lote 11): textos palabra por palabra de docs/textos.md § Tu
// negocio · lote 11, precios de NIVELES, las once páginas en el sitemap y el
// fondo claro solo donde es de Boaz.
const RAIZ = path.resolve(__dirname, "../..");
const TEXTOS = fs.readFileSync(path.join(RAIZ, "docs/textos.md"), "utf8");
const SECCION = TEXTOS.slice(TEXTOS.indexOf("## Tu negocio · lote 11"), TEXTOS.indexOf("## Por confirmar antes del brief"));

describe("giros", () => {
  it("son cuatro con local, más Gimnasios, y cinco grandes, en el orden de textos.md", () => {
    expect(LOCAL.map((g) => g.slug)).toEqual(["barberias", "clinicas", "restaurantes", "tiendas"]);
    expect(GRANDES.map((g) => g.slug)).toEqual(["distribuidoras", "inmobiliarias", "escuelas", "hoteles", "cadenas"]);
    expect(GIMNASIOS.href).toBe("/boaz");
    expect(giroPorSlug("empresas")).toBeUndefined();
  });

  it("sus textos están palabra por palabra en textos.md", () => {
    const faltan = [];
    for (const g of GIROS) {
      const cadenas = [
        `${g.nombre} — ${g.frase} → ${g.href}`,
        `${g.etiqueta} · ${g.titular}`,
        `"${g.cita}"`,
        ...(g.filas ?? []).map((f) => `${f.pasa} | ${f.hace}`),
        ...(g.puntos ?? []).map((p, i) => `0${i + 1} ${p}`),
      ];
      cadenas.filter((c) => !SECCION.includes(c)).forEach((c) => faltan.push(`${g.slug}: ${c}`));
    }
    for (const p of PASOS_EMPRESAS) {
      const linea = `${p.numero} ${p.nombre} — ${p.texto}`;
      if (!SECCION.includes(linea)) faltan.push(`empresas: ${linea}`);
    }
    if (!SECCION.includes(`${GIMNASIOS.nombre} — ${GIMNASIOS.frase} — "${GIMNASIOS.cta} →"`)) faltan.push("gimnasios");
    expect(faltan).toEqual([]);
  });

  it("cada escalera va de Responde a Empresa con el precio de NIVELES", () => {
    for (const g of LOCAL) {
      expect(g.filas.map((f) => f.nivel)).toEqual(NIVELES.map((n) => n.slug));
      for (const f of g.filas) {
        const n = NIVELES.find((x) => x.slug === f.nivel);
        const precio = n.precio.replace(/^./, (c) => c.toLowerCase());
        expect(SECCION).toContain(`- ${n.nombre} · ${precio} | ${f.pasa}`);
      }
    }
  });

  it("las tarjetas dicen desde cuánto: $9,500 con local, $46,500 las grandes y Cadenas se cotiza", () => {
    LOCAL.forEach((g) => expect(g.cta).toBe("DESDE $9,500"));
    GRANDES.forEach((g) => expect(g.cta).toBe(g.slug === "cadenas" ? "SE COTIZA" : "DESDE $46,500"));
  });

  it("cada giro tiene su dibujo", () => {
    for (const g of GIROS) expect(fs.existsSync(path.join(RAIZ, "public", g.dibujo))).toBe(true);
  });

  it("las once páginas van al sitemap", () => {
    const urls = sitemap().map((r) => r.url.replace("https://www.stringwebs.com", ""));
    for (const ruta of ["/tu-negocio", "/tu-negocio/empresas", ...GIROS.map((g) => g.href)]) {
      expect(urls).toContain(ruta);
    }
  });
});

// El fondo claro es de Boaz (Carlos, 2 nov): pared o tema de Boaz solo en la
// galería, el bloque de Boaz en /productos, /boaz, /gym y el muestrario.
describe("fondo claro", () => {
  const PERMITIDOS = [
    "app/components/salas/Sala5Galeria.jsx",
    "app/components/productos/BloqueBoaz.jsx",
    "app/(sitio)/boaz/page.jsx",
    "app/gym/layout.jsx",
    "app/muestrario/page.jsx",
    // Lote 21: el banco de Fundadores y Escala (404 en producción).
    "app/muestrario/boaz/page.jsx",
  ];
  const archivos = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const ruta = path.join(dir, e.name);
      return e.isDirectory() ? archivos(ruta) : /\.jsx?$/.test(e.name) ? [ruta] : [];
    });

  it("solo vive donde es de Boaz", () => {
    const claros = archivos(path.join(RAIZ, "app"))
      .filter((f) => !f.endsWith(".test.js"))
      .filter((f) => /data-theme="(pared|boaz)"/.test(fs.readFileSync(f, "utf8")))
      .map((f) => path.relative(RAIZ, f))
      .sort();
    expect(claros).toEqual([...PERMITIDOS].sort());
  });
});

// Lote 12: cada tarjeta de giro lleva su dibujo, en noche y en línea.
describe("dibujos de las tarjetas", () => {
  it("los nueve giros y Gimnasios tienen su dibujo, sin la lámina ni el azul de Boaz", () => {
    for (const giro of [...GIROS, GIMNASIOS]) {
      const archivo = path.join(RAIZ, "public", giro.dibujo);
      expect(fs.existsSync(archivo), giro.dibujo).toBe(true);
      const svg = fs.readFileSync(archivo, "utf8");
      expect(svg, giro.dibujo).toContain('viewBox="0 0 520 372"');
      expect(svg.toLowerCase(), giro.dibujo).not.toMatch(/#2979ff|#f4f2ec|#004aad/);
    }
  });
});
