"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";
import Contact from "../Home/Contact";

const proyects = [
  {
    id: "ALBA AGUILAR",
    href: "https://www.albaaguilar.com.mx/",
    img: "/proyects/alba&aguilar.png",
  },
  {
    id: "YUMA",
    href: "https://yuma-three.vercel.app/",
    img: "/proyects/YUMA.png",
  },
  {
    id: "Clementina Jewlery",
    href: "https://clementinajewelry.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnXhdBmzH_xOxRlRZEzy8TUvSFxte6DLnTF4_bxoit-vrF8CXmMDrW11StBPo_aem_drcE83mHkJmX2j1DYoaAIA",
    img: "/proyects/clementina.png",
  },
  {
    id: "INCODE",
    href: "https://incode-ten.vercel.app/",
    img: "/proyects/incode.png",
  },
  {
    id: "MULBET",
    href: "https://mulbet.vercel.app/",
    img: "/proyects/mulbet.png",
  },
  {
    id: "Barrio Bravo",
    href: "https://brarriobravo.myshopify.com/",
    img: "/proyects/barriobravo.png",
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
      <div className="text-bg font-ubuntu font-extrabold tracking-tight text-6xl leading-[45px] md:text-8xl md:leading-[70px]">
        <h1>NUESTROS</h1>
        <h1>PROYECTOS</h1>
      </div>

      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl text-gray">
          Ellos confiarón en nostros
        </h1>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-8 place-items-center">
          {proyects.map((item) => (
            <Link href={item.href} key={item.id} className="w-full ">
              <div className="card group relative flex flex-col justify-end p-5 w-[320px] md:w-[350px] lg:w-[360px] xl:w-[430px] h-80 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform">
                <Image
                  src={item.img}
                  alt="proyect"
                  fill
                  className="object-cover absolute group-hover:brightness-75"
                />
                <h1 className="hidden group-hover:flex absolute font-ubuntu text-4xl text-white">
                  {item.id}{" "}
                </h1>
              </div>
            </Link>
          ))}
        </div>

        <h1 className="text-3xl lg:text-4xl xl:text-5xl text-gray">
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
