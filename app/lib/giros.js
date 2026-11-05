import { nivelPorSlug } from "./niveles";

// Tu negocio (lote 11, docs/textos.md § Tu negocio · lote 11): los giros en
// dos grupos, palabra por palabra. Los giros con local llevan su escalera de
// cinco niveles; los grandes, cuatro puntos de lo que haría su sistema. Los
// precios no se repiten aquí: salen de NIVELES por el slug del nivel.

// Cada fila de la escalera: el nivel, lo que te pasa y lo que hace tu sistema.
const fila = (nivel, pasa, hace) => ({ nivel, pasa, hace });

const GIROS_LOCAL = [
  {
    slug: "barberias",
    nombre: "Barberías y estéticas",
    frase: "Tu agenda llena, sin vivir en el WhatsApp.",
    titular: "Tu agenda llena, sin vivir en el WhatsApp.",
    cita: "Me escriben para agendar mientras estoy cortando.",
    filas: [
      fila("responde", "Te escriben mientras cortas y no alcanzas a contestar.", "Contesta al instante con tus horarios y precios."),
      fila("organiza", "Tus clientes están regados en chats.", "Cada cliente en su lugar: quién preguntó y quién ya vino."),
      fila("automatiza", "Se te olvidan las citas o te dejan plantado.", "Agenda la cita, manda el recordatorio y da seguimiento."),
      fila("controla", "No sabes cuánto deja cada silla.", "Un panel con tus citas, tus ventas y lo que entra cada semana."),
      fila("empresa", "Tienes varias sucursales.", "Un sistema completo para todas, con equipo por proyecto."),
    ],
  },
  {
    slug: "clinicas",
    nombre: "Clínicas y consultorios",
    frase: "Cada paciente atendido a tiempo.",
    titular: "Cada paciente atendido a tiempo.",
    cita: "Me preguntan precios y horarios todo el día, y entre consultas no alcanzo.",
    filas: [
      fila("responde", "Preguntan por precios y nadie contesta a tiempo.", "Contesta al instante con tus servicios y tu horario."),
      fila("organiza", "Los interesados se pierden entre chats y llamadas.", "Registra a quien pregunta, qué le interesa y si ya agendó."),
      fila("automatiza", "Los pacientes faltan a su cita.", "Agenda, recuerda la cita y da seguimiento después de la consulta."),
      fila("controla", "No ves cuántos pacientes vuelven ni cuánto entra.", "Un panel con tus citas, tus pacientes y lo que entra."),
      fila("empresa", "Tienes varios consultorios o especialistas.", "Un sistema completo para toda la clínica, con equipo por proyecto."),
    ],
  },
  {
    slug: "restaurantes",
    nombre: "Restaurantes",
    frase: "Reservas y pedidos sin perder un mensaje.",
    titular: "Reservas y pedidos sin perder un mensaje.",
    cita: "En la hora pico no hay quien conteste el WhatsApp.",
    filas: [
      fila("responde", "Preguntan por mesa o por el menú y nadie contesta.", "Contesta al instante y toma la reservación."),
      fila("organiza", "Las reservas viven en una libreta y en chats.", "Todas las reservas y pedidos en un solo lugar."),
      fila("automatiza", "Te reservan y no llegan.", "Confirma la reservación y recuerda la hora."),
      fila("controla", "No sabes qué días y qué platillos te dejan más.", "Un panel con tus reservas, tus pedidos y lo que entra."),
      fila("empresa", "Tienes varias sucursales.", "Un sistema completo para todas, con equipo por proyecto."),
    ],
  },
  {
    slug: "tiendas",
    nombre: "Tiendas en línea",
    frase: "Tu tienda, con tu nombre.",
    titular: "Tu tienda, con tu nombre.",
    cita: "Vendo por Instagram y llevo los pedidos en una libreta.",
    filas: [
      fila("responde", "Preguntan precio y existencias y no alcanzas a contestar.", "Contesta al instante con tu catálogo y tus precios."),
      fila("organiza", "Los pedidos llegan por chats distintos.", "Cada pedido y cada cliente en un solo lugar."),
      fila("automatiza", "Nadie da seguimiento al que preguntó y no compró.", "Da seguimiento y avisa al cliente cómo va su pedido."),
      fila("controla", "Quieres vender sin depender de las redes.", "Tu tienda en línea propia: catálogo, carrito, pagos, inventario y pedidos."),
      fila("empresa", "Tienes un catálogo grande o varias sucursales.", "Una tienda grande, conectada con tus sistemas, con equipo por proyecto."),
    ],
  },
];

// Gimnasios no tiene página: ya existe su sistema, Boaz.
export const GIMNASIOS = {
  nombre: "Gimnasios",
  frase: "Ya existe tu sistema: Boaz.",
  href: "/boaz",
  dibujo: "/arte/giros/gimnasios.svg",
  cta: "CONOCE BOAZ",
};

