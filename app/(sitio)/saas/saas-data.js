import { FiTarget, FiZap, FiSettings } from "react-icons/fi";
import {
  MdOutlineFitnessCenter,
  MdOutlineRestaurant,
  MdOutlineLocalHospital,
  MdOutlineContentCut,
} from "react-icons/md";

// ── Productos ─────────────────────────────────────────────────────────────────
export const productos = [
  {
    id: "gym",
    icon: MdOutlineFitnessCenter,
    nombre: "STRING GYM",
    estado: "activo",
    desc: "CRM y sistema de gestión para gimnasios mexicanos.",
    modulos: "Miembros · Caja · Inventario · WhatsApp · Portal del miembro",
    precio: "Desde $799/mes · Prueba gratis 14 días",
  },
  {
    id: "resto",
    icon: MdOutlineRestaurant,
    nombre: "STRING RESTO",
    estado: "proximamente",
    desc: "Sistema para restaurantes: mesas, órdenes, caja, inventario.",
  },
  {
    id: "clinic",
    icon: MdOutlineLocalHospital,
    nombre: "STRING CLINIC",
    estado: "proximamente",
    desc: "Sistema para clínicas y consultorios.",
  },
  {
    id: "barber",
    icon: MdOutlineContentCut,
    nombre: "STRING BARBER",
    estado: "proximamente",
    desc: "Sistema para barberías y estéticas.",
  },
];

// ── El problema (STRING GYM) ────────────────────────────────────────────────────
export const problema = [
  "Alguien pregunta por membresía en Instagram → nadie responde a tiempo",
  "Conversaciones perdidas entre cientos de chats de WhatsApp",
  "Interesado pide info → nunca recibe seguimiento → se enfría",
  "El staff registra pagos en Excel → sin historial, sin control",
  "No saben cuántos miembros están activos, cuántos vencieron",
  "El dueño depende de su memoria para operar el gimnasio",
];

export const problemaCierre = "No es falta de demanda. Es falta de sistema.";

// ── Planes ────────────────────────────────────────────────────────────────────
export const planes = [
  {
    id: "basico",
    nombre: "Starter",
    precio: "$799",
    periodo: "/mes",
    destacado: false,
    icon: FiTarget,
    features: [
      "Miembros ilimitados",
      "Check-in QR + Kiosco self-service",
      "Caja + Inventario + POS",
      "Dashboard con gráficas",
      "Importación CSV con plantilla",
      "Onboarding guiado",
      "14 días gratis",
    ],
  },
  {
    id: "pro",
    nombre: "Pro",
    precio: "$1,799",
    periodo: "/mes",
    destacado: true,
    icon: FiZap,
    features: [
      "Todo Starter, más:",
      "Sistema de clases con reservas",
      "Multiusuario con roles",
      "MercadoPago + OXXO + SPEI incluido",
      "API pública + SDK",
      "Portal del miembro",
      "Créditos y pagos a plazos",
      "Campañas masivas",
      "Nutrición Nivel 1",
      "Retroalimentación con Google Maps",
    ],
  },
  {
    id: "escala",
    nombre: "Escala",
    precio: "$2,999",
    periodo: "/mes",
    destacado: false,
    icon: FiSettings,
    features: [
      "Todo Pro, más:",
      "WhatsApp automático",
      "Bot WhatsApp IA",
      "Inbox WhatsApp en el SaaS",
      "Soporte prioritario",
    ],
  },
];

// ── Diferenciadores ──────────────────────────────────────────────────────────
export const diferenciadores = [
  // TODO(copy): D2 pendiente — primer diferenciador por definir
  "Precio final, sin IVA agregado después",
  "Kiosco de autoservicio: el socio paga sin personal",
  "Tres capas de WhatsApp: automático, bot de IA e inbox integrado",
  "API pública y componentes web para el sitio del gimnasio",
  "Control de acceso por QR sin comprar hardware",
  "Retroalimentación con Google Maps",
  "Acompañamiento del fundador en la puesta en marcha",
  "Producto pensado y escrito en español mexicano",
];

// ── Caso real ─────────────────────────────────────────────────────────────────
export const casoEvolutionGym = {
  nombre: "Evolution GYM",
  ubicacion: "CDMX",
  badge: "Sistema activo · CDMX · Junio 2026",
  stats: [
    { value: "70", label: "Miembros activos" },
    { value: "59", label: "Miembros inactivos" },
    { value: "23", label: "Productos en inventario" },
  ],
  modulos: [
    "Gestión de miembros",
    "Caja",
    "Inventario",
    "Kiosco de autoservicio",
    "WhatsApp automático",
    "Bot WhatsApp IA",
    "Inbox WhatsApp",
    "Portal del miembro",
    "Dashboard con gráficas",
    "Retroalimentación con Google Maps",
  ],
};
