// Contenido de la herramienta de diagnóstico de /interno (lote 20): giros,
// preguntas, opciones y textos. Literal de docs/textos.md § Interno.
// Textos finales aprobados por ventas (5 nov).

export const AVISO = "Nada de esto se guarda. Al cerrar la página, se borra.";

export const PASOS = [
  "Prospecto",
  "Situación y problema",
  "Cuánto le cuesta y qué quiere",
  "Nivel sugerido",
  "Resumen para WhatsApp",
];

export const ORIGENES = ["Visita", "Formulario", "WhatsApp", "Recomendación"];

const SI_AVECES_NO = ["Sí", "A veces", "No"];

// Por giro: S (texto corto opcional), P (Sí / A veces / No; en Empresa,
// texto), I (texto, tal cual) y la frase del problema en sus palabras.
// `problemaCon` dice qué respuestas de la P son el problema.
export const GIROS = [
  {
    id: "barberia",
    nombre: "Barbería o estética",
    s: "¿Cómo te agendan hoy: WhatsApp, teléfono o llegan sin cita?",
    p: "¿Te dejan plantado sin avisar?",
    i: "¿Cuántas citas se te caen a la semana, y cuánto cobras en promedio?",
    problema: "Te dejan plantado sin avisar.",
    problemaCon: ["Sí", "A veces"],
  },
  {
    id: "clinica",
    nombre: "Clínica o consultorio",
    s: "¿Quién confirma las citas y cómo?",
    p: "¿Hay pacientes que ya no regresan a su siguiente cita?",
    i: "¿Cuántos a la semana, más o menos, y cuánto vale una consulta?",
    problema: "Hay pacientes que ya no regresan a su siguiente cita.",
    problemaCon: ["Sí", "A veces"],
  },
  {
    id: "restaurante",
    nombre: "Restaurante",
    s: "¿Te piden por WhatsApp, por teléfono o por apps de reparto?",
    p: "¿En hora pico se quedan pedidos o mensajes sin contestar?",
    i: "¿Cuántos pedidos sientes que se te van en un fin de semana?",
    problema: "En hora pico se quedan pedidos o mensajes sin contestar.",
    problemaCon: ["Sí", "A veces"],
  },
  {
    id: "tienda",
    nombre: "Tienda en línea",
    s: "¿Dónde vendes hoy: Instagram, Mercado Libre, tu página?",
    p: "¿Llevas el inventario a mano o en Excel?",
    i: "¿Te ha pasado vender algo que ya no tenías? ¿Cada cuándo?",
    problema: "Llevas el inventario a mano o en Excel.",
    problemaCon: ["Sí", "A veces"],
  },
  {
    id: "empresa",
    nombre: "Empresa mediana o grande",
    s: "¿Cuántas áreas o sucursales son?",
    p: "¿Qué proceso se hace hoy en Excel, en papel o por correo?",
    pTexto: true,
    i: "¿Cuántas personas y cuántas horas a la semana se van en eso?",
    // La P de Empresa es abierta: la frase lleva lo que dijo.
    problema: (dijo) => `Hoy ${dijo} se hace a mano, entre Excel, papel y correo.`,
  },
  {
    id: "gimnasio",
    nombre: "Gimnasio",
    s: "¿Cuántos socios activos tienes y cómo les cobras?",
    p: "¿Sabes quién se te vence esta semana y quién dejó de venir?",
    i: "¿Cuántos socios sientes que se te van al mes sin renovar?",
    // "¿Sabes…?": el problema es no saber.
    problema: "No sabes a tiempo quién se te vence ni quién dejó de venir.",
    problemaCon: ["A veces", "No"],
  },
];

export const giroPorId = (id) => GIROS.find((g) => g.id === id);

// Las respuestas de la N, con la forma que toman en el resumen.
export const N_OPCIONES = [
  { texto: "Que nadie se quede sin respuesta", resumen: "que nadie se quede sin respuesta" },
  { texto: "Tener a mis clientes en un solo lugar", resumen: "tener a tus clientes en un solo lugar" },
  { texto: "Que el seguimiento siga aunque yo no esté", resumen: "que el seguimiento siga aunque tú no estés" },
  { texto: "Saber cuánto gano y qué está pasando", resumen: "saber cuánto ganas y qué está pasando" },
  { texto: "No sé", resumen: null },
];
export const N = Object.fromEntries(N_OPCIONES.map((o, i) => [["responde", "organiza", "automatiza", "controla", "nose"][i], o.texto]));

