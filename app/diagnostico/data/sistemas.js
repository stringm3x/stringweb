// ─── Tabla de sistemas y precios ─────────────────────────────────────────────
// Estructura: { sector, tier } → sistema

export const SISTEMAS = {
  // ── Gym ────────────────────────────────────────────────────────────────────
  // PARCHE — solo los valores corregidos para gym
  // Reemplazar en sistemas.js el bloque gym completo

  gym: {
    base: {
      nombre: "Sistema de Captación — Nivel 2",
      precio: "$18,000 – $24,000",
      precioMin: 18000,
      anticipo: "$9,000 (40%)",
      anticipoVal: 9000,
      tiempo: "2 a 3 semanas",
      esquema: "50 / 50",
    },
    agenda: {
      nombre: "Sistema GYM Completo",
      precio: "$45,000 – $55,000",
      precioMin: 45000,
      anticipo: "$18,000 (40%)",
      anticipoVal: 18000,
      tiempo: "3 a 4 semanas",
      esquema: "40 / 30 / 30",
    },
    multi: {
      nombre: "Sistema GYM Multi-sucursal",
      precio: "Desde $70,000",
      precioMin: 70000,
      anticipo: "$28,000 (40%)",
      anticipoVal: 28000,
      tiempo: "5 a 7 semanas",
      esquema: "40 / 30 / 30",
    },
  },

  // ── Salud ──────────────────────────────────────────────────────────────────
  salud: {
    base: {
      nombre: "Sistema de Captación — Nivel 2",
      precio: "$18,000 – $24,000",
      precioMin: 18000,
      anticipo: "$9,000 (50%)",
      anticipoVal: 9000,
      tiempo: "2 a 3 semanas",
      esquema: "50 / 50",
    },
    agenda: {
      nombre: "Sistema Automatizado — Nivel 3",
      precio: "$28,000 – $35,000",
      precioMin: 28000,
      anticipo: "$14,000 (50%)",
      anticipoVal: 14000,
      tiempo: "3 a 4 semanas",
      esquema: "50 / 50",
    },
    multi: {
      nombre: "Sistema Especializado — Nivel 4",
      precio: "$45,000 – $70,000",
      precioMin: 45000,
      anticipo: "$18,000 (40%)",
      anticipoVal: 18000,
      tiempo: "4 a 6 semanas",
      esquema: "40 / 30 / 30",
    },
  },

  // ── Estética ───────────────────────────────────────────────────────────────
  estetica: {
    base: {
      nombre: "Sistema de Captación — Nivel 2",
      precio: "$18,000 – $24,000",
      precioMin: 18000,
      anticipo: "$9,000 (50%)",
      anticipoVal: 9000,
      tiempo: "2 a 3 semanas",
      esquema: "50 / 50",
    },
    agenda: {
      nombre: "Sistema Automatizado — Nivel 3",
      precio: "$28,000 – $35,000",
      precioMin: 28000,
      anticipo: "$14,000 (50%)",
      anticipoVal: 14000,
      tiempo: "3 a 4 semanas",
      esquema: "50 / 50",
    },
    multi: {
      nombre: "Sistema Especializado — Nivel 4",
      precio: "$40,000 – $60,000",
      precioMin: 40000,
      anticipo: "$16,000 (40%)",
      anticipoVal: 16000,
      tiempo: "4 a 5 semanas",
      esquema: "40 / 30 / 30",
    },
  },

  // ── Academia ───────────────────────────────────────────────────────────────
  academia: {
    base: {
      nombre: "Sistema de Captación — Nivel 2",
      precio: "$18,000 – $24,000",
      precioMin: 18000,
      anticipo: "$9,000 (50%)",
      anticipoVal: 9000,
      tiempo: "2 a 3 semanas",
      esquema: "50 / 50",
    },
    agenda: {
      nombre: "Sistema Academia Completo",
      precio: "$28,000 – $38,000",
      precioMin: 28000,
      anticipo: "$14,000 (50%)",
      anticipoVal: 14000,
      tiempo: "3 a 4 semanas",
      esquema: "50 / 50",
    },
    multi: {
      nombre: "Sistema Especializado — Nivel 4",
      precio: "$45,000 – $70,000",
      precioMin: 45000,
      anticipo: "$18,000 (40%)",
      anticipoVal: 18000,
      tiempo: "4 a 6 semanas",
      esquema: "40 / 30 / 30",
    },
  },

  // ── Veterinaria ────────────────────────────────────────────────────────────
  veterinaria: {
    base: {
      nombre: "Sistema de Captación — Nivel 2",
      precio: "$18,000 – $24,000",
      precioMin: 18000,
      anticipo: "$9,000 (50%)",
      anticipoVal: 9000,
      tiempo: "2 a 3 semanas",
      esquema: "50 / 50",
    },
    agenda: {
      nombre: "Sistema Veterinaria Completo",
      precio: "$28,000 – $35,000",
      precioMin: 28000,
      anticipo: "$14,000 (50%)",
      anticipoVal: 14000,
      tiempo: "3 a 4 semanas",
      esquema: "50 / 50",
    },
    multi: {
      nombre: "Sistema Especializado — Nivel 4",
      precio: "$40,000 – $65,000",
      precioMin: 40000,
      anticipo: "$16,000 (40%)",
      anticipoVal: 16000,
      tiempo: "4 a 6 semanas",
      esquema: "40 / 30 / 30",
    },
  },

  // ── Construcción ───────────────────────────────────────────────────────────
  construccion: {
    base: {
      nombre: "Sistema de Conversión — Nivel 1",
      precio: "$8,000 – $12,000",
      precioMin: 8000,
      anticipo: "$5,000 (50%)",
      anticipoVal: 5000,
      tiempo: "1 a 2 semanas",
      esquema: "50 / 50",
    },
    agenda: {
      nombre: "Sistema de Captación — Nivel 2",
      precio: "$18,000 – $24,000",
      precioMin: 18000,
      anticipo: "$9,000 (50%)",
      anticipoVal: 9000,
      tiempo: "2 a 3 semanas",
      esquema: "50 / 50",
    },
    multi: {
      nombre: "Sistema Especializado — Nivel 4",
      precio: "$45,000 – $90,000",
      precioMin: 45000,
      anticipo: "$18,000 (40%)",
      anticipoVal: 18000,
      tiempo: "4 a 8 semanas",
      esquema: "40 / 30 / 30",
    },
  },

  // ── Profesional ────────────────────────────────────────────────────────────
  profesional: {
    base: {
      nombre: "Sistema de Conversión — Nivel 1",
      precio: "$8,000 – $12,000",
      precioMin: 8000,
      anticipo: "$5,000 (50%)",
      anticipoVal: 5000,
      tiempo: "1 a 2 semanas",
      esquema: "50 / 50",
    },
    agenda: {
      nombre: "Sistema de Captación — Nivel 2",
      precio: "$18,000 – $24,000",
      precioMin: 18000,
      anticipo: "$9,000 (50%)",
      anticipoVal: 9000,
      tiempo: "2 a 3 semanas",
      esquema: "50 / 50",
    },
    multi: {
      nombre: "Sistema Automatizado — Nivel 3",
      precio: "$28,000 – $35,000",
      precioMin: 28000,
      anticipo: "$14,000 (50%)",
      anticipoVal: 14000,
      tiempo: "3 a 4 semanas",
      esquema: "50 / 50",
    },
  },

  // ── Taller ─────────────────────────────────────────────────────────────────
  taller: {
    base: {
      nombre: "Sistema de Conversión — Nivel 1",
      precio: "$8,000 – $12,000",
      precioMin: 8000,
      anticipo: "$5,000 (50%)",
      anticipoVal: 5000,
      tiempo: "1 a 2 semanas",
      esquema: "50 / 50",
    },
    agenda: {
      nombre: "Sistema de Captación — Nivel 2",
      precio: "$18,000 – $24,000",
      precioMin: 18000,
      anticipo: "$9,000 (50%)",
      anticipoVal: 9000,
      tiempo: "2 a 3 semanas",
      esquema: "50 / 50",
    },
    multi: {
      nombre: "Sistema Automatizado — Nivel 3",
      precio: "$28,000 – $35,000",
      precioMin: 28000,
      anticipo: "$14,000 (50%)",
      anticipoVal: 14000,
      tiempo: "3 a 4 semanas",
      esquema: "50 / 50",
    },
  },

  // ── Inmobiliaria ───────────────────────────────────────────────────────────
  inmobiliaria: {
    base: {
      nombre: "Sistema de Captación — Nivel 2",
      precio: "$18,000 – $24,000",
      precioMin: 18000,
      anticipo: "$9,000 (50%)",
      anticipoVal: 9000,
      tiempo: "2 a 3 semanas",
      esquema: "50 / 50",
    },
    agenda: {
      nombre: "Sistema Automatizado — Nivel 3",
      precio: "$28,000 – $35,000",
      precioMin: 28000,
      anticipo: "$14,000 (50%)",
      anticipoVal: 14000,
      tiempo: "3 a 4 semanas",
      esquema: "50 / 50",
    },
    multi: {
      nombre: "Sistema Especializado — Nivel 4",
      precio: "$50,000 – $90,000",
      precioMin: 50000,
      anticipo: "$20,000 (40%)",
      anticipoVal: 20000,
      tiempo: "5 a 8 semanas",
      esquema: "40 / 30 / 30",
    },
  },

  // ── E-commerce ─────────────────────────────────────────────────────────────
  ecommerce: {
    eco1: {
      nombre: "E-commerce N1 — Catálogo Digital",
      precio: "$10,000 – $14,000",
      precioMin: 10000,
      anticipo: "$6,000 (50%)",
      anticipoVal: 6000,
      tiempo: "1 a 2 semanas",
      esquema: "50 / 50",
    },
    eco2: {
      nombre: "E-commerce N2 — Tienda con Pago",
      precio: "$22,000 – $30,000",
      precioMin: 22000,
      anticipo: "$11,000 (50%)",
      anticipoVal: 11000,
      tiempo: "2 a 3 semanas",
      esquema: "50 / 50",
    },
    eco3: {
      nombre: "E-commerce N3 — Tienda con Operación",
      precio: "$35,000 – $50,000",
      precioMin: 35000,
      anticipo: "$14,000 (40%)",
      anticipoVal: 14000,
      tiempo: "3 a 5 semanas",
      esquema: "40 / 30 / 30",
    },
  },

  // ── Restaurante ────────────────────────────────────────────────────────────
  restaurante: {
    rest1: {
      nombre: "Menú Digital STRING",
      precio: "$10,000 – $16,000",
      precioMin: 10000,
      anticipo: "$7,000 (50%)",
      anticipoVal: 7000,
      tiempo: "1 a 2 semanas",
      esquema: "50 / 50",
    },
    rest2: {
      nombre: "Sistema de Pedidos Online",
      precio: "$20,000 – $28,000",
      precioMin: 20000,
      anticipo: "$10,000 (50%)",
      anticipoVal: 10000,
      tiempo: "2 a 3 semanas",
      esquema: "50 / 50",
    },
    rest3: {
      nombre: "Sistema Restaurante Completo",
      precio: "$32,000 – $45,000",
      precioMin: 32000,
      anticipo: "$13,000 (40%)",
      anticipoVal: 13000,
      tiempo: "3 a 5 semanas",
      esquema: "40 / 30 / 30",
    },
  },
};

// Helper: obtener sistema por sector y tier
export const getSistema = (sector, tier) => SISTEMAS[sector]?.[tier] || null;
