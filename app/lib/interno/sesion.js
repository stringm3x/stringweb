// Cómo está la sesión de /interno. Lo usan exigirCarlos() y proxy.js, para
// que los dos decidan igual. No importa nada de Next ni de Supabase: recibe
// el cliente ya hecho.
//
// Estados:
//   "ok"         sesión aal2 del usuario permitido
//   "aal1"       el usuario permitido, pero sin el código todavía
//   "otro"       hay sesión, pero de otro usuario
//   "sin-sesion" no hay sesión
//   "error"      Supabase falló o respondió algo raro
// Solo "ok" deja entrar.
export async function evaluarSesion(supabase, usuarioId) {
  try {
    // getUser() pregunta a Supabase: no se fía de la cookie.
    const { data, error } = await supabase.auth.getUser();
    const user = data?.user;
    if (error || !user) return { estado: "sin-sesion" };
    if (!usuarioId || user.id !== usuarioId) return { estado: "otro" };

    const { data: aal, error: errorAal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (errorAal || !aal) return { estado: "error" };
    if (aal.currentLevel !== "aal2") return { estado: "aal1", user };

    return { estado: "ok", user };
  } catch {
    return { estado: "error" };
  }
}
