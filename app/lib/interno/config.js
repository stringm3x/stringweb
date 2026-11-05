// Variables de /interno (CLAUDE.md § Rutas). Si falta una, devuelve null y
// nadie entra: falla cerrado. Proyecto de Supabase propio de STRING, nunca
// la base de Boaz. Sin service role.
//
// Se leen una por una y con su nombre literal para que Next las encuentre
// en el servidor y en proxy.js; las pruebas pasan su propio `env`.
function envDelProceso() {
  return {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    INTERNO_USUARIO_ID: process.env.INTERNO_USUARIO_ID,
  };
}

export function leerConfig(env = envDelProceso()) {
  const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const clave = (env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)?.trim();
  const usuarioId = env.INTERNO_USUARIO_ID?.trim();
  if (!url || !clave || !usuarioId) return null;
  return { url, clave, usuarioId };
}

export const RUTA_ENTRAR = "/interno/entrar";
export const RUTA_INICIO = "/interno/diagnostico";
