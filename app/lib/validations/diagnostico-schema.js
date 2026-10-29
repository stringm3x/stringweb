import { z } from "zod";
import { GIROS, OTRA_COSA, SITUACIONES } from "../diagnostico";

// Validación del formulario de diagnóstico, en el cliente y en
// /api/diagnostico. Los mensajes son los de docs/textos.md § Mensajes de error.
export const MENSAJES = {
  nombre: "Escribe tu nombre.",
  whatsapp: "Escribe tu WhatsApp a 10 dígitos.",
  giro: "Elige el giro de tu negocio.",
  situacion: "Elige qué te pasa hoy.",
  otraCosa: "Cuéntanos qué te pasa.",
};

// Acepta el número como lo escriba la gente (espacios, guiones, +52) y
// deja solo los 10 dígitos.
export function normalizarWhatsapp(valor) {
  const digitos = String(valor ?? "").replace(/\D/g, "");
  return digitos.length === 12 && digitos.startsWith("52") ? digitos.slice(2) : digitos;
}

export const diagnosticoSchema = z
  .object({
    nombre: z.string().trim().min(1, MENSAJES.nombre).max(120, MENSAJES.nombre),
    whatsapp: z
      .string()
      .transform(normalizarWhatsapp)
      .refine((v) => /^\d{10}$/.test(v), MENSAJES.whatsapp),
    giro: z.enum(GIROS, { error: MENSAJES.giro }),
    situacion: z.enum(SITUACIONES, { error: MENSAJES.situacion }),
    otraCosa: z.string().trim().max(1000).optional().default(""),
  })
  .superRefine((datos, ctx) => {
    if (datos.situacion === OTRA_COSA && !datos.otraCosa) {
      ctx.addIssue({ code: "custom", path: ["otraCosa"], message: MENSAJES.otraCosa });
    }
  });
