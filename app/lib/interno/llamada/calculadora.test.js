import { describe, expect, it } from "vitest";
import { calcular, fraseNumero, numero, pesos } from "./calculadora";
import { TEXTOS } from "./guion";
import { nichoPorId } from "./nichos";

// Lote 25: "su número". Solo lo capturado; deudas aparte; frase con las horas
// tal cual (ajuste C y ajuste 1 del 25 nov).
const cuenta = (id) => nichoPorId(id).cuenta;
const frase = (id, entradas) => fraseNumero(calcular(cuenta(id), entradas), TEXTOS.cuenta);

describe("calculadora", () => {
  it("caso Mariana: 120 alumnos, $900, 4 bajas al mes, 6 h a la semana", () => {
    const r = calcular(cuenta("academias"), { colegiatura: "900", bajas: "4", horas: "6" });
    expect(r.partidas).toEqual([{ id: "bajas", nombre: "Bajas", tipo: "mes", monto: 3600 }]);
    expect(r.alMes).toBe(3600);
    expect(r.alAno).toBe(43200);
    expect(r.deuda).toBe(0);
    expect(r.horas).toEqual({ frase: 6, unidad: "tuyasSemana", mes: 24 });
    expect(fraseNumero(r, TEXTOS.cuenta)).toBe("O sea, más o menos $3,600 al mes y unas 6 horas tuyas a la semana. ¿Así lo ves?");
  });

  it("sin nada capturado no hay número ni frase", () => {
    const r = calcular(cuenta("academias"), {});
    expect(r).toMatchObject({ partidas: [], alMes: 0, alAno: 0, deuda: 0, horas: { frase: null, mes: null } });
    expect(fraseNumero(r, TEXTOS.cuenta)).toBeNull();
  });

  it("la deuda va aparte: ni al mes ni ×12, y la frase la agrega al final", () => {
    const r = calcular(cuenta("academias"), { colegiatura: "900", bajas: "4", deuda: "18,000", horas: "6" });
    expect(r.alMes).toBe(3600);
    expect(r.alAno).toBe(43200);
    expect(r.deuda).toBe(18000);
    expect(fraseNumero(r, TEXTOS.cuenta)).toBe(
      "O sea, más o menos $3,600 al mes y unas 6 horas tuyas a la semana, y hoy te deben unos $18,000. ¿Así lo ves?",
    );
    // Solo deuda.
    expect(frase("desarrolladoras", { atrasado: "250000" })).toBe("O sea, hoy te deben unos $250,000. ¿Así lo ves?");
  });

  it("academias: el % sin cobrar solo cuenta si no capturó lo que le deben", () => {
    const base = { sinCobrar: "10", facturacion: "100000" };
    expect(calcular(cuenta("academias"), base).partidas).toEqual([
      { id: "cobranzaPorcentaje", nombre: "Cobranza", tipo: "mes", monto: 10000 },
    ]);
    const conDeuda = calcular(cuenta("academias"), { ...base, deuda: "5000" });
    expect(conDeuda.partidas.map((p) => p.id)).toEqual(["cobranzaDeuda"]);
    expect(conDeuda.alMes).toBe(0);
  });

  it("él lo dijo: los interesados y las cotizaciones solo cuentan con la casilla", () => {
    const academia = { colegiatura: "900", interesados: "3" };
    expect(calcular(cuenta("academias"), academia).alMes).toBe(0);
    expect(calcular(cuenta("academias"), { ...academia, dijoInteresados: true }).alMes).toBe(2700);
    const b2b = { cotizaciones: "5", venta: "20000" };
    expect(calcular(cuenta("b2b"), b2b).alMes).toBe(0);
    expect(calcular(cuenta("b2b"), { ...b2b, dijoCotizaciones: true }).alMes).toBe(100000);
  });

  it("horas de tu equipo a la semana en desarrolladoras y B2B: horas × personas, sin ×4", () => {
    const d = calcular(cuenta("desarrolladoras"), { horas: "5", vendedores: "3" });
    expect(d.horas).toEqual({ frase: 15, unidad: "equipoSemana", mes: 60 });
    expect(fraseNumero(d, TEXTOS.cuenta)).toBe("O sea, unas 15 horas de tu equipo a la semana. ¿Así lo ves?");
    const b = calcular(cuenta("b2b"), { horas: "4", personas: "2", cartera: "90000" });
    expect(b.horas).toEqual({ frase: 8, unidad: "equipoSemana", mes: 32 });
    expect(fraseNumero(b, TEXTOS.cuenta)).toBe(
      "O sea, unas 8 horas de tu equipo a la semana, y hoy te deben unos $90,000. ¿Así lo ves?",
    );
  });

  it("tiendas: cancelados × ticket × 4, y horas tuyas al día (el mes, × días que abre)", () => {
    const r = calcular(cuenta("tiendas"), { cancelados: "3", ticket: "650", horasDia: "1.5", dias: "26" });
    expect(r.alMes).toBe(7800);
    expect(r.horas).toEqual({ frase: 1.5, unidad: "tuyasDia", mes: 39 });
    expect(fraseNumero(r, TEXTOS.cuenta)).toBe("O sea, más o menos $7,800 al mes y unas 1.5 horas tuyas al día. ¿Así lo ves?");
  });

  it("lo que es solo texto sale tal cual, sin monto", () => {
    const r = calcular(cuenta("tiendas"), { apartados: " Unos 10 al mes, le detienen tallas " });
    expect(r.partidas).toEqual([{ id: "apartados", nombre: "Apartados sin recoger", tipo: "texto", texto: "Unos 10 al mes, le detienen tallas" }]);
    expect(r.alMes).toBe(0);
  });

  it("lee cifras como las escribe Carlos", () => {
    expect(numero("$1,200")).toBe(1200);
    expect(numero(" 6.5 ")).toBe(6.5);
    expect(numero("10%")).toBe(10);
    expect(numero("")).toBeNull();
    expect(numero("muchos")).toBeNull();
    expect(numero("-3")).toBeNull();
    expect(pesos(43200)).toBe("$43,200");
  });
});
