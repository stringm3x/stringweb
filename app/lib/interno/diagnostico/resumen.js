import { CIERRES, COMUNES, LINEA_NIVEL, N_OPCIONES, giroPorId } from "./contenido";
import { NOMBRES, OFERTAS, conBoceto } from "./nivel";

// El resumen para WhatsApp y los datos para la propuesta (lote 20,
// docs/textos.md § Interno). Puro: recibe el estado de la herramienta y
// devuelve texto. Nada se calcula: lo que dijo el dueño va tal cual. Las
// líneas sin datos no salen.
//
// estado = {
//   prospecto: { nombre, negocio, whatsapp, giro, origen },
//   respuestas: { [id]: { valor, nota } },
//   nivel,                       // el elegido (sugerido o cambiado)
//   boceto, fundador,            // interruptores del paso 4
//   siguiente: { tipo, dia },    // "Llamada" | … ; "AAAA-MM-DD"
// }

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

// "2026-11-12" → "el jueves 12 de noviembre". En hora local: new Date(texto)
// lo leería en UTC y en México se correría un día.
export function formatoDia(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!m) return null;
  const fecha = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (fecha.getMonth() !== Number(m[2]) - 1) return null;
  return `el ${DIAS[fecha.getDay()]} ${fecha.getDate()} de ${MESES[fecha.getMonth()]}`;
}

export const digitos = (numero) => String(numero || "").replace(/\D/g, "");
export const whatsappCompleto = (numero) => digitos(numero).length === 10;

// https://wa.me/52<10 dígitos>?text=…; sin número completo, WhatsApp deja
// elegir el chat.
export function enlaceWhatsApp(numero, texto) {
  const destino = whatsappCompleto(numero) ? `52${digitos(numero)}` : "";
  return `https://wa.me/${destino}?text=${encodeURIComponent(texto)}`;
}

const limpio = (t) => (typeof t === "string" ? t.trim() : "");
const conPunto = (t) => (/[.!?…]$/.test(t) ? t : `${t}.`);
const minuscula = (t) => t.charAt(0).toLowerCase() + t.slice(1);

// La frase y la nota de Carlos: "Te dejan plantado sin avisar: los sábados".
function conNota(frase, nota) {
  const n = limpio(nota);
  return n ? `${frase.replace(/\.$/, "")}: ${n}` : frase;
}

function problemaDe(pregunta, r) {
  if (!r) return null;
  if (typeof pregunta.problema === "function") {
    const dijo = limpio(r.valor);
    return dijo ? conNota(pregunta.problema(dijo), r.nota) : null;
  }
  return pregunta.problemaCon?.includes(r.valor) ? conNota(pregunta.problema, r.nota) : null;
}

// Las P con problema, en sus palabras: la del giro, P1 y P2. Máximo 3.
export function problemas({ prospecto, respuestas = {} }) {
  const giro = giroPorId(prospecto?.giro);
  const lista = [
    giro && problemaDe(giro, respuestas.pGiro),
    problemaDe(COMUNES.p1, respuestas.p1),
    problemaDe(COMUNES.p2, respuestas.p2),
  ];
  return lista.filter(Boolean).slice(0, 3);
}

// Lo que dijo que le cuesta: la I del giro y la común, tal cual.
export function loQueLeCuesta({ respuestas = {} }) {
  return [respuestas.iGiro?.valor, respuestas.i?.valor].map(limpio).filter(Boolean).join("; ");
}

function lineaCierre(siguiente) {
  const cierre = CIERRES[siguiente?.tipo];
  if (!cierre) return CIERRES.ninguno;
  const dia = formatoDia(siguiente.dia);
  return dia ? cierre.conDia(dia) : cierre.sinDia;
}

const parrafos = (...bloques) =>
  bloques
    .map((b) => (Array.isArray(b) ? b.filter(Boolean).join("\n") : b))
    .filter(Boolean)
    .join("\n\n");

