import { NextResponse } from "next/server";
import { RUTA_ENTRAR } from "./app/lib/interno/config";
import { revisarSesion } from "./app/lib/interno/sesion-proxy";

// Proxy de Next 16, solo para /interno (CLAUDE.md § Rutas). El resto del
// sitio no pasa por aquí.
//
// 1. Refresca la sesión de Supabase.
// 2. Sin una sesión aal2 del usuario permitido, manda a /interno/entrar
//    (ahí no redirige: sin bucle). Las cookies que Supabase haya refrescado
//    se copian al redirect, para no perder la sesión en el camino.
// 3. Todas las respuestas de /interno, redirects y entrada incluidos, salen
//    sin indexar y sin caché.
//
// Es la primera puerta; la segunda es exigirCarlos() en cada página y acción.
const CABECERAS = {
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "private, no-store",
};

export async function proxy(request) {
  const enEntrar = request.nextUrl.pathname === RUTA_ENTRAR;
  const { respuesta, valida } = await revisarSesion(request);

  let final = respuesta;
  if (!valida && !enEntrar) {
    const destino = request.nextUrl.clone();
    destino.pathname = RUTA_ENTRAR;
    destino.search = "";
    final = NextResponse.redirect(destino);
    respuesta.cookies.getAll().forEach((cookie) => final.cookies.set(cookie));
  }

  for (const [nombre, valor] of Object.entries(CABECERAS)) final.headers.set(nombre, valor);
  return final;
}

export const config = {
  matcher: ["/interno/:path*"],
};
