import { exigirCarlos } from "@/app/lib/interno/exigirCarlos";
import { salir } from "../acciones";
import { BarraInterna } from "./BarraInterna";
import { Captura } from "./Captura";

// La segunda puerta de /interno (la primera es proxy.js): todo lo que
// cuelga de aquí exige la sesión aal2 de Carlos. /interno/entrar queda
// fuera de este grupo. Las páginas vuelven a llamar a exigirCarlos(): el
// layout no se vuelve a ejecutar al navegar entre ellas.
export default async function ProtegidoLayout({ children }) {
  await exigirCarlos();

  return (
    <Captura>
      <BarraInterna salir={salir} />
      <main className="mx-auto w-full max-w-[640px] px-4 py-space-5">{children}</main>
    </Captura>
  );
}
