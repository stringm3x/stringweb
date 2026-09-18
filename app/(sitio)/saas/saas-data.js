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
    modulos: "Socios · Caja · Inventario · WhatsApp · Portal del socio",
    precio: "Desde $799/mes · 14 días con Pro completo, sin tarjeta",
  },
  {
    id: "barber",
    icon: MdOutlineContentCut,
    nombre: "STRING BARBER",
    estado: "proximamente",
    desc: "Sistema para barberías y estéticas.",
  },
  {
    id: "clinic",
    icon: MdOutlineLocalHospital,
    nombre: "STRING CLINIC",
    estado: "proximamente",
    desc: "Sistema para clínicas y consultorios.",
  },
  {
    id: "resto",
    icon: MdOutlineRestaurant,
    nombre: "STRING RESTO",
    estado: "proximamente",
    desc: "Sistema para restaurantes: mesas, órdenes, caja, inventario.",
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
// Slugs sincronizados con solicitud-schema.js y con el SaaS externo
// (app.gym.stringwebs.com/api/solicitudes), que valida "basico" como id interno
// del plan Starter. Ver gym/registro/page.jsx para la traducción de la URL.
export const planes = [
  {
    id: "starter",
    nombre: "Starter",
    tagline: "Sal del cuaderno.",
    precioMensual: "$799",
    precioAnual: "$7,990",
    destacado: false,
    icon: FiTarget,
    features: [
      "Socios ilimitados",
      "Check-in manual, por QR y con kiosco",
      "Caja, corte y recibo en PDF",
      "Membresías y planes por visitas",
      "Congelar membresía y cambio de plan",
      "Panel del día y del mes",
      "Importación desde Excel o CSV",
      "Logo del gimnasio",
      "Exportación de datos",
      "1 sucursal, 1 usuario",
      "Soporte en 48 h",
    ],
  },
  {
    id: "pro",
    nombre: "Pro",
    tagline: "Vende más en el mismo local.",
    precioMensual: "$1,799",
    precioAnual: "$17,990",
    destacado: true,
    icon: FiZap,
    features: [
      "Todo Starter, más:",
      "Inventario y punto de venta",
      "Promociones",
      "Clases con reservas y lista de espera",
      "Portal del socio",
      "Kiosco de autoservicio",
      "Pagos en línea (MercadoPago, OXXO, SPEI)",
      "Créditos y pagos a plazos",
      "Multiusuario con roles",
      "Panel completo (MRR, LTV, rotación)",
      "Lista de socios en riesgo en el panel",
      "WhatsApp manual a un clic",
      "Campañas con 500 conversaciones al mes",
      "Etiquetas, notas y calendario de vencimientos",
      "API pública y componentes web",
      "Reportes en CSV y PDF",
      "Colores del gimnasio",
      "Landing con dominio propio",
      "1 sucursal",
      "Soporte en 24 h",
    ],
  },
  {
    id: "escala",
    nombre: "Escala",
    tagline: "El sistema trabaja y te avisa.",
    precioMensual: "$2,999",
    precioAnual: "$29,990",
    destacado: false,
    icon: FiSettings,
    features: [
      "Todo Pro, más:",
      "WhatsApp automático al socio",
      "Alertas proactivas al dueño por WhatsApp",
      "Bot de IA en WhatsApp",
      "Inbox de WhatsApp",
      "Retroalimentación con Google Maps",
      "Nutrición",
      "Hasta 3 sucursales",
      "Personalización avanzada",
      "2,000 conversaciones al mes",
      "Soporte en 4 h más llamada trimestral",
    ],
  },
];

// ── Complementos (solo estos dos) ───────────────────────────────────────────────
export const complementos = [
  { nombre: "Sucursal adicional", precio: "$499/mes" },
  { nombre: "Paquete de 500 conversaciones de WhatsApp", precio: "$199/mes" },
];

// ── Diferenciadores ──────────────────────────────────────────────────────────
export const diferenciadores = [
  "Socios y planes ilimitados en todos los planes, desde Starter",
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
