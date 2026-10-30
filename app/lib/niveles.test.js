import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { NIVELES, nivelPorSlug } from "./niveles";

// Los cinco niveles (lote 8): precios de CLAUDE.md y textos palabra por
// palabra de docs/textos.md.
const TEXTOS = fs.readFileSync(path.resolve(__dirname, "../../docs/textos.md"), "utf8");
const PRECIOS = {
  responde: "Desde $8,000",
  organiza: "Desde $18,000",
  automatiza: "Desde $28,000",
  controla: "Desde $40,000",
  empresa: "Se cotiza",
};

// Algunos puntos de la tabla de textos.md no llevan punto final; aquí sí.
const sinPunto = (t) => t.replace(/\.$/, "");

describe("niveles", () => {
  it("son cinco, en orden, con su slug y su precio", () => {
    expect(NIVELES.map((n) => n.slug)).toEqual(Object.keys(PRECIOS));
    NIVELES.forEach((n, i) => {
      expect(n.numero).toBe(i + 1);
      expect(n.precio).toBe(PRECIOS[n.slug]);
    });
  });

  it("cada uno lleva al siguiente y Empresa cierra", () => {
    NIVELES.slice(0, 4).forEach((n, i) => expect(n.siguiente).toBe(NIVELES[i + 1].slug));
    expect(nivelPorSlug("empresa").siguiente).toBeNull();
    expect(nivelPorSlug("otro")).toBeUndefined();
  });

  it("sus textos están palabra por palabra en docs/textos.md", () => {
    const faltan = [];
    for (const n of NIVELES) {
      const cadenas = [
        n.titular,
        n.paraQuien,
        n.lineaDibujo,
        n.alt,
        n.ejemplo,
        n.dices,
        n.hace,
        n.suma,
        ...n.incluye.map(({ fuerte, resto }) => sinPunto(fuerte + resto)),
      ];
      if (n.crezcas) cadenas.push(n.crezcas.replace(/^Si/, "si"));
      cadenas.filter((c) => !TEXTOS.includes(c)).forEach((c) => faltan.push(`${n.slug}: ${c}`));
    }
    expect(faltan).toEqual([]);
  });
});
