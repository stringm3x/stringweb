// ─── Preguntas del formulario de onboarding ───────────────────────────────────
// Estructura: bloques con preguntas, cada pregunta tiene tipo y validación

// ── Bloque A — Operación actual (todos los sectores) ──────────────────────────
export const bloqueA = {
  id: "operacion",
  titulo: "A · Operación actual",
  preguntas: [
    {
      id: "registro_actual",
      label: "¿Cómo registran sus ventas, membresías o servicios hoy?",
      tipo: "radio",
      requerido: true,
      opciones: [
        { value: "memoria", label: "Memoria o papel" },
        { value: "excel", label: "Excel / Google Sheets" },
        { value: "app", label: "App externa" },
        { value: "sistema", label: "Sistema propio" },
      ],
    },
    {
      id: "personas_operan",
      label: "¿Cuántas personas operan el negocio internamente?",
      tipo: "numero",
      requerido: true,
      placeholder: "Ej: 3",
      min: 1,
    },
    {
      id: "dispositivos",
      label: "¿Desde qué dispositivos trabajarán con el sistema?",
      tipo: "checkbox",
      requerido: true,
      opciones: [
        { value: "celular", label: "Celular" },
        { value: "computadora", label: "Computadora" },
        { value: "tablet", label: "Tablet" },
      ],
    },
    {
      id: "nivel_tecnico",
      label: "Nivel técnico del equipo",
      tipo: "radio",
      requerido: true,
      opciones: [
        { value: "basico", label: "Básico — usan WhatsApp y poco más" },
        { value: "medio", label: "Medio — manejan Excel y apps" },
        {
          value: "avanzado",
          label: "Avanzado — cómodos con sistemas digitales",
        },
      ],
    },
  ],
};

