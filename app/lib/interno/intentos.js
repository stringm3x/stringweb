import { createHmac, timingSafeEqual } from "node:crypto";

// La cuenta de códigos fallidos de /interno/entrar (CLAUDE.md § Rutas).
// Vive en una cookie httpOnly firmada con INTERNO_SECRETO y ligada a la
// sesión (su session_id) y al usuario. Nace en 0 cuando la contraseña es
// correcta. Si no existe, no se puede validar, es de otra sesión o caducó,
// leerIntentos() devuelve null: cuenta como límite alcanzado.
//
// Límite: sin estado en el servidor, una cookie válida guardada y reenviada
// en la misma sesión no se puede distinguir. Lo frenan la contraseña (hace
// falta para tener la sesión) y los límites de verificación de Supabase.
export const COOKIE_INTENTOS = "interno-intentos";
export const MAX_INTENTOS = 5;
export const VIDA_INTENTOS = 15 * 60; // segundos para escribir el código

const firma = (texto, secreto) => createHmac("sha256", secreto).update(texto).digest("base64url");

export function firmarIntentos({ n, sid, uid, ahora = Date.now() }, secreto) {
  const cuerpo = Buffer.from(
    JSON.stringify({ n, sid, uid, exp: Math.floor(ahora / 1000) + VIDA_INTENTOS })
  ).toString("base64url");
  return `${cuerpo}.${firma(cuerpo, secreto)}`;
}

export function leerIntentos(valor, secreto, { sid, uid, ahora = Date.now() }) {
  try {
    if (!valor || !secreto || !sid || !uid) return null;
    const [cuerpo, recibida, ...resto] = String(valor).split(".");
    if (!cuerpo || !recibida || resto.length) return null;

    const esperada = Buffer.from(firma(cuerpo, secreto));
    const dada = Buffer.from(recibida);
    if (esperada.length !== dada.length || !timingSafeEqual(esperada, dada)) return null;

    const datos = JSON.parse(Buffer.from(cuerpo, "base64url").toString("utf8"));
    if (datos.sid !== sid || datos.uid !== uid) return null;
    if (!Number.isInteger(datos.exp) || datos.exp <= Math.floor(ahora / 1000)) return null;
    if (!Number.isInteger(datos.n) || datos.n < 0) return null;
    return datos.n;
  } catch {
    return null;
  }
}

// El session_id del access token: estable mientras dure la sesión (no
// cambia al refrescar el token). Solo se usa para ligar la cookie; el
// token ya lo validó getUser().
export function idDeSesion(accessToken) {
  try {
    const payload = JSON.parse(Buffer.from(String(accessToken).split(".")[1], "base64url").toString("utf8"));
    return typeof payload.session_id === "string" && payload.session_id ? payload.session_id : null;
  } catch {
    return null;
  }
}

export const opcionesCookieIntentos = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/interno",
  maxAge: VIDA_INTENTOS,
});
