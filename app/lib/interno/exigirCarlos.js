import "server-only";
import { notFound, redirect } from "next/navigation";
import { leerConfig, RUTA_ENTRAR } from "./config";
import { crearClienteServidor } from "./servidor";
import { evaluarSesion } from "./sesion";

// La puerta de /interno (CLAUDE.md § Rutas). Cada página, server action y
// route handler la llama primero. Solo pasa una sesión aal2 del usuario
// INTERNO_USUARIO_ID, comprobada en el servidor; todo lo demás falla
// cerrado:
//   sin variables, error, sin sesión o sin el código → /interno/entrar
//   sesión de otro usuario                            → cierra la sesión y 404
//
// Sobre "cierra la sesión": signOut() revoca la sesión en Supabase aunque
// en un Server Component no se pueda borrar la cookie; con la sesión
// revocada, la cookie que quede ya no sirve. En una server action, además,
// se borra.
export async function exigirCarlos() {
  const config = leerConfig();
  if (!config) redirect(RUTA_ENTRAR);

  let supabase;
  try {
    supabase = await crearClienteServidor(config);
  } catch {
    redirect(RUTA_ENTRAR);
  }

  const { estado, user } = await evaluarSesion(supabase, config.usuarioId);
  if (estado === "otro") {
    try {
      await supabase.auth.signOut();
    } catch {
      // Si no se pudo cerrar, igual no entra.
    }
    notFound();
  }
  if (estado !== "ok") redirect(RUTA_ENTRAR);

  return { supabase, user };
}