// S2: dónde apunta. Todo menos "Un sistema" pide Organiza.
export const S2_OPCIONES = ["Cuaderno", "Excel", "WhatsApp", "Un sistema", "En la cabeza"];
export const S2_SIN_SISTEMA = ["Cuaderno", "Excel", "WhatsApp", "En la cabeza"];

// Las preguntas comunes. tipo: "varias" (casillas), "una" (una opción) o
// "texto" (tal cual).
export const COMUNES = {
  s1: {
    texto: "¿Cómo te llegan hoy los clientes nuevos?",
    tipo: "varias",
    opciones: ["Instagram", "WhatsApp", "De paso", "Recomendación", "Otro"],
  },
  s2: { texto: "¿Dónde apuntas a tus clientes y lo que te pagan?", tipo: "una", opciones: S2_OPCIONES },
  p1: {
    texto: "¿Se te quedan mensajes sin contestar, o contestas tarde?",
    tipo: "una",
    opciones: SI_AVECES_NO,
    problema: "Se te quedan mensajes sin contestar, o contestas tarde.",
    problemaCon: ["Sí", "A veces"],
  },
  p2: {
    texto: "¿Sabes cuántos clientes tienes activos y cuánto entró este mes?",
    tipo: "una",
    opciones: ["Sí", "Más o menos", "No"],
    problema: "No tienes a la mano cuántos clientes activos tienes ni cuánto entró este mes.",
    problemaCon: ["Más o menos", "No"],
  },
  i: {
    texto: "Con todo eso, ¿cuántos clientes sientes que se te van al mes, y cuánto te deja cada uno?",
    tipo: "texto",
    ayuda: "Escribe lo que dijo, tal cual",
  },
  n: {
    texto: "Si pudieras resolver una sola cosa este mes, ¿cuál sería?",
    tipo: "una",
    opciones: N_OPCIONES.map((o) => o.texto),
  },
};

// Las preguntas del flujo, en orden, para un giro. Cada una con su id, el
// paso en el que va (2 o 3) y lo que hace falta para mostrarla.
export function preguntasDelFlujo(giroId, rapida = false) {
  const giro = giroPorId(giroId);
  if (!giro) return [];
  const sGiro = { id: "sGiro", paso: 2, texto: giro.s, tipo: "texto", opcional: true, corto: true };
  const pGiro = giro.pTexto
    ? { id: "pGiro", paso: 2, texto: giro.p, tipo: "texto", ayuda: COMUNES.i.ayuda }
    : { id: "pGiro", paso: 2, texto: giro.p, tipo: "una", opciones: SI_AVECES_NO };
  const iGiro = { id: "iGiro", paso: 3, texto: giro.i, tipo: "texto", ayuda: COMUNES.i.ayuda };
  const c = (id, paso) => ({ id, paso, ...COMUNES[id] });

  if (giro.id === "gimnasio") return rapida ? [pGiro, c("n", 3)] : [sGiro, pGiro, iGiro, c("n", 3)];
  if (rapida) return [pGiro, c("s2", 2), c("n", 3)];
  return [c("s1", 2), c("s2", 2), c("p1", 2), c("p2", 2), sGiro, pGiro, iGiro, c("i", 3), c("n", 3)];
}

// Paso 4: siguiente paso.
export const SIGUIENTES = ["Llamada", "Demo", "Propuesta", "Visita"];

