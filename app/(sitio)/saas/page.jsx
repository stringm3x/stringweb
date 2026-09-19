import WaitlistForm from "./WaitlistForm";
import {
  productos,
  problema,
  problemaCierre,
  planes,
  complementos,
  diferenciadores,
} from "./saas-data";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";
import { TarjetaSistema } from "@/app/components/ui/TarjetaSistema";
import { Caso } from "@/app/components/Caso";
import { Cierre } from "@/app/components/ui/Cierre";
import { TitularBrochada } from "@/app/components/ui/TitularBrochada";

export const metadata = {
  title: "STRING SaaS — Sistemas listos por nicho",
  description:
    "Sistemas listos por nicho, sin desarrollo desde cero. STRING GYM ya está activo — sistema completo de gestión para gimnasios desde $799/mes. Próximamente: STRING BARBER, CLINIC y RESTO.",
  alternates: {
    canonical: "https://www.stringwebs.com/saas",
  },
  openGraph: {
    title: "STRING SaaS — Sistemas listos por nicho",
    description:
      "STRING GYM: sistema completo de gestión para gimnasios desde $799/mes. 14 días con Pro completo, sin tarjeta.",
    url: "https://www.stringwebs.com/saas",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "STRING — Sistemas Digitales Estratégicos",
      },
    ],
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "STRING GYM",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://www.stringwebs.com/saas",
  description:
    "CRM y sistema de gestión para gimnasios mexicanos: socios, caja, inventario, WhatsApp automático y portal del socio.",
  offers: planes.map((p) => ({
    "@type": "Offer",
    name: p.nombre,
    price: p.precioMensual.replace(/[^0-9]/g, ""),
    priceCurrency: "MXN",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: p.precioMensual.replace(/[^0-9]/g, ""),
      priceCurrency: "MXN",
      billingDuration: "P1M",
    },
  })),
};

const proximamente = productos.filter((p) => p.estado === "proximamente");

export default function SaasPage() {
  return (
    <div className="bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-24 pt-32 pb-espacio-6 md:pt-40 md:pb-espacio-7 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <Etiqueta variante="linea" className="justify-center">
            STRING SaaS
          </Etiqueta>
          <div>
            <TitularBrochada lineas={["Sistemas listos", "para tu negocio"]} retraso={0.15} />
          </div>
          <p className="text-tinta-suave text-cuerpo max-w-xl mx-auto">
            Sin invertir en desarrollo desde cero. Sin contratos largos.
            Empieza en minutos.
          </p>
          <Boton href="#planes" variante="primario">
            Ver productos
          </Boton>
        </div>
      </section>

      {/* ── EL PROBLEMA ──────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-24 py-espacio-6 lg:py-espacio-7">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <Etiqueta variante="linea" className="justify-center">
              El problema
            </Etiqueta>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {problema.map((p, i) => (
              <div key={p} className="flex items-start gap-3 py-5 border-t border-linea">
                <span className="font-mono text-acido text-etiqueta flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-tinta-suave text-cuerpo-s">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center font-anton text-titular-m text-white uppercase">
            {problemaCierre}
          </p>
        </div>
      </section>

      {/* ── PLANES ───────────────────────────────────────────────────────────── */}
      <section id="planes" className="px-6 lg:px-24 py-espacio-6 lg:py-espacio-7 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Etiqueta variante="linea">Planes</Etiqueta>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {planes.map((plan) => (
              <TarjetaSistema
                key={plan.id}
                kicker={plan.destacado ? "PLAN RECOMENDADO" : "PLAN"}
                precio={`${plan.precioMensual}/MES`}
                titulo={plan.nombre}
                frase={plan.tagline}
                puntos={plan.features}
                destacada={plan.destacado}
              >
                <Boton
                  href={`/gym/registro?plan=${plan.id}`}
                  variante={plan.destacado ? "primario" : "secundario"}
                  className="w-full"
                >
                  Elegir {plan.nombre}
                </Boton>
              </TarjetaSistema>
            ))}
          </div>

          {/* Complementos */}
          <div className="mt-10 divide-y divide-linea border-y border-linea max-w-xl">
            {complementos.map((c) => (
              <div key={c.nombre} className="flex items-baseline justify-between gap-4 py-3">
                <span className="text-tinta text-cuerpo-s">{c.nombre}</span>
                <span className="font-mono text-dato text-acido flex-shrink-0">
                  {c.precio}
                </span>
              </div>
            ))}
          </div>

          {/* Diferenciadores */}
          <div className="mt-espacio-6">
            <div className="mb-8">
              <Etiqueta variante="linea">Diferenciadores</Etiqueta>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {diferenciadores.map((item, i) => (
                <div
                  key={item}
                  className="flex items-start gap-3 py-5 border-t border-linea md:odd:pr-8 md:even:pl-8"
                >
                  <span className="font-mono text-acido text-etiqueta flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-tinta-suave text-cuerpo-s">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CASO ─────────────────────────────────────────────────────────────── */}
      <Caso mostrarBotonSaas={false} />

      {/* ── PRODUCTOS PRÓXIMOS ──────────────────────────────────────────────── */}
      <section className="px-6 lg:px-24 py-espacio-6 lg:py-espacio-7">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Etiqueta variante="linea">Próximamente</Etiqueta>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {proximamente.map((p) => (
              <TarjetaSistema
                key={p.id}
                kicker="PRÓXIMAMENTE"
                titulo={p.nombre}
                frase={p.desc}
              >
                <WaitlistForm producto={p.id} />
              </TarjetaSistema>
            ))}
          </div>
        </div>
      </section>

      <Cierre
        ctaTexto="Probar STRING GYM"
        ctaHref="/gym/registro?plan=pro"
        nota="14 días con Pro completo · Sin tarjeta"
      />
    </div>
  );
}
