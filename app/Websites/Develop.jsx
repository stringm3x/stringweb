import Image from "next/image";
import { IoLogoJavascript } from "react-icons/io";
import { MdOutlineCss, MdOutlineHtml } from "react-icons/md";
import React from "react";

const Develop = () => {
  return (
    <section className="py-20 justify-items-center">
      <div className="justify-self-end p-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
          <span className="text-green">Páginas</span> hechas en{" "}
          <span className="bg-green">código</span>
        </h1>
      </div>

      <div className="h-auto  bg-opacity-85 md:h-96 my-10 py-16 px-6 grid grid-cols-1 md:grid-rows-2 md:grid-cols-2 gap-10">
        {/*imagen de tecnologías */}
        <div className="bg-bg md:row-span-2 col-span-1 p-8 rounded-lg flex flex-col justify-center text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-green">
            Tecnologías como:
          </h2>
          <p className="mb-6 lg:text-xl">
            Utilizamos tecnologías modernas y potentes para garantizar el éxito
            de tu proyecto
          </p>
          <div className="w-full h-52 flex flex-row gap-5 justify-center items-center rounded-lg">
            <IoLogoJavascript className="w-16 h-16" />
            <MdOutlineCss className="w-20 h-20 2xl:w-32 2xl:h-32" />
            <MdOutlineHtml className="w-20 h-20  2xl:w-32 2xl:h-32" />
          </div>
        </div>

        {/* Rendimiento */}
        <div className="bg-bg row-span-1 col-span-1 p-8 rounded-lg text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-green">
            Rendimiento y Velocidad
          </h2>
          <p className="lg:text-xl">
            Las páginas hechas con código suelen ser más rápidas y ligeras, ya
            que puedes optimizar el código y evitar el exceso de scripts o
            plugins innecesarios.
          </p>
        </div>

        {/* Personalización */}
        <div className="bg-bg row-span-1 col-span-1 p-8 rounded-lg text-center md:col-start-2">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-green">
            Personalización
          </h2>
          <p className="lg:text-xl">
            Cuando programas desde cero, tienes control total sobre el diseño,
            la funcionalidad y la experiencia del usuario, sin limitaciones
            impuestas por plantillas predefinidas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Develop;
