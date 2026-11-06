import { describe, expect, it } from "vitest";
import {
  ESCALA_ESTADO,
  LUGARES_FUNDADORES,
  TOTAL_FUNDADORES,
  textoLugares,
  validarEstadoEscala,
  validarLugares,
} from "./boaz-lanzamiento";

// Lote 21: los lugares de fundadores y el estado de Escala, a mano y en un
// solo lugar.
describe("boaz-lanzamiento", () => {
  it("arranca con 5 de 5 lugares y Escala en desarrollo", () => {
    expect(TOTAL_FUNDADORES).toBe(5);
    expect(LUGARES_FUNDADORES).toBe(5);
    expect(ESCALA_ESTADO).toBe("desarrollo");
  });

  it("acepta de 0 a 5 lugares, enteros", () => {
    [0, 1, 2, 3, 4, 5].forEach((n) => expect(validarLugares(n)).toBe(n));
    [-1, 6, 2.5, NaN, "5", null, undefined].forEach((n) => expect(() => validarLugares(n)).toThrow());
  });

  it("solo acepta los estados desarrollo y pruebas", () => {
    expect(validarEstadoEscala("desarrollo")).toBe("desarrollo");
    expect(validarEstadoEscala("pruebas")).toBe("pruebas");
    ["", "listo", "Pruebas", undefined].forEach((e) => expect(() => validarEstadoEscala(e)).toThrow());
  });

  it("dice los lugares en singular, plural y cuando ya no hay", () => {
    expect(textoLugares(0)).toBe("LOS 5 LUGARES ESTÁN TOMADOS");
    expect(textoLugares(1)).toBe("QUEDA 1 DE 5 LUGARES");
    expect(textoLugares(2)).toBe("QUEDAN 2 DE 5 LUGARES");
    expect(textoLugares(5)).toBe("QUEDAN 5 DE 5 LUGARES");
    expect(() => textoLugares(6)).toThrow();
  });
});
