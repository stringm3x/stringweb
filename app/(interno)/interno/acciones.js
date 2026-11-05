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

// Solo en desarrollo: en la consola del servidor, el código y el estado HTTP
// de los errores de Supabase y el estado del flujo. Nunca el código TOTP, el
// secreto, los tokens ni la cookie.
const EN_DESARROLLO = process.env.NODE_ENV !== "production";
function registrar(paso, datos) {
  if (!EN_DESARROLLO) return;
  try {
    console.warn(`[interno] ${paso}`, JSON.stringify(datos));
  } catch {
    // Registrar nunca cambia el resultado.
  }
}
const errorBreve = (e) => ({ code: e?.code ?? null, status: e?.status ?? null });

// El factor TOTP VERIFICADO de Carlos, leído de `all` (no del primero de la
// lista ni de uno sin verificar). El script de alta deja uno solo; si hubiera
// más, el más reciente.
function factorTotpVerificado(factores) {
  const verificados = (factores?.all ?? []).filter((f) => f.factor_type === "totp" && f.status === "verified");
  if (verificados.length > 1) registrar("verificar: varios TOTP verificados", { cuantos: verificados.length });
  return verificados.sort((a, b) => String(b.created_at ?? "").localeCompare(String(a.created_at ?? "")))[0] ?? null;
}

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
// - Se quitan espacios, guiones y todo lo que no sea dígito. Si no quedan 6
//   dígitos: solo error de validación; no llega a Supabase ni cierra la sesión.
// - Antes: exige la sesión aal1 de Carlos; con otro UUID o sin sesión, la
//   cierra.
// - Código incorrecto: sigue en aal1, suma un intento y deja reintentar; al
//   quinto seguido, cierra la sesión y vuelve a correo y contraseña. Si la
//   cookie de intentos no se puede validar, cuenta como límite alcanzado.
// - Después: exige aal2 de Carlos; si no, cierra la sesión.
export async function verificar(formData) {
  // El autollenado a veces mete "756 606" o "756-606": fuera todo lo que no
  // sea dígito y luego se exigen 6.
  const escrito = String(formData.get("codigo") ?? "");
  const codigo = escrito.replace(/\D/g, "");
  if (!/^\d{6}$/.test(codigo)) {
    // Ni el código ni parte de él: solo cuántos dígitos quedaron.
    registrar("verificar: formato", { digitos: codigo.length, traiaOtros: escrito.length !== codigo.length });
    redirect(CON_ERROR);
  }

  const config = leerConfig();
  if (!config) redirect(CON_ERROR);

  let supabase;
  let resultado = "cerrar"; // "cerrar" | "reintentar" | "listo"
  try {
    supabase = await crearClienteServidor(config);
    const antes = await evaluarSesion(supabase, config.usuarioId);
    registrar("verificar: sesión antes", { estado: antes.estado });
    // Ya en aal2 (p. ej. doble envío): no hay nada que verificar.
    if (antes.estado === "ok") resultado = "listo";
    else if (antes.estado === "aal1") {
      const sid = await sesionId(supabase);
      const almacen = await cookies();
      const valorIntentos = almacen.get(COOKIE_INTENTOS)?.value;
      const n = leerIntentos(valorIntentos, config.secreto, { sid, uid: config.usuarioId });
      registrar("verificar: intentos leídos", { n, hayCookie: Boolean(valorIntentos), haySid: Boolean(sid) });

      if (n !== null && n < MAX_INTENTOS) {
        const { data: factores, error: errorFactores } = await supabase.auth.mfa.listFactors();
        if (errorFactores) registrar("listFactors", errorBreve(errorFactores));
        const factor = errorFactores ? null : factorTotpVerificado(factores);
        if (!factor) registrar("verificar: sin factor TOTP verificado", { factores: factores?.all?.length ?? 0 });

        if (factor) {
          // Challenge y verify por separado, con el id de ese challenge, para
          // saber cuál de los dos falla.
          const { data: reto, error: errorReto } = await supabase.auth.mfa.challenge({ factorId: factor.id });
          if (errorReto || !reto?.id) {
            registrar("challenge", errorBreve(errorReto));
          } else {
            const { error: errorVerify } = await supabase.auth.mfa.verify({
              factorId: factor.id,
              challengeId: reto.id,
              code: codigo,
            });
            if (!errorVerify) {
              const despues = await evaluarSesion(supabase, config.usuarioId);
              registrar("verificar: sesión después", { estado: despues.estado });
              if (despues.estado === "ok") resultado = "listo";
            } else {
              registrar("verify", errorBreve(errorVerify));
              if (n + 1 < MAX_INTENTOS) {
                await guardarIntentos(n + 1, sid, config);
                registrar("verificar: intentos escritos", { n: n + 1 });
                resultado = "reintentar";
              }
            }
          }
        }
      }
    }
  } catch (e) {
    registrar("verificar: excepción", { nombre: e?.name ?? null, ...errorBreve(e) });
    resultado = "cerrar";
  }

  registrar("verificar: resultado", { resultado });
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
