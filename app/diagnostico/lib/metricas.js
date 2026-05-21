// ─── Métricas de negocio ──────────────────────────────────────────────────────

export const calcularMetricas = (respuestas, flow, ticket) => {
    const t = Number(ticket) || 0;
  
    if (flow === "servicios") {
      const volumen = Number(respuestas.volumen) || 0;
      const conversion = Number(respuestas.conversion) || 0;
      const convRate = conversion * 10; // porcentaje
      const perdMes = Math.round(volumen * (1 - conversion / 10)) * 4;
      const perdAnual = perdMes * t * 12;
  
      return {
        convRate,
        perdMes,
        perdAnual,
        volumenSemanal: volumen,
        label: "prospectos perdidos/mes",
      };
    }
  
    if (flow === "ecommerce") {
      const volumen = Number(respuestas.volumen) || 0;
      const perdMes = Math.round(volumen * 0.3) * 4;
      const perdAnual = perdMes * t * 12;
  
      return {
        convRate: null,
        perdMes,
        perdAnual,
        volumenSemanal: volumen,
        label: "pedidos perdidos/mes (estimado 30%)",
      };
    }
  
    if (flow === "menu") {
      const volumen = Number(respuestas.volumen) || 0;
      const perdMes = Math.round(volumen * 0.15) * 30;
      const perdAnual = perdMes * t * 12;
  
      return {
        convRate: null,
        perdMes,
        perdAnual,
        volumenSemanal: null,
        volumenDiario: volumen,
        label: "pedidos perdidos/mes (estimado 15%)",
      };
    }
  
    return { perdAnual: 0, perdMes: 0 };
  };
  
  // Formatear número como moneda MXN
  export const formatMXN = (num) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);