const GIROS_GRANDES = [
  {
    slug: "distribuidoras",
    nombre: "Distribuidoras y mayoristas",
    frase: "Pedidos, inventario, rutas y cobranza en un sistema.",
    titular: "Del pedido a la cobranza, sin perder nada.",
    cita: "Los pedidos llegan por WhatsApp, el inventario está en Excel y la cobranza en la cabeza de alguien.",
    puntos: [
      "Pedidos de tus clientes en un solo lugar.",
      "Inventario por almacén, al día.",
      "Rutas de entrega y quién entregó qué.",
      "Cuentas por cobrar: quién debe y desde cuándo.",
    ],
  },
  {
    slug: "inmobiliarias",
    nombre: "Inmobiliarias",
    frase: "Cada prospecto, cada propiedad, cada cita.",
    titular: "Cada prospecto, cada propiedad, cada cita.",
    cita: "Mis asesores pierden prospectos y no sé quién atendió a quién.",
    puntos: [
      "Respuesta inmediata a quien pregunta por una propiedad.",
      "Cada prospecto con su asesor y su etapa.",
      "Citas de visita con recordatorio.",
      "Un panel por asesor y por propiedad.",
    ],
  },
  {
    slug: "escuelas",
    nombre: "Escuelas y academias",
    frase: "Inscripciones, pagos y avisos sin papeles.",
    titular: "Inscripciones, pagos y avisos sin papeles.",
    cita: "Las inscripciones van en hojas, las colegiaturas en Excel y los avisos por cinco grupos de WhatsApp.",
    puntos: [
      "Inscripciones en línea.",
      "Colegiaturas: quién pagó y quién debe.",
      "Avisos a las familias desde un solo lugar.",
      "Un panel con alumnos, grupos y lo que entra.",
    ],
  },
  {
    slug: "hoteles",
    nombre: "Hoteles",
    frase: "Reservas, huéspedes y pagos en un solo lugar.",
    titular: "Reservas, huéspedes y pagos en un solo lugar.",
    cita: "Las reservas llegan por teléfono, WhatsApp y correo, y alguien las pasa a mano.",
    puntos: [
      "Reservas directas desde tu página, sin comisión por cada una.",
      "Disponibilidad por habitación, al día.",
      "Datos y estancias de tus huéspedes.",
      "Pagos y un panel de ocupación.",
    ],
  },
  {
    slug: "cadenas",
    nombre: "Cadenas y franquicias",
    frase: "Todas tus sucursales en un solo panel.",
    titular: "Todas tus sucursales en un solo panel.",
    cita: "Cada sucursal lleva sus números a su manera y yo me entero a fin de mes.",
    desde: "empresa",
    puntos: [
      "Ventas e inventario de cada sucursal.",
      "Los mismos procesos en todas.",
      "Accesos por rol: dueño, gerente, sucursal.",
      "Un panel con todas, comparadas.",
    ],
  },
];

// Cómo trabajamos con empresas: /tu-negocio/empresas y cada giro grande.
export const PASOS_EMPRESAS = [
  { numero: "01", nombre: "Diagnóstico", texto: "Una llamada para entender cómo opera tu empresa. Gratis." },
  {
    numero: "02",
    nombre: "El boceto",
    texto:
      "Mapa de procesos, primera pantalla dibujada y la obra de tu sistema en boceto. Se acredita completo si contratas el sistema.",
  },
  { numero: "03", nombre: "Propuesta", texto: "Alcance, fases, equipo por proyecto y precio, por escrito." },
  { numero: "04", nombre: "Construcción", texto: "Avance por escrito cada viernes. Tú hablas siempre conmigo." },
];

// Los dos niveles de un giro grande.
export const NIVELES_GRANDES = [
  { nivel: "controla", texto: "Una operación, un panel." },
  { nivel: "empresa", texto: "Varias áreas o sucursales, con equipo por proyecto." },
];

// "desde $9,500" o "se cotiza", tal como en el copy: en minúscula.
export const precioDe = (slug) => nivelPorSlug(slug).precio.replace(/^./, (c) => c.toLowerCase());

const completar = (grupo, desde) => (giro) => ({
  ...giro,
  grupo,
  etiqueta: `TU NEGOCIO · ${giro.nombre.toUpperCase()}`,
  href: `/tu-negocio/${giro.slug}`,
  dibujo: `/arte/giros/${giro.slug}.svg`,
  cta: precioDe(giro.desde ?? desde).toUpperCase(),
});

export const LOCAL = GIROS_LOCAL.map(completar("local", "responde"));
export const GRANDES = GIROS_GRANDES.map(completar("grande", "controla"));
export const GIROS = [...LOCAL, ...GRANDES];

export const giroPorSlug = (slug) => GIROS.find((g) => g.slug === slug);
