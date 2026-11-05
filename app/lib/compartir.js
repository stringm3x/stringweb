// Lo que se ve al compartir una página (lote 13): Open Graph y Twitter con el
// mismo título y la misma descripción. Next no fusiona `openGraph` ni `twitter`
// con los de la raíz: el que los fija los reemplaza enteros, así que aquí van
// completos. La imagen es la de la portada; las páginas con su propio
// opengraph-image.jsx (sistemas, niveles, tu-negocio, giros, empresas) pasan
// `imagenPropia`, porque una imagen aquí le ganaría a la de su archivo.
export const IMAGEN = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "STRING — Software hecho con oficio. Y con arte.",
};

export function compartir({ titulo, descripcion, url, imagenPropia = false }) {
  const imagenes = imagenPropia ? {} : { images: [IMAGEN] };
  return {
    openGraph: {
      title: titulo,
      description: descripcion,
      url,
      siteName: "STRING",
      locale: "es_MX",
      type: "website",
      ...imagenes,
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descripcion,
      ...imagenes,
    },
  };
}

export const SITIO = "https://www.stringwebs.com";

// Metadata completa de una página (lote 18): el título va absoluto (sin la
// plantilla del layout), y Google, Open Graph y Twitter leen el mismo título
// y la misma descripción, escritos una sola vez.
export function metadatosPagina({ titulo, descripcion, ruta, imagenPropia = false }) {
  const url = ruta === "/" ? `${SITIO}/` : `${SITIO}${ruta}`;
  return {
    title: { absolute: titulo },
    description: descripcion,
    alternates: { canonical: url },
    ...compartir({ titulo, descripcion, url, imagenPropia }),
  };
}

// La portada (lote 18, docs/textos.md § SEO · lote 18). La usa también el
// layout raíz como título y descripción por omisión.
export const PORTADA = {
  titulo: "STRING · Taller de software en la Ciudad de México",
  descripcion:
    "Taller de software de Carlos Avilés en la Ciudad de México. Sistemas que contestan, ordenan y trabajan por tu negocio, desde un local hasta una empresa grande.",
};
