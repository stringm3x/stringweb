import { z } from "zod";

// Validación del formulario de pre-registro del gym (cliente).
// El backend (string-gym-saas /api/solicitudes) revalida con su propio schema.
export const solicitudSchema = z.object({
  nombre: z
    .string()
    .min(2, "Escribe tu nombre")
    .max(120, "El nombre es demasiado largo")
    .transform((v) => v.trim()),

  email: z
    .string()
    .min(5, "Escribe tu email")
    .max(120, "El email es demasiado largo")
    .email("Email inválido")
    .transform((v) => v.toLowerCase().trim()),

  telefono: z
    .string()
    .min(8, "Escribe un teléfono válido")
    .max(25, "El teléfono es demasiado largo")
    .transform((v) => v.trim()),

  nombre_gym: z
    .string()
    .min(2, "Escribe el nombre de tu gimnasio")
    .max(120, "El nombre es demasiado largo")
    .transform((v) => v.trim()),

  plan_interes: z.enum(["basico", "pro", "escala"], {
    error: "Selecciona un plan",
  }),

  ciudad: z.string().max(120).optional(),

  // El select envía "" | "25" | "100" | "300" | "500"; se convierte a número
  // (o se omite) en el submit handler.
  miembros_aprox: z.string().optional(),

  como_entero: z.string().max(300).optional(),
});
