// Contacto público de STRING. Única fuente de verdad — ver CLAUDE.md § Contacto.
export const CORREO = "stringwebmx@gmail.com";
export const WHATSAPP_NUMERO = "525545524847";
export const WHATSAPP_TELEFONO = `+${WHATSAPP_NUMERO}`;

// Enlace a WhatsApp; el texto es opcional y se codifica aquí.
export function whatsappUrl(texto) {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}
