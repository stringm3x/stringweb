// Fuente única de los precios públicos de STRING y Boaz (lote 17). Todo el
// sitio lee de aquí: niveles, continuidad, Boaz, la nota del correo de
// diagnóstico y el formulario de /gym/registro. Desde el 4 nov, todos con
// IVA incluido. Cifras tal como en docs/textos.md; si cambian, manda el KB.

// La etiqueta que acompaña a cada precio.
export const IVA = "IVA incluido";

// "Desde" de cada nivel. Empresa no publica mínimo: se cotiza.
export const DESDE = {
  responde: "$9,500",
  organiza: "$21,000",
  automatiza: "$32,500",
  controla: "$46,500",
};

export const SE_COTIZA = "Se cotiza";

// "Desde $9,500" o "Se cotiza", como en la sala 4 y la página de nivel.
export const precioNivel = (slug) => (DESDE[slug] ? `Desde ${DESDE[slug]}` : SE_COTIZA);

// Continuidad: el "desde" al mes. Los planes no muestran precio en el sitio;
// sus valores viven aquí por si se nombran.
export const CONTINUIDAD_DESDE = "$2,100";
export const CONTINUIDAD = {
  cuida: "$2,100",
  mejora: "$3,500",
  impulsa: "$5,800",
};

// Planes de Boaz que salen en el sitio. Escala y Pro fundador no aparecen.
export const BOAZ = {
  starter: { mes: "$799", anual: "$7,990" },
  pro: { mes: "$1,299", anual: "$12,990" },
};
