import { describe, expect, it } from "vitest";
import { nichoPorId } from "./nichos";
import { sugerirNivelNicho } from "./nivel";

// Lote 25: el nivel sale de las reglas de la ficha que Carlos marca. Si
// quedan dos, el más chico.
const niveles = (id) => nichoPorId(id).niveles;

describe("sugerirNivelNicho", () => {
  it("academias: una regla, su nivel", () => {
    expect(sugerirNivelNicho(niveles("academias"), [1])).toEqual({
      nivel: "automatiza",
      razones: ["Quiere que el sistema cobre, recuerde y avise solo (app para papás, asistencia, alumnos en riesgo)"],
      porDefecto: false,
    });
  });

  it("Organiza + Automatiza → Organiza", () => {
    expect(sugerirNivelNicho(niveles("academias"), [0, 1])).toEqual({
      nivel: "organiza",
      razones: ["Quiere en un solo lugar interesados, alumnos y cobros"],
      porDefecto: false,
    });
    expect(sugerirNivelNicho(niveles("academias"), [1, 0]).nivel).toBe("organiza");
  });

  it("si quedan dos, sugiere el más chico", () => {
    expect(sugerirNivelNicho(niveles("academias"), [2, 1]).nivel).toBe("automatiza");
    expect(sugerirNivelNicho(niveles("academias"), [0, 1, 2]).nivel).toBe("organiza");
  });

  it("academias sin marcar: ningún nivel", () => {
    expect(sugerirNivelNicho(niveles("academias"), [])).toEqual({ nivel: null, razones: [], porDefecto: false });
  });

  it.each(["desarrolladoras", "b2b", "tiendas"])("%s: Controla de caso típico y Empresa con su regla", (id) => {
    expect(sugerirNivelNicho(niveles(id), [])).toEqual({ nivel: "controla", razones: [], porDefecto: true });
    expect(sugerirNivelNicho(niveles(id), [0])).toMatchObject({ nivel: "empresa", porDefecto: false });
  });
});
