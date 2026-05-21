// ─── Lógica de recomendación ──────────────────────────────────────────────────

export const calcularTier = (respuestas, flow, scoreOp, scoreCapt) => {
  if (flow === "servicios") {
    const suc = Number(respuestas.suc) || 1;
    const agenda = respuestas.agenda;

    if (suc >= 4) return "multi";
    if (agenda === "manual" || scoreOp < 50 || scoreCapt < 50) return "agenda";
    return "base";
  }

  if (flow === "ecommerce") {
    const pagoOnline = respuestas["pago-online"];
    const catalogo = Number(respuestas.catalogo) || 0;
    const gestionPedidos = respuestas["gestion-pedidos"];
    const volumen = Number(respuestas.volumen) || 0;

    if (pagoOnline === "no" && catalogo <= 30 && gestionPedidos === "manual")
      return "eco1";

    if (gestionPedidos === "sistema" || catalogo > 100 || volumen > 60)
      return "eco3";

    return "eco2";
  }

  if (flow === "menu") {
    const prioridad = respuestas.prioridad;
    const domicilio = respuestas.domicilio;
    const volumen = Number(respuestas.volumen) || 0;
    const reactivacion = respuestas.reactivacion;

    if (
      prioridad === "todo" ||
      (domicilio === "propio" && volumen > 40) ||
      reactivacion !== "no"
    )
      return "rest3";

    if (prioridad === "pedidos" || domicilio !== "no") return "rest2";

    return "rest1";
  }

  return "base";
};