// Textos de la pantalla.
export const TEXTOS = {
  prospecto: {
    nombre: "Nombre del dueño",
    negocio: "Negocio",
    whatsapp: "Su WhatsApp",
    whatsappAviso: "El número lleva 10 dígitos. Sin él, WhatsApp te deja elegir el chat.",
    giro: "Giro",
    origen: "¿Cómo te conoció?",
    empezar: "Empezar preguntas",
    rapida: "Visita rápida · 3 preguntas",
  },
  navegacion: { anterior: "Anterior", saltar: "Saltar", siguiente: "Siguiente" },
  nota: "Nota",
  punto: (n, estado) => `Pregunta ${n}, ${estado}`,
  estados: { contestada: "contestada", saltada: "saltada", pendiente: "sin contestar" },
  nivel: {
    eso: (nivel) => `Eso que me cuentas es ${nivel}`,
    cambiar: "Cambiar nivel",
    cuandoCrezca: (nivel) => `Cuando crezca: ${nivel}`,
    boceto: (precio) => `Ofrecer boceto · ${precio}`,
    fundador: ({ mes, meses }) => `Ofrecer precio fundador · ${mes} fijo ${meses} meses`,
    empresaPrecio: (minimo) => `Se cotiza · nunca menos de ${minimo}`,
    recordatorioGym: "Pro se paga con 2 o 3 socios que no se van",
    siguiente: "Siguiente paso",
    dia: "¿Qué día?",
  },
  resumen: {
    abrir: "Abrir en WhatsApp",
    copiar: "Copiar",
    copiado: "Copiado",
    nuevo: "Nuevo diagnóstico",
    rehacer: "Volver a armar el resumen",
    datos: "Datos para la propuesta",
    copiarDatos: "Copiar datos",
  },
  confirmar: { pregunta: "¿Seguro? Se borra todo lo del diagnóstico.", cancelar: "Cancelar", borrar: "Sí, borrar" },
};

// Lo que resuelve cada nivel: "Para eso te sugiero [nivel]: …".
export const LINEA_NIVEL = {
  responde:
    "una página con formulario y un mensaje automático en WhatsApp, para que nadie que te escriba se quede sin respuesta.",
  organiza:
    "junta en un solo lugar a los clientes que hoy tienes regados entre chats, libretas y Excel, y te avisa a quién darle seguimiento.",
  automatiza:
    "agenda, recordatorios y seguimiento automáticos, para que el sistema siga trabajando aunque tú no estés.",
  controla:
    "un sistema a tu medida con un panel para ver cuánto vendes y qué está pasando, y si lo necesitas, tu propia tienda en línea.",
  empresa:
    "un sistema completo a tu medida, para todas tus áreas o sucursales, que empieza por el mapa de tus procesos.",
};

// La razón bajo el nivel, solo en pantalla.
export const RAZONES = {
  gimnasio: "Es un gimnasio: Boaz ya lo resuelve.",
  empresa: "Es una empresa mediana o grande.",
  controla: "Quiere saber cuánto gana y qué está pasando.",
  tienda: "Vende en línea.",
  automatiza: "Quiere que el seguimiento siga aunque no esté.",
  organiza: "Quiere tener a sus clientes en un solo lugar.",
  responde: "Quiere que nadie se quede sin respuesta.",
  noSeGiro: "Por lo que marcó: se le caen citas, pacientes o pedidos.",
  noSeS2: "Por lo que marcó: apunta a sus clientes en cuaderno, Excel, WhatsApp o en la cabeza.",
  noSeP1: "Por lo que marcó: se le quedan mensajes sin contestar.",
  noSeNada: "No marcó nada: se sugiere lo más chico. Vuelve a hacer la pregunta de qué quiere resolver primero.",
};

// La línea de cierre del resumen general: con día y sin día.
const DUDA = "Cualquier duda, aquí estoy.";
export const CIERRES = {
  ninguno: `En 2 días hábiles te mando la propuesta por escrito, con lo que incluye y lo que no. ${DUDA}`,
  Llamada: {
    conDia: (dia) => `Quedamos en hablar ${dia}. ${DUDA}`,
    sinDia: `¿Qué día te acomoda para seguir platicando? ${DUDA}`,
  },
  Demo: {
    conDia: (dia) => `Quedamos ${dia} para mostrarte cómo funcionaría. ${DUDA}`,
    sinDia: `Me gustaría mostrarte cómo funcionaría en tu negocio. ¿Qué día te acomoda para verlo juntos? ${DUDA}`,
  },
  Propuesta: {
    conDia: (dia) =>
      `Quedamos ${dia} para revisar tu propuesta: te la mando antes por escrito, con lo que incluye y lo que no. ${DUDA}`,
    sinDia: `En 2 días hábiles te mando la propuesta por escrito, con lo que incluye y lo que no, y la revisamos juntos cuando te acomode. ${DUDA}`,
  },
  Visita: {
    conDia: (dia) => `Paso a verte ${dia}. ${DUDA}`,
    sinDia: `Me paso a verte para seguir platicando. ¿Qué día y a qué hora te acomoda? ${DUDA}`,
  },
};
