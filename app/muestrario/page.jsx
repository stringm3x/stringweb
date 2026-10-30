import { notFound } from "next/navigation";
import { Boton } from "@/app/components/ui/Boton";
import { Campo } from "@/app/components/ui/Campo";
import { Opciones } from "@/app/components/ui/Opciones";
import { Tarjeta } from "@/app/components/ui/Tarjeta";

// Muestrario de componentes (docs/calidad.md § 3), solo en desarrollo: de
// aquí salen las capturas de los 8 estados (e2e/componentes.spec.js). En
// producción da 404, no se indexa y no va en el sitemap. Los textos son de
// ejemplo y lo dicen.
export const metadata = {
  title: "Muestrario",
  robots: { index: false, follow: false },
};

const registrar = (nombre) => ({ name: nombre });

function Fila({ id, nombre, children }) {
  return (
    <div className="flex flex-col gap-space-2">
      <p className="font-mono text-etiqueta uppercase text-texto-suave">{nombre}</p>
      <div data-muestra={id} className="flex w-fit flex-wrap items-start gap-space-3 p-space-3">
        {children}
      </div>
    </div>
  );
}

function Botones({ tema }) {
  return (
    <>
      {["primario", "secundario"].map((variante) => (
        <div key={variante} className="flex flex-col gap-space-3">
          <h2 className="text-subtitulo">
            Botón {variante} · {tema}
          </h2>
          <Fila id={`${variante}-${tema}-reposo`} nombre="Reposo · hover · presionado · foco">
            <Boton variante={variante}>Botón de ejemplo</Boton>
          </Fila>
          <Fila id={`${variante}-${tema}-cargando`} nombre="Cargando">
            <Boton variante={variante} estado="cargando">Botón de ejemplo</Boton>
          </Fila>
          <Fila id={`${variante}-${tema}-deshabilitado`} nombre="Deshabilitado">
            <Boton variante={variante} disabled>Botón de ejemplo</Boton>
          </Fila>
          <Fila id={`${variante}-${tema}-exito`} nombre="Éxito">
            <Boton variante={variante} estado="exito">Botón de ejemplo</Boton>
          </Fila>
          <Fila id={`${variante}-${tema}-error`} nombre="Error">
            <Boton variante={variante} estado="error">Botón de ejemplo</Boton>
          </Fila>
        </div>
      ))}
      <div className="flex flex-col gap-space-3">
        <h2 className="text-subtitulo">Botón de texto · {tema}</h2>
        <Fila id={`texto-${tema}-reposo`} nombre="Reposo · hover · presionado · foco">
          <Boton variante="texto" href="/muestrario#texto">Enlace de ejemplo</Boton>
        </Fila>
        <Fila id={`texto-${tema}-deshabilitado`} nombre="Deshabilitado">
          <Boton variante="texto" disabled>Enlace de ejemplo</Boton>
        </Fila>
      </div>
    </>
  );
}

export default function Muestrario() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <main>
      <section data-theme="noche" className="flex flex-col gap-space-6 bg-fondo px-4 py-space-6 text-texto sm:px-6 lg:px-24">
        <h1 className="text-titulo">Muestrario (solo desarrollo)</h1>
        <Botones tema="noche" />

        <div className="flex flex-col gap-space-3">
          <h2 className="text-subtitulo">Campo de texto</h2>
          <Fila id="campo-reposo" nombre="Reposo · hover · foco">
            <div className="w-[300px]">
              <Campo id="m-reposo" etiqueta="Nombre (ejemplo)" placeholder="Texto de ejemplo" />
            </div>
          </Fila>
          <Fila id="campo-error" nombre="Error">
            <div className="w-[300px]">
              <Campo id="m-error" etiqueta="Nombre (ejemplo)" error="Mensaje de error de ejemplo." />
            </div>
          </Fila>
          <Fila id="campo-deshabilitado" nombre="Deshabilitado">
            <div className="w-[300px]">
              <Campo id="m-deshabilitado" etiqueta="Nombre (ejemplo)" disabled />
            </div>
          </Fila>
        </div>

        <div className="flex flex-col gap-space-3">
          <h2 className="text-subtitulo">Opción en píldora</h2>
          <Fila id="opcion-reposo" nombre="Reposo · hover · presionado · foco · elegida">
            <Opciones nombre="m-opcion" legenda="Pregunta de ejemplo" opciones={["Opción A", "Opción B"]} registrar={registrar} />
          </Fila>
          <Fila id="opcion-error" nombre="Error">
            <Opciones nombre="m-opcion-error" legenda="Pregunta de ejemplo" opciones={["Opción A", "Opción B"]} registrar={registrar} error="Mensaje de error de ejemplo." />
          </Fila>
          <Fila id="opcion-deshabilitado" nombre="Deshabilitado">
            <Opciones nombre="m-opcion-off" legenda="Pregunta de ejemplo" opciones={["Opción A", "Opción B"]} registrar={registrar} disabled />
          </Fila>
        </div>

        <div className="flex flex-col gap-space-3">
          <h2 className="text-subtitulo">Tarjeta</h2>
          <Fila id="tarjeta-reposo" nombre="Reposo · hover · presionado · foco">
            <Tarjeta href="/muestrario#tarjeta" className="w-[300px]">
              <p className="text-subtitulo">Tarjeta de ejemplo</p>
              <p className="text-cuerpo text-texto-suave">Enlace a una página.</p>
            </Tarjeta>
          </Fila>
        </div>
      </section>

      <section data-theme="pared" className="flex flex-col gap-space-6 bg-fondo px-4 py-space-6 text-texto sm:px-6 lg:px-24">
        <Botones tema="pared" />
      </section>
    </main>
  );
}
