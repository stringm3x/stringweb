import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { quoteSchema } from "../../lib/validations/quote-schema";
import { generateEmailTemplate } from "./email-template";

export async function POST(request) {
  try {
    console.log("📩 Iniciando proceso de cotización");

    const body = await request.json();
    console.log("📦 Datos recibidos:", body);

    // Validar
    const validation = quoteSchema.safeParse(body);
    if (!validation.success) {
      console.log(
        "❌ Validación falló:",
        validation.error.flatten().fieldErrors
      );
      return NextResponse.json(
        { success: false, errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;
    console.log("✅ Validación exitosa");

    // Verificar variables de entorno
    console.log("🔧 Variables de entorno:", {
      host: process.env.SMTP_HOST ? "✅" : "❌",
      port: process.env.SMTP_PORT ? "✅" : "❌",
      user: process.env.SMTP_USER ? "✅" : "❌",
      pass: process.env.SMTP_PASSWORD ? "✅" : "❌",
      from: process.env.SMTP_FROM ? "✅" : "❌",
      notification: process.env.NOTIFICATION_EMAIL ? "✅" : "❌",
    });

    // Configurar transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verificar conexión
    try {
      await transporter.verify();
      console.log("✅ Conexión SMTP exitosa");
    } catch (verifyError) {
      console.error("❌ Error de conexión SMTP:", verifyError);
      return NextResponse.json(
        {
          success: false,
          message: "Error de conexión con el servidor de email",
          error: verifyError.message,
        },
        { status: 500 }
      );
    }

    // Enviar email
    try {
      const info = await transporter.sendMail({
        from: `"Cotizaciones Web" <${process.env.SMTP_FROM}>`,
        to: process.env.NOTIFICATION_EMAIL,
        replyTo: data.email,
        subject: `Nueva Cotización: ${data.projectType} - ${data.name}`,
        html: generateEmailTemplate(data),
      });
      console.log("✅ Email enviado:", info.messageId);
    } catch (sendError) {
      console.error("❌ Error al enviar email:", sendError);
      return NextResponse.json(
        {
          success: false,
          message: "Error al enviar el email",
          error: sendError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Cotización enviada correctamente",
    });
  } catch (error) {
    console.error("❌ Error general:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error al procesar la solicitud",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
