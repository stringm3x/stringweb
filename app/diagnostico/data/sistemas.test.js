import { describe, it, expect } from "vitest";
import { getSistema, SISTEMAS } from "./sistemas";

describe("getSistema", () => {
  it("devuelve el sistema correcto para un sector y tier válidos", () => {
    const sistema = getSistema("gym", "base");
    expect(sistema).toEqual(SISTEMAS.gym.base);
    expect(sistema.precioMin).toBe(18000);
  });

  it("devuelve null si el sector no existe", () => {
    expect(getSistema("sector-inventado", "base")).toBeNull();
  });

  it("devuelve null si el tier no existe para ese sector", () => {
    expect(getSistema("gym", "tier-inventado")).toBeNull();
  });

  it("cada sistema tiene los campos que usa la propuesta (precio, anticipo, tiempo)", () => {
    for (const [sector, tiers] of Object.entries(SISTEMAS)) {
      for (const [tier, sistema] of Object.entries(tiers)) {
        expect(sistema.nombre, `${sector}.${tier}`).toBeTruthy();
        expect(sistema.precio, `${sector}.${tier}`).toBeTruthy();
        expect(sistema.precioMin, `${sector}.${tier}`).toBeGreaterThan(0);
        expect(sistema.anticipo, `${sector}.${tier}`).toBeTruthy();
        expect(sistema.tiempo, `${sector}.${tier}`).toBeTruthy();
      }
    }
  });
});
