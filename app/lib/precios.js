// Fuente única de los precios públicos de STRING y Boaz (lote 17). Todo el
// sitio lee de aquí: niveles, continuidad, Boaz, la nota del correo de
// diagnóstico y el formulario de /gym/registro. Cifras tal como en
// docs/textos.md; si cambian, manda el KB.

// "Desde" de cada nivel. Empresa no publica mínimo: se cotiza.
export const DESDE = {
  responde: "$8,000",
  organiza: "$18,000",
  automatiza: "$28,000",
  controla: "$40,000",
};

export const SE_COTIZA = "Se cotiza";

// "Desde $8,000" o "Se cotiza", como en la sala 4 y la página de nivel.
export const precioNivel = (slug) => (DESDE[slug] ? `Desde ${DESDE[slug]}` : SE_COTIZA);

// Continuidad: el "desde" al mes.
export const CONTINUIDAD_DESDE = "$1,800";

// Planes de Boaz que salen en el sitio. Escala no aparece.
export const BOAZ = {
  starter: { mes: "$799", anual: "$7,990" },
  pro: { mes: "$1,799", anual: "$17,990" },
};
