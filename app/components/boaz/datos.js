// Textos de /boaz (docs/textos.md § "Boaz · lote 9b", aprobados el 2 nov, y
// § "Boaz · lote 21"), palabra por palabra.

import { TOTAL_FUNDADORES } from "@/app/lib/boaz-lanzamiento";
import { BOAZ, BOAZ_FUNDADOR, IVA } from "@/app/lib/precios";

export const DESCRIPCION =
  "Socios, check-in, cobros y caja para tu gimnasio, probado en un gimnasio real. En pesos, sin instalación y sin límite de socios.";

export const NOTA_PRUEBA = "Prueba de 14 días con Pro completo. Sin tarjeta.";

export const GRUPOS = [
  {
    titulo: "01 · El mostrador",
    funciones: [
      ["Socios sin límite", "Altas, planes y vencimientos al día, solos.", "STARTER"],
      ["Entrada con QR", "Check-in en recepción, con lector o en kiosco. Sin equipo especial.", "STARTER"],
      ["Caja que cuadra", "Cobros, recibo en PDF y corte del día. Un cobro nunca se registra dos veces.", "STARTER"],
      ["Tu Excel, adentro", "Importa tus socios desde Excel o CSV y expórtalos cuando quieras.", "STARTER"],
      ["Notas que te recuerdan", "Anota y elige el día en que Boaz te lo vuelve a mostrar.", "STARTER"],
    ],
  },
  {
    titulo: "02 · La operación",
    funciones: [
      ["Inventario y punto de venta", "Vende agua, suplementos y lo que tengas, con existencias al día.", "PRO"],
      ["Pagos a plazos", "Membresías en cuotas, con quién debe y desde cuándo.", "PRO"],
      ["Tu equipo, cada quien con su acceso", "Dueño, gerente, recepción y entrenador ven solo lo suyo.", "PRO"],
    ],
  },
  {
    titulo: "03 · El negocio",
    funciones: [
      ["El Marcador", "Cuánto entra, cuántos se quedan, cuántos se van.", "PRO"],
      ["Quién se te va", "Avisa qué socios llevan 14 días sin venir.", "PRO"],
      ["Lo que dicen tus socios", "Opiniones desde el portal, para que las leas tú.", "PRO"],
    ],
  },
  {
    titulo: "04 · Para tus socios",
    funciones: [
      ["Su QR", "Cada socio tiene el suyo, en el celular.", "STARTER"],
      ["Su portal", "Su membresía, sus clases, sus recibos y su congelación, sin preguntarte.", "PRO"],
    ],
  },
];

export const SELLOS = ["Sin límite de socios", "Sin instalación", "Sin equipo especial para el QR"];

// Filas de la tabla de planes: [rótulo, Starter, Pro]. Escala va aparte
// (ESCALA, abajo), junto a la tabla.
export const FILAS_PLANES = [
  ["Para quién", "Un local, una persona en el mostrador.", "Mostrador con equipo, clases y portal para tus socios."],
  [
    "Incluye",
    "01 El mostrador y el QR de cada socio.",
    "Todo Starter, más 02 La operación, 03 El negocio y el portal de tus socios.",
  ],
  ["Soporte", "Por WhatsApp, en 48 horas.", "Por WhatsApp, en 24 horas."],
];

export const PREGUNTAS = [
  ["¿Tengo que instalar algo?", "No. Boaz se abre en el navegador de tu computadora, tableta o celular."],
  ["¿Cuántos socios puedo tener?", "Los que quieras. Ningún plan tiene límite."],
  ["¿Puedo pasar mis socios desde Excel?", "Sí. Descargas la plantilla, la llenas e importas a todos de una vez."],
  [
    "¿Necesito un lector o un torniquete?",
    "No. La entrada se registra a mano, con el QR del socio o con un kiosco en una tableta.",
  ],
  [
    "¿Mis datos se mezclan con los de otro gimnasio?",
    "No. Cada gimnasio ve solo lo suyo; lo probamos antes de abrir Boaz.",
  ],
  [
    "¿Qué pasa cuando termina la prueba?",
    "Eliges tu plan y sigues con todo lo que cargaste. Como no dejaste tarjeta, no se cobra nada si no sigues.",
  ],
];

// Escala (docs/textos.md § "Boaz · lote 21"): solo en /boaz, como
// "Próximamente"; no se puede contratar. Las cifras salen de precios.js y el
// estado de app/lib/boaz-lanzamiento.js.
export const ESCALA = {
  pildora: {
    desarrollo: "PRÓXIMAMENTE · EN DESARROLLO",
    pruebas: "PRÓXIMAMENTE · EN PRUEBAS EN UN GIMNASIO REAL",
  },
  nombre: "Escala",
  frase: "El sistema trabaja y te avisa.",
  intro: "Escala incluye todo Pro, y además:",
  puntos: [
    "WhatsApp con recordatorios y avisos automáticos: vencimiento, socio que dejó de venir y recibos.",
    "Bandeja de WhatsApp para contestar a tus socios.",
    "Alertas para el dueño.",
    "Nutrición en el portal del socio.",
    "Soporte en 4 horas hábiles si el sistema no cobra o no deja entrar.",
    "Una llamada cada trimestre.",
  ],
  boton: "Avísame cuando salga",
  nota: "TODAVÍA NO SE PUEDE CONTRATAR · SE ABRE WHATSAPP",
  mensaje: "Hola Carlos, quiero que me avises cuando salga Boaz Escala.",
};

// Programa Fundadores (lote 21): voz de Carlos, en primera persona. Las cifras
// salen de precios.js y el total de lugares de app/lib/boaz-lanzamiento.js.
export const FUNDADORES = {
  etiqueta: "PROGRAMA FUNDADORES",
  titulo: `${TOTAL_FUNDADORES} gimnasios fundadores.`,
  intro: "Busco cinco gimnasios para hacer crecer Boaz con ellos.",
  plazo: `AL MES · FIJO ${BOAZ_FUNDADOR.meses} MESES`,
  enVezDe: `EN VEZ DE ${BOAZ.pro.mes} · ${IVA.toUpperCase()}`,
  puntos: [
    `Pro a ${BOAZ_FUNDADOR.mes} al mes, fijo ${BOAZ_FUNDADOR.meses} meses, en vez de ${BOAZ.pro.mes}. ${IVA}.`,
    "Escala gratis 6 meses, desde el día que se active.",
    "Yo cargo a tus socios y dejo todo listo.",
    "Si en el primer mes no te sirve, te devuelvo tu dinero.",
    "Línea directa conmigo. Los fundadores opinan primero sobre lo que sigue, en la llamada mensual.",
  ],
  aCambio: "A CAMBIO ·",
  aCambioTexto:
    "pagas desde el primer mes, me das tu opinión y tu testimonio, y apareces como gimnasio fundador. Si cancelas, pierdes el precio de fundador.",
  boton: "Quiero ser fundador",
  nota: "SE ABRE WHATSAPP CON CARLOS",
  mensaje: "Hola Carlos, quiero ser fundador de Boaz. Mi gimnasio es: ",
  sinLugares: `Los ${TOTAL_FUNDADORES} lugares ya tienen dueño.`,
  registro: "Registra tu gimnasio",
};
