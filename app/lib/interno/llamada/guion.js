import { precioNivel } from "@/app/lib/precios";

// El guion común de la llamada de diagnóstico (lote 25, aprobado por Carlos
// en el chat de ventas el 25 nov). Literal del prompt del lote 25; vive en
// docs/textos.md § Interno · lote 25. Solo lo importa el servidor de
// /interno (y el banco de desarrollo): llega a la herramienta como props,
// después de exigirCarlos(), y nunca en un archivo estático de JS.
//
// "[dueño]" y "[negocio]" se llenan solos con llenar() (llenar.js). Lo demás entre
// corchetes ([alguien te pregunta], [él/ella]) es una pista para Carlos y se
// queda tal cual.

// Los tramos, con sus minutos. El reloj marca el tramo; no corta nada.
// Cada frase es { texto } o, si es una pregunta cuya respuesta se anota,
// { texto, id }: debajo lleva un campo para lo que dijo, tal cual.
export const TRAMOS = [
  {
    id: "apertura",
    nombre: "Apertura",
    desde: 0,
    hasta: 2,
    frases: [
      {
        texto:
          "Gracias por el espacio, [dueño]. La idea de hoy es sencilla: que me cuentes cómo funciona tu [negocio], ver qué te está costando y, al final, decirte cuál sería el siguiente paso. Son 20 minutos. ¿Te late si voy anotando?",
      },
      { texto: "Te había dejado dos preguntas. ¿Alcanzaste a pensarlas?" },
    ],
    // Las dos preguntas que Carlos dejó antes de la llamada, con campo.
    preguntas: [
      { id: "previa1", texto: "¿Qué es lo que más tiempo te quita hoy?" },
      { id: "previa2", texto: "Si pudieras dejar de hacer una sola cosa a mano, ¿cuál sería?" },
    ],
  },
  {
    id: "negocio",
    nombre: "Su negocio",
    desde: 2,
    hasta: 8,
    frases: [
      {
        id: "dia",
        texto:
          "Para entenderlo bien, cuéntame cómo es un día normal: desde que [alguien te pregunta] hasta que [ya es cliente y paga].",
      },
      // Su respuesta define el tipo de dueño (el selector va debajo).
      { id: "sistemas", texto: "¿Usas algún sistema hoy, o va todo entre WhatsApp, Excel y libreta?", tipoDueno: true },
    ],
  },
  {
    id: "cuesta",
    nombre: "Lo que le cuesta",
    desde: 8,
    hasta: 13,
    frases: [{ texto: "Eso que me cuentas, ¿cada cuánto pasa?… Hagamos la cuenta juntos." }],
  },
  {
    id: "veria",
    nombre: "Cómo se vería",
    desde: 13,
    hasta: 17,
    frases: [
      { id: "resolver", texto: "Si pudieras resolver una sola cosa este mes, ¿cuál sería?" },
      { id: "semana", texto: "¿Y cómo sería tu semana si eso ya estuviera resuelto?" },
    ],
    soloSiAyuda: "Solo si ayuda: “¿Quieres ver cómo se vería eso? Es una pantalla de ejemplo.”",
  },
  {
    id: "siguiente",
    nombre: "Siguiente paso",
    desde: 17,
    hasta: 20,
    frases: [
      {
        texto:
          "Te digo lo que escuché: [problema], te está costando [número] y lo más urgente es [prioridad]. ¿Lo dije bien?",
      },
      {
        texto:
          "Lo que sigue: hoy te mando un resumen por escrito, y en dos días hábiles te presento una propuesta hecha para tu [negocio]. Son 15 minutos. ¿Te queda el [día] a las [hora]?",
      },
    ],
    siDecideConAlguien: "¿Puede estar [él/ella] también?",
    despedida: "Gracias, [dueño]. Me llevo tarea.",
  },
];

// El tipo de dueño: cambia qué preguntas de Situación aparecen.
export const TIPOS_DUENO = [
  { id: "sin", nombre: "Sin sistema" },
  { id: "uno", nombre: "Con uno que no se adapta" },
  { id: "varios", nombre: "Con varios que no se hablan" },
];

// Preguntas de cierre, con campo cada una. La de exportar solo si ya tiene
// sistema.
export const CIERRE = [
  { id: "decide", texto: "¿Alguien más decide esto contigo?" },
  { id: "cuando", texto: "¿Para cuándo te gustaría tenerlo funcionando?" },
  { id: "exportar", texto: "¿Te deja exportar tus datos?", soloConSistema: true },
];
export const CITA = "Fecha y hora de la presentación de la propuesta (15 min)";

// Recordatorios fijos en pantalla. El precio sale de precios.js.
export const RECORDATORIOS = [
  "Aguanta el silencio",
  "Anota sus palabras tal cual",
  "Ni precios ni niveles salvo que pregunte",
  `Si pregunta el precio: “${precioNivel("responde")}; con lo que me cuentes te digo el nivel exacto en la propuesta.”`,
];

