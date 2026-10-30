import { GIRO_GIMNASIO, OTRA_COSA, nivelSugerido } from "@/app/lib/diagnostico";

// El correo que recibe Carlos (docs/textos.md § Correo que recibe Carlos),
// en texto y en HTML sencillo. Recibe los datos ya validados por el schema.
const escapar = (texto) =>
  String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const enUnaLinea = (texto) => String(texto).replace(/[\r\n]+/g, " ").trim();

export function armarCorreo(datos) {
  const nivel = nivelSugerido(datos.situacion);
  const loQueLePasa = datos.situacion === OTRA_COSA ? datos.otraCosa : datos.situacion;
  const enlaceWhatsapp = `https://wa.me/52${datos.whatsapp}`;
  const esGimnasio = datos.giro === GIRO_GIMNASIO;

  const asunto = enUnaLinea(
    `Diagnóstico · ${datos.nombre} · ${datos.giro} · Nivel sugerido: ${nivel}`
  );

  const lineas = [
    "Nueva solicitud de diagnóstico.",
    "",
    `Nombre: ${datos.nombre}`,
    `WhatsApp: ${datos.whatsapp} (${enlaceWhatsapp})`,
    `Giro: ${datos.giro}`,
    `Lo que le pasa: ${loQueLePasa}`,
    `Nivel sugerido: ${nivel}`,
    ...(esGimnasio ? ["Es gimnasio: ofrécele Boaz."] : []),
    "",
    "Estándar: respóndele en un día hábil.",
  ];

  const fila = (etiqueta, valor) =>
    `<p style="margin:0 0 8px"><strong>${etiqueta}:</strong> ${valor}</p>`;

  const html = `<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.5;color:#111214;background:#ffffff">
  <p style="margin:0 0 16px">Nueva solicitud de diagnóstico.</p>
  ${fila("Nombre", escapar(datos.nombre))}
  ${fila("WhatsApp", `<a href="${enlaceWhatsapp}" style="color:#1A7F00">${escapar(datos.whatsapp)}</a>`)}
  ${fila("Giro", escapar(datos.giro))}
  ${fila("Lo que le pasa", escapar(loQueLePasa).replace(/\r?\n/g, "<br>"))}
  ${fila("Nivel sugerido", escapar(nivel))}
  ${esGimnasio ? `<p style="margin:0 0 8px"><strong>Es gimnasio: ofrécele Boaz.</strong></p>` : ""}
  <p style="margin:16px 0 0">Estándar: respóndele en un día hábil.</p>
</body>
</html>`;

  return { asunto, texto: lineas.join("\n"), html };
}
