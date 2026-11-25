// Contenido de la herramienta de diagnóstico de /interno (lote 20): giros,
// preguntas, opciones y textos. Literal de docs/textos.md § Interno.
// Textos finales aprobados por ventas (5 nov).
//
// Lote 25: solo datos, sin funciones. Lo lee el servidor de /interno después
// de exigirCarlos() y llega a la herramienta como props (CONTENIDO_DIAGNOSTICO):
// no va en ningún archivo estático de JS. Lo que antes era una función ahora
// es una plantilla con "[clave]" que se llena con llenar().

export const AVISO = "Nada de esto se guarda. Al cerrar la página, se borra.";

export const PASOS = [
  "Prospecto",
  "Situación y problema",
  "Cuánto le cuesta y qué quiere",
  "Nivel sugerido",
  "Resumen para WhatsApp",
];

export const ORIGENES = ["Visita", "Formulario", "WhatsApp", "Recomendación"];

export const SI_AVECES_NO = ["Sí", "A veces", "No"];

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
    problema: "Hoy [dijo] se hace a mano, entre Excel, papel y correo.",
    problemaConDicho: true,
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
  punto: "Pregunta [n], [estado]",
  estados: { contestada: "contestada", saltada: "saltada", pendiente: "sin contestar" },
  nivel: {
    eso: "Eso que me cuentas es [nivel]",
    cambiar: "Cambiar nivel",
    cuandoCrezca: "Cuando crezca: [nivel]",
    boceto: "Ofrecer boceto · [precio]",
    fundador: "Ofrecer precio fundador · [mes] fijo [meses] meses",
    empresaPrecio: "Se cotiza · nunca menos de [minimo]",
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
    conDia: `Quedamos en hablar [dia]. ${DUDA}`,
    sinDia: `¿Qué día te acomoda para seguir platicando? ${DUDA}`,
  },
  Demo: {
    conDia: `Quedamos [dia] para mostrarte cómo funcionaría. ${DUDA}`,
    sinDia: `Me gustaría mostrarte cómo funcionaría en tu negocio. ¿Qué día te acomoda para verlo juntos? ${DUDA}`,
  },
  Propuesta: {
    conDia: `Quedamos [dia] para revisar tu propuesta: te la mando antes por escrito, con lo que incluye y lo que no. ${DUDA}`,
    sinDia: `En 2 días hábiles te mando la propuesta por escrito, con lo que incluye y lo que no, y la revisamos juntos cuando te acomode. ${DUDA}`,
  },
  Visita: {
    conDia: `Paso a verte [dia]. ${DUDA}`,
    sinDia: `Me paso a verte para seguir platicando. ¿Qué día y a qué hora te acomoda? ${DUDA}`,
  },
};

// Nombres de los niveles (antes en nivel.js).
export const NOMBRES = {
  responde: "Responde",
  organiza: "Organiza",
  automatiza: "Automatiza",
  controla: "Controla",
  empresa: "Empresa",
  boaz: "Boaz Pro",
};

// Los textos del resumen para WhatsApp y de los datos para la propuesta
// (antes escritos en resumen.js). Mismas palabras; plantillas con "[clave]".
export const RESUMEN = {
  general: {
    holaCon: "Hola, [nombre]. Soy Carlos, de STRING. Gracias por el tiempo de hoy.",
    holaSin: "Hola. Soy Carlos, de STRING. Gracias por el tiempo de hoy.",
    tuNegocio: "tu negocio",
    teDejo: "Te dejo por escrito lo que platicamos de [negocio]:",
    teCuesta: "- Me comentaste que esto te cuesta [cuesta]",
    urge: "Lo que más te urge es [urge]. Para eso te sugiero [nivel]: [linea]",
    sugiero: "Para lo que me contaste te sugiero [nivel]: [linea]",
    precioEmpresa:
      "Por el tamaño, lo cotizo a tu medida después de mapear tus procesos. El cuidado mensual va incluido en la cotización.",
    precio: "Arranca desde [desde] con IVA incluido, y su cuidado mensual desde [continuidad].",
    bocetoEmpresa:
      "Para empezar, el primer paso es el boceto: el mapa de tus procesos y la primera pantalla. Cuesta [boceto] con IVA incluido y se descuenta completo si decides seguir en los 30 días siguientes.",
    boceto:
      "Para empezar sin arriesgar, el primer paso es el boceto: el mapa de cómo funciona tu negocio y la primera pantalla de tu sistema. Cuesta [boceto] con IVA incluido y se descuenta completo si decides seguir en los 30 días siguientes.",
    firma: "Carlos · STRING",
  },
  gimnasio: {
    holaCon: "Hola, [nombre]. Soy Carlos, el creador de Boaz. Gracias por el tiempo de hoy.",
    holaSin: "Hola. Soy Carlos, el creador de Boaz. Gracias por el tiempo de hoy.",
    tuGimnasio: "tu gimnasio",
    meQuedo: "Me quedo con lo que me contaste de [gimnasio]: [principal]",
    loResuelve: "Eso es justo lo que Boaz resuelve: sabes cuánto entra, quién se te vence y quién dejó de venir.",
    prueba:
      "Te propongo probarlo 14 días con Pro completo, sin tarjeta. Yo te ayudo a cargar a tus socios para que lo veas con tus propios datos.",
    diaCon: "¿Te queda bien [dia] para dejarlo listo juntos?",
    diaSin: "¿Qué día te queda bien para dejarlo listo juntos?",
    proCuesta: "Pro cuesta [mes] al mes, IVA incluido.",
    fundador: "Como eres de los primeros 5 gimnasios, te queda en [mes] al mes, fijo por [meses] meses.",
    registro: "Si prefieres empezar por tu cuenta: stringwebs.com/gym/registro",
    firma: "Carlos · Boaz by STRING",
  },
  datos: {
    negocio: "Negocio: [negocio]",
    dueno: "Dueño: [nombre]",
    nivelBoaz: "Nivel: [nivel] · [mes] al mes, IVA incluido",
    fundador: " · precio fundador [mes] fijo [meses] meses",
    nivelDesde: "Nivel: [nivel] · desde [desde], IVA incluido",
    nivelCotiza: "Nivel: [nivel] · se cotiza",
    continuidad: "Continuidad: [nombre], desde [desde] al mes",
    bocetoSi: "Boceto: sí, [boceto]",
    bocetoNo: "Boceto: no",
    problemas: "Problemas:",
    cuesta: "Le cuesta: [cuesta]",
    siguiente: "Siguiente paso: [tipo]",
    siguienteDia: "Siguiente paso: [tipo], [dia]",
    origen: "Cómo nos conoció: [origen]",
  },
};

// Todo junto, para pasarlo como props desde el servidor.
export const CONTENIDO_DIAGNOSTICO = {
  AVISO,
  PASOS,
  ORIGENES,
  SI_AVECES_NO,
  GIROS,
  N_OPCIONES,
  N,
  S2_OPCIONES,
  S2_SIN_SISTEMA,
  COMUNES,
  SIGUIENTES,
  TEXTOS,
  LINEA_NIVEL,
  RAZONES,
  CIERRES,
  NOMBRES,
  RESUMEN,
};
