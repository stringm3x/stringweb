// ─── Datos presentación restaurantes ─────────────────────────────────────────

export const problems = [
  {
    number: "01",
    trigger: "Reservación por WhatsApp que se olvida o se duplica",
    result: "Mesa vacía. Cliente molesto. Reputación dañada.",
    type: "external",
  },
  {
    number: "02",
    trigger: "Cliente pregunta el menú por Instagram y nunca regresa",
    result: "No hay seguimiento. El interés muere solo.",
    type: "external",
  },
  {
    number: "03",
    trigger: "Sin registro de quién visitó, cuándo ni cuánto gastó",
    result: "Sin datos, sin estrategia. Cada cliente es un desconocido.",
    type: "external",
  },
  {
    number: "04",
    trigger: "Promociones que se mandan a todos igual, sin segmentación",
    result: "Spam genérico que nadie lee.",
    type: "internal",
  },
  {
    number: "05",
    trigger: "El dueño respondiendo mensajes a las 11 de la noche",
    result: "El negocio depende de una sola persona disponible siempre.",
    type: "internal",
  },
];

export const sistemas = [
  {
    id: "base",
    label: "Sistema Base",
    price: "$12,000",
    tiempo: "2 semanas",
    tag: null,
    description: "Presencia profesional + contacto por WhatsApp.",
    features: [
      "Landing page optimizada para celular",
      "Menú digital interactivo",
      "Link de WhatsApp con mensaje preconfigurado",
      "Horarios y ubicación",
    ],
  },
  {
    id: "n2",
    label: "Sistema Mesa N2",
    price: "$22,000",
    tiempo: "3 semanas",
    tag: null,
    description: "Todo lo anterior + captura de leads + base de clientes.",
    features: [
      "Todo el Sistema Base",
      "Captura de datos de clientes",
      "Base de clientes en Notion / Airtable",
      "Notificación interna por cada nuevo lead",
      "Respuesta automática al cliente",
    ],
  },
  {
    id: "n3",
    label: "Sistema Mesa N3",
    price: "$32,000",
    tiempo: "5 semanas",
    tag: "Recomendado",
    description: "Todo lo anterior + reservaciones automáticas + reactivación.",
    features: [
      "Todo el Sistema Mesa N2",
      "Reservaciones con disponibilidad en tiempo real",
      "Confirmación automática por WhatsApp",
      "Recordatorio 2h antes — menos no-shows",
      "Reactivación a clientes inactivos 30 días",
      "Seguimiento post-visita pidiendo reseña 48h después",
      "Panel de gestión completo",
    ],
  },
];

export const comparativa = [
  {
    antes: "Reservación por WhatsApp que se olvida",
    despues: "Reservación confirmada automáticamente en segundos",
  },
  {
    antes: "Cliente no regresa, nadie lo contacta",
    despues: "Mensaje automático a los 30 días si no ha vuelto",
  },
  {
    antes: "Sin registro de comensales",
    despues: "Base de clientes organizada con historial completo",
  },
  {
    antes: "Promociones genéricas a todos",
    despues: "Mensaje personalizado por ocasión o frecuencia",
  },
  {
    antes: "Cancelaciones sin aviso",
    despues: "Recordatorio 2h antes — menos no-shows",
  },
];

export const incluye = [
  "Landing page del restaurante optimizada para celular",
  "Página de reservaciones con disponibilidad en tiempo real",
  "Confirmación automática por WhatsApp al cliente",
  "Recordatorio automático 2h antes de cada reserva",
  "Captura de datos: nombre, teléfono, ocasión especial",
  "Base de clientes en Notion o Airtable con historial completo",
  "Flujo de reactivación: mensaje automático a clientes inactivos 30 días",
  "Seguimiento post-visita: mensaje 48h después pidiendo reseña",
  "Notificación interna al restaurante por cada nueva reserva",
  "Panel de gestión: reservaciones activas, historial, métricas",
];

export const flujo = [
  { step: "01", desc: "Cliente ve el Instagram del restaurante" },
  { step: "02", desc: "Hace clic en el link del bio" },
  { step: "03", desc: "Elige fecha, hora y número de personas" },
  { step: "04", desc: "Deja su nombre y teléfono" },
  { step: "05", desc: "Recibe confirmación automática por WhatsApp" },
  { step: "06", desc: "2h antes recibe recordatorio" },
  { step: "07", desc: "El restaurante ya tiene la mesa lista" },
  { step: "08", desc: "48h después el sistema le pide reseña" },
  {
    step: "09",
    desc: "A los 30 días sin visita recibe una promoción automática",
  },
];

export const timeline = [
  {
    semana: "Semana 1",
    titulo: "Diagnóstico y diseño",
    desc: "Estructura, wireframes y diseño de la landing.",
    revision: false,
  },
  {
    semana: "Semana 2",
    titulo: "Landing + Reservaciones",
    desc: "Landing page optimizada y página de reservaciones.",
    revision: true,
  },
  {
    semana: "Semana 3",
    titulo: "Automatizaciones",
    desc: "Make + WhatsApp — confirmaciones y recordatorios.",
    revision: false,
  },
  {
    semana: "Semana 4",
    titulo: "Base de clientes",
    desc: "Flujos de reactivación y seguimiento post-visita.",
    revision: true,
  },
  {
    semana: "Semana 5",
    titulo: "QA y lanzamiento",
    desc: "Pruebas finales, ajustes y capacitación del equipo.",
    revision: false,
  },
];

export const pagos = [
  {
    label: "Anticipo",
    monto: "$16,000 MXN",
    porcentaje: "50%",
    cuando: "Al firmar — arranca el proyecto en 48h",
  },
  {
    label: "Contra entrega",
    monto: "$16,000 MXN",
    porcentaje: "50%",
    cuando: "Al lanzamiento — cuando el sistema está activo",
  },
];

export const pasos = [
  {
    num: "01",
    titulo: "El restaurante confirma el sistema",
    desc: "Una decisión, sin burocracia.",
  },
  {
    num: "02",
    titulo: "STRING envía contrato en 24h",
    desc: "Alcance y plazos claros por escrito.",
  },
  {
    num: "03",
    titulo: "Primer pago → arranca en 48h",
    desc: "Sin anticipo no arranca. Con anticipo, arrancamos.",
  },
];
