import React from "react";
import Image from "next/image";
import { Button } from "@heroui/button";

const items = [
  {
    src: "/tecno/css.png",
    title: "css",
  },
  {
    src: "/tecno/html.png",
    title: "css",
  },
  {
    src: "/tecno/javascript.png",
    title: "css",
  },
];

const Proyects = () => {
  return (
    <section className="bg-white p-5 md:p-10">
      <div className="relative overflow-hidden w-full py-10">
        <div className="flex w-max animate-scroll gap-16">
          {[...items, ...items].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center flex-shrink-0 lg:w-[300px]"
            >
              <Image
                src={item.src}
                alt={item.title}
                width={500}
                height={300}
                className="w-[200px] h-[100px] lg:w-[280px] lg:h-[100px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <section className="flex flex-col gap-20 bg-bg w-full h-full rounded-2xl p-5 py-20 md:p-10 md:py-32">
        <div className="xl:w-3/5 self-end text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-gray tracking-tight ">
            NUESTROS PROYECTOS
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-ubuntu font-bold text-green tracking-tight ">
            RECIENTES
          </h1>
          <p className="md:text-xl lg:text-2xl text-center lg:px-32 xl:px-20 tracking-tight ">
            Así es como transformamos tu visión en un diseño y una estrategia
            bien desarrollada.
          </p>
        </div>

        <div className="grid lg:grid-rows-8 lg:grid-cols-2 gap-5 h-96 ">
          <div className="relative bg-white row-span-8 col-span-1 rounded-2xl">
            <Image
              src="/proyects/alba&aguilar.png"
              alt="yuma"
              fill
              className="object-cover absolute rounded-2xl brightness-75"
            />
          </div>

          <div className="relative bg-white row-span-4 col-span-1 rounded-2xl">
            <Image
              src="/proyects/yuma.png"
              alt="yuma"
              fill
              className="object-cover absolute rounded-2xl"
            />
          </div>
          <div className="relative bg-white row-span-4 col-span-1 rounded-2xl">
            <Image
              src="/proyects/KLA.png"
              alt="yuma"
              fill
              className="object-cover absolute rounded-2xl"
            />
          </div>
        </div>

        <Button className="bg-green text-bg text-xl font-bold w-40 lg:w-42 p-8 self-center rounded-full">
          Ver Proyectos
        </Button>
      </section>
    </section>
  );
};

export default Proyects;
