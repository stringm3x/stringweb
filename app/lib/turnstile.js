// Verificación de Cloudflare Turnstile en el servidor. El widget del cliente
// (app/gym/components/TurnstileWidget.jsx) da el token; aquí se confirma con
// TURNSTILE_SECRET_KEY. Sin secreto, solo en desarrollo se deja pasar, igual
// que el widget cuando no hay clave pública.
const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verificarTurnstile(token, ip) {
  const secreto = process.env.TURNSTILE_SECRET_KEY;

  if (!secreto) {
    if (process.env.NODE_ENV !== "production") return true;
    console.error("Falta TURNSTILE_SECRET_KEY");
    return false;
  }

  if (!token || typeof token !== "string") return false;

  const cuerpo = new URLSearchParams({ secret: secreto, response: token });
  if (ip) cuerpo.set("remoteip", ip);

  try {
    const respuesta = await fetch(SITEVERIFY, { method: "POST", body: cuerpo });
    const resultado = await respuesta.json();
    return resultado.success === true;
  } catch (error) {
    console.error("Turnstile:", error.message);
    return false;
  }
}
