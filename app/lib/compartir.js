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
