import Image from "next/image";
import Link from "next/link";
import React from "react";
import Contact from "../Home/Contact";

const proyects = [
  {
    id: "1",
    href: "https://www.albaaguilar.com.mx/",
    img: "/proyects/alba&aguilar.png",
  },
  {
    id: "2",
    href: "/",
    img: "/proyects/yuma.png",
  },
  {
    id: "3",
    href: "/",
    img: "/proyects/KLA.png",
  },
];

const pageProyects = () => {
  return (
    <section className="bg-white overflow-hidden flex flex-col gap-10 items-center py-20">
      <div className="text-bg font-ubuntu font-extrabold tracking-tight text-6xl leading-[45px] md:text-8xl md:leading-[70px]">
        <h1>NUESTROS</h1>
        <h1>PROYECTOS</h1>
      </div>

      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl text-gray">Ellos confiarón en nostros</h1>

        <div className="w-full flex flex-col lg:flex-row gap-5">
          {proyects.map((item) => (
            <Link href={item.href} key={item.id} className="">
              <div className="relative w-[350px] md:w-72 lg:w-[300px] xl:w-72 h-80">
                <Image
                  src={item.img}
                  alt="proyect"
                  fill
                  className="object-cover absolute"
                />
              </div>
            </Link>
          ))}
        </div>

        <h1 className="text-2xl lg:text-3xl xl:text-4xl text-gray">Y tú ¿Estas listo?</h1>
      </div>

      <div className="w-full text-bg">
        <Contact />
      </div>
    </section>
  );
};

export default pageProyects;
