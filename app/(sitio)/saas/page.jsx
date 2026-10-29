import {
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
import { PintarAlScroll } from "@/app/components/PintarAlScroll";
import { TitularBrochada } from "@/app/components/ui/TitularBrochada";

// Título y descripción de docs/textos.md § Textos que faltaban.
const DESCRIPCION =
  "Socios, check-in, cobros y caja para tu gimnasio, probado todos los días en un mostrador de verdad.";

export const metadata = {
  title: "El sistema para gimnasios",
  description: DESCRIPCION,
  alternates: {
    canonical: "https://www.stringwebs.com/saas",
  },
  openGraph: {
    title: "El sistema para gimnasios · STRING",
    description: DESCRIPCION,
    url: "https://www.stringwebs.com/saas",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "El sistema para gimnasios",
      },
    ],
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "El sistema para gimnasios",
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
            <TitularBrochada lineas={["Sistemas listos", "para tu negocio"]} forma="mancha" retraso={0.15} />
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
        <div className="max-w-contenido mx-auto">
          <div className="mb-8 text-center">
            <Etiqueta variante="linea" className="justify-center">
              El problema
            </Etiqueta>
          </div>
          <PintarAlScroll className="grid grid-cols-1 sm:grid-cols-2" duracion={0.5} escalonado={0.08}>
            {problema.map((p, i) => (
              <div key={p} className="flex items-start gap-3 py-5 border-t border-linea">
                <span className="flex flex-shrink-0 flex-col gap-1 font-mono text-acido text-etiqueta">
                  {String(i + 1).padStart(2, "0")}
                  {/* Tic acido que se dibuja al entrar en pantalla */}
                  <span data-brochada className="block h-[3px] w-6 bg-acido" aria-hidden="true" />
                </span>
                <p className="text-tinta-suave text-cuerpo-s">{p}</p>
              </div>
            ))}
          </PintarAlScroll>
          <p className="mt-8 text-center font-anton text-titular-m text-white uppercase">
            {problemaCierre}
          </p>
        </div>
      </section>

      {/* ── PLANES ───────────────────────────────────────────────────────────── */}
      <section id="planes" className="px-6 lg:px-24 py-espacio-6 lg:py-espacio-7 scroll-mt-20">
        <div className="max-w-contenido mx-auto">
          <div className="mb-8">
            {/* h2 para que los h3 de los planes sigan el orden de encabezados. */}
            <h2>
              <Etiqueta variante="linea">Planes</Etiqueta>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {planes.map((plan) => (
              <TarjetaSistema
                key={plan.id}
                kicker="PLAN"
                sello={plan.destacado ? "Recomendado" : undefined}
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
      <Caso />

      <Cierre
        ctaTexto="Probar el sistema para gimnasios"
        ctaHref="/gym/registro?plan=pro"
        nota="14 días con Pro completo · Sin tarjeta"
      />
    </div>
  );
}