function resumenGeneral(estado) {
  const { prospecto = {}, respuestas = {}, nivel, boceto, siguiente } = estado;
  const nombre = limpio(prospecto.nombre);
  const negocio = limpio(prospecto.negocio) || "tu negocio";
  const oferta = OFERTAS[nivel];
  const lista = problemas(estado).map((p) => `- ${p}`);
  const cuesta = loQueLeCuesta(estado);
  if (cuesta) lista.push(`- Me comentaste que esto te cuesta ${conPunto(cuesta)}`);

  const urge = N_OPCIONES.find((o) => o.texto === respuestas.n?.valor)?.resumen;
  const sugiero = urge
    ? `Lo que más te urge es ${urge}. Para eso te sugiero ${NOMBRES[nivel]}: ${LINEA_NIVEL[nivel]}`
    : `Para lo que me contaste te sugiero ${NOMBRES[nivel]}: ${LINEA_NIVEL[nivel]}`;
  const precio =
    nivel === "empresa"
      ? "Por el tamaño, lo cotizo a tu medida después de mapear tus procesos. El cuidado mensual va incluido en la cotización."
      : `Arranca desde ${oferta.desde} con IVA incluido, y su cuidado mensual desde ${oferta.continuidad.desde}.`;

  let textoBoceto = null;
  if (boceto && conBoceto(nivel)) {
    textoBoceto =
      nivel === "empresa"
        ? `Para empezar, el primer paso es el boceto: el mapa de tus procesos y la primera pantalla. Cuesta ${oferta.boceto} con IVA incluido y se descuenta completo si decides seguir en los 30 días siguientes.`
        : `Para empezar sin arriesgar, el primer paso es el boceto: el mapa de cómo funciona tu negocio y la primera pantalla de tu sistema. Cuesta ${oferta.boceto} con IVA incluido y se descuenta completo si decides seguir en los 30 días siguientes.`;
  }

  return parrafos(
    `Hola${nombre ? `, ${nombre}` : ""}. Soy Carlos, de STRING. Gracias por el tiempo de hoy.`,
    lista.length ? [`Te dejo por escrito lo que platicamos de ${negocio}:`, ...lista] : null,
    [sugiero, precio],
    textoBoceto,
    lineaCierre(siguiente),
    "Carlos · STRING",
  );
}

function resumenGimnasio(estado) {
  const { prospecto = {}, respuestas = {}, fundador, siguiente } = estado;
  const nombre = limpio(prospecto.nombre);
  const gimnasio = limpio(prospecto.negocio) || "tu gimnasio";
  const { mes, fundador: precioFundador } = OFERTAS.boaz;
  // El problema principal: la P de gimnasio; si no lo es, la nota que haya.
  const principal = problemas(estado)[0] || limpio(respuestas.pGiro?.nota);
  const dia = formatoDia(siguiente?.dia);

  return parrafos(
    `Hola${nombre ? `, ${nombre}` : ""}. Soy Carlos, el creador de Boaz. Gracias por el tiempo de hoy.`,
    principal
      ? [
          `Me quedo con lo que me contaste de ${gimnasio}: ${conPunto(minuscula(principal))}`,
          "Eso es justo lo que Boaz resuelve: sabes cuánto entra, quién se te vence y quién dejó de venir.",
        ]
      : null,
    [
      "Te propongo probarlo 14 días con Pro completo, sin tarjeta. Yo te ayudo a cargar a tus socios para que lo veas con tus propios datos.",
      dia ? `¿Te queda bien ${dia} para dejarlo listo juntos?` : "¿Qué día te queda bien para dejarlo listo juntos?",
    ],
    [
      `Pro cuesta ${mes} al mes, IVA incluido.`,
      fundador
        ? `Como eres de los primeros 5 gimnasios, te queda en ${precioFundador.mes} al mes, fijo por ${precioFundador.meses} meses.`
        : null,
    ],
    "Si prefieres empezar por tu cuenta: stringwebs.com/gym/registro",
    "Carlos · Boaz by STRING",
  );
}

export function armarResumen(estado) {
  return estado?.prospecto?.giro === "gimnasio" ? resumenGimnasio(estado) : resumenGeneral(estado);
}

// Datos para la propuesta, para copiar. Empresa no lleva su mínimo.
export function datosPropuesta(estado) {
  const { prospecto = {}, nivel, boceto, fundador, siguiente } = estado;
  const giro = giroPorId(prospecto.giro);
  const oferta = OFERTAS[nivel];
  const negocio = [limpio(prospecto.negocio), giro?.nombre].filter(Boolean).join(" · ");

  let lineaNivel = null;
  if (nivel === "boaz") {
    lineaNivel = `Nivel: ${NOMBRES.boaz} · ${oferta.mes} al mes, IVA incluido${
      fundador ? ` · precio fundador ${oferta.fundador.mes} fijo ${oferta.fundador.meses} meses` : ""
    }`;
  } else if (oferta) {
    lineaNivel = `Nivel: ${NOMBRES[nivel]} · ${oferta.desde ? `desde ${oferta.desde}, IVA incluido` : "se cotiza"}`;
  }

  const lista = problemas(estado);
  const cuesta = loQueLeCuesta(estado);
  const dia = formatoDia(siguiente?.dia);

  return [
    negocio && `Negocio: ${negocio}`,
    limpio(prospecto.nombre) && `Dueño: ${limpio(prospecto.nombre)}`,
    lineaNivel,
    oferta?.continuidad && `Continuidad: ${oferta.continuidad.nombre}, desde ${oferta.continuidad.desde} al mes`,
    conBoceto(nivel) && `Boceto: ${boceto ? `sí, ${oferta.boceto}` : "no"}`,
    lista.length && `Problemas:\n${lista.map((p) => `- ${p}`).join("\n")}`,
    cuesta && `Le cuesta: ${cuesta}`,
    siguiente?.tipo && `Siguiente paso: ${siguiente.tipo}${dia ? `, ${dia}` : ""}`,
    prospecto.origen && `Cómo nos conoció: ${prospecto.origen}`,
  ]
    .filter(Boolean)
    .join("\n");
}
