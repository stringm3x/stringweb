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

// Planes de Boaz que se contratan: los que salen en /productos, /gym/registro
// y el JSON-LD. Solo Starter y Pro; Escala y el Pro fundador van aparte para
// que nada que lea BOAZ los arrastre.
export const BOAZ = {
  starter: { mes: "$799", anual: "$7,990" },
  pro: { mes: "$1,299", anual: "$12,990" },
};

// Escala (lote 21, decisión del 6 nov): sale SOLO en /boaz, como
// "Próximamente"; todavía no se puede contratar.
export const BOAZ_ESCALA = { mes: "$1,999", anual: "$19,990" };

// Pro fundador: $799 al mes, fijo 12 meses. Público desde el lote 21, solo en
// la sección de fundadores de /boaz. /interno también lo toma de aquí.
export const BOAZ_FUNDADOR = { mes: "$799", meses: 12 };
