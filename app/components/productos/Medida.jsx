import { CUERPO, ETIQUETA, SALA, TITULAR } from "../salas/estilos";
import { Boton } from "../ui/Boton";
import { Tarjeta } from "../ui/Tarjeta";
import { Entra } from "./Entra";

// Bloque 4 de /productos (lote 9a): a la medida. La vitrina enseña cómo se
// ve lo que construimos con ejemplos, nunca como clientes: cada tarjeta
// lleva la píldora EJEMPLO y su pantalla dice DATOS DE EJEMPLO. Cada una es
// un enlace completo a su nivel. Las pantallas van en HTML, no en imagen.
const CAJA = "flex flex-col gap-space-3 rounded-lg border border-hairline bg-superficie p-space-3";
const PIE = "font-mono text-etiqueta uppercase text-texto-suave";
const FILA = "border-t border-hairline py-space-2 text-pequeno text-texto";

const VITRINA = [
  {
    giro: "RESTAURANTE",
    nivel: "responde",
    titular: "Nadie se queda sin respuesta.",
    frase: "Contesta al instante por WhatsApp y toma la reservación.",
    precio: "RESPONDE · DESDE $8,000",
    pantalla: (
      <>
        <p className="max-w-[85%] self-start rounded-lg rounded-bl-none bg-hairline px-space-3 py-space-2 text-pequeno text-texto">
          “¿Tienen mesa para 4 hoy a las 9?”
        </p>
        <p className="max-w-[85%] self-end rounded-lg rounded-br-none bg-acento px-space-3 py-space-2 text-pequeno text-sobre-acento">
          “Hola, ya recibimos tu mensaje. En unos minutos te confirmamos.”
        </p>
      </>
    ),
  },
  {
    giro: "CLÍNICA",
    nivel: "organiza",
    titular: "Cada paciente nuevo, en su lugar.",
    frase: "Registra a quien pregunta, qué le interesa y si ya agendó.",
    precio: "ORGANIZA · DESDE $18,000",
    pantalla: (
      <>
        <p className="flex items-center gap-space-2 self-start rounded-pill border border-hairline px-space-3 py-space-1 text-pequeno text-texto">
          <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-pill bg-acento" />
          Nuevo prospecto por WhatsApp
        </p>
        <ul className="flex flex-col">
          {[
            ["Consulta general", "NUEVO"],
            ["Limpieza dental", "AGENDÓ"],
          ].map(([fila, estado]) => (
            <li key={fila} className={`flex items-center justify-between gap-space-2 ${FILA}`}>
              {fila}
              <span className="font-mono text-etiqueta text-texto-suave">{estado}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    giro: "BARBERÍA",
    nivel: "automatiza",
    titular: "La agenda se llena sola.",
    frase: "Agenda la cita, manda el recordatorio y da seguimiento.",
    precio: "AUTOMATIZA · DESDE $28,000",
    pantalla: (
      <>
        <p className={PIE}>AGENDA DE HOY</p>
        <ul className="flex flex-col">
          {["17:00 · Corte", "18:30 · Barba"].map((fila) => (
            <li key={fila} className={`font-mono ${FILA}`}>
              {fila}
            </li>
          ))}
        </ul>
        <p className="flex items-start gap-space-2 text-pequeno text-texto-suave">
          <span aria-hidden="true" className="text-acento">
            ✓
          </span>
          Recordatorio enviado · mañana 17:00
        </p>
      </>
    ),
  },
  {
    giro: "TIENDA EN LÍNEA",
    nivel: "controla",
    titular: "Tu tienda, con tu nombre.",
    frase: "Catálogo, carrito, pagos, inventario y pedidos en un solo sistema.",
    precio: "CONTROLA · DESDE $40,000",
    pantalla: (
      <>
        <p className={PIE}>PEDIDOS</p>
        <ul className="flex flex-col">
          <li className={`font-mono ${FILA}`}>#0001 · Pagado · Por enviar</li>
          <li className={`flex items-center justify-between gap-space-2 ${FILA}`}>
            Inventario
            <span className="font-mono text-etiqueta text-texto-suave">QUEDAN 3</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    giro: "EMPRESA",
    nivel: "empresa",
    ancha: true,
    titular: "Toda la operación, conectada.",
    frase: "Une venta, almacén, entrega y cobranza, con un panel por sucursal.",
    precio: "EMPRESA · SE COTIZA",
    pantalla: (
      <ol className="flex flex-wrap items-center gap-space-2 text-pequeno text-texto">
        {["Venta", "Almacén", "Entrega", "Cobranza"].map((paso, i, todos) => (
          <li key={paso} className="flex items-center gap-space-2">
            <span className="rounded border border-dashed border-texto-suave px-space-2 py-space-1">{paso}</span>
            {i < todos.length - 1 && <span aria-hidden="true">→</span>}
          </li>
        ))}
      </ol>
    ),
  },
];

export function Medida() {
  return (
    <section id="medida" data-theme="noche" aria-labelledby="medida-titulo" className={`${SALA} scroll-mt-16`}>
      <Entra className="mx-auto flex max-w-contenido flex-col gap-space-6">
        <div className="flex max-w-[760px] flex-col gap-space-4">
          <p className={ETIQUETA}>02 · A LA MEDIDA</p>
          <h2 id="medida-titulo" className={TITULAR}>
            Un sistema hecho para tu negocio.
          </h2>
          <p className={CUERPO}>
            Cuando ningún producto te queda, lo construimos. Desde una barbería que no alcanza a contestar
            hasta una empresa con varias sucursales. Cada sistema lleva su propia obra y cuelga en nuestra
            galería.
          </p>
        </div>

        <div className="flex flex-col gap-space-4">
          <h3 className={ETIQUETA}>ASÍ SE VE LO QUE CONSTRUIMOS</h3>
          <ul className="grid gap-space-5 md:grid-cols-2 lg:grid-cols-3">
            {VITRINA.map((caso) => (
              <li key={caso.giro} className={`flex ${caso.ancha ? "md:col-span-2" : ""}`}>
                <Tarjeta href={`/sistemas/${caso.nivel}`} className="flex w-full flex-col gap-space-4">
                  <p className="flex flex-wrap items-center gap-space-3">
                    <span className="rounded-pill border border-borde px-space-2 py-1 font-mono text-etiqueta text-texto">
                      EJEMPLO
                    </span>
                    <span className="font-mono text-etiqueta text-texto-suave">{caso.giro}</span>
                  </p>
                  <div className={CAJA}>
                    {caso.pantalla}
                    <p className={`${PIE} self-end`}>DATOS DE EJEMPLO</p>
                  </div>
                  <h4 className="text-subtitulo">{caso.titular}</h4>
                  <p className="text-cuerpo text-texto-suave">{caso.frase}</p>
                  <p className="mt-auto font-mono text-etiqueta text-texto">{caso.precio}</p>
                  <p className="flex items-center gap-space-2 text-cuerpo font-semibold text-texto">
                    Ver el nivel <span aria-hidden="true">→</span>
                  </p>
                </Tarjeta>
              </li>
            ))}
          </ul>
          <p className={CUERPO}>
            Estos son ejemplos. Cada sistema que entreguemos ocupará su lugar aquí, con su caso y su obra.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-5">
          <Boton href="/diagnostico" variante="primario">
            Solicitar diagnóstico
          </Boton>
          <Boton href="/sistemas" variante="texto">
            Ver los cinco niveles
          </Boton>
        </div>
      </Entra>
    </section>
  );
}
