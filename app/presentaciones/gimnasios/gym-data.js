import {
  FiMessageSquare,
  FiSmartphone,
  FiMail,
  FiCalendar,
  FiFileText,
  FiAlertCircle,
  FiTarget,
  FiZap,
  FiSettings,
} from "react-icons/fi";

// ── Problemas ─────────────────────────────────────────────────────────────────
export const problems = [
  // Externos — captación
  {
    icon: FiMessageSquare,
    trigger: "Alguien ve tu Instagram y manda DM",
    result: "Nadie responde a tiempo.",
    type: "external",
  },
  {
    icon: FiSmartphone,
    trigger: "Preguntan precio por WhatsApp",
    result: "Se pierde entre 200 chats.",
    type: "external",
  },
  {
    icon: FiMail,
    trigger: "Interesado pide info de membresías",
    result: "Nunca recibe seguimiento.",
    type: "external",
  },
  {
    icon: FiCalendar,
    trigger: "Clase disponible, lugar vacío",
    result: "Prospecto que se enfrió.",
    type: "external",
  },
  // Internos — operación
  {
    icon: FiFileText,
    trigger: "El staff registra pagos en Excel o en papel",
    result: "Sin historial, sin control.",
    type: "internal",
  },
  {
    icon: FiAlertCircle,
    trigger: "No saben cuántos miembros están activos",
    result: "Ni cuántos van a cancelar.",
    type: "internal",
  },
];

export const problemClose =
  "No es falta de demanda. Es falta de sistema — adentro y afuera del gimnasio.";

// ── Niveles ───────────────────────────────────────────────────────────────────
export const levels = [
  {
    id: "nivel2",
    label: "Nivel 2",
    title: "Sistema de Captación",
    price: "$18,000 – $24,000",
    tag: null,
    description:
      "Para gimnasios chicos que arrancan y quieren dejar de perder leads.",
    features: [
      "Landing page del gimnasio optimizada",
      "Formulario con calificación (membresía, horario, objetivo)",
      "CRM automático de prospectos",
      "Notificación inmediata al staff",
      "Respuesta automática al prospecto",
    ],
    icon: FiTarget,
  },
  {
    id: "gym-completo",
    label: "Sistema GYM Completo",
    title: "Captación + Operación",
    price: "$45,000 – $55,000",
    tag: "Recomendado",
    description:
      "El único sistema diseñado específicamente para gimnasios que quieren operar sin caos.",
    features: [
      // Captación
      "Landing page optimizada",
      "Agenda automática de pruebas gratuitas",
      "Seguimiento a prospectos no convertidos",
      "Recordatorios automáticos de cita",
      // Operación interna
      "Panel de miembros activos e inactivos",
      "Caja de pagos con registro de membresías",
      "Caja de productos e inventario en mostrador",
      "Dashboard con métricas del negocio en tiempo real",
    ],
    featureGroups: [
      {
        label: "Captación",
        items: [
          "Landing page optimizada",
          "Agenda automática de pruebas gratuitas",
          "Seguimiento a prospectos no convertidos",
          "Recordatorios automáticos de cita",
        ],
      },
      {
        label: "Operación interna",
        items: [
          "Panel de miembros activos e inactivos",
          "Caja de pagos con registro de membresías",
          "Caja de productos e inventario en mostrador",
          "Dashboard con métricas en tiempo real",
        ],
      },
    ],
    icon: FiZap,
  },
  {
    id: "especializado",
    label: "Sistema Especializado",
    title: "Multi-sucursal",
    price: "Desde $70,000",
    tag: null,
    description: "Para cadenas o gimnasios con múltiples sucursales.",
    features: [
      "Todo el Sistema GYM Completo",
      "Gestión multi-sucursal centralizada",
      "Integración con software de gestión existente",
      "CRM personalizado",
      "Automatizaciones avanzadas",
    ],
    icon: FiSettings,
  },
];

// ── Caso real ─────────────────────────────────────────────────────────────────
export const caseStudy = {
  name: "Evolution GYM",
  location: "CDMX",
  systemLabel: "Sistema GYM Completo",
  context:
    "Evolution GYM recibía consultas diarias por Instagram y WhatsApp. Sin sistema, cada prospecto dependía de que alguien respondiera a tiempo.",
  implemented: [
    "Captación automática desde Instagram y WhatsApp",
    "Agenda de pruebas gratuitas sin coordinación manual",
    "Seguimiento automático a prospectos no convertidos",
    "Panel de miembros activos e inactivos",
    "Registro de pagos de membresías",
    "Control de inventario y venta de productos",
    "Dashboard operativo con métricas en tiempo real",
  ],
  status:
    "Sistema GYM Completo activo en Evolution GYM, CDMX. Operación en curso.",
  note: "Cuando tengas métricas esta sección se convierte en el argumento de venta más poderoso de la página. Guarda todo desde hoy.",
};

// ── Proceso ───────────────────────────────────────────────────────────────────
export const process = [
  {
    step: "01",
    title: "Diagnóstico gratuito",
    desc: "30 minutos. Analizamos tu flujo actual de prospectos y operación interna.",
  },
  {
    step: "02",
    title: "Propuesta del sistema",
    desc: "Te presentamos el nivel exacto que necesita tu gimnasio.",
  },
  {
    step: "03",
    title: "Implementación",
    desc: "3 a 4 semanas. Sin interrumpir tu operación.",
  },
  {
    step: "04",
    title: "Sistema activo",
    desc: "Tu gimnasio capta, da seguimiento y opera solo.",
  },
];
