// Ficha · Academias (lote 25, aprobada por Carlos el 25 nov). Literal del
// prompt del lote 25. Sin precios de STRING: el único "$" es el del filtro,
// que es un criterio del prospecto (lo revisa nichos/datos.test.js).
//
// cuenta: los campos que Carlos captura (TODO(textos): etiquetas propuestas)
// y cómo se arma "su número". tipo de partida: "mes" (suma al mes y ×12),
// "deuda" (aparte: "hoy te deben") o "texto" (lo que él cuente, sin monto).

export const ACADEMIAS = {
  id: "academias",
  nombre: "Academias",
  filtro: "3+ maestros, 80+ alumnos, colegiatura de $800+.",
  situacion: {
    todos: [
      "¿Cuántos alumnos y maestros tienes, y en cuántos grupos?",
      "¿Cómo te llegan los alumnos nuevos y quién contesta el WhatsApp?",
      "¿Cómo cobras las colegiaturas?",
    ],
    sin: ["¿Dónde llevas inscripciones, asistencias y pagos?", "¿Cómo sabes quién te debe?"],
    uno: [
      "¿Qué usas y cuánto pagas al mes?",
      "¿Qué sigues haciendo por fuera, en Excel o a mano?",
      "¿Te deja exportar tus datos?",
    ],
    varios: ["¿Cuáles usas y para qué cada uno?", "¿Dónde pasas datos de uno a otro a mano?"],
  },
  problema: [
    "¿Se te quedan papás sin contestar, sobre todo cuando das clase?",
    "¿Sabes quién dejó de venir este mes?",
    "¿Se te atrasan los pagos?",
    "¿Cómo manejas las reposiciones de clase?",
  ],
  implicacion: [
    "¿Cuántos papás preguntan al mes y cuántos inscriben?",
    "¿Cuántos alumnos se te fueron este año sin avisar?",
    "¿Cuánto te deben hoy?",
    "¿Cuántas horas a la semana se te van en cobrar y confirmar?",
  ],
  cuenta: {
    campos: [
      { id: "colegiatura", etiqueta: "Colegiatura al mes", tipo: "pesos" },
      { id: "bajas", etiqueta: "Alumnos que se van al mes", tipo: "numero" },
      { id: "deuda", etiqueta: "Lo que le deben hoy", tipo: "pesos" },
      { id: "sinCobrar", etiqueta: "Porcentaje sin cobrar", tipo: "porcentaje" },
      { id: "facturacion", etiqueta: "Facturación al mes", tipo: "pesos" },
      { id: "dijoInteresados", etiqueta: "Él lo dijo: se pierden interesados por no contestar", tipo: "casilla" },
      { id: "interesados", etiqueta: "Interesados que no inscriben al mes", tipo: "numero" },
      { id: "horas", etiqueta: "Horas a la semana en cobrar y confirmar", tipo: "numero" },
    ],
    partidas: [
      { id: "bajas", nombre: "Bajas", tipo: "mes", factores: ["bajas", "colegiatura"] },
      { id: "cobranzaDeuda", nombre: "Cobranza", tipo: "deuda", factores: ["deuda"] },
      // "Lo que le deben hoy, o % sin cobrar × facturación mensual": el
      // porcentaje solo cuenta si no capturó la deuda.
      {
        id: "cobranzaPorcentaje",
        nombre: "Cobranza",
        tipo: "mes",
        factores: ["sinCobrar", "facturacion"],
        porcentaje: "sinCobrar",
        siNo: "cobranzaDeuda",
      },
      {
        id: "interesados",
        nombre: "Interesados que no inscriben",
        tipo: "mes",
        factores: ["interesados", "colegiatura"],
        requiere: "dijoInteresados",
      },
    ],
    horas: { frase: ["horas"], unidad: "tuyasSemana", mes: ["horas"], porSemana: true },
  },
  prioridades: [
    { id: "cobrar", nombre: "cobrar", pantalla: "Colegiaturas con estado de cuenta" },
    { id: "contestar", nombre: "contestar a tiempo", pantalla: "Seguimiento de interesados" },
    { id: "bajas", nombre: "las bajas", pantalla: "Alumnos en riesgo" },
    { id: "saber", nombre: "saber cómo va", pantalla: "Panel de la dueña" },
  ],
  niveles: {
    porDefecto: null,
    reglas: [
      { nivel: "organiza", regla: "Quiere en un solo lugar interesados, alumnos y cobros" },
      {
        nivel: "automatiza",
        regla: "Quiere que el sistema cobre, recuerde y avise solo (app para papás, asistencia, alumnos en riesgo)",
      },
      { nivel: "controla", regla: "Tiene varias sedes, quiere panel de sus números o tienda de uniformes" },
    ],
  },
  objeciones: [
    {
      dice: "Es mucho para una academia",
      respuesta: "Hagamos la cuenta con lo que te deben y los alumnos que se van.",
      nota: "Si es flujo: meses con tarjeta o plan mensual en Organiza.",
    },
    { dice: "Ya tengo un sistema escolar", respuesta: "Qué bueno. ¿Qué sigues haciendo por fuera de él?" },
    { dice: "Lo veo con mi socio", respuesta: "Claro. ¿Puede estar en la presentación de la propuesta?" },
    {
      dice: "Los papás no van a usar una app",
      respuesta:
        "Pueden seguir pagando como hoy; la app es para quien quiera. Muchas veces se empieza por el recordatorio y el estado de cuenta.",
    },
    {
      dice: "Yo cobro, no me cuesta tanto",
      respuesta: "¿Cuántas horas a la semana te lleva?",
      nota: "Y se hace la cuenta.",
    },
  ],
};
