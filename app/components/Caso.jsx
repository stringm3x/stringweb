import { SOCIOS_CARGADOS, SOCIOS_ACTIVOS } from "@/app/lib/stats";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";
import { Mancuerna } from "@/app/components/ilustraciones/Mancuerna";
import { PintarAlScroll } from "@/app/components/PintarAlScroll";
import { MarcasRegistro } from "@/app/components/ui/MarcasRegistro";

const FILAS = [
  {
    etiqueta: "ANTES",
    texto:
      "Hojas de cálculo y automatizaciones sueltas. El control del gimnasio vivía en la memoria del dueño.",
  },
  {
    etiqueta: "SE HIZO",
    texto:
      "Migración completa a STRING GYM: socios, check-in, caja, inventario y avisos automáticos por WhatsApp.",
  },
  {
    etiqueta: "HOY",
    texto: "El sistema cobra, controla el acceso y avisa al dueño solo.",
    etiquetaAcido: true,
  },
];

// Caso real de Evolution GYM, reutilizado en la home y en /saas.
export function Caso({ mostrarBotonSaas = true }) {
  return (
    <section className="bg-black px-6 lg:px-24 py-espacio-6 lg:py-espacio-7">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Etiqueta variante="linea">Caso real · CDMX</Etiqueta>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Ilustración */}
          <div className="lg:w-[520px] flex-shrink-0 space-y-3">
            <PintarAlScroll className="relative">
              <Mancuerna className="w-full h-auto" />
              <MarcasRegistro className="text-tinta-papel/50" />
            </PintarAlScroll>
            <p className="font-mono uppercase text-etiqueta text-tinta-tenue">
              El gimnasio del fundador · operando con STRING GYM
            </p>
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <h2 className="font-anton uppercase text-titular-m lg:text-[76px] lg:leading-[70px] text-white mb-8">
              Evolution GYM
            </h2>

            <div className="mb-10">
              {FILAS.map((fila) => (
                <div key={fila.etiqueta} className="flex gap-6 py-5 border-t border-linea">
                  <span
                    className={`font-mono uppercase text-etiqueta flex-shrink-0 w-[90px] ${
                      fila.etiquetaAcido ? "text-acido" : "text-tinta-tenue"
                    }`}
                  >
                    {fila.etiqueta}
                  </span>
                  <p className="text-tinta-suave text-cuerpo-s">{fila.texto}</p>
                </div>
              ))}
              <div className="border-t border-linea" />
            </div>

            {/* Cifras */}
            <PintarAlScroll className="flex flex-wrap gap-10 mb-10">
              <div>
                <p className="font-anton text-acido text-[72px] leading-none">
                  {SOCIOS_CARGADOS}
                </p>
                {/* Trazo que se dibuja bajo la cifra al entrar en pantalla */}
                <svg viewBox="0 0 120 10" aria-hidden="true" className="mt-1 h-[10px] w-[120px]">
                  <g data-brochada>
                    <path d="M 2 7 C 30 4 60 2 118 4 L 118 8 C 60 6 30 8 2 10 Z" className="fill-acido" />
                  </g>
                </svg>
                <p className="mt-2 font-mono uppercase text-etiqueta text-tinta-tenue">
                  Socios cargados
                </p>
              </div>
              <div>
                <p className="font-anton text-acido text-[72px] leading-none">
                  {SOCIOS_ACTIVOS}
                </p>
                <p className="mt-2 font-mono uppercase text-etiqueta text-tinta-tenue">
                  Activos hoy
                </p>
              </div>
            </PintarAlScroll>

            {/* Pie de sección */}
            <div className="border-t-2 border-acido pt-6 space-y-4">
              <p className="text-tinta text-cuerpo-l">
                El fundador opera su propio gimnasio con este sistema, todos
                los días.
              </p>
              {mostrarBotonSaas && (
                <Boton href="/saas" variante="secundario">
                  Ver STRING GYM
                </Boton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