// ── Bloque B — Específico por sector ─────────────────────────────────────────
export const bloquesB = {
  gym: {
    id: "sector_gym",
    titulo: "B · Operación del gimnasio",
    preguntas: [
      {
        id: "tipos_membresia",
        label: "Tipos de membresía que manejan",
        tipo: "checkbox",
        requerido: true,
        opciones: [
          { value: "mensual", label: "Mensual" },
          { value: "trimestral", label: "Trimestral" },
          { value: "anual", label: "Anual" },
          { value: "clases_sueltas", label: "Clases sueltas" },
          { value: "otro", label: "Otro" },
        ],
      },
      {
        id: "membresias_activas",
        label: "Membresías activas aproximadas",
        tipo: "radio",
        requerido: false,
        opciones: [
          { value: "menos_50", label: "Menos de 50" },
          { value: "50_150", label: "50 – 150" },
          { value: "150_300", label: "150 – 300" },
          { value: "mas_300", label: "Más de 300" },
        ],
      },
      {
        id: "registro_pagos",
        label: "¿Cómo registran los pagos hoy?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "papel", label: "Papel / libreta" },
          { value: "excel", label: "Excel / Sheets" },
          { value: "app", label: "App" },
          { value: "pos", label: "POS / terminal" },
          { value: "ninguno", label: "No se registran" },
        ],
      },
      {
        id: "metodos_pago",
        label: "Métodos de pago que aceptan",
        tipo: "checkbox",
        requerido: true,
        opciones: [
          { value: "efectivo", label: "Efectivo" },
          { value: "transferencia", label: "Transferencia" },
          { value: "tarjeta", label: "Tarjeta" },
          { value: "mercadopago", label: "MercadoPago" },
        ],
      },
      {
        id: "venden_productos",
        label: "¿Venden productos en mostrador?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "si", label: "Sí" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "tipo_productos",
        label: "¿Qué tipo de productos venden?",
        tipo: "texto",
        requerido: false,
        dependeDe: { campo: "venden_productos", valor: "si" },
        placeholder: "Ej: suplementos, ropa deportiva, agua...",
      },
      {
        id: "control_inventario",
        label: "¿Cómo controlan el inventario hoy?",
        tipo: "radio",
        requerido: false,
        dependeDe: { campo: "venden_productos", valor: "si" },
        opciones: [
          { value: "memoria", label: "De memoria" },
          { value: "papel", label: "Papel" },
          { value: "excel", label: "Excel" },
          { value: "sistema", label: "Sistema" },
          { value: "no_aplica", label: "No aplica" },
        ],
      },
    ],
  },

  salud: {
    id: "sector_salud",
    titulo: "B · Operación de la clínica",
    preguntas: [
      {
        id: "especialidades",
        label: "Especialidades que atienden",
        tipo: "texto",
        requerido: true,
        placeholder: "Ej: medicina general, nutrición, psicología...",
      },
      {
        id: "expediente",
        label: "¿Trabajan con expediente del paciente?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "papel", label: "Sí, en papel" },
          { value: "digital", label: "Sí, digital" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "registro_pagos",
        label: "¿Cómo registran los pagos?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "papel", label: "Papel" },
          { value: "excel", label: "Excel" },
          { value: "sistema", label: "Sistema" },
          { value: "ninguno", label: "Ninguno" },
        ],
      },
      {
        id: "seguros",
        label: "¿Aceptan seguros médicos?",
        tipo: "radio",
        requerido: false,
        opciones: [
          { value: "si", label: "Sí" },
          { value: "no", label: "No" },
        ],
      },
    ],
  },

  estetica: {
    id: "sector_estetica",
    titulo: "B · Operación de la estética",
    preguntas: [
      {
        id: "servicios_principales",
        label: "Servicios principales que ofrecen",
        tipo: "texto",
        requerido: true,
        placeholder: "Ej: corte, tinte, uñas, tratamientos...",
      },
      {
        id: "agenda_citas",
        label: "¿Cómo manejan las citas hoy?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "llamada", label: "Por llamada" },
          { value: "whatsapp", label: "Por WhatsApp" },
          { value: "presencial", label: "Solo presencial" },
          { value: "app", label: "App de agenda" },
        ],
      },
      {
        id: "registro_pagos",
        label: "¿Cómo registran los pagos?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "papel", label: "Papel" },
          { value: "excel", label: "Excel" },
          { value: "pos", label: "POS / terminal" },
          { value: "ninguno", label: "Ninguno" },
        ],
      },
    ],
  },

  academia: {
    id: "sector_academia",
    titulo: "B · Operación de la academia",
    preguntas: [
      {
        id: "tipo_cursos",
        label: "¿Qué tipo de cursos o clases ofrecen?",
        tipo: "texto",
        requerido: true,
        placeholder: "Ej: inglés, música, programación, deportes...",
      },
      {
        id: "modalidad",
        label: "Modalidad de clases",
        tipo: "checkbox",
        requerido: true,
        opciones: [
          { value: "presencial", label: "Presencial" },
          { value: "online", label: "En línea" },
          { value: "hibrido", label: "Híbrido" },
        ],
      },
      {
        id: "registro_pagos",
        label: "¿Cómo registran los pagos?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "papel", label: "Papel" },
          { value: "excel", label: "Excel" },
          { value: "sistema", label: "Sistema" },
          { value: "ninguno", label: "Ninguno" },
        ],
      },
    ],
  },

  veterinaria: {
    id: "sector_veterinaria",
    titulo: "B · Operación de la veterinaria",
    preguntas: [
      {
        id: "servicios",
        label: "Servicios que ofrecen",
        tipo: "checkbox",
        requerido: true,
        opciones: [
          { value: "consultas", label: "Consultas" },
          { value: "vacunas", label: "Vacunas" },
          { value: "grooming", label: "Grooming / estética" },
          { value: "cirugia", label: "Cirugía" },
          { value: "venta_productos", label: "Venta de productos" },
        ],
      },
      {
        id: "expediente",
        label: "¿Llevan expediente por mascota?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "papel", label: "Sí, en papel" },
          { value: "digital", label: "Sí, digital" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "registro_pagos",
        label: "¿Cómo registran los pagos?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "papel", label: "Papel" },
          { value: "excel", label: "Excel" },
          { value: "sistema", label: "Sistema" },
          { value: "ninguno", label: "Ninguno" },
        ],
      },
    ],
  },

  restaurante: {
    id: "sector_restaurante",
    titulo: "B · Operación del restaurante",
    preguntas: [
      {
        id: "como_reciben_pedidos",
        label: "¿Cómo reciben pedidos hoy?",
        tipo: "checkbox",
        requerido: true,
        opciones: [
          { value: "mostrador", label: "Mostrador" },
          { value: "whatsapp", label: "WhatsApp" },
          { value: "plataformas", label: "Plataformas externas (Rappi, etc.)" },
          { value: "mixto", label: "Mixto" },
        ],
      },
      {
        id: "domicilio",
        label: "¿Tienen servicio a domicilio propio?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "si", label: "Sí, propio" },
          { value: "no", label: "No" },
          { value: "plataformas", label: "Solo plataformas externas" },
        ],
      },
      {
        id: "pedidos_dia",
        label: "Pedidos promedio al día",
        tipo: "radio",
        requerido: false,
        opciones: [
          { value: "menos_20", label: "Menos de 20" },
          { value: "20_60", label: "20 – 60" },
          { value: "60_120", label: "60 – 120" },
          { value: "mas_120", label: "Más de 120" },
        ],
      },
      {
        id: "registro_caja",
        label: "¿Cómo registran la caja hoy?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "memoria", label: "De memoria" },
          { value: "papel", label: "Papel / libreta" },
          { value: "excel", label: "Excel" },
          { value: "pos", label: "POS / sistema" },
        ],
      },
    ],
  },

  construccion: {
    id: "sector_construccion",
    titulo: "B · Operación del negocio",
    preguntas: [
      {
        id: "tipo_proyectos",
        label: "¿Qué tipo de proyectos manejan?",
        tipo: "texto",
        requerido: true,
        placeholder: "Ej: remodelaciones, construcción desde cero, diseño...",
      },
      {
        id: "proyectos_simultaneos",
        label: "Proyectos simultáneos en promedio",
        tipo: "radio",
        requerido: false,
        opciones: [
          { value: "1_2", label: "1 – 2" },
          { value: "3_5", label: "3 – 5" },
          { value: "mas_5", label: "Más de 5" },
        ],
      },
      {
        id: "seguimiento_clientes",
        label: "¿Cómo dan seguimiento a prospectos hoy?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "memoria", label: "De memoria" },
          { value: "whatsapp", label: "Por WhatsApp" },
          { value: "excel", label: "Excel" },
          { value: "crm", label: "CRM" },
        ],
      },
    ],
  },

  profesional: {
    id: "sector_profesional",
    titulo: "B · Operación del despacho",
    preguntas: [
      {
        id: "tipo_servicios",
        label: "¿Qué servicios ofrecen?",
        tipo: "texto",
        requerido: true,
        placeholder: "Ej: consultoría legal, contabilidad, coaching...",
      },
      {
        id: "clientes_activos",
        label: "Clientes activos aproximados",
        tipo: "radio",
        requerido: false,
        opciones: [
          { value: "menos_10", label: "Menos de 10" },
          { value: "10_30", label: "10 – 30" },
          { value: "mas_30", label: "Más de 30" },
        ],
      },
      {
        id: "seguimiento",
        label: "¿Cómo dan seguimiento a prospectos?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "memoria", label: "De memoria" },
          { value: "whatsapp", label: "Por WhatsApp" },
          { value: "excel", label: "Excel" },
          { value: "crm", label: "CRM" },
        ],
      },
    ],
  },

  taller: {
    id: "sector_taller",
    titulo: "B · Operación del taller",
    preguntas: [
      {
        id: "tipo_servicios",
        label: "¿Qué servicios ofrecen?",
        tipo: "texto",
        requerido: true,
        placeholder: "Ej: mecánica, electrónica, herrería...",
      },
      {
        id: "registro_ordenes",
        label: "¿Cómo registran las órdenes de trabajo?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "papel", label: "Papel / libreta" },
          { value: "excel", label: "Excel" },
          { value: "sistema", label: "Sistema" },
          { value: "ninguno", label: "De memoria" },
        ],
      },
      {
        id: "registro_pagos",
        label: "¿Cómo registran los pagos?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "papel", label: "Papel" },
          { value: "excel", label: "Excel" },
          { value: "pos", label: "POS" },
          { value: "ninguno", label: "Ninguno" },
        ],
      },
    ],
  },

  inmobiliaria: {
    id: "sector_inmobiliaria",
    titulo: "B · Operación de la inmobiliaria",
    preguntas: [
      {
        id: "tipo_propiedades",
        label: "¿Qué tipo de propiedades manejan?",
        tipo: "checkbox",
        requerido: true,
        opciones: [
          { value: "venta", label: "Venta" },
          { value: "renta", label: "Renta" },
          { value: "comercial", label: "Comercial" },
          { value: "residencial", label: "Residencial" },
        ],
      },
      {
        id: "propiedades_activas",
        label: "Propiedades activas aproximadas",
        tipo: "radio",
        requerido: false,
        opciones: [
          { value: "menos_10", label: "Menos de 10" },
          { value: "10_30", label: "10 – 30" },
          { value: "mas_30", label: "Más de 30" },
        ],
      },
      {
        id: "seguimiento_prospectos",
        label: "¿Cómo dan seguimiento a prospectos?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "memoria", label: "De memoria" },
          { value: "whatsapp", label: "Por WhatsApp" },
          { value: "excel", label: "Excel" },
          { value: "crm", label: "CRM" },
        ],
      },
    ],
  },

  ecommerce: {
    id: "sector_ecommerce",
    titulo: "B · Operación del e-commerce",
    preguntas: [
      {
        id: "tipo_productos",
        label: "¿Qué tipo de productos venden?",
        tipo: "texto",
        requerido: true,
        placeholder: "Ej: ropa, suplementos, electrónicos...",
      },
      {
        id: "canales_venta",
        label: "Canales de venta actuales",
        tipo: "checkbox",
        requerido: true,
        opciones: [
          { value: "instagram", label: "Instagram / TikTok" },
          { value: "whatsapp", label: "WhatsApp" },
          { value: "mercadolibre", label: "MercadoLibre" },
          { value: "tienda_fisica", label: "Tienda física" },
        ],
      },
      {
        id: "gestion_inventario",
        label: "¿Cómo gestionan el inventario?",
        tipo: "radio",
        requerido: true,
        opciones: [
          { value: "memoria", label: "De memoria" },
          { value: "papel", label: "Papel" },
          { value: "excel", label: "Excel" },
          { value: "sistema", label: "Sistema" },
        ],
      },
    ],
  },
};

