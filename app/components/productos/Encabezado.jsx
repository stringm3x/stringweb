import { ETIQUETA } from "../salas/estilos";
import { DibujoTarjeta, Tarjeta } from "../ui/Tarjeta";
import { LaminaBoaz } from "./LaminaBoaz";

// Bloque 1 de /productos (lote 9a): las dos líneas de STRING. Las tarjetas
// son anclas dentro de la página. Entra con la página (.entra-carga). Desde el
// lote 12 cada puerta lleva su dibujo: la lámina de Boaz sobre su papel y la
// pantalla con su obra.
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

// La lámina, recortada a la columna y su disco para que se lea en 180 px.
const DIBUJOS = {
  "#boaz": <LaminaBoaz decorativa viewBox="40 120 580 410" className="absolute inset-x-0 top-0 mx-auto h-full w-auto text-texto" />,
  "#medida": <DibujoTarjeta src="/arte/productos/medida.svg" />,
};

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
              <Tarjeta
                href={linea.href}
                dibujo={DIBUJOS[linea.href]}
                numero={`${linea.numero} · ${linea.nombre}`}
                papel={linea.href === "#boaz"}
                className="w-full"
              >
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
