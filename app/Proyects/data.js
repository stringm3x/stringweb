// app/data/proyectsData.js

export const proyects = [
  {
    id: "YUMA",
    title: "E-Commerce",
    href: "https://yuma-three.vercel.app/",
    img: "/proyects/yuma1.png",
    info: "Proyecto digital enfocado en diseño minimalista y experiencia de usuario moderna para marca emergente.",
    category: "ecommerce",
    year: "2025",
  },
  {
    id: "ALBA AGUILAR",
    title: "Landing Page",
    href: "https://www.albaaguilar.com.mx/",
    img: "/proyects/alba&aguilar.png",
    info: "Empresa de construcción especializada en desarrollos residenciales y proyectos arquitectónicos de alto nivel en México.",
    category: "landing",
    year: "2025",
  },
  {
    id: "Pecado de Canela",
    title: "Menú Digital",
    href: "https://www.pecadodecanela.com/",
    img: "/proyects/pecadodecanela1.png",
    info: "Panadería artesanal con presencia digital enfocada en branding cálido y experiencia gastronómica.",
    category: "menu",
    year: "2026",
  },
  {
    id: "Laceb",
    title: "Landing Page",
    href: "https://www.laceb-lab.com/",
    img: "/proyects/laceb2.png",
    info: "Mantenimiento y calibración de pipetas de pistón",
    category: "landing",
    year: "2026",
  },
  {
    id: "SUSHI SENSATION",
    title: "Menú Digital",
    href: "https://qitchen-template.framer.website/?via=pawelgola",
    img: "/design/restuarante.png",
    info: "Menú digital interactivo con diseño moderno para restaurante especializado en cocina japonesa.",
    category: "menu",
    year: "2026",
  },
  {
    id: "CAELORA",
    title: "E-commerce",
    href: "https://caelora.framer.website/",
    img: "/design/joyeria.png",
    info: "E-commerce de joyería con estética premium y experiencia visual enfocada en lujo y detalle.",
    category: "ecommerce",
    year: "2026",
  },
  {
    id: "GARM",
    title: "E-Commerce",
    href: "https://garm.framer.website/",
    img: "/design/ropa.png",
    info: "Marca de moda con enfoque moderno, tienda en línea optimizada para experiencia de compra rápida y elegante.",
    category: "ecommerce",
    year: "2026",
  },
  {
    id: "INCODE",
    title: "Landing Page",
    href: "https://incode-ten.vercel.app/",
    img: "/proyects/incode.png",
    info: "Landing corporativa moderna enfocada en tecnología y soluciones digitales empresariales.",
    category: "landing",
    year: "2025",
  },
  {
    id: "VERDANT",
    title: "Portafolio",
    href: "https://architects.framer.website/",
    img: "/design/portafolio.png",
    info: "Portafolio arquitectónico con enfoque minimalista y experiencia visual tipo estudio premium.",
    category: "portfolio",
    year: "2025",
  },
];

export const categories = [
  { id: "all", label: "Todos" },
  { id: "landing", label: "Landing Pages" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "menu", label: "Menús Digitales" },
  { id: "portfolio", label: "Portafolios" },
];

// Función helper para obtener proyectos por categoría
export const getProjectsByCategory = (category) => {
  if (category === "all") return proyects;
  return proyects.filter((p) => p.category === category);
};

// Función para obtener estadísticas
export const getProjectStats = () => ({
  total: proyects.length,
  byCategory: {
    landing: proyects.filter((p) => p.category === "landing").length,
    ecommerce: proyects.filter((p) => p.category === "ecommerce").length,
    menu: proyects.filter((p) => p.category === "menu").length,
    portfolio: proyects.filter((p) => p.category === "portfolio").length,
  },
  years: [...new Set(proyects.map((p) => p.year))].sort(),
  latestYear: Math.max(...proyects.map((p) => parseInt(p.year))),
});
