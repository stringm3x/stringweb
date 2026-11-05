// Pinta un bloque de datos estructurados (lote 18). El "<" se escapa para que
// ningún texto pueda cerrar la etiqueta script.
export function JsonLd({ datos }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos).replace(/</g, "\\u003c") }}
    />
  );
}
