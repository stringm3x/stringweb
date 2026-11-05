import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { leerConfig, RUTA_INICIO } from "./config";
import { crearClienteServidor } from "./servidor";
import { evaluarSesion } from "./sesion";

// Qué paso de /interno/entrar se muestra, decidido en el servidor:
//   sesión aal2 de Carlos         → ya entró: a /interno/diagnostico
//   sesión aal1 de Carlos         → "codigo" (contraseña sí, código no)
//   cualquier otra cosa           → "credenciales"
// Sin variables o si Supabase falla, "credenciales": el formulario se ve,
// pero enviar no deja entrar.
export async function pasoDeEntrada() {
  await connection();
  const config = leerConfig();
  if (!config) return "credenciales";

  let estado = "error";
  try {
    const supabase = await crearClienteServidor(config);
    ({ estado } = await evaluarSesion(supabase, config.usuarioId));
  } catch {
    return "credenciales";
  }

  if (estado === "ok") redirect(RUTA_INICIO);
  if (estado === "aal1") return "codigo";
  return "credenciales";
}
