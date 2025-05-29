"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    id: 1,
    title: "Hosting",
    img: "vercel",
    content:
      "Es el servicio que almacena los archivos, imágenes y contenido de tu sitio web para que esté disponible en Internet.",
  },
  {
    id: 2,
    title: "Dominió",
    img: ".com",
    content:
      "Es el nombre de tu sitio web en Internet, como tusitio.com. Es la dirección que las personas escriben en el navegador para visitarte.",
  },
];

const Hosting = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="lg:h-screen flex flex-col gap-20 py-20">
      <div className="flex flex-col gap-4 text-left lg:text-center md:w-4/5 xl:w-2/3 px-5 md:px-0 md:pl-10">
        <h1 className="font-bold text-green text-5xl md:text-5xl lg:text-6xl xl:text-7xl">
          <span className="w-full bg-white md:ml-2">Hosting y dominio</span>{" "}
          incluidos.
        </h1>
      </div>

      <div className="flex flex-row justify-evenly flex-wrap gap-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="relative w-64 md:w-72 xl:w-80 h-64 bg-bg flex flex-col content-center justify-center rounded-lg group overflow-hidden cursor-pointer"
          >
            <h1 className="object-cover text-8xl text-green self-center transition-opacity duration-300 group-hover:opacity-0">
              {item.img}
            </h1>

            <div className="absolute inset-0 bg-black flex flex-col justify-center items-center text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
              <h1 className="text-2xl text-green font-bold mb-2">
                {item.title}
              </h1>
              <p className="text-sm">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hosting;
