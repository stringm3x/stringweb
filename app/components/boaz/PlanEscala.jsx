import { BotonBoaz } from "@/app/components/boaz/BotonBoaz";
import { ESCALA } from "@/app/components/boaz/datos";
import { ARCHIVO, archivo } from "@/app/components/boaz/fuentes";
import { ESCALA_ESTADO } from "@/app/lib/boaz-lanzamiento";
import { whatsappUrl } from "@/app/lib/contacto";
import { BOAZ_ESCALA, IVA } from "@/app/lib/precios";

// Escala en /boaz (lote 21, decisión del 6 nov): "Próximamente", junto a la
// tabla de Starter y Pro y con su mismo orden (nombre, precio, qué incluye),
// pero no se contrata: su único botón abre WhatsApp. Lo que lo distingue:
// la regla bajo el encabezado va punteada (#7D7A72, token campo) en lugar de
// sólida y el precio en el color suave. Desde 1024 px va a la derecha de la
// tabla, con la regla punteada a la altura de la sólida (la píldora y su margen
// miden 28 px, lo mismo que "★ RECOMENDADO" con el suyo en Pro); abajo de 1024,
// debajo de Pro. Nunca "Contratar" ni un enlace a /gym/registro.
export function PlanEscala({ estado = ESCALA_ESTADO }) {
  return (
    <section
      aria-labelledby="boaz-escala"
      data-plan="escala"
      className="mt-14 lg:mt-[9px] lg:border-l lg:border-hairline lg:pl-6"
    >
      <div className="border-b border-dotted border-campo pb-5">
        <p className="inline-flex rounded-pill border border-borde px-3 py-[3px] font-boaz-mono text-[11px] uppercase leading-4 tracking-[0.14em]">
          {ESCALA.pildora[estado]}
        </p>
        <h3 id="boaz-escala" className={`${archivo.className} mt-1 text-[40px] leading-none sm:text-[56px]`} style={ARCHIVO}>
          {ESCALA.nombre}
        </h3>
        <p className="mt-2.5 text-[17px]">{ESCALA.frase}</p>
      </div>
      <div className="border-b border-hairline py-[18px] text-texto-suave">
        <p className="flex flex-wrap items-baseline gap-x-2.5">
          <span className="font-boaz-mono text-[32px] font-bold leading-none tracking-[-0.02em] sm:text-[44px]">
            {BOAZ_ESCALA.mes}
          </span>
          <span className="font-boaz-mono text-[12px] uppercase tracking-[0.16em]">al mes</span>
        </p>
        <p className="mt-2 font-boaz-mono text-etiqueta uppercase">
          {IVA} · {BOAZ_ESCALA.anual} al año
        </p>
      </div>
      <p className="mt-5 text-[16px] font-semibold">{ESCALA.intro}</p>
      <ul className="mt-2">
        {ESCALA.puntos.map((punto) => (
          <li key={punto} className="grid grid-cols-[14px_minmax(0,1fr)] gap-2 border-b border-hairline py-2.5 text-[16px] leading-[1.45]">
            <span aria-hidden="true">–</span>
            {punto}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <BotonBoaz href={whatsappUrl(ESCALA.mensaje)} variante="secundario">
          {ESCALA.boton}
        </BotonBoaz>
        <p className="mt-3 font-boaz-mono text-[11px] uppercase leading-[1.4] tracking-[0.14em] text-texto-suave">{ESCALA.nota}</p>
      </div>
    </section>
  );
}
