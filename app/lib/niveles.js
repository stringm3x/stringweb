// Los cinco niveles de la sala 4, tal como en docs/textos.md. Los precios
// "desde" coinciden con CLAUDE.md; si cambian, manda el KB.
// Cada nivel es una cuerda con su nota (docs/sistema/components/Cuerda):
// La, Re, Sol y Si; Empresa las toca juntas, como la orquesta completa.
const LA = 110;
const RE = 146.8;
const SOL = 196;
const SI = 246.9;

export const NIVELES = [
  {
    nombre: "Responde",
    dices: "Me escriben y no alcanzo a contestar.",
    cita: true,
    hace: "Página propia, WhatsApp, formulario y un mensaje automático. Nadie se queda sin respuesta",
    precio: "Desde $8,000",
    vineta: "/arte/sala4-vineta-responde.svg",
    notas: [LA],
  },
  {
    nombre: "Organiza",
    dices: "Tengo a mis clientes regados en chats y en Excel.",
    cita: true,
    hace: "Lo de Responde, más registro de prospectos, calificación y avisos",
    precio: "Desde $18,000",
    vineta: "/arte/sala4-vineta-organiza.svg",
    notas: [RE],
  },
  {
    nombre: "Automatiza",
    dices: "Quiero que el sistema siga aunque yo no esté.",
    cita: true,
    hace: "Lo de Organiza, más respuesta inmediata, agenda, seguimiento, recordatorios y panel",
    precio: "Desde $28,000",
    vineta: "/arte/sala4-vineta-automatiza.svg",
    notas: [SOL],
  },
  {
    nombre: "Controla",
    dices: "Quiero saber cuánto gano y qué está pasando.",
    cita: true,
    hace: "Lo de Automatiza, hecho a la medida: sistema de clientes propio, paneles e integraciones",
    precio: "Desde $40,000",
    vineta: "/arte/sala4-vineta-controla.svg",
    notas: [SI],
  },
  {
    nombre: "Empresa",
    dices: "Para empresas grandes",
    cita: false,
    hace: "Un sistema completo, con equipo por proyecto. Se cotiza después del mapa de procesos",
    precio: "Se cotiza",
    vineta: "/arte/sala4-vineta-empresa.svg",
    notas: [LA, RE, SOL, SI],
  },
];
