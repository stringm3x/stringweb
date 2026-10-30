import { CUERPO, ETIQUETA, SALA, TITULAR } from "../salas/estilos";
import { Entra } from "./Entra";

// Bloque 3 de /productos (lote 9a): los siguientes productos. El marco
// punteado es decorativo: sin nombres, giros ni fechas.
export function Siguientes() {
  return (
    <section data-theme="noche" aria-labelledby="siguientes" className={`${SALA} border-b border-hairline`}>
      <Entra className="mx-auto grid max-w-contenido items-center gap-space-6 md:grid-cols-2">
        <div className="flex flex-col gap-space-4">
          <p className={ETIQUETA}>LOS SIGUIENTES</p>
          <h2 id="siguientes" className={TITULAR}>
            Boaz es el primero.
          </h2>
          <p className={CUERPO}>
            Los siguientes productos nacen igual: de un sistema hecho para un negocio real, que funcionó y
            se volvió producto.
          </p>
        </div>
        <div aria-hidden="true" className="aspect-[224/206] w-full max-w-[240px] border border-dashed border-borde md:max-w-[360px] md:justify-self-end" />
      </Entra>
    </section>
  );
}
