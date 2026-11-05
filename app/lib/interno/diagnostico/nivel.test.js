import { describe, expect, it } from "vitest";
import { N, RAZONES } from "./contenido";
import { OFERTAS, conBoceto, nivelSiguiente, sugerirNivel } from "./nivel";

const r = (valores) => Object.fromEntries(Object.entries(valores).map(([id, valor]) => [id, { valor }]));
const nivel = (giro, valores = {}) => sugerirNivel({ giro, respuestas: r(valores) });

describe("sugerirNivel: las seis reglas", () => {
  it("1. gimnasio → Boaz Pro, gane lo que gane la N", () => {
    expect(nivel("gimnasio", { n: N.controla })).toEqual({ nivel: "boaz", razon: RAZONES.gimnasio });
    expect(nivel("gimnasio")).toEqual({ nivel: "boaz", razon: RAZONES.gimnasio });
  });

  it("2. empresa mediana o grande → Empresa, gane lo que gane la N", () => {
    expect(nivel("empresa", { n: N.responde })).toEqual({ nivel: "empresa", razon: RAZONES.empresa });
    expect(nivel("empresa", { n: N.nose })).toEqual({ nivel: "empresa", razon: RAZONES.empresa });
  });

  it("3. N = saber cuánto gano, o tienda en línea → Controla", () => {
    expect(nivel("barberia", { n: N.controla })).toEqual({ nivel: "controla", razon: RAZONES.controla });
    expect(nivel("tienda", { n: N.responde })).toEqual({ nivel: "controla", razon: RAZONES.tienda });
    expect(nivel("tienda", { n: N.nose })).toEqual({ nivel: "controla", razon: RAZONES.tienda });
    expect(nivel("tienda")).toEqual({ nivel: "controla", razon: RAZONES.tienda });
  });

  it("4. N = que el seguimiento siga → Automatiza", () => {
    expect(nivel("clinica", { n: N.automatiza })).toEqual({ nivel: "automatiza", razon: RAZONES.automatiza });
  });

  it("5. N = clientes en un solo lugar → Organiza", () => {
    expect(nivel("restaurante", { n: N.organiza, pGiro: "Sí" })).toEqual({ nivel: "organiza", razon: RAZONES.organiza });
  });

  it("6. N = que nadie se quede sin respuesta → Responde", () => {
    expect(nivel("barberia", { n: N.responde, s2: "Excel", pGiro: "Sí" })).toEqual({
      nivel: "responde",
      razon: RAZONES.responde,
    });
  });
});

describe('sugerirNivel: N = "No sé"', () => {
  it.each(["barberia", "clinica", "restaurante"])("P de %s en Sí o A veces → Automatiza", (giro) => {
    for (const pGiro of ["Sí", "A veces"]) {
      expect(nivel(giro, { n: N.nose, pGiro, s2: "Excel", p1: "Sí" })).toEqual({
        nivel: "automatiza",
        razon: RAZONES.noSeGiro,
      });
    }
  });

  it("P del giro en No → sigue bajando", () => {
    expect(nivel("barberia", { n: N.nose, pGiro: "No", s2: "Excel" }).nivel).toBe("organiza");
  });

  it.each(["Cuaderno", "Excel", "WhatsApp", "En la cabeza"])("S2 = %s → Organiza", (s2) => {
    expect(nivel("clinica", { n: N.nose, s2, p1: "Sí" })).toEqual({ nivel: "organiza", razon: RAZONES.noSeS2 });
  });

  it("S2 = un sistema no pide Organiza", () => {
    expect(nivel("clinica", { n: N.nose, s2: "Un sistema", p1: "A veces" })).toEqual({
      nivel: "responde",
      razon: RAZONES.noSeP1,
    });
  });

  it("P1 en Sí o A veces → Responde", () => {
    for (const p1 of ["Sí", "A veces"]) {
      expect(nivel("restaurante", { n: N.nose, p1 })).toEqual({ nivel: "responde", razon: RAZONES.noSeP1 });
    }
  });

  it("nada marcado → Responde", () => {
    expect(nivel("barberia", { n: N.nose })).toEqual({ nivel: "responde", razon: RAZONES.noSeNada });
    expect(nivel("barberia", { n: N.nose, p1: "No", pGiro: "No", s2: "Un sistema" })).toEqual({
      nivel: "responde",
      razon: RAZONES.noSeNada,
    });
  });

  it("una pregunta saltada cuenta como No sé", () => {
    // Saltada: sin valor (puede traer nota).
    const saltadas = { n: { nota: "no supo" }, pGiro: {}, s2: {}, p1: {} };
    expect(sugerirNivel({ giro: "barberia", respuestas: saltadas })).toEqual(nivel("barberia", { n: N.nose }));
    expect(sugerirNivel({ giro: "clinica", respuestas: { s2: { valor: "Excel" } } })).toEqual(
      nivel("clinica", { n: N.nose, s2: "Excel" }),
    );
  });

  it("Controla y Empresa nunca salen por descarte", () => {
    const giros = ["barberia", "clinica", "restaurante"];
    const opciones = { pGiro: ["Sí", "A veces", "No", undefined], s2: ["Cuaderno", "Un sistema", undefined], p1: ["Sí", "No", undefined] };
    for (const giro of giros)
      for (const pGiro of opciones.pGiro)
        for (const s2 of opciones.s2)
          for (const p1 of opciones.p1)
            for (const p2 of ["Sí", "No", undefined])
              for (const n of [N.nose, undefined]) {
                const sale = nivel(giro, { pGiro, s2, p1, p2, n }).nivel;
                expect(["responde", "organiza", "automatiza"]).toContain(sale);
              }
  });

  it('"No sé" no sube el nivel', () => {
    expect(nivel("barberia", { n: N.nose, p1: "Sí" }).nivel).toBe(nivel("barberia", { p1: "Sí" }).nivel);
  });
});

describe("ofertas", () => {
  it("precio, continuidad y boceto de cada nivel", () => {
    expect(OFERTAS.responde).toMatchObject({ desde: "$9,500", continuidad: { nombre: "Cuida", desde: "$2,100" }, boceto: null });
    expect(OFERTAS.organiza).toMatchObject({ desde: "$21,000", continuidad: { nombre: "Cuida", desde: "$2,100" }, boceto: null });
    expect(OFERTAS.automatiza).toMatchObject({ desde: "$32,500", continuidad: { nombre: "Mejora", desde: "$3,500" }, boceto: "$3,500" });
    expect(OFERTAS.controla).toMatchObject({ desde: "$46,500", continuidad: { nombre: "Mejora", desde: "$3,500" }, boceto: "$3,500" });
    expect(OFERTAS.empresa).toMatchObject({
      desde: null,
      minimo: "$80,000",
      continuidad: { nombre: "Impulsa", desde: "$5,800" },
      boceto: "desde $7,500",
    });
    expect(OFERTAS.boaz).toMatchObject({ mes: "$1,299", fundador: { mes: "$799", meses: 12 }, continuidad: null, boceto: null });
  });

  it("el boceto solo en Automatiza, Controla y Empresa", () => {
    expect(["responde", "organiza", "automatiza", "controla", "empresa", "boaz"].filter(conBoceto)).toEqual([
      "automatiza",
      "controla",
      "empresa",
    ]);
  });

  it("cuando crezca: el nivel siguiente; Empresa y Boaz sin siguiente", () => {
    expect(nivelSiguiente("responde")).toBe("organiza");
    expect(nivelSiguiente("controla")).toBe("empresa");
    expect(nivelSiguiente("empresa")).toBeNull();
    expect(nivelSiguiente("boaz")).toBeNull();
  });
});
