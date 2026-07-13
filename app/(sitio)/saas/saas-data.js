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

// ── Comparativa vs competencia ──────────────────────────────────────────────────
export const comparativa = [
  {
    diferenciador: "Más barato con más features",
    vsQuien: "Gym&i Starter",
    dato: "$799 vs $927 real (con IVA) + miembros/staff/planes ilimitados",
  },
  {
    diferenciador: "API pública + SDK",
    vsQuien: "Gym&i, Klasius",
    dato: "6 endpoints REST + 4 Web Components — nadie en México",
  },
  {
    diferenciador: "Kiosco de autoservicio",
    vsQuien: "Todos",
    dato: "El miembro paga sin staff — único en el mercado mexicano",
  },
  {
    diferenciador: "3 capas de WhatsApp juntas",
    vsQuien: "Todos",
    dato: "Automático + Bot IA + Inbox integrado — nadie las tiene las tres",
  },
  {
    diferenciador: "Retroalimentación + Google Maps",
    vsQuien: "Todos",
    dato: "Rating mensual + botón directo a reseña — diferenciador único",
  },
  {
    diferenciador: "Sin IVA adicional",
    vsQuien: "Gym&i y otros",
    dato: "Gym&i cobra +16% IVA encima del precio publicado",
  },
  {
    diferenciador: "Miembros ilimitados",
    vsQuien: "GymMaster, Gym&i Starter",
    dato: "Todos los planes, desde Starter",
  },
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
