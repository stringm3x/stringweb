import { ETIQUETA } from "../salas/estilos";

// "Cómo se ve" de cada nivel (docs/textos.md § Ejemplos y textos
// alternativos de los niveles): una pantalla de ejemplo, siempre con la
// etiqueta EJEMPLO. Solo lleva los textos de ese documento; donde haría
// falta una cifra, va una barra.
const CAJA = "flex flex-col gap-space-3 rounded-lg border border-hairline bg-superficie p-space-3";
const PIE = "font-mono text-etiqueta uppercase text-texto-suave";

function Barra({ ancho = "w-16" }) {
  return <span aria-hidden="true" className={`block h-2 rounded-pill bg-hairline ${ancho}`} />;
}

const PANTALLAS = {
  responde: () => (
    <>
      <p className="max-w-[85%] self-start rounded-lg rounded-bl-none bg-hairline px-space-3 py-space-2 text-pequeno text-texto">
        Hola, ¿tienen lugar hoy en la tarde?
      </p>
      <p className="max-w-[85%] self-end rounded-lg rounded-br-none bg-acento px-space-3 py-space-2 text-pequeno text-sobre-acento">
        ¡Hola! Ya recibimos tu mensaje. En unos minutos te atendemos.
      </p>
      <p className={`${PIE} self-end`}>RESPUESTA AUTOMÁTICA · AL INSTANTE</p>
    </>
  ),
  organiza: () => (
    <>
      <p className="flex items-center gap-space-2 rounded-pill border border-hairline px-space-3 py-space-1 text-pequeno text-texto">
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-pill bg-acento" />
        Nuevo prospecto: Marco
      </p>
      <ul className="flex flex-col">
        {["Ana · Nuevo", "Luis · Interesado", "Sofía · Cliente"].map((fila) => (
          <li key={fila} className="border-t border-hairline py-space-2 text-pequeno text-texto">
            {fila}
          </li>
        ))}
      </ul>
    </>
  ),
  automatiza: () => (
    <>
      <ul className="flex flex-col">
        {["17:00 · Paty · Corte", "18:30 · Jorge · Barba"].map((fila) => (
          <li key={fila} className="border-t border-hairline py-space-2 font-mono text-pequeno text-texto">
            {fila}
          </li>
        ))}
      </ul>
      <p className="flex items-start gap-space-2 text-pequeno text-texto-suave">
        <span aria-hidden="true" className="text-acento">
          ✓
        </span>
        Recordatorio enviado a Paty · mañana 17:00
      </p>
    </>
  ),
  controla: () => (
    <>
      <div className="grid grid-cols-3 gap-space-2">
        {["Clientes", "Por cobrar", "Este mes"].map((indicador) => (
          <div key={indicador} className="flex flex-col gap-space-2 rounded border border-hairline p-space-2">
            <span className="text-[12px] leading-tight text-texto-suave">{indicador}</span>
            <Barra ancho="w-3/4" />
          </div>
        ))}
      </div>
      <svg viewBox="0 0 260 90" aria-hidden="true" className="h-auto w-full">
        <polyline
          points="4,80 50,68 92,72 134,46 176,52 256,10"
          fill="none"
          stroke="rgb(var(--acento))"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <line x1="4" y1="86" x2="256" y2="86" stroke="rgb(var(--hairline))" strokeWidth="1" />
      </svg>
      <p className={PIE}>SIN DATOS REALES</p>
    </>
  ),
  empresa: () => (
    <ol className="flex flex-wrap items-center gap-space-2 text-pequeno text-texto">
      {["Venta", "Almacén", "Entrega", "Cobranza"].map((paso, i, todos) => (
        <li key={paso} className="flex items-center gap-space-2">
          <span className="rounded border border-dashed border-texto-suave px-space-2 py-space-1">{paso}</span>
          {i < todos.length - 1 && <span aria-hidden="true">→</span>}
        </li>
      ))}
    </ol>
  ),
};

export function Ejemplo({ nivel }) {
  const Pantalla = PANTALLAS[nivel.slug];
  return (
    <figure aria-label={`Ejemplo: ${nivel.ejemplo}`} className="flex w-full flex-col gap-space-2 lg:max-w-[300px]">
      <p className={ETIQUETA}>EJEMPLO</p>
      <div className={CAJA}>
        <Pantalla />
      </div>
    </figure>
  );
}