// Textos de la pantalla. TODO(textos): propuestos en el lote 25, por aprobar.
export const TEXTOS = {
  aviso: "Nada se guarda fuera de esta pestaña. Se borra al terminar la llamada o al cerrar la pestaña.",
  inicio: {
    titulo: "Inicio de la llamada",
    nicho: "Nicho",
    enPausa: "en pausa",
    atajo: "Gimnasio → Boaz Pro",
    negocio: "Negocio",
    dueno: "Nombre del dueño",
    tipo: "Tipo de dueño",
    filtro: "Filtro",
    empezar: "Empezar llamada",
  },
  tramos: {
    lista: "Tramos",
    // Plantillas: se llenan con llenar() (sin funciones: viajan como props).
    punto: "Tramo [n], [nombre], minuto [desde] a [hasta]",
    minutos: "[desde]–[hasta] min",
    situacion: "Situación",
    problema: "Problema",
    implicacion: "Implicación",
    eligeTipo: "Elige el tipo de dueño para ver sus preguntas.",
    recordatorios: "Recuerda",
  },
  reloj: { conTramo: "Min [minuto] · [tramo]", sinTramo: "Min [minuto]" },
  // La cuenta. La frase y la deuda, aprobadas el 25 nov; lo demás, por aprobar.
  cuenta: {
    titulo: "Su número",
    inicio: "O sea, ",
    dinero: "más o menos [monto] al mes",
    horas: "unas [horas] [unidad]",
    y: " y ",
    deuda: ", y hoy te deben unos [monto]",
    deudaSola: "hoy te deben unos [monto]",
    cierre: ". ¿Así lo ves?",
    unidades: {
      tuyasSemana: "horas tuyas a la semana",
      equipoSemana: "horas de tu equipo a la semana",
      tuyasDia: "horas tuyas al día",
    },
    alMes: "Al mes",
    alAno: "Al año",
    hoyTeDeben: "Hoy te deben",
    horasMes: "Horas al mes",
    partidaMes: "[monto] al mes",
    frase: "Para decir",
    vacia: "Captura sus cifras para armar la frase.",
  },
  prioridad: {
    titulo: "Lo más urgente",
    pantalla: "Pantalla de ejemplo",
  },
  nivel: {
    titulo: "Solo para ti",
    aviso: "Nivel sugerido. No se enseña.",
    reglas: "Lo que quiere o tiene",
    sugerido: "Nivel sugerido",
    casoTipico: "Caso típico",
    marca: "Marca lo que quiere para sugerir un nivel.",
    nombres: {
      responde: "Responde",
      organiza: "Organiza",
      automatiza: "Automatiza",
      controla: "Controla",
      empresa: "Empresa",
    },
    // Se llenan con precios-interno.js en el servidor (props): aquí no hay cifras.
    notaEmpresa: "Mapa de procesos antes de cotizar · boceto desde [boceto]",
    minimoEmpresa: "Se cotiza · nunca menos de [minimo]",
  },
  cierre: {
    problema: "Su problema, con sus palabras",
    preguntas: "Preguntas de cierre",
    dia: "Fecha",
    hora: "Hora",
    noto: "Algo que noté",
  },
  // El resumen para WhatsApp: su problema con sus palabras, su número, su
  // prioridad, "Algo que noté" y la cita. Hora aprobada el 25 nov; lo demás,
  // por aprobar (TODO(textos)).
  resumen: {
    titulo: "Resumen para WhatsApp",
    saludoCon: "[dueño], gracias por tu tiempo.",
    saludoSin: "Gracias por tu tiempo.",
    entendi: "Lo que entendí: ",
    numero: "te está costando [número]",
    prioridad: "lo que más quieres es [prioridad]",
    separador: "; ",
    y: ", y ",
    noto: "Algo que noté: [nota]",
    cita: "Nos vemos [día] a las [hora] para la propuesta.",
    citaSinHora: "Nos vemos [día] para la propuesta.",
    copiar: "Copiar",
    copiado: "Copiado",
    rehacer: "Volver a armar el resumen",
  },
  objeciones: { abrir: "Objeciones", titulo: "Objeciones", cerrar: "Cerrar" },
  navegacion: { anterior: "Anterior", siguiente: "Siguiente" },
  gimnasio: { volver: "Cambiar de nicho" },
  terminar: "Terminar llamada",
  confirmar: {
    pregunta: "¿Terminar la llamada? Se borra todo lo que anotaste.",
    cancelar: "Cancelar",
    borrar: "Sí, terminar",
  },
};

// Todo junto, para pasarlo como props (solo datos, sin funciones).
export const GUION = { TRAMOS, TIPOS_DUENO, CIERRE, CITA, RECORDATORIOS, TEXTOS };
