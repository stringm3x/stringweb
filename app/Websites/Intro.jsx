"use client"
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugin
gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        x: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert(); // Limpieza
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-10 justify-center py-20 md:pl-5 xl:pl-10"
    >
      <div
        ref={textRef}
        className="font-bold text-center md:w-3/4 lg:w-2/3 xl:w-3/5 px-4 md:px-0"
      >
        <h1 className="text-4xl md:text-5xl xl:text-7xl">
          Tu <span className="text-green">presentación</span> formal al
        </h1>
        <h1 className="text-4xl md:text-5xl xl:text-7xl">
          mundo del INTERNET.
        </h1>
      </div>

      <div className="flex flex-col-reverse lg:flex-row">
        <p className="font-bold text-center text-lg md:text-xl self-center p-4 md:p-0 lg:w-1/3 2xl:w-1/2 xl:text-2xl ">
          Creamos un sitio web moderno, optimizado y funcional que proyecte la
          identidad de tu marca, mejore la experiencia del usuario (UX) y
          potencie tus resultados comerciales.
        </p>
        <div ref={imageRef} className="lg:w-2/3 2xl:w-1/2">
          <Image
            src="/assets/lap.png"
            alt="Laptop con diseño web"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
};

export default Intro;
