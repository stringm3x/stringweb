"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";
import Contact from "../Home/Contact";

const proyects = [
  {
    id: "1",
    title: "E-Commerce",
    href: "https://garm.framer.website/",
    img: "/design/ropa.png",
  },
  {
    id: "2",
    title: "Joyeria",
    href: "https://caelora.framer.website/",
    img: "/design/joyeria.png",
  },
  {
    id: "3",
    title: "E-Commerce",
    href: "https://drivoxe.framer.website/",
    img: "/design/carros.png",
  },
  {
    id: "4",
    title: "Menu",
    href: "https://qitchen-template.framer.website/?via=pawelgola",
    img: "/design/restuarante.png",
  },
  {
    id: "5",
    title: "Landing Page",
    href: "https://agevia.framer.website/",
    img: "/design/landing.png",
  },
  {
    id: "6",
    title: "Portafolio",
    href: "https://architects.framer.website/",
    img: "/design/portafolio.png",
  },
];

const pageProyects = () => {
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
    <section className="bg-white overflow-hidden flex flex-col gap-10 items-center py-20">
      <div className="text-bg font-ubuntu font-extrabold tracking-tight text-6xl leading-[45px] md:text-8xl md:leading-[89px]">
        <h1>NUESTROS</h1>
        <h1>DISEÑOS</h1>
      </div>

      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl text-gray">
          El mejor diseño para tu negocio.
        </h1>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
          {proyects.map((item) => (
            <Link href={item.href} key={item.id} className="w-full ">
              <div className="card group relative flex flex-col justify-end p-5 w-[320px] md:w-[350px] lg:w-[400px] xl:w-[430px] h-80 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform">
                <Image
                  src={item.img}
                  alt="proyect"
                  fill
                  className="object-cover absolute group-hover:brightness-50"
                />
                <h1 className="hidden group-hover:flex absolute font-ubuntu text-4xl text-white">
                  {item.title}{" "}
                </h1>
              </div>
            </Link>
          ))}
        </div>

        <h1 className="text-2xl lg:text-3xl xl:text-4xl text-gray">
          Y tú ¿Estas listo?
        </h1>
      </div>

      <div className="w-full text-bg">
        <Contact />
      </div>
    </section>
  );
};

export default pageProyects;
