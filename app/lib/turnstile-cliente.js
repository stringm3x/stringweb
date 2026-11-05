// Qué hace el widget de Turnstile cuando no hay clave pública.
// En desarrollo deja pasar con un token de prueba (el servidor, sin secreto,
// también deja pasar). En producción no finge: sin clave no hay token, el
// botón de enviar se queda desactivado y se avisa en consola. Así una variable
// que falta en Vercel no se disfraza de un envío que el servidor va a
// rechazar (4 nov 2026: los dos formularios caídos por esto).
export const TOKEN_DESARROLLO = "dev-no-turnstile";

export function tokenSinClave(entorno = process.env.NODE_ENV) {
  return entorno === "production" ? null : TOKEN_DESARROLLO;
}
