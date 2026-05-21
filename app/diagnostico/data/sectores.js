// ─── Sectores ─────────────────────────────────────────────────────────────────
// Cada sector define: flow, ticketLabel, tickets, icono emoji

export const SECTORES = [
  {
    id: "gym",
    label: "Gimnasio",
    emoji: "🏋️",
    flow: "servicios",
    ticketLabel: "Membresía mensual promedio",
    tickets: [
      { label: "Menos de $400/mes", value: 300 },
      { label: "$400 – $800/mes", value: 600 },
      { label: "$800 – $1,500/mes", value: 1100 },
      { label: "Más de $1,500/mes", value: 2000 },
    ],
  },
  {
    id: "salud",
    label: "Salud / Clínica",
    emoji: "🏥",
    flow: "servicios",
    ticketLabel: "Consulta o tratamiento promedio",
    tickets: [
      { label: "Menos de $500", value: 350 },
      { label: "$500 – $1,500", value: 1000 },
      { label: "$1,500 – $4,000", value: 2500 },
      { label: "Más de $4,000", value: 6000 },
    ],
  },
  {
    id: "estetica",
    label: "Estética / Belleza",
    emoji: "💅",
    flow: "servicios",
    ticketLabel: "Servicio promedio por visita",
    tickets: [
      { label: "Menos de $300", value: 200 },
      { label: "$300 – $800", value: 550 },
      { label: "$800 – $2,000", value: 1400 },
      { label: "Más de $2,000", value: 3000 },
    ],
  },
  {
    id: "academia",
    label: "Academia / Educación",
    emoji: "🎓",
    flow: "servicios",
    ticketLabel: "Inscripción o mensualidad promedio",
    tickets: [
      { label: "Menos de $500/mes", value: 350 },
      { label: "$500 – $1,500/mes", value: 1000 },
      { label: "$1,500 – $3,000/mes", value: 2200 },
      { label: "Más de $3,000/mes", value: 4500 },
    ],
  },
  {
    id: "veterinaria",
    label: "Veterinaria",
    emoji: "🐾",
    flow: "servicios",
    ticketLabel: "Consulta o servicio promedio",
    tickets: [
      { label: "Menos de $400", value: 280 },
      { label: "$400 – $1,000", value: 700 },
      { label: "$1,000 – $2,500", value: 1700 },
      { label: "Más de $2,500", value: 4000 },
    ],
  },
  {
    id: "construccion",
    label: "Construcción",
    emoji: "🏗️",
    flow: "servicios",
    ticketLabel: "Proyecto promedio",
    tickets: [
      { label: "Menos de $50,000", value: 30000 },
      { label: "$50,000 – $200,000", value: 120000 },
      { label: "$200,000 – $800,000", value: 500000 },
      { label: "Más de $800,000", value: 1500000 },
    ],
  },
  {
    id: "profesional",
    label: "Profesional / Consultoría",
    emoji: "💼",
    flow: "servicios",
    ticketLabel: "Honorarios promedio por cliente",
    tickets: [
      { label: "Menos de $3,000", value: 2000 },
      { label: "$3,000 – $10,000", value: 6500 },
      { label: "$10,000 – $30,000", value: 20000 },
      { label: "Más de $30,000", value: 50000 },
    ],
  },
  {
    id: "taller",
    label: "Taller / Reparación",
    emoji: "🔧",
    flow: "servicios",
    ticketLabel: "Servicio promedio",
    tickets: [
      { label: "Menos de $500", value: 300 },
      { label: "$500 – $2,000", value: 1200 },
      { label: "$2,000 – $6,000", value: 4000 },
      { label: "Más de $6,000", value: 10000 },
    ],
  },
  {
    id: "inmobiliaria",
    label: "Inmobiliaria",
    emoji: "🏘️",
    flow: "servicios",
    ticketLabel: "Comisión promedio por operación",
    tickets: [
      { label: "Menos de $20,000", value: 12000 },
      { label: "$20,000 – $60,000", value: 40000 },
      { label: "$60,000 – $150,000", value: 100000 },
      { label: "Más de $150,000", value: 250000 },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    emoji: "🛒",
    flow: "ecommerce",
    ticketLabel: "Ticket promedio por pedido",
    tickets: [
      { label: "Menos de $200", value: 150 },
      { label: "$200 – $600", value: 400 },
      { label: "$600 – $1,500", value: 1050 },
      { label: "Más de $1,500", value: 2500 },
    ],
  },
  {
    id: "restaurante",
    label: "Restaurante / Food",
    emoji: "🍽️",
    flow: "menu",
    ticketLabel: "Ticket promedio por pedido",
    tickets: [
      { label: "Menos de $100", value: 75 },
      { label: "$100 – $250", value: 175 },
      { label: "$250 – $500", value: 375 },
      { label: "Más de $500", value: 750 },
    ],
  },
];

// Helper: obtener sector por id
export const getSector = (id) => SECTORES.find((s) => s.id === id) || null;
