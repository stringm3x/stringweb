// app/api/quote/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { quoteSchema } from "../../lib/validations/quote-schema";
import { generateEmailTemplate } from "./email-template";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validar
    const validation = quoteSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;

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
    await transporter.verify();
    console.log("✅ Conexión SMTP exitosa");

    // Enviar email
    await transporter.sendMail({
      from: `"Cotizaciones Web" <${process.env.SMTP_FROM}>`,
      to: process.env.NOTIFICATION_EMAIL,
      replyTo: data.email,
      subject: `Nueva Cotización: ${data.projectType} - ${data.name}`,
      html: generateEmailTemplate(data),
    });

    return NextResponse.json({
      success: true,
      message: "Cotización enviada correctamente",
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { success: false, message: "Error al enviar email" },
      { status: 500 }
    );
  }
}
