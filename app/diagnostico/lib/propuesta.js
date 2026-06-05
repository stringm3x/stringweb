// ─── Generador de propuesta formal ───────────────────────────────────────────
// Documento maestro STRING · Junio 2026

import { formatMXN } from "./metricas";

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
  // Fase 3 obligatoria para sistemas complejos
  if (["agenda", "multi", "eco3", "rest3"].includes(tier)) {
    base.push(
      "Mapa de procesos firmado — Fase 3 obligatoria antes de iniciar desarrollo"
    );
  }
  return base;
};

const getNoIncluye = () => [
  "Publicidad pagada (Meta Ads, Google Ads)",
  "Gestión de redes sociales",
  "Creación de contenido o copywriting continuo",
  "Resultados garantizados de ventas — STRING optimiza captación, la oferta es responsabilidad del cliente",
  "Modificaciones fuera del alcance sin addendum firmado",
];

// Esquema correcto según Documento Maestro STRING
const getEsquemaPago = (tier, sistema) => {
  const esComplejo =
    ["agenda", "multi", "eco3", "rest3"].includes(tier) ||
    sistema.esquema === "40 / 30 / 30";
  if (esComplejo) {
    return {
      texto: "40% arranque / 30% mitad del proyecto / 30% entrega",
      lineas: [
        { label: "Arranque (40%)", valor: sistema.anticipo },
        { label: "Mitad del proyecto (30%)", valor: "Al aprobar Fase 4" },
        { label: "Contra entrega (30%)", valor: "Al lanzamiento" },
      ],
    };
  }
  return {
    texto: "50% anticipo / 50% entrega",
    lineas: [
      { label: "Anticipo (50%)", valor: sistema.anticipo },
      { label: "Contra entrega (50%)", valor: "Al lanzamiento" },
    ],
  };
};

// Vigencia 7 días — Documento Maestro STRING
const getVigencia = () => {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + 7);
  return fecha.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

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
  const noIncluye = getNoIncluye();
  const esquema = getEsquemaPago(tier, sistema);
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
    ? `\nEl negocio pierde aproximadamente ${metricas.perdMes} ${metricas.label}.`
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
    ? `\nFricciones importantes:\n${friccionesMe
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
Tiempo de implementación: ${sistema.tiempo}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUÉ NECESITAMOS DE TI PARA ARRANCAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${entregables.map((e, i) => `${i + 1}. ${e}`).join("\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONDICIONES E INVERSIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Inversión total:    ${sistema.precio} MXN
Esquema de pago:    ${esquema.texto}

${esquema.lineas.map((l) => `  ${l.label}: ${l.valor}`).join("\n")}

Tiempo:             ${sistema.tiempo}
Métodos de pago:    SPEI / Transferencia / Stripe / PayPal
Vigencia:           ${vigencia} (7 días naturales)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRÓXIMOS PASOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ${bizName} confirma el sistema
2. STRING envía contrato en 24h
3. Primer pago → arranca en 48h

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONDICIONES GENERALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Sin anticipo confirmado no inicia ningún proyecto.
• Todo cambio de alcance requiere addendum firmado.
• STRING optimiza captación — los resultados de ventas dependen de la oferta del cliente.
• No se prometen ventas garantizadas.
• Esta propuesta vence el ${vigencia}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRING · stringwebs.com
hola@stringwebs.com · +52 55 4552 4847
CDMX, México
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();
};

export const generarResumenWhatsApp = ({
  bizName,
  ownerName,
  sistema,
  metricas,
  tier,
}) => {
  const vigencia = getVigencia();
  const esquema = getEsquemaPago(tier, sistema);
  return `
*Propuesta STRING — ${bizName}*

Hola ${ownerName.split(" ")[0]}, te comparto el resumen de lo que hablamos:

📊 *Costo estimado del desorden:* ${formatMXN(metricas.perdAnual)}/año

🔧 *Sistema recomendado:* ${sistema.nombre}
💰 *Inversión:* ${sistema.precio} MXN
📅 *Tiempo:* ${sistema.tiempo}
⚡ *Esquema:* ${esquema.texto}
🕐 *Vigencia:* ${vigencia} (7 días)

Para arrancar confirma el primer pago y te mando el contrato en 24h.

¿Tienes alguna duda?

_STRING — stringwebs.com_
  `.trim();
};
