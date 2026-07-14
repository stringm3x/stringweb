import { describe, it, expect } from "vitest";
import { calcularMetricas, formatMXN } from "./metricas";

describe("calcularMetricas — flow servicios", () => {
  it("calcula pérdida anual a partir de volumen, conversión y ticket", () => {
    const m = calcularMetricas(
      { volumen: "10", conversion: "4" },
      "servicios",
      1000
    );
    expect(m.convRate).toBe(40); // conversion * 10
    // perdMes = round(10 * (1 - 4/10)) * 4 = round(6) * 4 = 24
    expect(m.perdMes).toBe(24);
    expect(m.perdAnual).toBe(24 * 1000 * 12);
    expect(m.label).toBe("prospectos perdidos/mes");
  });

  it("trata volumen/conversión ausentes como 0 en vez de NaN", () => {
    const m = calcularMetricas({}, "servicios", 500);
    expect(m.perdMes).toBe(0);
    expect(m.perdAnual).toBe(0);
    expect(Number.isNaN(m.perdAnual)).toBe(false);
  });
});

describe("calcularMetricas — flow ecommerce", () => {
  it("estima 30% de pedidos perdidos, sin tasa de conversión explícita", () => {
    const m = calcularMetricas({ volumen: "20" }, "ecommerce", 400);
    // perdMes = round(20 * 0.3) * 4 = round(6) * 4 = 24
    expect(m.perdMes).toBe(24);
    expect(m.perdAnual).toBe(24 * 400 * 12);
    expect(m.convRate).toBeNull();
  });
});

describe("calcularMetricas — flow menu", () => {
  it("estima 15% de pedidos perdidos por día, multiplicado por 30", () => {
    const m = calcularMetricas({ volumen: "40" }, "menu", 100);
    // perdMes = round(40 * 0.15) * 30 = round(6) * 30 = 180
    expect(m.perdMes).toBe(180);
    expect(m.perdAnual).toBe(180 * 100 * 12);
    expect(m.volumenDiario).toBe(40);
  });
});

describe("calcularMetricas — flow desconocido", () => {
  it("devuelve ceros en vez de tronar", () => {
    expect(calcularMetricas({}, "otro", 100)).toEqual({
      perdAnual: 0,
      perdMes: 0,
    });
  });
});

describe("formatMXN", () => {
  it("formatea como pesos mexicanos sin decimales", () => {
    expect(formatMXN(1000)).toBe("$1,000");
    expect(formatMXN(0)).toBe("$0");
    expect(formatMXN(1234567)).toBe("$1,234,567");
  });
});
