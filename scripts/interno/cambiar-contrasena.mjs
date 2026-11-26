#!/usr/bin/env node
// Cambio de la contraseña de Carlos para /interno, sin tocar el TOTP. Se corre a
// mano, una vez, en su Mac, desde la raíz del repo:
//
//   read -rs SUPABASE_SERVICE_ROLE_KEY && export SUPABASE_SERVICE_ROLE_KEY
//   node scripts/interno/cambiar-contrasena.mjs
//   unset SUPABASE_SERVICE_ROLE_KEY
//
// Nada del sitio importa este archivo. Es, con enrolar-totp.mjs, una de las dos
// excepciones a "Supabase solo en app/(interno)/ y app/lib/interno/".
//
// - La clave service role sale SOLO de la variable de entorno exportada en la
//   terminal: no se lee de .env.local ni de ningún archivo, y nunca se imprime.
// - La contraseña nueva se pide dos veces, oculta (ni asteriscos), y no se
//   escribe a disco, a logs ni a la pantalla.
// - Solo cambia la contraseña (auth.admin.updateUserById). Los factores MFA
//   (el TOTP) no se tocan.
// De .env.local solo lee NEXT_PUBLIC_SUPABASE_URL e INTERNO_USUARIO_ID.

import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const MINIMO = 12;

function salir(mensaje, codigo = 1) {
  process.stdout.write(`\n${mensaje}\n`);
  process.exit(codigo);
}

// Solo el código y el estado HTTP de Supabase, para saber qué arreglar. Nunca
// el mensaje completo (podría repetir datos de la petición).
const limpio = (v) => (v === undefined || v === null ? "?" : String(v).replace(/[^\w.-]/g, "").slice(0, 64) || "?");
const detalle = (error) => `código: ${limpio(error?.code)} · estado: ${limpio(error?.status)}`;

// --- Variables ------------------------------------------------------------
// La clave se toma ANTES de cargar .env.local: si alguien la hubiera puesto
// ahí, no cuenta.
const CLAVE_SERVICIO = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
delete process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!CLAVE_SERVICIO) {
  salir(
    "Falta SUPABASE_SERVICE_ROLE_KEY. Expórtala en esta terminal (no en .env.local):\n" +
      "  read -rs SUPABASE_SERVICE_ROLE_KEY && export SUPABASE_SERVICE_ROLE_KEY"
  );
}

try {
  process.loadEnvFile(".env.local");
} catch {
  salir("No encontré .env.local. Corre el script desde la raíz del repo.");
}
delete process.env.SUPABASE_SERVICE_ROLE_KEY;

const URL_SUPABASE = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const USUARIO_ID = process.env.INTERNO_USUARIO_ID?.trim();
const CLAVE_PUBLICA = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)?.trim();

if (!URL_SUPABASE || !USUARIO_ID) {
  salir("Faltan variables en .env.local: NEXT_PUBLIC_SUPABASE_URL e INTERNO_USUARIO_ID.");
}
if (CLAVE_PUBLICA && CLAVE_SERVICIO === CLAVE_PUBLICA) {
  salir("Esa es la clave pública (anon/publishable), no la service role. Revisa cuál copiaste.");
}

if (!process.stdin.isTTY) salir("Córrelo en una terminal interactiva.");

// --- Pregunta oculta ---------------------------------------------------------
function preguntarOculto(texto) {
  return new Promise((resolve) => {
    process.stdout.write(texto);
    const entrada = process.stdin;
    entrada.setRawMode(true);
    entrada.resume();
    entrada.setEncoding("utf8");
    let valor = "";
    const alTeclear = (teclas) => {
      for (const c of teclas) {
        if (c === "\r" || c === "\n" || c === "\u0004") {
          entrada.setRawMode(false);
          entrada.pause();
          entrada.removeListener("data", alTeclear);
          process.stdout.write("\n");
          resolve(valor);
          return;
        }
        if (c === "\u0003") {
          entrada.setRawMode(false);
          salir("Cancelado. No se cambió nada.");
        }
        if (c === "\u007f" || c === "\b") valor = valor.slice(0, -1);
        else valor += c;
      }
    };
    entrada.on("data", alTeclear);
  });
}

// --- Cambio -----------------------------------------------------------------
// Cliente admin sin sesión ni almacenamiento: nada toca disco.
const supabase = createClient(URL_SUPABASE, CLAVE_SERVICIO, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});

process.stdout.write("Cambio de contraseña de /interno (STRING). El TOTP no se toca.\n\n");

// Antes de pedir nada: que la clave sirva y que el usuario exista.
const { data: antes, error: errorUsuario } = await supabase.auth.admin.getUserById(USUARIO_ID);
if (errorUsuario || !antes?.user) {
  salir(
    "No pude leer el usuario INTERNO_USUARIO_ID. ¿La clave es la service role de este mismo proyecto?\n" +
      `(${errorUsuario ? detalle(errorUsuario) : "código: sin_usuario · estado: ?"})`
  );
}
const factoresAntes = (antes.user.factors ?? []).filter((f) => f.status === "verified").length;
process.stdout.write(`Usuario: ${antes.user.email ?? "(sin correo)"}\n\n`);

let contrasena = "";
for (let intento = 1; intento <= 3; intento++) {
  const primera = await preguntarOculto(`Contraseña nueva (mínimo ${MINIMO} caracteres): `);
  if (primera.length < MINIMO) {
    process.stdout.write(`Muy corta: necesita al menos ${MINIMO} caracteres.\n\n`);
    continue;
  }
  const segunda = await preguntarOculto("Repítela: ");
  if (primera !== segunda) {
    process.stdout.write("No coinciden. Otra vez.\n\n");
    continue;
  }
  contrasena = primera;
  break;
}
if (!contrasena) salir("Tres intentos sin una contraseña válida. No se cambió nada.");

const { error: errorCambio } = await supabase.auth.admin.updateUserById(USUARIO_ID, { password: contrasena });
contrasena = "";
if (errorCambio) {
  salir(`Supabase no aceptó el cambio. No se cambió nada.\n(${detalle(errorCambio)})`);
}

// Confirmación: el TOTP sigue ahí.
const { data: despues } = await supabase.auth.admin.getUserById(USUARIO_ID);
const factoresDespues = (despues?.user?.factors ?? []).filter((f) => f.status === "verified").length;
const totp =
  factoresDespues === factoresAntes
    ? `El TOTP sigue igual (${factoresDespues} factor${factoresDespues === 1 ? "" : "es"} verificado${factoresDespues === 1 ? "" : "s"}).`
    : "Ojo: el número de factores cambió. Revisa Authentication → Users en Supabase.";
salir(`Listo: contraseña cambiada. ${totp}\nEntra en /interno/entrar con la nueva y tu código.`, 0);
