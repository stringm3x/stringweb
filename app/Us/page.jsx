"use client";
import React, { useEffect } from "react";
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
  useEffect(() => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      const tl = gsap.timeline({ paused: true });
      tl.to(card, {
        scale: 1.06,
        duration: 0.3,
        ease: "power2.out",
      });

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", () => tl.play());
        card.removeEventListener("mouseleave", () => tl.reverse());
      });
    };
  }, []);

  return (
    <section className="relative p-10 md:p-20 justify-items-center overflow-hidden">
      <div className="relative flex flex-col leading-[110px] md:leading-[160px] lg:leading-[250px] pb-20">
        <h1 className="text-6xl md:text-8xl lg:text-[100px] font-bold">
          Somos
        </h1>
        <h1 className="text-[130px] md:text-[200px] lg:text-[300px] font-anton text-green">
          STRING
        </h1>
      </div>

      <div className="relative flex flex-col items-center justify-center overflow-hidden">
        <Image
          src="/s-reverse.png"
          className="absolute brightness-50"
          width={1000}
          height={100}
          alt="logo"
        />

        <p className="relative text-center text-xl md:w-3/4 lg:w-2/3">
          Una agencia apasionada por el diseño y desarrollo web. Contamos con 4
          años de experiencia en el mercado, nos hemos posicionado como una de
          las mejores por nuestro enfoque creativo, estratégico y humano. Cada
          proyecto es una oportunidad para transformar ideas en experiencias
          digitales memorables.
        </p>

        <div className="relative flex flex-col lg:flex-row gap-10 py-10">
          {msvs.map((item) => (
            <div
              className="card md:w-72 md:h-64 bg-white rounded-2xl p-8 text-bg"
              key={item.id}
            >
              <h1 className="text-4xl">NUESTRA</h1>
              <h1 className="text-6xl font-bold">{item.title}</h1>
              <p className="text-sm text-center mt-8">{item.content}</p>
            </div>
          ))}
        </div>

        <div className="relative flex flex-col items-end md:flex-row md:justify-end gap-5">
          <div className="bg-white group hover:bg-gray w-60 h-24 p-4 rounded-2xl content-center justify-items-center">
            <p className="text-3xl font-bold text-green group-hover:text-white">
              MÁS DE 25
            </p>
            <p className="font-bold text-bg group-hover:text-white">
              Proyectos entregados
            </p>
          </div>

          <div className="bg-white group hover:bg-gray w-60 h-24 p-4 rounded-2xl content-center">
            <p className="text-4xl text-green  group-hover:text-white font-bold">
              85%
            </p>
            <p className="font-bold text-bg group-hover:text-white">
              Retención de clientes
            </p>
          </div>

          <div className="bg-white group hover:bg-gray w-60 h-24 p-4 rounded-2xl content-center">
            <p className="text-4xl text-green  group-hover:text-white font-bold">
              +4
            </p>
            <p className="font-bold text-bg group-hover:text-white">
              Años de experiencia
            </p>
          </div>
        </div>

        <div className="relative flex flex-col w-full items-start py-10">
          <h1 className="text-5xl lg:text-7xl font-bold">Nuestros</h1>
          <h1 className="text-5xl lg:text-7xl text-green font-bold">
            OBJETIVOS
          </h1>

          <p className="lg:text-xl mt-10 font-bold">
            Crear sitios web que transmitan la esencia de cada marca, combinando
            diseño estratégico, funcionalidad y experiencia de usuario para
            generar conexiones reales y resultados medibles. En STRING,
            diseñamos con propósito y desarrollamos con pasión, cuidando cada
            detalle para ofrecer experiencias digitales agradables, accesibles y
            memorables. Sobre todo con resultados tangibles.
          </p>
        </div>
      </div>
    </section>
  );
};

export default pageUs;
