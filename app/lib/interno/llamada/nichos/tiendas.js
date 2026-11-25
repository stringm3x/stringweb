import { PLATAFORMAS_BARATAS } from "./comunes";

// Ficha · Tiendas con local y en línea (lote 25, aprobada por Carlos el 25
// nov). Literal del prompt del lote 25. Forma de `cuenta`: ver academias.js.
// Las horas se capturan al día: la frase dice "horas tuyas al día" y el
// desglose, horas al día × días que abre al mes.

export const TIENDAS = {
  id: "tiendas",
  nombre: "Tiendas",
  detalle: "Con local y en línea",
  filtro:
    "Ya vende en línea o en redes, tiene local o varios canales, le cuesta el inventario, los pedidos o el corte. Si apenas va a empezar a vender en línea, no es cliente.",
  situacion: {
    todos: [
      "¿Qué vendes y cuántos productos manejas, con tallas o variantes?",
      "¿Por dónde vendes: local, tienda en línea, Instagram, WhatsApp?",
      "¿Cuántas personas atienden?",
      "¿Cómo apartan tus clientes?",
    ],
    sin: ["¿Dónde llevas el inventario y las ventas de cada canal?", "¿Cómo haces el corte?"],
    uno: [
      "¿Qué usas en línea y en el local, y cuánto pagas?",
      "¿Cómo cuadras los dos inventarios?",
      "¿Te deja exportar tus datos?",
    ],
    unoNota: "Tienda en línea que no se habla con la caja",
    varios: ["¿Cuáles usas y para qué cada uno?", "¿Dónde capturas lo mismo dos veces?"],
  },
  problema: [
    "¿Te ha pasado vender en línea algo que ya no tenías?",
    "¿Te apartan por mensaje y no recogen?",
    "¿Te cuadra el corte?",
    "¿Sabes qué se vende más y por qué canal?",
  ],
  implicacion: [
    "¿Cuántos pedidos se cancelan a la semana porque ya no había existencia?",
    "¿De cuánto es tu ticket promedio?",
    "¿Cuánto tiempo al día se te va en cuadrar?",
    "¿Cuántos apartados se quedan sin recoger al mes?",
  ],
  cuenta: {
    campos: [
      { id: "cancelados", etiqueta: "Pedidos cancelados a la semana", tipo: "numero" },
      { id: "ticket", etiqueta: "Ticket promedio", tipo: "pesos" },
      { id: "apartados", etiqueta: "Apartados sin recoger: lo que él cuente", tipo: "texto" },
      { id: "horasDia", etiqueta: "Horas al día cuadrando", tipo: "numero" },
      { id: "dias", etiqueta: "Días que abre al mes", tipo: "numero" },
    ],
    partidas: [
      {
        id: "cancelados",
        nombre: "Pedidos cancelados",
        tipo: "mes",
        factores: ["cancelados", "ticket"],
        porSemana: true,
      },
      { id: "apartados", nombre: "Apartados sin recoger", tipo: "texto", factores: ["apartados"] },
    ],
    horas: { frase: ["horasDia"], unidad: "tuyasDia", mes: ["horasDia", "dias"], porSemana: false },
  },
  prioridades: [
    { id: "inventario", nombre: "el inventario", pantalla: "Un solo inventario por talla" },
    { id: "corte", nombre: "el corte", pantalla: "Punto de venta y corte" },
    { id: "apartados", nombre: "los apartados", pantalla: "Apartados con link y fecha límite" },
    { id: "pedidos", nombre: "los pedidos", pantalla: "Pedidos con envío o recoger en tienda" },
    { id: "saber", nombre: "saber qué vende", pantalla: "Panel por canal" },
  ],
  niveles: {
    porDefecto: "controla",
    reglas: [{ nivel: "empresa", regla: "Tiene varias sucursales o una tienda grande" }],
  },
  objeciones: [
    { ...PLATAFORMAS_BARATAS, dice: "Hay plataformas mucho más baratas", nota: "Si solo quiere lo básico barato, no es tu cliente." },
    { dice: "Ya tengo mi tienda en línea", respuesta: "Qué bueno. ¿Se habla con la caja de tu local?" },
    { dice: "Lo veo con mi socio", respuesta: "Claro. ¿Puede estar en la presentación de la propuesta?" },
    {
      dice: "Es mucho para una tienda",
      respuesta: "Hagamos la cuenta con los pedidos que se te cancelan.",
      nota: "Si es flujo: meses con tarjeta.",
    },
    {
      dice: "Me da miedo pasar todo mi inventario",
      respuesta: "Primero vemos si tu tienda en línea deja exportar, y lo que se pasa queda escrito en el alcance.",
    },
  ],
};
