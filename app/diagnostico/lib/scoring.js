// ─── Scoring ──────────────────────────────────────────────────────────────────

// Score de captación (0-100) — solo flow servicios
export const calcularScoreCaptacion = (respuestas) => {
  let score = 100;
  const { quien, respuesta, registro, conversion } = respuestas;

  if (quien === "nadie" || quien === "dueno") score -= 20;
  if (respuesta === "nadie" || respuesta === "dia") score -= 30;
  else if (respuesta === "horas") score -= 15;
  if (registro === "nada") score -= 30;
  else if (registro === "papel") score -= 18;
  else if (registro === "excel") score -= 8;
  if (Number(conversion) <= 2) score -= 15;
  else if (Number(conversion) <= 4) score -= 8;

  return Math.max(score, 5);
};

// Score de operación (0-100) — varía por flow
export const calcularScoreOperacion = (respuestas, flow) => {
  let score = 100;

  if (flow === "servicios") {
    const { pagos, agenda, seguimiento } = respuestas;
    if (pagos === "memoria") score -= 40;
    else if (pagos === "papel") score -= 30;
    else if (pagos === "excel") score -= 15;
    if (agenda === "no") score -= 10;
    else if (agenda === "manual") score -= 25;
    if (seguimiento === "no") score -= 20;
    else if (seguimiento === "aveces") score -= 8;
  }

  if (flow === "ecommerce") {
    const { inventario, "gestion-pedidos": gestionPedidos } = respuestas;
    if (inventario === "memoria") score -= 40;
    else if (inventario === "papel") score -= 30;
    else if (inventario === "excel") score -= 15;
    if (gestionPedidos === "manual") score -= 35;
    else if (gestionPedidos === "parcial") score -= 15;
  }

  if (flow === "menu") {
    const { pagos, reactivacion } = respuestas;
    if (pagos === "memoria") score -= 40;
    else if (pagos === "papel") score -= 25;
    if (reactivacion === "no") score -= 30;
    else if (reactivacion === "manual") score -= 12;
  }

  return Math.max(score, 5);
};

// Etiqueta del score
export const etiquetaScore = (score) => {
  if (score >= 80) return { label: "Saludable", color: "text-green" };
  if (score >= 55) return { label: "Mejorable", color: "text-yellow" };
  if (score >= 30) return { label: "En riesgo", color: "text-orange" };
  return { label: "Crítico", color: "text-red" };
};
