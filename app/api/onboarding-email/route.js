// app/api/onboarding-email/route.js
// Envía el mapa de procesos por email al aprobar el onboarding

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Generar HTML del mapa de procesos
const generarHTML = (cliente, respuestas) => {
  const fecha = new Date().toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const labelsSector = {
    gym: "Gimnasio",
    salud: "Salud / Clínica",
    estetica: "Estética / Belleza",
    academia: "Academia / Educación",
    veterinaria: "Veterinaria",
    construccion: "Construcción",
    profesional: "Profesional / Consultoría",
    taller: "Taller / Reparación",
    inmobiliaria: "Inmobiliaria",
    ecommerce: "E-commerce",
    restaurante: "Restaurante / Food",
  };

  const filas = Object.entries(respuestas)
    .filter(([, val]) => {
      if (Array.isArray(val)) return val.length > 0;
      return val !== undefined && val !== null && val !== "";
    })
    .map(([key, val]) => {
      const display = Array.isArray(val) ? val.join(", ") : String(val);
      return `
        <tr>
          <td style="padding:8px 12px;border:1px solid #333;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;">${key.replace(
            /_/g,
            " "
          )}</td>
          <td style="padding:8px 12px;border:1px solid #333;color:#fff;font-size:13px;">${display}</td>
        </tr>`;
    })
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#111111;color:#ffffff;font-family:Arial,sans-serif;padding:40px 20px;margin:0;">
  <div style="max-width:600px;margin:0 auto;">

    <!-- Header -->
    <div style="border-bottom:2px solid #50ff05;padding-bottom:20px;margin-bottom:32px;">
      <p style="font-size:22px;font-weight:900;letter-spacing:-0.5px;margin:0;">
        STRING <span style="color:#50ff05;">Mapa de Procesos</span>
      </p>
      <p style="color:#666;font-size:12px;margin:4px 0 0;font-family:monospace;text-transform:uppercase;letter-spacing:2px;">
        Fase 3 · Estudio de Procesos
      </p>
    </div>

    <!-- Datos del proyecto -->
    <div style="background:#1a1a1a;border:1px solid #222;padding:20px;margin-bottom:24px;">
      <p style="color:#50ff05;font-size:10px;font-family:monospace;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;">
        Datos del proyecto
      </p>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="color:#666;font-size:11px;padding:4px 0;width:140px;">Negocio</td>
          <td style="color:#fff;font-size:13px;font-weight:bold;padding:4px 0;">${
            cliente.nombre_negocio
          }</td>
        </tr>
        <tr>
          <td style="color:#666;font-size:11px;padding:4px 0;">Sector</td>
          <td style="color:#fff;font-size:13px;padding:4px 0;">${
            labelsSector[cliente.sector] || cliente.sector
          }</td>
        </tr>
        <tr>
          <td style="color:#666;font-size:11px;padding:4px 0;">Sistema</td>
          <td style="color:#fff;font-size:13px;padding:4px 0;">${
            cliente.sistema_contratado
          }</td>
        </tr>
        <tr>
          <td style="color:#666;font-size:11px;padding:4px 0;">Contacto</td>
          <td style="color:#fff;font-size:13px;padding:4px 0;">${
            cliente.nombre_contacto
          }</td>
        </tr>
        <tr>
          <td style="color:#666;font-size:11px;padding:4px 0;">Fecha</td>
          <td style="color:#fff;font-size:13px;padding:4px 0;">${fecha}</td>
        </tr>
      </table>
    </div>

    <!-- Respuestas -->
    <div style="margin-bottom:24px;">
      <p style="color:#50ff05;font-size:10px;font-family:monospace;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;">
        Respuestas del estudio
      </p>
      <table style="width:100%;border-collapse:collapse;">
        ${filas}
      </table>
    </div>

    <!-- Aprobación -->
    <div style="background:#50ff05;padding:16px 20px;margin-bottom:32px;">
      <p style="color:#000;font-weight:900;font-size:13px;text-transform:uppercase;letter-spacing:1px;margin:0;">
        ✓ Mapa de procesos aprobado por ${cliente.nombre_contacto}
      </p>
      <p style="color:#000;font-size:11px;margin:4px 0 0;opacity:0.7;">${fecha}</p>
    </div>

    <!-- Footer -->
    <div style="border-top:1px solid #222;padding-top:20px;">
      <p style="color:#444;font-size:11px;margin:0;">STRING · stringwebs.com · hola@stringwebs.com</p>
      <p style="color:#333;font-size:10px;margin:4px 0 0;">Documento generado automáticamente al aprobar el Estudio de Procesos.</p>
    </div>
  </div>
</body>
</html>`;
};

export async function POST(req) {
  try {
    const { cliente, respuestas } = await req.json();

    if (!cliente || !respuestas) {
      return Response.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const html = generarHTML(cliente, respuestas);
    const fecha = new Date().toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const mailOptions = {
      from: `"STRING Onboarding" <${process.env.SMTP_FROM}>`,
      subject: `Mapa de Procesos aprobado — ${cliente.nombre_negocio}`,
      html,
    };

    // Email al cliente
    await transporter.sendMail({
      ...mailOptions,
      to: `${cliente.nombre_contacto} <${process.env.SMTP_FROM}>`,
      replyTo: "stringwebmx@gmail.com",
    });

    // Email a STRING
    await transporter.sendMail({
      ...mailOptions,
      to: "stringwebmx@gmail.com",
      subject: `[ONBOARDING] Mapa aprobado — ${cliente.nombre_negocio} · ${fecha}`,
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: "Error al enviar email" }, { status: 500 });
  }
}
