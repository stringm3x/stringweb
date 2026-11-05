import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { leerConfig } from "./config";
import { evaluarSesion } from "./sesion";

// Para proxy.js, y solo para él. Sin "server-only": el proxy no siempre lo
// acepta, y este archivo nunca llega al navegador porque solo lo importa
// proxy.js.
//
// Refresca la sesión (las cookies nuevas quedan en `respuesta`) y dice si
// es válida: aal2 del usuario permitido. Sin variables o si Supabase falla,
// no es válida.
export async function revisarSesion(request) {
  let respuesta = NextResponse.next({ request });

  const config = leerConfig();
  if (!config) return { respuesta, valida: false };

  try {
    const supabase = createServerClient(config.url, config.clave, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(lista) {
          lista.forEach(({ name, value }) => request.cookies.set(name, value));
          respuesta = NextResponse.next({ request });
          lista.forEach(({ name, value, options }) => respuesta.cookies.set(name, value, options));
        },
      },
    });
    const { estado } = await evaluarSesion(supabase, config.usuarioId);
    return { respuesta, valida: estado === "ok" };
  } catch {
    return { respuesta, valida: false };
  }
}
