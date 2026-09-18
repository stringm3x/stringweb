import { describe, it, expect } from "vitest";
import { quoteSchema, validExamples, invalidExamples } from "./quote-schema";

describe("quoteSchema", () => {
  it("acepta los ejemplos válidos del propio módulo", () => {
    for (const example of Object.values(validExamples)) {
      const result = quoteSchema.safeParse(example);
      expect(result.success, JSON.stringify(result.error?.issues)).toBe(true);
    }
  });

  it("acepta el envío con solo los 4 campos obligatorios", () => {
    const result = quoteSchema.safeParse(validExamples.minimo);
    expect(result.success, JSON.stringify(result.error?.issues)).toBe(true);
  });

  it("normaliza el email a minúsculas y sin espacios cuando se captura", () => {
    const result = quoteSchema.safeParse({
      ...validExamples.basico,
      email: "  Juan@EMAIL.com  ",
    });
    expect(result.success).toBe(true);
    expect(result.data.email).toBe("juan@email.com");
  });

  it("rechaza un nombre con números", () => {
    const result = quoteSchema.safeParse({
      ...validExamples.basico,
      name: "Juan123",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza un email inválido cuando se captura", () => {
    const result = quoteSchema.safeParse({
      ...validExamples.basico,
      ...invalidExamples.emailInvalido,
    });
    expect(result.success).toBe(false);
  });

  it("rechaza whatsapp con espacios o símbolos", () => {
    const result = quoteSchema.safeParse({
      ...validExamples.basico,
      ...invalidExamples.whatsappConEspacios,
    });
    expect(result.success).toBe(false);
  });

  it("rechaza un tipo de negocio ausente o muy corto", () => {
    const { businessType, ...sinTipoNegocio } = validExamples.basico;
    expect(quoteSchema.safeParse(sinTipoNegocio).success).toBe(false);
    expect(
      quoteSchema.safeParse({
        ...validExamples.basico,
        ...invalidExamples.tipoNegocioCorto,
      }).success
    ).toBe(false);
  });

  it("rechaza un objetivo ausente o muy corto", () => {
    const { objective, ...sinObjetivo } = validExamples.basico;
    expect(quoteSchema.safeParse(sinObjetivo).success).toBe(false);
    expect(
      quoteSchema.safeParse({
        ...validExamples.basico,
        ...invalidExamples.objetivoCorto,
      }).success
    ).toBe(false);
  });

  it("acepta un projectType ausente o vacío, pero rechaza uno fuera del enum", () => {
    const { projectType, ...sinNivel } = validExamples.basico;
    expect(quoteSchema.safeParse(sinNivel).success).toBe(true);
    expect(
      quoteSchema.safeParse({ ...validExamples.basico, projectType: "" })
        .success
    ).toBe(true);
    expect(
      quoteSchema.safeParse({
        ...validExamples.basico,
        projectType: "nivel99",
      }).success
    ).toBe(false);
  });

  it("acepta un presupuesto ausente o vacío, pero rechaza uno negativo", () => {
    const { budget, ...sinPresupuesto } = validExamples.basico;
    expect(quoteSchema.safeParse(sinPresupuesto).success).toBe(true);
    expect(
      quoteSchema.safeParse({ ...validExamples.basico, budget: "" }).success
    ).toBe(true);
    expect(
      quoteSchema.safeParse({
        ...validExamples.basico,
        ...invalidExamples.presupuestoNegativo,
      }).success
    ).toBe(false);
  });

  it("acepta una fecha ideal ausente, pero rechaza una en el pasado", () => {
    const { idealDate, ...sinFecha } = validExamples.basico;
    expect(quoteSchema.safeParse(sinFecha).success).toBe(true);
    expect(
      quoteSchema.safeParse({
        ...validExamples.basico,
        ...invalidExamples.fechaPasada,
      }).success
    ).toBe(false);
  });
});
