import {
  FiTarget,
  FiTrendingUp,
  FiZap,
  FiClock,
  FiAward,
  FiBarChart2,
  FiUsers,
} from "react-icons/fi";
import { MdOutlineAnalytics, MdOutlineRocketLaunch } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";

const servicios = [
  {
    id: "1",
    service: "SISTEMA DE CONVERSIÓN",
    title2: "Nivel 1 · $8,000",
    img: "/serv/conversion1.png",
    intro:
      "Transformamos tu presencia digital en un sistema que genera clientes reales de manera consistente.",
    p: "No se trata de tener una página bonita. Se trata de tener una estructura clara que guíe a tus visitantes a convertirse en clientes. Analizamos tu negocio, identificamos fricciones y diseñamos un flujo de conversión optimizado.",
    content: [
      "Diagnóstico completo de presencia digital",
      "Estructura estratégica de oferta",
      "Landing page optimizada",
      "Integración con WhatsApp",
      "Formulario básico de contacto",
      "Mensaje preconfigurado de WhatsApp",
    ],
    objetivo:
      "Crear una presencia digital clara que convierta visitas en mensajes de clientes interesados.",
    ideal: "Negocios que dependen de Instagram, WhatsApp y recomendaciones",
    metric: "Desde $8,000",
    gradient: "from-green to-green2",
    icon: FiTarget,
    color: "green",
    incluye: [
      "Diagnóstico digital inicial",
      "Estructura estratégica de página",
      "Landing page optimizada para celular",
      "Integración con WhatsApp",
      "Formulario básico de contacto",
      "Mensaje automático preconfigurado",
    ],
    stats: [
      { value: "24h", label: "Diagnóstico" },
      { value: "100%", label: "Personalizado" },
    ],
    faqs: [
      {
        title: "¿Qué es un sistema de conversión?",
        content:
          "Es una estructura digital diseñada específicamente para convertir visitantes en clientes. No es solo una página web, es un proceso estratégico.",
      },
      {
        title: "¿Cuánto tiempo toma el diagnóstico?",
        content:
          "El diagnóstico inicial toma 24 horas. Recibirás un análisis completo de tu presencia digital con recomendaciones específicas.",
      },
      {
        title: "¿Qué incluye la estructura?",
        content:
          "Definición de propuesta de valor, diseño de flujo de conversión, redacción estratégica y llamados a la acción claros.",
      },
    ],
  },
  {
    id: "2",
    service: "SISTEMA DE CAPTACIÓN",
    title2: "Nivel 2 · $18,000",
    img: "/serv/captacion.png",
    intro:
      "Evita que los clientes interesados se pierdan y organiza tus prospectos automáticamente.",
    p: "No basta con recibir mensajes. Hay que organizarlos. Este nivel añade herramientas de captación que registran, clasifican y notifican cada nuevo prospecto, para que no se pierda ninguna oportunidad.",
    content: [
      "Captura automática de leads",
      "Registro automático en base de datos",
      "Calificación inicial de prospectos",
      "Notificaciones automáticas",
      "Integración con Notion / Sheets / Airtable",
    ],
    objetivo:
      "Organizar los prospectos y evitar la pérdida de clientes interesados.",
    ideal: "Negocios con volumen creciente de consultas",
    metric: "Desde $18,000",
    gradient: "from-green2 to-green3",
    icon: FiTrendingUp,
    color: "green",
    incluye: [
      "Todo el Sistema de Conversión",
      "Captura automática de leads",
      "Registro organizado de prospectos",
      "Calificación inicial por preguntas",
      "Notificaciones por correo",
      "Integración con herramientas externas",
    ],
    stats: [
      { value: "100%", label: "Captación" },
      { value: "Auto", label: "Organizado" },
    ],
    faqs: [
      {
        title: "¿Qué es la captura automática de leads?",
        content:
          "Cuando un visitante completa un formulario, el sistema guarda automáticamente sus datos en una base organizada y notifica al negocio.",
      },
      {
        title: "¿Con qué herramientas se integra?",
        content:
          "Podemos integrar con Notion, Airtable, Google Sheets o un CRM simple, según tu preferencia.",
      },
      {
        title: "¿Cómo funciona la calificación de prospectos?",
        content:
          "Los formularios incluyen preguntas estratégicas (tipo de servicio, presupuesto) que ayudan a priorizar clientes.",
      },
    ],
  },
  {
    id: "3",
    service: "SISTEMA AUTOMATIZADO",
    title2: "Nivel 3 · $28,000",
    img: "/serv/auto.png",
    intro:
      "Crea un sistema digital que trabaja incluso cuando tu negocio no está disponible.",
    p: "Imagina un sistema que recibe, organiza y responde clientes mientras tú duermes. Este nivel añade automatizaciones avanzadas que mejoran la percepción de atención y aumentan conversiones.",
    content: [
      "Respuesta automática inicial",
      "Agenda automática de citas",
      "Seguimiento automático de prospectos",
      "Recordatorios de citas",
      "Panel de gestión de prospectos",
    ],
    objetivo:
      "Automatizar la atención y seguimiento para escalar sin aumentar carga operativa.",
    ideal: "Negocios con alto volumen de consultas o que trabajan con citas",
    metric: "Desde $28,000",
    gradient: "from-green3 to-green4",
    icon: FiZap,
    color: "green",
    incluye: [
      "Todo el Sistema de Captación",
      "Respuesta automática inmediata",
      "Agenda de citas automatizada",
      "Seguimiento automático post-contacto",
      "Recordatorios de citas",
      "Panel de gestión de prospectos",
    ],
    stats: [
      { value: "24/7", label: "Automático" },
      { value: "30%", label: "Más conversión" },
    ],
    faqs: [
      {
        title: "¿Qué es la respuesta automática inicial?",
        content:
          "Cuando un cliente solicita información, el sistema envía automáticamente: 'Gracias por tu mensaje. Hemos recibido tu solicitud y pronto te contactaremos.'",
      },
      {
        title: "¿Cómo funciona la agenda de citas?",
        content:
          "Los clientes pueden revisar disponibilidad, solicitar horario y registrar sus datos automáticamente, sin intervención manual.",
      },
      {
        title: "¿Qué seguimiento automático incluye?",
        content:
          "Después del contacto inicial, el sistema puede enviar mensajes de seguimiento para aumentar conversiones.",
      },
    ],
  },
  {
    id: "4",
    service: "SISTEMA ESPECIALIZADO",
    title2: "Nivel 4 · $40,000",
    img: "/serv/especial.png",
    intro:
      "Desarrollamos sistemas digitales personalizados para negocios que necesitan algo más avanzado.",
    p: "Este nivel está pensado para empresas que necesitan procesos digitales completos que integren captación, seguimiento, ventas y gestión interna. Infraestructura digital diseñada específicamente para tu operación.",
    content: [
      "CRM personalizado",
      "Automatización avanzada de ventas",
      "Paneles de control internos",
      "Catálogos dinámicos",
      "Sistemas de reservas complejos",
    ],
    objetivo: "Crear infraestructura digital a medida para tu negocio.",
    ideal: "Empresas con procesos complejos o necesidades específicas",
    metric: "Desde $40,000",
    gradient: "from-green4 to-green",
    icon: MdOutlineRocketLaunch,
    color: "green",
    incluye: [
      "Todo el Sistema Automatizado",
      "Desarrollo a medida según negocio",
      "CRM personalizado",
      "Automatizaciones avanzadas",
      "Paneles de control internos",
      "Integraciones con APIs externas",
    ],
    stats: [
      { value: "100%", label: "A medida" },
      { value: "Escalable", label: "Infraestructura" },
    ],
    faqs: [
      {
        title: "¿Qué tipo de sistemas especializados desarrollan?",
        content:
          "Catálogos dinámicos para autos, agendas médicas avanzadas, paneles de clientes, sistemas de reservas complejos, etc.",
      },
      {
        title: "¿Qué tecnologías utilizan?",
        content:
          "Next.js, React, Node.js, Supabase/Firebase, APIs externas, automatización con Make/Zapier, integración con CRMs.",
      },
      {
        title: "¿Cuánto tiempo toma el desarrollo?",
        content:
          "Depende de la complejidad, pero siempre definimos plazos claros antes de comenzar.",
      },
    ],
  },
];

export default servicios;
