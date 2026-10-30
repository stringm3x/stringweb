import { ETIQUETA } from "../salas/estilos";
import { Tarjeta } from "../ui/Tarjeta";

// Bloque 1 de /productos (lote 9a): las dos líneas de STRING. Las tarjetas
// son anclas dentro de la página. Entra con la página (.entra-carga).
const LINEAS = [
  { numero: "01", nombre: "Productos", frase: "Listos para tu giro, por suscripción.", enlace: "Ver Boaz", href: "#boaz" },
  {
    numero: "02",
    nombre: "A la medida",
    frase: "Construidos para tu negocio, por proyecto.",
    enlace: "Ver la vitrina",
    href: "#medida",
  },
];

export function Encabezado() {
  return (
    <div data-theme="noche" className="bg-fondo px-4 pb-space-8 pt-32 text-texto sm:px-6 lg:px-24 lg:pt-40">
      <div className="entra-carga mx-auto flex max-w-contenido flex-col gap-space-7">
        <header className="flex max-w-[760px] flex-col gap-space-4">
          <p className={ETIQUETA}>PRODUCTOS</p>
          <h1 className="text-balance text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[60px] lg:text-[76px]">
            Un sistema listo o uno a tu medida.
          </h1>
          <p className="text-cuerpo-l text-texto-suave">
            STRING hace las dos cosas. Productos propios para un giro, que usas desde el primer día por
            una mensualidad. Y sistemas construidos para tu negocio, cada uno con su obra. Misma mano,
            misma calidad.
          </p>
        </header>

        <ul className="grid gap-space-5 md:grid-cols-2">
          {LINEAS.map((linea) => (
            <li key={linea.href} className="flex">
              <Tarjeta href={linea.href} className="flex w-full flex-col gap-space-3">
                <p className="font-mono text-etiqueta uppercase text-texto-suave">{linea.numero}</p>
                <p className="text-subtitulo">{linea.nombre}</p>
                <p className="text-cuerpo text-texto-suave">{linea.frase}</p>
                <p className="mt-auto flex items-center gap-space-2 text-cuerpo font-semibold text-texto">
                  {linea.enlace} <span aria-hidden="true">↓</span>
                </p>
              </Tarjeta>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
