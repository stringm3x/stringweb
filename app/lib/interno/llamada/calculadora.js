import { llenar } from "./llenar";

// La calculadora de "su número" (lote 25). Pura y sin contenido: la usan los
// componentes de cliente con la `cuenta` de la ficha y los textos del guion,
// que llegan como props. Solo cuenta lo que Carlos capturó: un campo vacío no
// suma, y una partida "lo dijo" solo cuenta con la casilla marcada.
//
// - "mes": se suma al mes y se multiplica ×12 para el año.
// - "deuda": va aparte ("hoy te deben"); ni al mes ni ×12 (decisión del 25 nov).
// - "texto": lo que cuente, sin monto.
// Horas: la frase lleva las que Carlos capturó (× personas en desarrolladoras
// y B2B, sin ×4); el desglose, las del mes.

export const SEMANAS_POR_MES = 4;
export const MESES_POR_ANO = 12;
const CIEN = 100;

// "1,200", "6.5", con o sin signo de pesos → número; vacío o basura → null.
export function numero(valor) {
  const texto = String(valor ?? "").replace(/[$,\s%]/g, "");
  if (!texto) return null;
  const n = Number(texto);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

const producto = (ids, entradas) => {
  const valores = ids.map((id) => numero(entradas[id]));
  return valores.some((v) => v === null) ? null : valores.reduce((a, b) => a * b, 1);
};

export function calcular(cuenta, entradas = {}) {
  const partidas = [];
  for (const p of cuenta.partidas) {
    if (p.tipo === "texto") {
      const texto = String(entradas[p.factores[0]] ?? "").trim();
      if (texto) partidas.push({ id: p.id, nombre: p.nombre, tipo: "texto", texto });
      continue;
    }
    if (p.requiere && entradas[p.requiere] !== true) continue;
    if (p.siNo && partidas.some((q) => q.id === p.siNo)) continue;
    let monto = producto(p.factores, entradas);
    if (monto === null) continue;
    if (p.porcentaje) monto /= CIEN;
    if (p.porSemana) monto *= SEMANAS_POR_MES;
    partidas.push({ id: p.id, nombre: p.nombre, tipo: p.tipo, monto: Math.round(monto) });
  }

  const suma = (tipo) => partidas.filter((p) => p.tipo === tipo).reduce((a, p) => a + p.monto, 0);
  const alMes = suma("mes");
  const { horas } = cuenta;
  const horasFrase = producto(horas.frase, entradas);
  const horasMes = producto(horas.mes, entradas);

  return {
    partidas,
    alMes,
    alAno: alMes * MESES_POR_ANO,
    deuda: suma("deuda"),
    horas: {
      frase: horasFrase,
      unidad: horas.unidad,
      mes: horasMes === null ? null : horasMes * (horas.porSemana ? SEMANAS_POR_MES : 1),
    },
  };
}

const PESOS = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
const HORAS = new Intl.NumberFormat("es-MX", { maximumFractionDigits: 1 });
export const pesos = (n) => PESOS.format(n);
export const horas = (n) => HORAS.format(n);

// El cuerpo de "su número": "más o menos $X al mes y unas Y horas tuyas a la
// semana", con ", y hoy te deben unos $Z" si hay deuda. Lo que falta no sale;
// sin nada capturado, null. Lo usan la frase, el "Te digo lo que escuché" y
// el resumen.
export function cuerpoNumero(resultado, textos) {
  const partes = [];
  if (resultado.alMes > 0) partes.push(llenar(textos.dinero, { monto: pesos(resultado.alMes) }));
  if (resultado.horas.frase > 0) {
    partes.push(llenar(textos.horas, { horas: horas(resultado.horas.frase), unidad: textos.unidades[resultado.horas.unidad] }));
  }
  const conDeuda = resultado.deuda > 0;
  if (!partes.length && !conDeuda) return null;
  const cuerpo = partes.join(textos.y);
  if (!conDeuda) return cuerpo;
  const monto = pesos(resultado.deuda);
  return partes.length ? cuerpo + llenar(textos.deuda, { monto }) : llenar(textos.deudaSola, { monto });
}

// "O sea, más o menos $X al mes y unas Y horas tuyas a la semana. ¿Así lo
// ves?" (aprobada el 25 nov, también con datos incompletos).
export function fraseNumero(resultado, textos) {
  const cuerpo = cuerpoNumero(resultado, textos);
  return cuerpo ? `${textos.inicio}${cuerpo}${textos.cierre}` : null;
}
