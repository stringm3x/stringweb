import { NextResponse } from "next/server";
import { z } from "zod";
import { getTransporter, getMissingSmtpEnvVars } from "../../lib/mailer";

const PRODUCTO_LABELS = {
  resto: "STRING RESTO",
  clinic: "STRING CLINIC",
  barber: "STRING BARBER",
};

const waitlistSchema = z.object({
  producto: z.enum(["resto", "clinic", "barber"]),
  email: z
    .string()
    .email("Email inválido")
    .transform((email) => email.toLowerCase().trim()),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = waitlistSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Datos inválidos" },
        { status: 400 }
      );
    }

    const { producto, email } = validation.data;

    const missingVars = getMissingSmtpEnvVars();
    if (missingVars.length > 0) {
      console.error("Missing env vars:", missingVars);
      return NextResponse.json(
        { success: false, message: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    const mailer = getTransporter();
    await mailer.sendMail({
      from: `"STRING SaaS" <${process.env.SMTP_FROM}>`,
      to: process.env.NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `[WAITLIST] ${PRODUCTO_LABELS[producto]} — ${email}`,
      html: `<p style="font-family:Arial,sans-serif;font-size:14px;">
        Nuevo interesado en <strong>${PRODUCTO_LABELS[producto]}</strong> (aún "Próximamente").
        <br>Email: <a href="mailto:${email}">${email}</a>
      </p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist API error:", error.message);
    return NextResponse.json(
      { success: false, message: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
