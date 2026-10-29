import { NextResponse } from "next/server";
import { diagnosticoSchema } from "@/app/lib/validations/diagnostico-schema";
import { verificarTurnstile } from "@/app/lib/turnstile";
import { getTransporter, getMissingSmtpEnvVars } from "@/app/lib/mailer";
import { CORREO } from "@/app/lib/contacto";
import { armarCorreo } from "./correo";

// Mensajes de docs/textos.md § Mensajes de error.
const NO_SE_PUDO = "No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.";
const SIN_VERIFICAR = "No pudimos confirmar el envío. Recarga la página e intenta de nuevo.";

const responder = (status, message, extra = {}) =>
  NextResponse.json({ success: status === 200, message, ...extra }, { status });

// POST /api/diagnostico: valida, verifica Turnstile y manda la solicitud a Carlos.
export async function POST(request) {
  let cuerpo;
  try {
    cuerpo = await request.json();
  } catch {
    return responder(400, NO_SE_PUDO);
  }

  const { turnstileToken, ...campos } = cuerpo ?? {};
  const validacion = diagnosticoSchema.safeParse(campos);
  if (!validacion.success) {
    return responder(400, NO_SE_PUDO, { errors: validacion.error.flatten().fieldErrors });
  }

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim();
  if (!(await verificarTurnstile(turnstileToken, ip))) {
    return responder(403, SIN_VERIFICAR);
  }

  const faltan = getMissingSmtpEnvVars();
  if (faltan.length > 0) {
    console.error("Faltan variables de correo:", faltan);
    return responder(500, NO_SE_PUDO);
  }

  try {
    const { asunto, texto, html } = armarCorreo(validacion.data);
    await getTransporter().sendMail({
      from: `"STRING Diagnósticos" <${process.env.SMTP_FROM}>`,
      to: CORREO,
      subject: asunto,
      text: texto,
      html,
    });
  } catch (error) {
    console.error("Diagnóstico:", error.message);
    return responder(500, NO_SE_PUDO);
  }

  return responder(200, "Listo. Te respondemos en un día hábil.");
}
