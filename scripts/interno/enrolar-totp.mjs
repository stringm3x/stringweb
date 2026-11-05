#!/usr/bin/env node
// Alta del TOTP de Carlos para /interno. Se corre UNA vez, a mano, en su Mac:
//
//   node scripts/interno/enrolar-totp.mjs
//
// Nada del sitio importa este archivo. Es la única excepción a "Supabase solo
// en app/(interno)/ y app/lib/interno/" (CLAUDE.md § Rutas).
//
// No guarda nada: ni la contraseña, ni el secreto, ni el URI otpauth:// se
// escriben a disco ni a logs. La sesión vive solo en memoria y se cierra al
// final. La contraseña se pide oculta. El URI solo se muestra en pantalla y,
// al confirmar, se borra la pantalla (y su historial de desplazamiento).
// Lee las variables de .env.local.

import process from "node:process";
import readline from "node:readline";
import { createClient } from "@supabase/supabase-js";

function salir(mensaje, codigo = 1) {
  process.stdout.write(`\n${mensaje}\n`);
  process.exit(codigo);
}

// --- Variables ------------------------------------------------------------
try {
  process.loadEnvFile(".env.local");
} catch {
  salir("No encontré .env.local. Corre el script desde la raíz del repo.");
}

const URL_SUPABASE = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const CLAVE = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)?.trim();
const USUARIO_ID = process.env.INTERNO_USUARIO_ID?.trim();

if (!URL_SUPABASE || !CLAVE || !USUARIO_ID) {
  salir(
    "Faltan variables en .env.local: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY " +
      "(o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) e INTERNO_USUARIO_ID."
  );
}

if (!process.stdin.isTTY) salir("Córrelo en una terminal interactiva.");

// --- Preguntas --------------------------------------------------------------
// Visible: correo y código (el código caduca en segundos).
function preguntar(texto) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true, historySize: 0 });
  return new Promise((resolve) => {
    rl.question(texto, (respuesta) => {
      rl.close();
      resolve(respuesta.trim());
    });
  });
}

// Oculta: la contraseña no se dibuja ni con asteriscos.
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
          salir("Cancelado.");
        }
        if (c === "\u007f" || c === "\b") valor = valor.slice(0, -1);
        else valor += c;
      }
    };
    entrada.on("data", alTeclear);
  });
}

// Borra la pantalla y el historial de desplazamiento de la terminal.
function borrarPantalla() {
  process.stdout.write("\x1b[2J\x1b[3J\x1b[H");
}

// --- Alta -------------------------------------------------------------------
// Sin almacenamiento: la sesión no toca disco y no se refresca sola.
const supabase = createClient(URL_SUPABASE, CLAVE, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});

async function cerrarYSalir(mensaje, codigo) {
  await supabase.auth.signOut({ scope: "local" }).catch(() => {});
  salir(mensaje, codigo);
}

process.stdout.write("Alta del TOTP de /interno (STRING)\n\n");
const correo = await preguntar("Correo: ");
const contrasena = await preguntarOculto("Contraseña: ");

const { data: sesion, error: errorEntrar } = await supabase.auth.signInWithPassword({
  email: correo,
  password: contrasena,
});
if (errorEntrar || !sesion?.user) {
  // Solo el código y el estado HTTP de Supabase (p. ej. invalid_credentials,
  // email_not_confirmed), para saber qué arreglar. Nunca el mensaje completo,
  // la contraseña, el token ni el URI.
  const limpio = (v) => (v === undefined || v === null ? "?" : String(v).replace(/[^\w.-]/g, "").slice(0, 64) || "?");
  const detalle = errorEntrar
    ? `código: ${limpio(errorEntrar.code)} · estado: ${limpio(errorEntrar.status)}`
    : "código: sin_usuario · estado: ?";
  salir(`No se pudo entrar. Revisa los datos.\n(${detalle})`);
}
if (sesion.user.id !== USUARIO_ID) {
  await cerrarYSalir("Este usuario no es INTERNO_USUARIO_ID. No se dio de alta nada.");
}

const { data: factores, error: errorFactores } = await supabase.auth.mfa.listFactors();
if (errorFactores) await cerrarYSalir("Supabase no respondió la lista de factores. Intenta de nuevo.");

if ((factores.totp ?? []).length > 0) {
  await cerrarYSalir("Ya tienes un TOTP verificado. No se creó otro.", 0);
}

// Altas a medias de un intento anterior: se quitan para empezar limpio.
for (const f of factores.all ?? []) {
  if (f.factor_type === "totp" && f.status !== "verified") {
    await supabase.auth.mfa.unenroll({ factorId: f.id });
  }
}

const { data: alta, error: errorAlta } = await supabase.auth.mfa.enroll({
  factorType: "totp",
  friendlyName: "STRING interno",
});
if (errorAlta || !alta?.totp?.uri) await cerrarYSalir("Supabase no pudo crear el factor. ¿Está activo MFA TOTP en el proyecto?");

process.stdout.write(
  "\n⚠  SECRETO. Este URI es la llave de tu código. No lo compartas, no le tomes captura,\n" +
    "   no lo pegues en ningún lado. Agrégalo a tu app de códigos (la clave manual es el valor\n" +
    "   de secret=) y luego presiona Enter: la pantalla se borra.\n\n" +
    `${alta.totp.uri}\n\n`
);
await preguntar("Enter cuando lo hayas agregado… ");
borrarPantalla();

for (let intento = 1; intento <= 3; intento++) {
  const codigo = await preguntar("Código de 6 dígitos: ");
  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: alta.id, code: codigo });
  if (!error) await cerrarYSalir("Listo: TOTP verificado. Ya puedes entrar en /interno/entrar.", 0);
  process.stdout.write("Ese código no sirvió.\n");
}

// Tres intentos fallidos: el factor sin verificar no sirve; se quita.
await supabase.auth.mfa.unenroll({ factorId: alta.id }).catch(() => {});
await cerrarYSalir("No se verificó. Quité el factor; vuelve a correr el script.");
