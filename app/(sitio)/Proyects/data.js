// app/data/proyectsData.js

export const proyects = [
  {
    id: "YUMA",
    title: "E-Commerce",
    href: "https://yuma-three.vercel.app/",
    img: "/proyects/yuma1.png",
    info: "Proyecto digital enfocado en diseño minimalista y experiencia de usuario moderna para marca emergente.",
    category: "ecommerce",
    year: "En desarrollo",
  },
  {
    id: "Evolution GYM",
    title: "Landing Page",
    href: "https://evolutiongymneza.com/",
    img: "/proyects/evolutiongym.png",
    info: "Sitio web para gimnasio en CDMX, enfocado en captación de nuevos miembros.",
    category: "landing",
    year: "2026",
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
];

export const categories = [
  { id: "all", label: "Todos" },
  { id: "landing", label: "Landing Pages" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "menu", label: "Menús Digitales" },
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
  },
  years: [...new Set(proyects.map((p) => p.year))].sort(),
  latestYear: Math.max(...proyects.map((p) => parseInt(p.year))),
});
