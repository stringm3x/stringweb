import { PLATAFORMAS_BARATAS } from "./comunes";

// Ficha · Desarrolladoras (lote 25, aprobada por Carlos el 25 nov). Literal
// del prompt del lote 25. La nota de Empresa (mapa de procesos y boceto) la
// arma la tarjeta de nivel con precios-interno.js: aquí no va ninguna cifra.
// Forma de `cuenta`: ver academias.js.

export const DESARROLLADORAS = {
  id: "desarrolladoras",
  nombre: "Desarrolladoras",
  filtro: "Preventa con plan de pagos propio, varios vendedores o brokers, más de una etapa.",
  situacion: {
    todos: [
      "¿Cuántos lotes o casas tiene el desarrollo y en cuántas etapas?",
      "¿Cuántos vendedores y brokers tienes?",
      "¿Cómo te llegan los prospectos?",
      "¿Cómo manejas el enganche y las mensualidades?",
    ],
    sin: [
      "¿Dónde llevas qué lote está disponible, apartado o vendido?",
      "¿Cómo sabes quién va al corriente?",
    ],
    uno: [
      "¿Qué usas y cuánto pagas?",
      "¿Maneja tus lotes, apartados y enganches, o eso va por fuera?",
      "¿Te deja exportar tus datos?",
    ],
    unoNota: "CRM genérico",
    varios: ["¿Cuáles usas y para qué cada uno?", "¿Dónde pasas datos a mano?"],
  },
  problema: [
    "¿Te ha pasado que se aparte dos veces el mismo lote?",
    "¿Se te atrasan las mensualidades?",
    "¿Los compradores te llaman para preguntar cuánto deben o cómo va su casa?",
    "¿Cómo calculas las comisiones?",
  ],
  implicacion: [
    "¿Cuánto cobras al mes entre enganches y mensualidades, y qué parte va atrasada?",
    "¿Cuántas horas a la semana se le van a tu equipo en confirmar disponibilidad, cobrar y contestar compradores?",
    "La vez que se apartó un lote dos veces, ¿qué pasó?",
  ],
  cuenta: {
    campos: [
      { id: "atrasado", etiqueta: "Monto atrasado", tipo: "pesos" },
      { id: "horas", etiqueta: "Horas a la semana por vendedor", tipo: "numero" },
      { id: "vendedores", etiqueta: "Vendedores", tipo: "numero" },
      { id: "apartadoDoble", etiqueta: "Apartado doble: lo que él cuente", tipo: "texto" },
    ],
    partidas: [
      { id: "cobranza", nombre: "Cobranza", tipo: "deuda", factores: ["atrasado"] },
      { id: "apartadoDoble", nombre: "Apartado doble", tipo: "texto", factores: ["apartadoDoble"] },
    ],
    horas: { frase: ["horas", "vendedores"], unidad: "equipoSemana", mes: ["horas", "vendedores"], porSemana: true },
  },
  prioridades: [
    { id: "disponible", nombre: "saber qué está disponible", pantalla: "Mapa de lotes en vivo" },
    { id: "cobrar", nombre: "cobrar", pantalla: "Cobranza de mensualidades" },
    { id: "llamadas", nombre: "que los compradores dejen de llamar", pantalla: "Portal del comprador" },
    { id: "comisiones", nombre: "las comisiones", pantalla: "Comisiones de vendedores y brokers" },
    { id: "saber", nombre: "saber cómo va", pantalla: "Panel del director" },
  ],
  niveles: {
    porDefecto: "controla",
    reglas: [
      {
        nivel: "empresa",
        regla: "Tiene varios desarrollos, equipo grande o necesita conectarse con sus sistemas",
      },
    ],
  },
  objeciones: [
    {
      dice: "Mi CRM ya maneja prospectos",
      respuesta: "¿También maneja tus lotes, tus apartados y la cobranza de enganches?",
    },
    PLATAFORMAS_BARATAS,
    { dice: "Lo tengo que ver con mi socio", respuesta: "Claro. ¿Puede estar en la presentación de la propuesta?" },
    {
      dice: "Mis vendedores no van a usar otro sistema",
      respuesta: "Cada quien ve solo lo suyo, desde el celular. Lo dejo funcionando y los capacito en una sesión.",
    },
    {
      dice: "Ya vamos a la mitad de la venta",
      respuesta: "¿Cuántas etapas te faltan? La cobranza y el portal siguen hasta la última mensualidad.",
    },
  ],
};
