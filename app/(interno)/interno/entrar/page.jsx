import { Campo, MensajeError } from "@/app/components/ui/Campo";
import { ETIQUETA } from "@/app/components/salas/estilos";
import { pasoDeEntrada } from "@/app/lib/interno/entrada";
import { entrar, verificar } from "../acciones";
import { BotonEnviar } from "../BotonEnviar";

// Textos de docs/textos.md § Interno.
export const metadata = { title: "Entrar" };

const ERROR = "No se pudo entrar. Revisa los datos.";
const ID_ERROR = "entrar-error";

// Dos pasos, decididos en el servidor: correo y contraseña; luego el código
// TOTP. Con una sesión aal1 de Carlos se muestra directo el código.
export default async function EntrarPage({ searchParams }) {
  const paso = await pasoDeEntrada();
  const { error } = await searchParams;
  const conError = error === "1";
  const describe = conError ? ID_ERROR : undefined;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col justify-center px-4 py-space-6">
      <p className={ETIQUETA}>STRING · Interno</p>
      <h1 className="mt-space-2 text-subtitulo">Entrar</h1>

      {conError && (
        <div role="alert" className="mt-space-4">
          <MensajeError id={ID_ERROR}>{ERROR}</MensajeError>
        </div>
      )}

      {paso === "codigo" ? (
        <form action={verificar} className="mt-space-4 flex flex-col gap-space-4">
          <Campo
            id="codigo"
            name="codigo"
            etiqueta="Código de 6 dígitos"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={12}
            enterKeyHint="done"
            autoFocus
            required
            aria-describedby={describe}
          />
          <BotonEnviar>Verificar</BotonEnviar>
        </form>
      ) : (
        <form action={entrar} className="mt-space-4 flex flex-col gap-space-4">
          <Campo
            id="correo"
            name="correo"
            etiqueta="Correo"
            type="email"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            required
            aria-describedby={describe}
          />
          <Campo
            id="contrasena"
            name="contrasena"
            etiqueta="Contraseña"
            type="password"
            autoComplete="current-password"
            required
            aria-describedby={describe}
          />
          <BotonEnviar>Entrar</BotonEnviar>
        </form>
      )}
    </main>
  );
}
