// ─── Generador de propuesta formal ───────────────────────────────────────────

import { formatMXN } from "./metricas";

// Entregables requeridos por sector/tier
const getEntregables = (flow, tier) => {
  const base = [
    "Logo en alta resolución",
    "Textos de servicios y precios",
    "Fotografías del negocio (mínimo 5)",
    "Número de WhatsApp activo",
  ];

  if (flow === "ecommerce") {
    base.push(
      "Catálogo de productos con fotos y precios",
      "Acceso a pasarela de pago (Stripe o MercadoPago)"
    );
  }

  if (flow === "menu") {
    base.push(
      "Menú completo con precios y fotos",
      "Horario de atención y zonas de entrega"
    );
  }

  if (flow === "servicios" && (tier === "agenda" || tier === "multi")) {
    base.push(
      "Horario de atención por servicio",
      "Lista de servicios con duración y precio"
    );
  }

  return base;
};

// Qué NO incluye el sistema
const getNoIncluye = (sistema) => [
  "Publicidad pagada (Meta Ads, Google Ads)",
  "Gestión de redes sociales",
  "Creación de contenido o copywriting continuo",
  "Resultados garantizados de ventas — STRING optimiza captación, la oferta es responsabilidad del cliente",
  "Modificaciones fuera del alcance sin addendum firmado",
];

// Fecha de vigencia (hoy + 15 días)
const getVigencia = () => {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + 15);
  return fecha.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Generador principal
export const generarPropuesta = ({
  bizName,
  ownerName,
  sector,
  flow,
  sistema,
  tier,
  metricas,
  fricciones,
  notas,
}) => {
  const hoy = new Date().toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const vigencia = getVigencia();
  const entregables = getEntregables(flow, tier);
  const noIncluye = getNoIncluye(sistema);

  const friccionesHi = fricciones.filter((f) => f.severidad === "hi");
  const friccionesMe = fricciones.filter((f) => f.severidad === "me");

  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROPUESTA STRING — ${sistema.nombre.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Para: ${ownerName} · ${bizName}
Sector: ${sector}
Fecha: ${hoy}
Preparado por: STRING — stringwebs.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EL PROBLEMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Costo estimado del desorden: ${formatMXN(metricas.perdAnual)} al año

${
  metricas.perdMes > 0
    ? `El negocio pierde aproximadamente ${metricas.perdMes} ${metricas.label}.`
    : ""
}
${
  metricas.convRate !== null
    ? `Tasa de conversión actual: ${metricas.convRate}%`
    : ""
}

Fricciones críticas detectadas:
${friccionesHi
  .map((f) => `• [CRÍTICO] ${f.titulo}: ${f.descripcion}`)
  .join("\n")}

${
  friccionesMe.length > 0
    ? `Fricciones importantes:\n${friccionesMe
        .map((f) => `• [IMPORTANTE] ${f.titulo}`)
        .join("\n")}`
    : ""
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUÉ NO INCLUYE ESTE SISTEMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${noIncluye.map((item) => `• ${item}`).join("\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SISTEMA RECOMENDADO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${sistema.nombre}
Inversión: ${sistema.precio} MXN
Anticipo: ${sistema.anticipo}
Esquema de pago: ${sistema.esquema}
Tiempo de implementación: ${sistema.tiempo}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUÉ NECESITAMOS DE TI PARA ARRANCAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${entregables.map((e, i) => `${i + 1}. ${e}`).join("\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONDICIONES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Inversión total:      ${sistema.precio} MXN
Anticipo:             ${sistema.anticipo}
Liquidación:          Resto al entregar
Tiempo:               ${sistema.tiempo}
Métodos de pago:      Transferencia bancaria / OXXO
Vigencia propuesta:   ${vigencia}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONDICIONES GENERALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Sin anticipo confirmado no inicia ningún proyecto.
• Todo cambio de alcance requiere addendum firmado.
• STRING optimiza captación — los resultados de ventas dependen de la oferta del cliente.
• Esta propuesta tiene vigencia hasta el ${vigencia}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRING · stringwebs.com
hola@stringwebs.com · +52 55 4552 4847
CDMX, México
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();
};

// Resumen corto para copiar por WhatsApp
export const generarResumenWhatsApp = ({
  bizName,
  ownerName,
  sistema,
  metricas,
}) => {
  const vigencia = getVigencia();

  return `
*Propuesta STRING — ${bizName}*

Hola ${ownerName.split(" ")[0]}, te comparto el resumen de lo que hablamos:

📊 *Costo estimado del desorden:* ${formatMXN(metricas.perdAnual)}/año

🔧 *Sistema recomendado:* ${sistema.nombre}
💰 *Inversión:* ${sistema.precio} MXN
📅 *Tiempo:* ${sistema.tiempo}
⚡ *Anticipo para arrancar:* ${sistema.anticipo}

La propuesta completa tiene vigencia hasta el ${vigencia}.

¿Tienes alguna duda antes de arrancar?

_STRING — stringwebs.com_
  `.trim();
};
