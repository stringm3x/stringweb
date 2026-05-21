// ─── Fricciones detectadas ────────────────────────────────────────────────────
// Severidad: hi (rojo) | me (amarillo) | lo (verde)

// Evalúa las respuestas y devuelve array de fricciones detectadas
export const detectarFricciones = (respuestas, flow) => {
  const fricciones = [];

  if (flow === "servicios") {
    const {
      quien,
      respuesta,
      registro,
      conversion,
      pagos,
      agenda,
      seguimiento,
    } = respuestas;

    // ── Captación ────────────────────────────────────────────────────────────
    if (quien === "dueno") {
      fricciones.push({
        severidad: "hi",
        area: "Captación",
        titulo: "El dueño atiende todos los mensajes",
        descripcion:
          "El negocio se detiene cuando el dueño no está disponible. Un solo punto de falla para todos los prospectos.",
      });
    }

    if (quien === "nadie") {
      fricciones.push({
        severidad: "hi",
        area: "Captación",
        titulo: "Sin responsable definido",
        descripcion:
          "Los prospectos caen en un vacío sin atención consistente. No hay sistema — hay suerte.",
      });
    }

    if (respuesta === "nadie" || respuesta === "dia") {
      fricciones.push({
        severidad: "hi",
        area: "Captación",
        titulo: "Tiempo de respuesta crítico",
        descripcion:
          "El 50% de los prospectos pierde interés después de 30 minutos sin respuesta. Responder al día siguiente es perder el lead.",
      });
    }

    if (respuesta === "horas") {
      fricciones.push({
        severidad: "me",
        area: "Captación",
        titulo: "Respuesta lenta",
        descripcion:
          "1 a 4 horas de espera reduce significativamente la tasa de conversión. El prospecto ya consultó con la competencia.",
      });
    }

    if (registro === "nada" || registro === "papel") {
      fricciones.push({
        severidad: "hi",
        area: "Captación",
        titulo: "Sin registro de prospectos",
        descripcion:
          "Los leads no convertidos desaparecen para siempre. No hay forma de hacer seguimiento ni de saber cuántos se pierden.",
      });
    }

    if (conversion !== undefined && Number(conversion) <= 2) {
      fricciones.push({
        severidad: "hi",
        area: "Captación",
        titulo: "Tasa de conversión muy baja",
        descripcion: `Solo ${conversion} de cada 10 prospectos convierte. Hay fricción estructural en el proceso de cierre — no es un problema de demanda.`,
      });
    } else if (conversion !== undefined && Number(conversion) <= 4) {
      fricciones.push({
        severidad: "me",
        area: "Captación",
        titulo: "Tasa de conversión mejorable",
        descripcion: `${conversion} de cada 10 prospectos convierte. Con seguimiento automatizado este número puede duplicarse.`,
      });
    }

    // ── Operación ────────────────────────────────────────────────────────────
    if (pagos === "memoria" || pagos === "papel") {
      fricciones.push({
        severidad: "me",
        area: "Operación",
        titulo: "Control de pagos sin sistema",
        descripcion:
          "Riesgo real de fugas de ingreso y errores operativos. Sin registro centralizado, es imposible saber el estado financiero real.",
      });
    }

    if (agenda === "manual") {
      fricciones.push({
        severidad: "me",
        area: "Operación",
        titulo: "Agenda manual",
        descripcion:
          "Genera cancelaciones, dobles reservas y tiempo administrativo innecesario. Cada cita coordinada a mano es una oportunidad de error.",
      });
    }

    if (agenda === "no") {
      fricciones.push({
        severidad: "me",
        area: "Operación",
        titulo: "Sin agenda estructurada",
        descripcion:
          "Sin sistema de citas, la capacidad del negocio queda invisible para los prospectos. Se pierden clientes que no saben cómo agendar.",
      });
    }

    if (seguimiento === "no") {
      fricciones.push({
        severidad: "me",
        area: "Captación",
        titulo: "Sin seguimiento a prospectos",
        descripcion:
          "El 60% de los cierres ocurre después del primer contacto. Sin seguimiento, esas oportunidades se pierden con el tiempo.",
      });
    }
  }

  if (flow === "ecommerce") {
    const {
      "pago-online": pagoOnline,
      inventario,
      "gestion-pedidos": gestionPedidos,
      "canal-eco": canalEco,
    } = respuestas;

    if (pagoOnline === "no") {
      fricciones.push({
        severidad: "hi",
        area: "Ventas",
        titulo: "Sin pago en línea",
        descripcion:
          "Cada venta depende de confirmación manual. El cliente abandona el proceso si no puede pagar de inmediato.",
      });
    }

    if (inventario === "memoria" || inventario === "papel") {
      fricciones.push({
        severidad: "hi",
        area: "Operación",
        titulo: "Inventario sin sistema",
        descripcion:
          "Errores de pedido y ventas de productos agotados. Cada error daña la reputación y genera devoluciones.",
      });
    }

    if (gestionPedidos === "manual") {
      fricciones.push({
        severidad: "me",
        area: "Operación",
        titulo: "Gestión de pedidos manual",
        descripcion:
          "No escala con el volumen. En temporadas altas, el proceso colapsa y los errores se multiplican.",
      });
    }

    if (canalEco === "meli" || canalEco === "mixto") {
      fricciones.push({
        severidad: "me",
        area: "Ventas",
        titulo: "Dependencia de marketplace",
        descripcion:
          "Comisiones altas y sin control de la relación con el cliente. Si MercadoLibre cambia sus reglas, el negocio sufre.",
      });
    }
  }

  if (flow === "menu") {
    const { menu, pedidos, reactivacion } = respuestas;

    if (menu === "fisico" || menu === "foto") {
      fricciones.push({
        severidad: "hi",
        area: "Operación",
        titulo: "Sin menú digital",
        descripcion:
          "Sin menú digital no hay pedidos a distancia. El negocio pierde todo el canal de delivery y pedidos anticipados.",
      });
    }

    if (pedidos === "mostrador" || pedidos === "whatsapp") {
      fricciones.push({
        severidad: "me",
        area: "Operación",
        titulo: "Pedidos sin estructura",
        descripcion:
          "Se pierden órdenes en hora pico. Sin sistema, cada pedido es un punto de error potencial.",
      });
    }

    if (reactivacion === "no") {
      fricciones.push({
        severidad: "me",
        area: "Marketing",
        titulo: "Sin reactivación de clientes",
        descripcion:
          "Sin reactivación, el negocio depende siempre de clientes nuevos. Los clientes existentes son el activo más barato para reactivar.",
      });
    }
  }

  // Ordenar: hi primero, luego me, luego lo
  const orden = { hi: 0, me: 1, lo: 2 };
  return fricciones.sort((a, b) => orden[a.severidad] - orden[b.severidad]);
};

// Helper: color por severidad
export const colorSeveridad = {
  hi: {
    bg: "bg-red/10",
    border: "border-red/30",
    text: "text-red",
    label: "Crítico",
  },
  me: {
    bg: "bg-yellow/10",
    border: "border-yellow/30",
    text: "text-yellow",
    label: "Importante",
  },
  lo: {
    bg: "bg-green/10",
    border: "border-green/30",
    text: "text-green",
    label: "Menor",
  },
};
