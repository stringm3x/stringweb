import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { quoteSchema } from "../../lib/validations/quote-schema";
import { generateEmailTemplate } from "./email-template";

// ── Transporter singleton — se crea una vez, no en cada request ───────────────
let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
};

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
    const requiredEnvVars = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASSWORD",
      "SMTP_FROM",
      "NOTIFICATION_EMAIL",
    ];

    const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

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
