import { describe, it, expect } from "vitest";
import { quoteSchema, validExamples, invalidExamples } from "./quote-schema";

describe("quoteSchema", () => {
  it("acepta los tres ejemplos válidos del propio módulo", () => {
    for (const example of Object.values(validExamples)) {
      const result = quoteSchema.safeParse(example);
      expect(result.success, JSON.stringify(result.error?.issues)).toBe(true);
    }
  });

  it("normaliza el email a minúsculas y sin espacios", () => {
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

  it("rechaza un email inválido", () => {
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

  it("rechaza un projectType fuera del enum", () => {
    const result = quoteSchema.safeParse({
      ...validExamples.basico,
      projectType: "nivel99",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza presupuesto negativo o vacío", () => {
    expect(
      quoteSchema.safeParse({
        ...validExamples.basico,
        ...invalidExamples.presupuestoNegativo,
      }).success
    ).toBe(false);
    expect(
      quoteSchema.safeParse({
        ...validExamples.basico,
        ...invalidExamples.presupuestoVacio,
      }).success
    ).toBe(false);
  });

  it("rechaza una fecha ideal en el pasado", () => {
    const result = quoteSchema.safeParse({
      ...validExamples.basico,
      ...invalidExamples.fechaPasada,
    });
    expect(result.success).toBe(false);
  });
});