// ── Bloque C — Dashboard y métricas (todos los sectores) ──────────────────────
export const bloqueC = {
  id: "dashboard",
  titulo: "C · Dashboard y métricas",
  preguntas: [
    {
      id: "metricas_necesarias",
      label: "¿Qué métricas necesitan ver cada día?",
      tipo: "checkbox",
      requerido: true,
      opciones: [
        { value: "pagos_dia", label: "Pagos del día" },
        { value: "clientes_activos", label: "Miembros / clientes activos" },
        { value: "leads_nuevos", label: "Leads nuevos" },
        { value: "citas_dia", label: "Citas del día" },
        { value: "inventario", label: "Inventario" },
        { value: "todo", label: "Todo lo anterior" },
      ],
    },
    {
      id: "frecuencia_revision",
      label: "¿Con qué frecuencia revisarán el panel?",
      tipo: "radio",
      requerido: false,
      opciones: [
        { value: "diario", label: "Diario" },
        { value: "semanal", label: "Semanal" },
        { value: "alertas", label: "Solo cuando haya una alerta" },
      ],
    },
  ],
};

// ── Bloque D — Procesos únicos (todos los sectores) ───────────────────────────
export const bloqueD = {
  id: "procesos_unicos",
  titulo: "D · Procesos únicos",
  preguntas: [
    {
      id: "procesos_especiales",
      label:
        "¿Hay algo en su operación que sea único y el sistema deba respetar?",
      tipo: "textarea",
      requerido: false,
      maxLength: 500,
      placeholder:
        "Ej: tenemos dos turnos de instructores, los pagos se registran por caja chica y caja grande por separado...",
    },
    {
      id: "integraciones_actuales",
      label: "¿Tienen integraciones actuales que quieren conservar?",
      tipo: "texto",
      requerido: false,
      placeholder:
        "Ej: Google Calendar, WhatsApp Business API, sistema de facturación...",
    },
  ],
};

// Helper: obtener bloque B según sector
export const getBloqueB = (sector) => bloquesB[sector] || null;

// Sectores disponibles
export const SECTORES_ONBOARDING = [
  { id: "gym", label: "Gimnasio", emoji: "🏋️" },
  { id: "salud", label: "Salud / Clínica", emoji: "🏥" },
  { id: "estetica", label: "Estética / Belleza", emoji: "💅" },
  { id: "academia", label: "Academia / Educación", emoji: "🎓" },
  { id: "veterinaria", label: "Veterinaria", emoji: "🐾" },
  { id: "construccion", label: "Construcción", emoji: "🏗️" },
  { id: "profesional", label: "Profesional / Consultoría", emoji: "💼" },
  { id: "taller", label: "Taller / Reparación", emoji: "🔧" },
  { id: "inmobiliaria", label: "Inmobiliaria", emoji: "🏘️" },
  { id: "ecommerce", label: "E-commerce", emoji: "🛒" },
  { id: "restaurante", label: "Restaurante / Food", emoji: "🍽️" },
];
