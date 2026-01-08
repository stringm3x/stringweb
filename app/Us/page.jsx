"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const msvs = [
  {
    id: "1",
    title: "Misión",
    content:
      "Es transformar ideas en sitios web funcionales, visualmente impactantes y alineados con la esencia de cada negocio, ayudando a nuestros clientes a crecer en el mundo digital. Creemos que cada marca tiene una historia única que merece ser contada con autenticidad y creatividad. ",
  },
  {
    id: "2",
    title: "Visión",
    content:
      "Queremos inspirar y evolucionar junto a quienes confían en nosotros. Soñamos con un entorno digital donde cada marca tenga una voz auténtica y poderosa. Visualizamos ser una empresa líder en diseño y desarrollo web en Latinoamérica, reconocida por nuestro enfoque humano, innovación constante y compromiso con el éxito de nuestros clientes.",
  },
];

const pageUs = () => {
  const [active, setActive] = useState("vision");
  return (
    <section className="flex flex-col gap-20 pt-20 px-5 sm:px-0 sm:py-0 sm:p-10 md:p-20 mx-auto 2xl:max-w-[1280px]">
      <div className="w-full flex flex-col gap-5">
        {/* Título */}
        <h1 className="font-semibold self-center sm:self-auto text-[60px] sm:text-6xl lg:text-7xl text-green">
          NOSO <span className="text-white ml-[-15px] sm:ml-[-20px]">TROS</span>
        </h1>

        {/* Marca */}
        <div className="sm:flex flex-row items-center sm:gap-6  flex-wrap hidden">
          <Image
            src="/logo-s-white.png"
            alt="Logo STRING"
            width={220}
            height={220}
            className="object-contain"
            priority
          />

          <h2 className="font-anton text-[90px] sm:text-[130px] lg:text-[200px] text-green leading-none">
            STRING
          </h2>
        </div>

        {/* Imagen, Descripción.*/}
        <div className="flex flex-col gap-10">
          <Image
            src="/logo-s-white.png"
            alt="Logo STRING"
            width={220}
            height={220}
            className="object-contain h-72 w-full border-1 border-white"
            priority
          />

          <div className="lg:w-2/4 flex flex-col self-end space-y-4 lg:text-xl">
            <p>
              En STRING desarrollamos páginas web profesionales enfocadas en
              brindar una presencia digital sólida, clara y funcional para
              marcas y negocios.
            </p>

            <p>
              STRING es un proyecto independiente liderado por un diseñador y
              desarrollador web que se encarga personalmente de cada etapa del
              proceso: desde el análisis inicial y el diseño, hasta el
              desarrollo y la entrega final. Esto permite un control total de la
              calidad y una comunicación directa con cada cliente.
            </p>
          </div>
        </div>
      </div>

      {/* Vision y Mision */}
      <section className="bg-black">
        {/* BOTONES */}
        <div className="flex flex-row justify-center lg:justify-end gap-6 mb-8">
          <button
            onClick={() => setActive("mission")}
            className={`px-10 py-3 rounded-full border transition-all
            ${
              active === "mission"
                ? "bg-green text-black"
                : "border-white text-white"
            }`}
          >
            Mission
          </button>

          <button
            onClick={() => setActive("vision")}
            className={`px-10 py-3 rounded-full transition-all
            ${
              active === "vision"
                ? "bg-green text-black"
                : "border border-white text-white"
            }`}
          >
            Vision
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="flex flex-col-reverse lg:flex-row gap-5 xl:gap-10 items-center">
          {/* IMAGEN MISION */}
          <div
            className={`rounded-2xl bg-black border border-white transition-all duration-500
            ${
              active === "mission"
                ? "w-[320px] h-[320px] xl:w-[420px] xl:h-[420px]"
                : "w-[180px] h-[180px] xl:w-[280px] xl:h-[280px] opacity-50"
            }`}
          >
            {/* Aquí va la imagen */}
          </div>

          {/* IMAGEN VISION */}
          <div
            className={`rounded-2xl bg-black border border-white transition-all duration-500
            ${
              active === "vision"
                ? "w-[320px] h-[320px] xl:w-[420px] xl:h-[420px]"
                : "w-[180px] h-[180px] xl:w-[280px] xl:h-[280px] opacity-50"
            }`}
          >
            {/* Aquí va la imagen */}
          </div>

          {/* CAJA BLANCA */}
          <div className="flex-1 bg-white rounded-2xl p-12 lg:min-h-[420px] transition-all duration-500">
            {active === "mission" ? (
              <>
                <h2 className="text-3xl font-semibold mb-4 text-green">
                  Nuestra Misión
                </h2>
                <p className="text-lg text-black">
                  Diseñar y desarrollar páginas web profesionales que ayuden a
                  marcas y negocios a construir una presencia digital sólida,
                  funcional y alineada con sus objetivos.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-semibold mb-4 text-green">
                  Nuestra Visión
                </h2>
                <p className="text-lg text-black">
                  Convertir a STRING en un estudio creativo reconocido por su
                  calidad, cercanía con el cliente y enfoque estratégico en el
                  diseño y desarrollo web.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10 sm:gap-0 lg:flex-row py-10">
        <div className="sm:w-1/2 flex flex-col gap-5">
          <h1 className="text-5xl lg:text-6xl font-semibold leading-10">
            NUESTRA <span className="text-green">FORMA</span><br />
            DE <span className="text-green">TRABAJO</span>
          </h1>
          <div className="flex flex-col gap-3 text-md lg:text-lg">
            <p>
              Cada proyecto inicia con el entendimiento del negocio, sus
              objetivos y su público. A partir de esta información, se
              desarrolla una solución a la medida, cuidando tanto la estética
              como la funcionalidad del sitio.
            </p>
            <p>
              El enfoque es crear páginas web que no solo se vean bien, sino que
              transmitan confianza y aporten valor real al negocio.
            </p>
          </div>
        </div>

        <div className="sm:w-1/2 flex flex-col gap-5 self-end">
          <h1 className="text-5xl lg:text-6xl text-right  font-semibold leading-10">
            NUESTRO
            <br />
            <span className="text-green">COMPROMISO</span>
          </h1>
          <div className="flex flex-col gap-3 text-md lg:text-lg text-right ">
            <p>
              En STRING trabajamos con responsabilidad, claridad y atención al
              detalle. El objetivo es entregar soluciones digitales bien
              estructuradas, duraderas y alineadas a las necesidades de cada
              cliente.
            </p>
            <p>
              Si buscas una página web profesional que represente correctamente
              tu marca y fortalezca tu presencia digital, STRING puede ayudarte.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default pageUs;
