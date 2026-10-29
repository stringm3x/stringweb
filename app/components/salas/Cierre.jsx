import { whatsappUrl } from "@/app/lib/contacto";
import { Boton } from "../ui/Boton";
import { CUERPO, SALA, TITULAR } from "./estilos";

// Cierre de la portada (docs/textos.md): el botón verde y, más chico,
// WhatsApp para quien prefiere escribir.
export function Cierre() {
  return (
    <section data-theme="noche" className={`${SALA} border-t border-hairline`}>
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-space-4 text-center">
        <h2 className={TITULAR}>Cuéntanos qué necesita tu negocio.</h2>
        <Boton href="/diagnostico" variante="primario">
          Solicitar diagnóstico
        </Boton>
        <p className={CUERPO}>Te respondemos en un día hábil.</p>
        <p className={`flex flex-wrap items-center justify-center gap-space-3 ${CUERPO}`}>
          ¿Prefieres escribir?{" "}
          <Boton href={whatsappUrl()} variante="secundario">
            Escríbenos por WhatsApp
          </Boton>
        </p>
      </div>
    </section>
  );
}
