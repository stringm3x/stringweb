import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Cliente de Supabase para páginas, layouts y server actions de /interno.
// La sesión vive en cookies; aquí solo se leen y, en las server actions, se
// escriben. Recibe la config de leerConfig() ya validada.
export async function crearClienteServidor(config) {
  const almacen = await cookies();
  return createServerClient(config.url, config.clave, {
    cookies: {
      getAll() {
        return almacen.getAll();
      },
      setAll(lista) {
        try {
          lista.forEach(({ name, value, options }) => almacen.set(name, value, options));
        } catch {
          // En un Server Component no se pueden escribir cookies; proxy.js
          // ya refrescó la sesión antes de llegar aquí.
        }
      },
    },
  });
}
