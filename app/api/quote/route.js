import { NextResponse } from "next/server";
import { quoteSchema } from "../../lib/validations/quote-schema";
import { generateEmailTemplate } from "./email-template";
import { getTransporter, getMissingSmtpEnvVars } from "../../lib/mailer";

// ── POST /api/quote ────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();

    // ── Validación con Zod ──────────────────────────────────────────────────
    const validation = quoteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Datos inválidos",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // ── Verificar variables de entorno requeridas ───────────────────────────
    const missingVars = getMissingSmtpEnvVars();

    if (missingVars.length > 0) {
      console.error("Missing env vars:", missingVars);
      return NextResponse.json(
        {
          success: false,
          message: "Error de configuración del servidor",
        },
        { status: 500 }
      );
    }

    // ── Enviar email ────────────────────────────────────────────────────────
    const mailer = getTransporter();

    await mailer.sendMail({
      from: `"STRING Diagnósticos" <${process.env.SMTP_FROM}>`,
      to: process.env.NOTIFICATION_EMAIL,
      replyTo: data.email,
      subject: `Nuevo diagnóstico: ${data.name} — ${data.projectType}`,
      html: generateEmailTemplate(data),
    });

    return NextResponse.json({
      success: true,
      message: "Diagnóstico enviado correctamente",
    });
  } catch (error) {
    console.error("Quote API error:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Error al procesar la solicitud. Intenta de nuevo.",
      },
      { status: 500 }
    );
  }
}
