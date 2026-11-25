import { formatoDia } from "../fechas";
import { llenar } from "../llamada/llenar";
import { giroPorId } from "./flujo";
import { conBoceto } from "./nivel";

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
//
// Lote 25: los textos y los precios llegan en `c` = { contenido, ofertas }
// (CONTENIDO_DIAGNOSTICO y ofertas.js, por props desde el servidor); este
// archivo no los importa, así que no van en el JS del cliente.

// formatoDia vive en app/lib/interno/fechas.js desde el lote 25.
export { formatoDia };

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
  if (pregunta.problemaConDicho) {
    const dijo = limpio(r.valor);
    return dijo ? conNota(llenar(pregunta.problema, { dijo }), r.nota) : null;
  }
  return pregunta.problemaCon?.includes(r.valor) ? conNota(pregunta.problema, r.nota) : null;
}

// Las P con problema, en sus palabras: la del giro, P1 y P2. Máximo 3.
export function problemas({ prospecto, respuestas = {} }, { contenido }) {
  const giro = giroPorId(contenido, prospecto?.giro);
  const lista = [
    giro && problemaDe(giro, respuestas.pGiro),
    problemaDe(contenido.COMUNES.p1, respuestas.p1),
    problemaDe(contenido.COMUNES.p2, respuestas.p2),
  ];
  return lista.filter(Boolean).slice(0, 3);
}

// Lo que dijo que le cuesta: la I del giro y la común, tal cual.
export function loQueLeCuesta({ respuestas = {} }) {
  return [respuestas.iGiro?.valor, respuestas.i?.valor].map(limpio).filter(Boolean).join("; ");
}

function lineaCierre(siguiente, CIERRES) {
  const cierre = CIERRES[siguiente?.tipo];
  if (!cierre) return CIERRES.ninguno;
  const dia = formatoDia(siguiente.dia);
  return dia ? llenar(cierre.conDia, { dia }) : cierre.sinDia;
}

const parrafos = (...bloques) =>
  bloques
    .map((b) => (Array.isArray(b) ? b.filter(Boolean).join("\n") : b))
    .filter(Boolean)
    .join("\n\n");

function resumenGeneral(estado, c) {
  const { contenido, ofertas } = c;
  const T = contenido.RESUMEN.general;
  const { prospecto = {}, respuestas = {}, nivel, boceto, siguiente } = estado;
  const nombre = limpio(prospecto.nombre);
  const negocio = limpio(prospecto.negocio) || T.tuNegocio;
  const oferta = ofertas[nivel];
  const lista = problemas(estado, c).map((p) => `- ${p}`);
  const cuesta = loQueLeCuesta(estado);
  if (cuesta) lista.push(llenar(T.teCuesta, { cuesta: conPunto(cuesta) }));

  const urge = contenido.N_OPCIONES.find((o) => o.texto === respuestas.n?.valor)?.resumen;
  const datosNivel = { nivel: contenido.NOMBRES[nivel], linea: contenido.LINEA_NIVEL[nivel] };
  const sugiero = urge ? llenar(T.urge, { urge, ...datosNivel }) : llenar(T.sugiero, datosNivel);
  const precio =
    nivel === "empresa"
      ? T.precioEmpresa
      : llenar(T.precio, { desde: oferta.desde, continuidad: oferta.continuidad.desde });

  let textoBoceto = null;
  if (boceto && conBoceto(nivel, ofertas)) {
    textoBoceto = llenar(nivel === "empresa" ? T.bocetoEmpresa : T.boceto, { boceto: oferta.boceto });
  }

  return parrafos(
    nombre ? llenar(T.holaCon, { nombre }) : T.holaSin,
    lista.length ? [llenar(T.teDejo, { negocio }), ...lista] : null,
    [sugiero, precio],
    textoBoceto,
    lineaCierre(siguiente, contenido.CIERRES),
    T.firma,
  );
}

function resumenGimnasio(estado, c) {
  const T = c.contenido.RESUMEN.gimnasio;
  const { prospecto = {}, respuestas = {}, fundador, siguiente } = estado;
  const nombre = limpio(prospecto.nombre);
  const gimnasio = limpio(prospecto.negocio) || T.tuGimnasio;
  const { mes, fundador: precioFundador } = c.ofertas.boaz;
  // El problema principal: la P de gimnasio; si no lo es, la nota que haya.
  const principal = problemas(estado, c)[0] || limpio(respuestas.pGiro?.nota);
  const dia = formatoDia(siguiente?.dia);

  return parrafos(
    nombre ? llenar(T.holaCon, { nombre }) : T.holaSin,
    principal ? [llenar(T.meQuedo, { gimnasio, principal: conPunto(minuscula(principal)) }), T.loResuelve] : null,
    [T.prueba, dia ? llenar(T.diaCon, { dia }) : T.diaSin],
    [
      llenar(T.proCuesta, { mes }),
      fundador ? llenar(T.fundador, { mes: precioFundador.mes, meses: precioFundador.meses }) : null,
    ],
    T.registro,
    T.firma,
  );
}

export function armarResumen(estado, c) {
  return estado?.prospecto?.giro === "gimnasio" ? resumenGimnasio(estado, c) : resumenGeneral(estado, c);
}

// Datos para la propuesta, para copiar. Empresa no lleva su mínimo.
export function datosPropuesta(estado, c) {
  const { contenido, ofertas } = c;
  const T = contenido.RESUMEN.datos;
  const { prospecto = {}, nivel, boceto, fundador, siguiente } = estado;
  const giro = giroPorId(contenido, prospecto.giro);
  const oferta = ofertas[nivel];
  const negocio = [limpio(prospecto.negocio), giro?.nombre].filter(Boolean).join(" · ");
  const nombreNivel = contenido.NOMBRES[nivel];

  let lineaNivel = null;
  if (nivel === "boaz") {
    lineaNivel =
      llenar(T.nivelBoaz, { nivel: nombreNivel, mes: oferta.mes }) +
      (fundador ? llenar(T.fundador, { mes: oferta.fundador.mes, meses: oferta.fundador.meses }) : "");
  } else if (oferta) {
    lineaNivel = oferta.desde
      ? llenar(T.nivelDesde, { nivel: nombreNivel, desde: oferta.desde })
      : llenar(T.nivelCotiza, { nivel: nombreNivel });
  }

  const lista = problemas(estado, c);
  const cuesta = loQueLeCuesta(estado);
  const dia = formatoDia(siguiente?.dia);

  return [
    negocio && llenar(T.negocio, { negocio }),
    limpio(prospecto.nombre) && llenar(T.dueno, { nombre: limpio(prospecto.nombre) }),
    lineaNivel,
    oferta?.continuidad && llenar(T.continuidad, oferta.continuidad),
    conBoceto(nivel, ofertas) && (boceto ? llenar(T.bocetoSi, { boceto: oferta.boceto }) : T.bocetoNo),
    lista.length && `${T.problemas}\n${lista.map((p) => `- ${p}`).join("\n")}`,
    cuesta && llenar(T.cuesta, { cuesta }),
    siguiente?.tipo && (dia ? llenar(T.siguienteDia, { tipo: siguiente.tipo, dia }) : llenar(T.siguiente, { tipo: siguiente.tipo })),
    prospecto.origen && llenar(T.origen, { origen: prospecto.origen }),
  ]
    .filter(Boolean)
    .join("\n");
}
