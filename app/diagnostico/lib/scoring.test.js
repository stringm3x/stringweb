import { describe, it, expect } from "vitest";
import {
  calcularScoreCaptacion,
  calcularScoreOperacion,
  etiquetaScore,
} from "./scoring";

describe("calcularScoreCaptacion", () => {
  it("empieza en 100 con las mejores respuestas posibles", () => {
    const score = calcularScoreCaptacion({
      quien: "staff",
      respuesta: "rapido",
      registro: "crm",
      conversion: "8",
    });
    expect(score).toBe(100);
  });

  it("acumula penalizaciones con las peores respuestas", () => {
    const score = calcularScoreCaptacion({
      quien: "nadie",
      respuesta: "nadie",
      registro: "nada",
      conversion: "1",
    });
    // 100 - 20 (quien) - 30 (respuesta) - 30 (registro) - 15 (conversion)
    expect(score).toBe(5);
  });

  it("nunca baja de 5 aunque todo sume más penalización", () => {
    const score = calcularScoreCaptacion({
      quien: "dueno",
      respuesta: "dia",
      registro: "nada",
      conversion: "0",
    });
    expect(score).toBeGreaterThanOrEqual(5);
  });

  it("aplica penalización parcial para respuestas intermedias", () => {
    const score = calcularScoreCaptacion({
      quien: "staff",
      respuesta: "horas",
      registro: "excel",
      conversion: "4",
    });
    // 100 - 15 (horas) - 8 (excel) - 8 (conversion 3-4)
    expect(score).toBe(69);
  });
});

describe("calcularScoreOperacion", () => {
  it("flow servicios: penaliza pagos en memoria como la peor señal", () => {
    const score = calcularScoreOperacion(
      { pagos: "memoria", agenda: "no", seguimiento: "no" },
      "servicios"
    );
    // 100 - 40 - 10 - 20
    expect(score).toBe(30);
  });

  it("flow ecommerce: penaliza gestión de pedidos manual", () => {
    const score = calcularScoreOperacion(
      { inventario: "excel", "gestion-pedidos": "manual" },
      "ecommerce"
    );
    // 100 - 15 - 35
    expect(score).toBe(50);
  });

  it("flow menu: penaliza pagos en memoria y sin reactivación", () => {
    const score = calcularScoreOperacion(
      { pagos: "memoria", reactivacion: "no" },
      "menu"
    );
    // 100 - 40 - 30
    expect(score).toBe(30);
  });

  it("flow desconocido no penaliza nada", () => {
    const score = calcularScoreOperacion({}, "otro");
    expect(score).toBe(100);
  });
});

describe("etiquetaScore", () => {
  it.each([
    [100, "Saludable"],
    [80, "Saludable"],
    [79, "Mejorable"],
    [55, "Mejorable"],
    [54, "En riesgo"],
    [30, "En riesgo"],
    [29, "Crítico"],
    [5, "Crítico"],
  ])("score %i → %s", (score, label) => {
    expect(etiquetaScore(score).label).toBe(label);
  });
});
