"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { leerConfig, RUTA_ENTRAR, RUTA_INICIO } from "@/app/lib/interno/config";
import {
  COOKIE_INTENTOS,
  MAX_INTENTOS,
  firmarIntentos,
  idDeSesion,
  leerIntentos,
  opcionesCookieIntentos,
} from "@/app/lib/interno/intentos";
import { crearClienteServidor } from "@/app/lib/interno/servidor";
import { evaluarSesion } from "@/app/lib/interno/sesion";

// Las tres acciones de la entrada (CLAUDE.md § Rutas). Son las únicas de
// /interno que no llaman a exigirCarlos(): ocurren antes de tener aal2.
// Cada una valida por su cuenta y falla cerrado. El error es siempre el
// mismo: no dice si el correo existe, si la contraseña o el código
// fallaron, o si el usuario no es el permitido.
//
// redirect() lanza; por eso va fuera de los try.
const CON_ERROR = `${RUTA_ENTRAR}?error=1`;

async function cerrarSesion(supabase) {
  try {
    await supabase?.auth.signOut();
  } catch {
    // Si no se pudo cerrar, igual no entra.
  }
}

async function sesionId(supabase) {
  const { data } = await supabase.auth.getSession();
  return idDeSesion(data?.session?.access_token);
}

async function guardarIntentos(n, sid, config) {
  const almacen = await cookies();
  almacen.set(COOKIE_INTENTOS, firmarIntentos({ n, sid, uid: config.usuarioId }, config.secreto), opcionesCookieIntentos());
}

async function borrarIntentos() {
  const almacen = await cookies();
  almacen.delete({ name: COOKIE_INTENTOS, path: "/interno" });
}

// "Entrar" (contraseña): si quien inicia sesión no es INTERNO_USUARIO_ID,
// cierra la sesión de inmediato y responde el error genérico. Si es Carlos,
// la cuenta de códigos fallidos empieza en 0, ligada a esta sesión.
export async function entrar(formData) {
  const config = leerConfig();
  if (!config) redirect(CON_ERROR);

  const correo = String(formData.get("correo") ?? "").trim();
  const contrasena = String(formData.get("contrasena") ?? "");
  if (!correo || !contrasena) redirect(CON_ERROR);

  let supabase;
  let listo = false;
  try {
    supabase = await crearClienteServidor(config);
    const { data, error } = await supabase.auth.signInWithPassword({ email: correo, password: contrasena });
    if (!error && data?.user) {
      if (data.user.id === config.usuarioId) {
        const sid = await sesionId(supabase);
        if (sid) {
          await guardarIntentos(0, sid, config);
          listo = true;
        }
      }
      if (!listo) await cerrarSesion(supabase);
    }
  } catch {
    await cerrarSesion(supabase);
    listo = false;
  }

  if (!listo) redirect(CON_ERROR);
  // Sesión aal1 de Carlos: la entrada muestra el paso del código.
  redirect(RUTA_ENTRAR);
}

// "Verificar" (código).
// - Formato malo (no son 6 dígitos): solo error de validación; no llega a
//   Supabase ni cierra la sesión.
// - Antes: exige la sesión aal1 de Carlos; con otro UUID o sin sesión, la
//   cierra.
// - Código incorrecto: sigue en aal1, suma un intento y deja reintentar; al
//   quinto seguido, cierra la sesión y vuelve a correo y contraseña. Si la
//   cookie de intentos no se puede validar, cuenta como límite alcanzado.
// - Después: exige aal2 de Carlos; si no, cierra la sesión.
export async function verificar(formData) {
  const codigo = String(formData.get("codigo") ?? "").replace(/\s/g, "");
  if (!/^\d{6}$/.test(codigo)) redirect(CON_ERROR);

  const config = leerConfig();
  if (!config) redirect(CON_ERROR);

  let supabase;
  let resultado = "cerrar"; // "cerrar" | "reintentar" | "listo"
  try {
    supabase = await crearClienteServidor(config);
    const antes = await evaluarSesion(supabase, config.usuarioId);
    // Ya en aal2 (p. ej. doble envío): no hay nada que verificar.
    if (antes.estado === "ok") resultado = "listo";
    else if (antes.estado === "aal1") {
      const sid = await sesionId(supabase);
      const almacen = await cookies();
      const n = leerIntentos(almacen.get(COOKIE_INTENTOS)?.value, config.secreto, { sid, uid: config.usuarioId });

      if (n !== null && n < MAX_INTENTOS) {
        const { data: factores, error: errorFactores } = await supabase.auth.mfa.listFactors();
        const factor = errorFactores ? null : factores?.totp?.[0];
        if (factor) {
          const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: factor.id, code: codigo });
          if (!error) {
            const despues = await evaluarSesion(supabase, config.usuarioId);
            if (despues.estado === "ok") resultado = "listo";
          } else if (n + 1 < MAX_INTENTOS) {
            await guardarIntentos(n + 1, sid, config);
            resultado = "reintentar";
          }
        }
      }
    }
  } catch {
    resultado = "cerrar";
  }

  if (resultado === "reintentar") redirect(CON_ERROR);

  await borrarIntentos();
  if (resultado === "listo") redirect(RUTA_INICIO);
  await cerrarSesion(supabase);
  redirect(CON_ERROR);
}

// "Salir": solo cierra la sesión.
export async function salir() {
  const config = leerConfig();
  if (config) {
    try {
      await cerrarSesion(await crearClienteServidor(config));
    } catch {
      // Sin cliente no hay sesión que cerrar.
    }
  }
  await borrarIntentos();
  redirect(RUTA_ENTRAR);
}
