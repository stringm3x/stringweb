// Los cinco niveles, tal como en docs/textos.md: la sala 4 (nombre, frase,
// qué hace, precio, viñeta y nota) y, desde el lote 8, su página
// (/sistemas/<slug>, docs/pagina-nivel.md) con las secciones "Sistemas",
// "Lo que cambia por nivel" y "Ejemplos y textos alternativos de los
// niveles". Los precios "desde" coinciden con CLAUDE.md; si cambian, manda
// el KB. Cada nivel es una cuerda con su nota (docs/sistema/components/Cuerda):
// La, Re, Sol y Si; Empresa las toca juntas, como la orquesta completa.
const LA = 110;
const RE = 146.8;
const SOL = 196;
const SI = 246.9;

// Cómo trabajamos: los pasos de la frase de Responde; de Automatiza en
// adelante, con el boceto (sala 6).
const PASOS = ["Diagnóstico gratis", "Propuesta por escrito", "Construcción", "Entrega"];
const PASOS_CON_BOCETO = ["Diagnóstico gratis", "Boceto", "Propuesta por escrito", "Construcción", "Entrega"];

// Cada punto de "Qué incluye" va con su parte inicial en negritas.
const punto = (fuerte, resto = "") => ({ fuerte, resto });

export const NIVELES = [
  {
    nombre: "Responde",
    slug: "responde",
    numero: 1,
    arte: "Literatura",
    artes: 1,
    titular: "Que nadie se quede sin respuesta.",
    tiempo: "2 a 3 semanas",
    pago: "50 % al empezar y 50 % al entregar",
    incluye: [
      punto("Una página propia", " para tu negocio."),
      punto("Tu WhatsApp conectado", ", a un toque desde la página."),
      punto("Un formulario", " para que te dejen sus datos."),
      punto("Un mensaje automático:", " quien te escribe recibe respuesta al instante."),
    ],
    paraQuien:
      "Para el negocio al que le llegan mensajes por Instagram y WhatsApp y pierde clientes por no contestar a tiempo.",
    dibujo: "/arte/niveles/responde.svg",
    alt: "Una máquina de escribir: en la hoja, lo que te escribieron y, debajo, la respuesta que el sistema escribe solo al instante.",
    lineaDibujo: "Lo que tu cliente escribe, tu sistema lo contesta al instante.",
    ejemplo: "Un WhatsApp con la respuesta automática",
    pasos: PASOS,
    crezcas: "Si ya contestas pero se te pierden en el camino, el siguiente paso es",
    siguiente: "organiza",
    dices: "Me escriben y no alcanzo a contestar.",
    cita: true,
    hace: "Página propia, WhatsApp, formulario y un mensaje automático. Nadie se queda sin respuesta",
    precio: "Desde $8,000",
    vineta: "/arte/sala4-vineta-responde.svg",
    notas: [LA],
  },
  {
    nombre: "Organiza",
    slug: "organiza",
    numero: 2,
    arte: "Arquitectura",
    artes: 2,
    titular: "Cada cliente en su lugar.",
    tiempo: "2 a 3 semanas",
    pago: "50 / 50",
    incluye: [punto("Registro de prospectos", ", calificación y avisos.")],
    paraQuien:
      "Para el negocio que ya contesta, pero tiene a sus clientes regados entre chats, libretas y Excel.",
    dibujo: "/arte/niveles/organiza.svg",
    alt: "Un edificio de tres pisos, uno por etapa, con cada cliente en su piso y una campana que avisa cuando llega uno nuevo.",
    lineaDibujo: "Cada cliente en su lugar, y un aviso cuando llega uno nuevo.",
    ejemplo: "Una lista de prospectos con su etapa: nuevo, interesado, cliente",
    pasos: PASOS,
    siguiente: "automatiza",
    dices: "Tengo a mis clientes regados en chats y en Excel.",
    cita: true,
    hace: "Lo de Responde, más registro de prospectos, calificación y avisos",
    precio: "Desde $18,000",
    vineta: "/arte/sala4-vineta-organiza.svg",
    notas: [RE],
  },
  {
    nombre: "Automatiza",
    slug: "automatiza",
    numero: 3,
    arte: "Danza",
    artes: 3,
    titular: "Que el seguimiento lo dé el sistema.",
    tiempo: "4 a 6 semanas",
    pago: "40 / 30 / 30",
    incluye: [
      punto("Respuesta inmediata", ", agenda, seguimiento, recordatorios y panel."),
      punto("Empieza con el boceto."),
    ],
    paraQuien: "Para el negocio que pierde citas y clientes porque nadie da seguimiento a tiempo.",
    dibujo: "/arte/niveles/automatiza.svg",
    alt: "Una cinta que une cuatro pasos: recibido, agenda, recordatorio y seguimiento.",
    lineaDibujo: "Responde, agenda, recuerda y da seguimiento, aunque no estés.",
    ejemplo: "La agenda del día con un recordatorio enviado",
    pasos: PASOS_CON_BOCETO,
    siguiente: "controla",
    dices: "Quiero que el sistema siga aunque yo no esté.",
    cita: true,
    hace: "Lo de Organiza, más respuesta inmediata, agenda, seguimiento, recordatorios y panel",
    precio: "Desde $28,000",
    vineta: "/arte/sala4-vineta-automatiza.svg",
    notas: [SOL],
  },
  {
    nombre: "Controla",
    slug: "controla",
    numero: 4,
    arte: "Pintura",
    artes: 4,
    titular: "Sabe cuánto ganas y qué está pasando.",
    tiempo: "4 a 6 semanas",
    pago: "40 / 30 / 30",
    incluye: [
      punto(
        "Desarrollo a la medida:",
        " sistema de clientes propio, paneles, integraciones y tienda en línea propia."
      ),
      punto("Empieza con el boceto."),
    ],
    paraQuien:
      "Para el negocio que ya creció y necesita saber cuánto gana y qué está pasando, o vender en línea con su propia tienda.",
    dibujo: "/arte/niveles/controla.svg",
    alt: "Un cuadro en marco dorado con el panel de un negocio y una gráfica que sube, y un pincel al lado.",
    lineaDibujo: "El cuadro completo de tu negocio, en una sola pantalla.",
    ejemplo: "Un panel con indicadores, sin cifras reales",
    pasos: PASOS_CON_BOCETO,
    siguiente: "empresa",
    dices: "Quiero saber cuánto gano y qué está pasando.",
    cita: true,
    hace: "Lo de Automatiza, hecho a la medida: sistema de clientes propio, paneles e integraciones",
    precio: "Desde $40,000",
    vineta: "/arte/sala4-vineta-controla.svg",
    notas: [SI],
  },
  {
    nombre: "Empresa",
    slug: "empresa",
    numero: 5,
    arte: "Las siete",
    artes: 7,
    titular: "Un sistema completo, con su equipo.",
    tiempo: "Según su propuesta",
    pago: "Según su propuesta",
    incluye: [
      punto("Sistema completo", " con equipo por proyecto, incluida una tienda en línea grande."),
      punto("Mapa de procesos firmado", " antes de cotizar."),
    ],
    paraQuien:
      "Para la empresa con varias áreas o sucursales, o una tienda en línea grande, que necesita un sistema completo a su medida.",
    dibujo: "/arte/niveles/empresa.svg",
    alt: "Un escenario donde las siete artes están juntas: arco, telón, pantalla de cine, ciudad pintada, un busto, atriles y una cinta.",
    lineaDibujo: "Todo tu equipo y tus áreas, en un solo sistema.",
    ejemplo: "Un mapa de procesos en boceto",
    pasos: PASOS_CON_BOCETO,
    siguiente: null,
    dices: "Para empresas grandes",
    cita: false,
    hace: "Un sistema completo, con equipo por proyecto. Se cotiza después del mapa de procesos",
    precio: "Se cotiza",
    vineta: "/arte/sala4-vineta-empresa.svg",
    notas: [LA, RE, SOL, SI],
  },
];

export const nivelPorSlug = (slug) => NIVELES.find((n) => n.slug === slug);
