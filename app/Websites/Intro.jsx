import React from "react";
import Image from "next/image";

const Intro = () => {
  return (
    <section className="flex flex-col gap-10 justify-center py-20 md:pl-5 xl:pl-10">
      <div className="font-bold text-center md:w-3/4 lg:w-2/3 xl:w-3/5 px-4 md:px-0">
        <h1 className="text-3xl md:text-5xl xl:text-7xl">
          Tu <span className="text-green">presentación</span> formal al
        </h1>
        <h1 className="text-3xl md:text-5xl xl:text-7xl">mundo del INTERNET</h1>
      </div>

      <div className="flex flex-col-reverse lg:flex-row">
        <p className="font-bold text-center text-lg md:text-xl self-center p-4 md:p-0 lg:w-1/3 2xl:w-1/2 xl:text-2xl ">
          Creamos un sitio web moderno, optimizado y funcional que proyecte la
          identidad de tu marca, mejore la experiencia del usuario (UX) y
          potencie tus resultados comerciales.
        </p>
        <div className="lg:w-2/3 2xl:w-1/2 ">
          <Image src="/assets/lap.png" alt="lap" width={1000} height={1000} />
        </div>
      </div>
    </section>
  );
};

export default Intro;
