import React from "react";
import Image from "next/image";

const Content = () => {
  return (
    <section className="relative overflow-hidden content-center">
      <Image
        src="/s-reverse.png"
        alt="hero-left"
        width={1000}
        height={1000}
        className="absolute pointer-events-none left-[-100] bottom-[600]  md:bottom-[320] md:left-[-150] 2xl:bottom-[400]"
      />
      <div className="relative flex flex-col gap-20 xl:gap-32 justify-center pt-24 p-5 xl:p-20">
        <div className="text-green font-ubuntu font-extrabold tracking-tight text-6xl leading-[50px] md:text-8xl md:leading-[75px] lg:pl-10 lg:text-9xl lg:leading-[85px] 2xl:text-[200px] 2xl:leading-[140px] ">
          <h1>DESARROLLO</h1>
          <h1>
            DISEÑO <span className="font-light font-sans">&</span>
          </h1>
          <h1 className="font-light font-sans">OPTIMIZACION</h1>
        </div>

        <div className="text-xl md:text-2xl lg:w-3/6 lg:text-3xl font-sans text-gray self-center">
          <p>
            En STRING, nuestra experiencia radica en el diseño web, UI/UX,SEO,
            la creación de una identidad de marca y la mejora de su visibilidad
            en línea.
          </p>
        </div>

        <div className="flex flex-col items-end md:flex-row md:justify-end gap-5">
          <div className="bg-gray w-56 h-24 p-4 rounded-2xl content-center justify-items-center">
            <p className="text-3xl font-bold">MÁS DE 25</p>
            <p className="font-bold">Proyectos entregados</p>
          </div>

          <div className="bg-white w-56 h-24 p-4 rounded-2xl content-center">
            <p className="text-4xl text-green font-bold">85%</p>
            <p className="font-bold text-bg">Proyectos entregados</p>
          </div>

          <div className="bg-white w-56 h-24 p-4 rounded-2xl content-center">
            <p className="text-4xl text-green font-bold">+4</p>
            <p className="font-bold text-bg">Proyectos entregados</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
