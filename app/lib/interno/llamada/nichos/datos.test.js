import { describe, expect, it } from "vitest";
import { GUION, TIPOS_DUENO, TRAMOS } from "../guion";
import { llenar } from "../llenar";
import { NICHOS, nichoPorId } from ".";

// Lote 25: las fichas de nicho son datos completos, sin precios de STRING y
// sin funciones (llegan como props desde el servidor).

const activos = NICHOS.filter((n) => !n.enPausa);
const NIVELES = ["responde", "organiza", "automatiza", "controla", "empresa"];
const PARTIDAS = ["mes", "deuda", "texto"];
const CAMPOS = ["pesos", "numero", "porcentaje", "casilla", "texto"];
const UNIDADES = ["tuyasSemana", "equipoSemana", "tuyasDia"];
const noVacio = (t) => typeof t === "string" && t.trim().length > 0;

// Recorre un valor y devuelve las rutas de todo lo que sea función.
function funciones(valor, ruta = "") {
  if (typeof valor === "function") return [ruta];
  if (valor && typeof valor === "object") return Object.entries(valor).flatMap(([k, v]) => funciones(v, `${ruta}.${k}`));
  return [];
}

describe("nichos", () => {
  it("academias, desarrolladoras, B2B y tiendas, y clínicas en pausa sin ficha", () => {
    expect(NICHOS.map((n) => n.id)).toEqual(["academias", "desarrolladoras", "b2b", "tiendas", "clinicas"]);
    const clinicas = NICHOS.at(-1);
    expect(clinicas).toEqual({ id: "clinicas", nombre: "Clínicas", enPausa: true });
    expect(nichoPorId("clinicas")).toBeUndefined();
    expect(nichoPorId("academias").nombre).toBe("Academias");
  });

  it.each(activos.map((n) => [n.id, n]))("%s tiene la ficha completa", (_, n) => {
    expect(noVacio(n.filtro)).toBe(true);
    for (const tipo of ["todos", ...TIPOS_DUENO.map((t) => t.id)]) {
      expect(n.situacion[tipo].length, tipo).toBeGreaterThan(0);
      expect(n.situacion[tipo].every(noVacio), tipo).toBe(true);
    }
    expect(n.problema.length).toBeGreaterThan(0);
    expect(n.implicacion.length).toBeGreaterThan(0);
    expect([...n.problema, ...n.implicacion].every(noVacio)).toBe(true);
    expect(n.prioridades.length).toBeGreaterThan(0);
    expect(n.prioridades.every((p) => noVacio(p.id) && noVacio(p.nombre) && noVacio(p.pantalla))).toBe(true);
    expect(n.objeciones.length).toBeGreaterThan(0);
    expect(n.objeciones.every((o) => noVacio(o.dice) && noVacio(o.respuesta))).toBe(true);
  });

  it.each(activos.map((n) => [n.id, n]))("%s: niveles con reglas de la escalera", (_, n) => {
    const { porDefecto, reglas } = n.niveles;
    expect(porDefecto === null || NIVELES.includes(porDefecto)).toBe(true);
    expect(reglas.length).toBeGreaterThan(0);
    expect(reglas.every((r) => NIVELES.includes(r.nivel) && noVacio(r.regla))).toBe(true);
  });

  it.each(activos.map((n) => [n.id, n]))("%s: la cuenta solo usa campos que existen", (_, n) => {
    const { campos, partidas, horas } = n.cuenta;
    const ids = campos.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(campos.every((c) => CAMPOS.includes(c.tipo) && noVacio(c.etiqueta))).toBe(true);
    const tipoDe = Object.fromEntries(campos.map((c) => [c.id, c.tipo]));
    const partidasIds = partidas.map((p) => p.id);
    for (const p of partidas) {
      expect(PARTIDAS, p.id).toContain(p.tipo);
      expect(p.factores.every((f) => ids.includes(f)), p.id).toBe(true);
      if (p.requiere) expect(tipoDe[p.requiere], p.id).toBe("casilla");
      if (p.porcentaje) expect(tipoDe[p.porcentaje], p.id).toBe("porcentaje");
      if (p.siNo) expect(partidasIds, p.id).toContain(p.siNo);
      if (p.tipo === "texto") expect(p.factores.map((f) => tipoDe[f]), p.id).toEqual(["texto"]);
    }
    expect(UNIDADES).toContain(horas.unidad);
    expect([...horas.frase, ...horas.mes].every((f) => tipoDe[f] === "numero")).toBe(true);
  });

  it("horas de la frase (ajuste 1): academias tuyas a la semana, desarrolladoras y B2B de tu equipo, tiendas al día", () => {
    const unidad = (id) => nichoPorId(id).cuenta.horas;
    expect(unidad("academias")).toMatchObject({ unidad: "tuyasSemana", frase: ["horas"], porSemana: true });
    expect(unidad("desarrolladoras")).toMatchObject({ unidad: "equipoSemana", frase: ["horas", "vendedores"] });
    expect(unidad("b2b")).toMatchObject({ unidad: "equipoSemana", frase: ["horas", "personas"] });
    expect(unidad("tiendas")).toMatchObject({ unidad: "tuyasDia", frase: ["horasDia"], porSemana: false });
  });

  it("las deudas van aparte: cobranza de academias, desarrolladoras y la cartera de B2B", () => {
    const deudas = activos.flatMap((n) => n.cuenta.partidas.filter((p) => p.tipo === "deuda").map((p) => `${n.id}.${p.id}`));
    expect(deudas).toEqual(["academias.cobranzaDeuda", "desarrolladoras.cobranza", "b2b.cartera"]);
  });

  it("ningún precio en las fichas, salvo el filtro (criterio del prospecto)", () => {
    for (const { filtro, ...resto } of activos) {
      expect(JSON.stringify(resto), resto.id).not.toMatch(/\$\s?\d/);
    }
  });

  it("sin funciones: guion y fichas pasan como props del servidor", () => {
    expect(funciones(NICHOS)).toEqual([]);
    expect(funciones(GUION)).toEqual([]);
  });
});

describe("guion", () => {
  it("cinco tramos con sus minutos, del 0 al 20 sin huecos", () => {
    expect(TRAMOS.map((t) => [t.nombre, t.desde, t.hasta])).toEqual([
      ["Apertura", 0, 2],
      ["Su negocio", 2, 8],
      ["Lo que le cuesta", 8, 13],
      ["Cómo se vería", 13, 17],
      ["Siguiente paso", 17, 20],
    ]);
  });

  it("el único precio es el de Responde, y sale de precios.js", () => {
    const texto = JSON.stringify(GUION);
    expect(texto.match(/\$\s?[\d,]+/g)).toEqual(["$9,500"]);
    expect(GUION.RECORDATORIOS.at(-1)).toContain("Desde $9,500; con lo que me cuentes te digo el nivel exacto en la propuesta.");
  });

  it("llenar pone dueño y negocio, y deja las pistas sin valor", () => {
    const frase = "Gracias, [dueño]. Tu [negocio]: desde que [alguien te pregunta].";
    expect(llenar(frase, { dueño: "Mariana", negocio: " Academia Sol " })).toBe(
      "Gracias, Mariana. Tu Academia Sol: desde que [alguien te pregunta].",
    );
    expect(llenar(frase, { dueño: "  " })).toBe(frase);
  });
});
