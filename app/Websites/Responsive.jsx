"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { id: 1, img: "/assets/tabletrespo.png" },
  { id: 2, img: "/assets/laprespo.png" },
  { id: 3, img: "/assets/celrespo.png" },
];

const Responsive = () => {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      imagesRef.current.forEach((img, i) => {
        gsap.from(img, {
          opacity: 0,
          y: 50,
          duration: 1,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="content-center w-full py-20 md:px-10">
      <div className="flex flex-col gap-2 justify-self-end px-4 md:px-0">
        <h1 className="text-center text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
          <span className="bg-green">Completamente</span>{" "}
          <span className="text-green">responsivo</span>.
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row py-20 items-center justify-center gap-10">
        {images.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (imagesRef.current[index] = el)}
            className="w-full max-w-xs"
          >
            <Image
              src={item.img}
              alt="Dispositivo responsivo"
              width={1000}
              height={1000}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Responsive;
