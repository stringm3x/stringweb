import { Boton } from "@/app/components/ui/Boton";
import { exigirCarlos } from "@/app/lib/interno/exigirCarlos";
import { salir } from "../acciones";

// La segunda puerta de /interno (la primera es proxy.js): todo lo que
// cuelga de aquí exige la sesión aal2 de Carlos. /interno/entrar queda
// fuera de este grupo. Las páginas vuelven a llamar a exigirCarlos(): el
// layout no se vuelve a ejecutar al navegar entre ellas.
export default async function ProtegidoLayout({ children }) {
  await exigirCarlos();

  return (
    <>
      <header className="border-b border-borde">
        <div className="mx-auto flex min-h-[64px] w-full max-w-[640px] items-center justify-between gap-space-3 px-4">
          <p className="font-mono text-etiqueta uppercase text-texto">STRING · Interno</p>
          <form action={salir}>
            <Boton variante="secundario" type="submit" compacto>
              Salir
            </Boton>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[640px] px-4 py-space-5">{children}</main>
    </>
  );
}
