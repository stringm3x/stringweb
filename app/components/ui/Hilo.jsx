import { Entra } from "./Entra";

// El hilo (lote 12): una cuerda fina, a mano, que ondula suave a lo ancho del
// contenido, en lugar de la línea recta de arriba de una sección. Va sobre el
// borde superior de su sección (que es relative), sin mover el layout. Al
// entrar en pantalla se dibuja de izquierda a derecha (app/salas.css, .hilo);
// con menos movimiento, o si ya estaba a la vista, quieto y completo. Sin
// sonido. `sala`: dentro de una sección con el padding de SALA.
export function Hilo({ sala = false }) {
  const ancho = sala ? "inset-x-4 mx-auto max-w-contenido sm:inset-x-6 lg:inset-x-24" : "inset-x-0";
  return (
    <Entra aria-hidden="true" className={`hilo pointer-events-none absolute -top-3 h-6 ${ancho}`}>
      <svg viewBox="0 0 1200 24" preserveAspectRatio="none" className="hilo-trazo block h-full w-full overflow-visible">
        <path
          d="M0 12.4C120 7.6 210 8.8 320 12S520 16.6 640 12.6 860 7.4 980 11.2 1140 14.8 1200 12"
          fill="none"
          className="stroke-borde"
          strokeWidth="1.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Entra>
  );
}
