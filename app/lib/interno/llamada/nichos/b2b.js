import { PLATAFORMAS_BARATAS } from "./comunes";

// Ficha · B2B, distribuidoras y proveedores (lote 25, aprobada por Carlos el
// 25 nov). Literal del prompt del lote 25. Forma de `cuenta`: ver
// academias.js.

export const B2B = {
  id: "b2b",
  nombre: "B2B",
  detalle: "Distribuidoras y proveedores",
  filtro: "10+ empleados, vende a otras empresas, manda cotizaciones, tiene reparto o crédito.",
  situacion: {
    todos: [
      "¿A qué tipo de empresas les vendes y cuántos clientes activos tienes?",
      "¿Cuántos vendedores y cuántas camionetas de reparto?",
      "¿Cómo te llegan los pedidos?",
      "¿Cómo haces las cotizaciones y dónde tienes tus listas de precios?",
      "¿Das crédito?",
    ],
    sin: ["¿Dónde llevas pedidos, inventario y lo que te deben?"],
    uno: [
      "¿Qué usas y cuánto pagas?",
      "¿Qué va por fuera: cotizaciones, pedidos, entregas, cobranza?",
      "¿Te deja exportar tus datos?",
    ],
    unoNota: "Solo factura o contable",
    varios: ["¿Cuáles usas y para qué cada uno?", "¿Dónde capturas lo mismo dos veces?"],
  },
  problema: [
    "¿Se te quedan cotizaciones sin seguimiento?",
    "¿Te ha pasado venderle al mismo cliente a precios distintos?",
    "¿Tus clientes te preguntan dónde va su pedido?",
    "¿Cómo va tu cartera vencida?",
  ],
  implicacion: [
    "¿Cuántas cotizaciones mandas al mes y cuántas se cierran?",
    "¿De cuánto es una venta promedio?",
    "¿Cuánto tienes hoy en cartera vencida?",
    "¿Cuántas horas a la semana se van en capturar pedidos?",
  ],
  cuenta: {
    campos: [
      {
        id: "dijoCotizaciones",
        etiqueta: "Él lo dijo: se pierden cotizaciones por falta de seguimiento",
        tipo: "casilla",
      },
      { id: "cotizaciones", etiqueta: "Cotizaciones que cree que se pierden al mes", tipo: "numero" },
      { id: "venta", etiqueta: "Venta promedio", tipo: "pesos" },
      { id: "cartera", etiqueta: "Cartera vencida", tipo: "pesos" },
      { id: "horas", etiqueta: "Horas a la semana por persona en capturar", tipo: "numero" },
      { id: "personas", etiqueta: "Personas que capturan", tipo: "numero" },
      { id: "erroresPrecio", etiqueta: "Errores de precio: lo que él cuente", tipo: "texto" },
    ],
    partidas: [
      {
        id: "cotizaciones",
        nombre: "Cotizaciones perdidas",
        tipo: "mes",
        factores: ["cotizaciones", "venta"],
        requiere: "dijoCotizaciones",
      },
      { id: "cartera", nombre: "Cartera", tipo: "deuda", factores: ["cartera"] },
      { id: "erroresPrecio", nombre: "Errores de precio", tipo: "texto", factores: ["erroresPrecio"] },
    ],
    horas: { frase: ["horas", "personas"], unidad: "equipoSemana", mes: ["horas", "personas"], porSemana: true },
  },
  // resumen: cómo se dice en el resumen, tras "lo que más quieres es…" (aprobado el 25 nov).
  prioridades: [
    {
      id: "cotizar", nombre: "cotizar y dar seguimiento", pantalla: "Cotizador con precio por cliente",
      resumen: "que ninguna cotización se quede sin seguimiento",
    },
    {
      id: "pedidos", nombre: "los pedidos", pantalla: "Portal de pedidos con “Repetir pedido”",
      resumen: "que tus clientes repitan su pedido sin esperar a nadie",
    },
    {
      id: "entregas", nombre: "las entregas", pantalla: "Entregas en el mapa con foto y firma",
      resumen: "saber dónde va cada entrega",
    },
    {
      id: "cobranza", nombre: "la cobranza", pantalla: "Cuentas por cobrar",
      resumen: "cobrar a tiempo tu cartera",
    },
    {
      id: "saber", nombre: "saber cómo va", pantalla: "Panel de ventas y margen",
      resumen: "saber cuánto vendes y cuánto ganas",
    },
  ],
  niveles: {
    porDefecto: "controla",
    reglas: [
      {
        nivel: "empresa",
        regla: "Tiene varias bodegas, equipo grande o necesita conectarse a fondo con su sistema contable",
      },
    ],
  },
  objeciones: [
    {
      dice: "Mis clientes están acostumbrados a pedir por WhatsApp",
      respuesta:
        "Pueden seguir; el portal es para que repitan su pedido sin esperar a nadie. Empezamos con tus clientes que más piden.",
    },
    { dice: "Ya tengo mi sistema de facturación", respuesta: "Qué bueno. ¿Qué sigues haciendo por fuera de él?" },
    PLATAFORMAS_BARATAS,
    {
      dice: "Lo tengo que ver con mi socio o con dirección",
      respuesta: "Claro. ¿Pueden estar en la presentación de la propuesta?",
    },
    {
      dice: "Es mucho dinero ahorita",
      respuesta: "Hagamos la cuenta con tu cartera vencida y las cotizaciones que se te van.",
      nota: "Si es flujo: meses con tarjeta (el plan mensual no aplica en Controla).",
    },
    {
      dice: "¿Y si se cae el sistema y no puedo surtir?",
      respuesta: "Te garantizo que funcione: si el sistema no cobra o no deja entrar, lo atiendo en 4 horas hábiles.",
    },
  ],
};
