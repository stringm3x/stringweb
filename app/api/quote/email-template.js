// ── Labels sincronizados con quote-schema.js ──────────────────────────────────
const PROJECT_TYPE_LABELS = {
  nivel1: "Nivel 1 — Sistema de Conversión",
  nivel2: "Nivel 2 — Sistema de Captación",
  nivel3: "Nivel 3 — Sistema Automatizado",
  nivel4: "Nivel 4 — Sistema Especializado",
};

const PROJECT_PRICES = {
  nivel1: "$8,000 – $12,000 MXN",
  nivel2: "$18,000 – $28,000 MXN",
  nivel3: "$28,000 – $40,000 MXN",
  nivel4: "$40,000+ MXN",
};

// ── Generador de template ─────────────────────────────────────────────────────
export const generateEmailTemplate = (data) => {
  const projectLabel =
    PROJECT_TYPE_LABELS[data.projectType] || data.projectType;
  const projectPrice = PROJECT_PRICES[data.projectType] || "A consultar";

  const formattedDate = new Date(data.idealDate).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedBudget = Number(data.budget).toLocaleString("es-MX");

  const whatsappMsg = encodeURIComponent(
    `Hola ${data.name}, recibí tu solicitud de diagnóstico en stringwebs.com. ` +
      `Me pongo en contacto para agendar tu diagnóstico gratuito. ¡Hablamos pronto!`
  );

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Diagnóstico — STRING</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <div style="max-width:600px;margin:32px auto;background:#111111;border:1px solid #1f1f1f;overflow:hidden;">

    <!-- Header -->
    <div style="background:#000000;border-bottom:2px solid #50ff05;padding:32px;text-align:center;">
      <p style="color:#50ff05;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0 0 12px 0;font-family:monospace;">
        Sistemas Digitales Estratégicos
      </p>
      <h1 style="color:#ffffff;margin:0;font-size:32px;font-weight:900;letter-spacing:-1px;">
        STRING
      </h1>
      <p style="color:#666666;margin:12px 0 0 0;font-size:13px;font-family:monospace;letter-spacing:2px;text-transform:uppercase;">
        Nuevo diagnóstico recibido
      </p>
    </div>

    <!-- Body -->
    <div style="padding:32px;">

      <!-- Intro -->
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 28px 0;line-height:1.6;">
        Se ha recibido una nueva solicitud de diagnóstico desde
        <strong style="color:#50ff05;">stringwebs.com</strong>.
        Los datos del prospecto se muestran a continuación.
      </p>

      <!-- Cliente -->
      <div style="border:1px solid #1f1f1f;margin-bottom:20px;overflow:hidden;">
        <div style="background:#0a0a0a;padding:10px 16px;border-bottom:1px solid #1f1f1f;">
          <p style="color:#50ff05;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0;font-family:monospace;">
            Datos del cliente
          </p>
        </div>
        <div style="padding:20px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#666666;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:1px;width:120px;vertical-align:top;">
                Nombre
              </td>
              <td style="padding:8px 0;color:#ffffff;font-size:14px;font-weight:600;">
                ${data.name}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#666666;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">
                Email
              </td>
              <td style="padding:8px 0;">
                <a href="mailto:${data.email}" style="color:#50ff05;text-decoration:none;font-size:14px;">
                  ${data.email}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#666666;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">
                WhatsApp
              </td>
              <td style="padding:8px 0;">
                <a href="https://wa.me/${data.whatsapp}" style="color:#25D366;text-decoration:none;font-size:14px;">
                  +${data.whatsapp}
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Proyecto -->
      <div style="border:1px solid #1f1f1f;margin-bottom:20px;overflow:hidden;">
        <div style="background:#0a0a0a;padding:10px 16px;border-bottom:1px solid #1f1f1f;">
          <p style="color:#50ff05;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0;font-family:monospace;">
            Detalles del proyecto
          </p>
        </div>
        <div style="padding:20px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#666666;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:1px;width:120px;vertical-align:top;">
                Sistema
              </td>
              <td style="padding:8px 0;color:#50ff05;font-size:14px;font-weight:700;">
                ${projectLabel}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#666666;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">
                Precio ref.
              </td>
              <td style="padding:8px 0;color:#ffffff;font-size:13px;">
                ${projectPrice}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#666666;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">
                Presupuesto
              </td>
              <td style="padding:8px 0;color:#ffffff;font-size:22px;font-weight:900;letter-spacing:-0.5px;">
                $${formattedBudget} <span style="font-size:12px;color:#666666;font-weight:400;">MXN</span>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#666666;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">
                Fecha ideal
              </td>
              <td style="padding:8px 0;color:#ffffff;font-size:14px;">
                ${formattedDate}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Objetivo -->
      <div style="border:1px solid #1f1f1f;margin-bottom:28px;overflow:hidden;">
        <div style="background:#0a0a0a;padding:10px 16px;border-bottom:1px solid #1f1f1f;">
          <p style="color:#50ff05;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0;font-family:monospace;">
            Objetivo del proyecto
          </p>
        </div>
        <div style="padding:20px;">
          <p style="color:#a1a1aa;font-size:14px;line-height:1.7;margin:0;">
            ${data.objective}
          </p>
        </div>
      </div>

      <!-- CTA -->
      <div style="text-align:center;">
        <a
          href="https://wa.me/${data.whatsapp}?text=${whatsappMsg}"
          style="display:inline-block;background:#50ff05;color:#000000;text-decoration:none;padding:14px 32px;font-weight:700;font-size:13px;letter-spacing:2px;text-transform:uppercase;"
        >
          Contactar por WhatsApp
        </a>
        <p style="color:#444444;font-size:11px;margin:16px 0 0 0;font-family:monospace;">
          Responde dentro de las próximas 24 horas
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#0a0a0a;border-top:1px solid #1f1f1f;padding:20px 32px;text-align:center;">
      <p style="color:#444444;margin:0;font-size:11px;font-family:monospace;letter-spacing:1px;">
        Este es un mensaje automático de tu sistema de diagnósticos.<br>
        <a href="https://www.stringwebs.com" style="color:#50ff05;text-decoration:none;">
          stringwebs.com
        </a>
        &nbsp;·&nbsp; hola@stringwebs.com
      </p>
    </div>

  </div>

</body>
</html>
  `.trim();
};
