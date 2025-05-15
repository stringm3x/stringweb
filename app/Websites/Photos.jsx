"use client";

import React from "react";
import Image from "next/image";

const items = [
  {
    src: "/assets/IMG_5460.jpg",
    title: "img1",
  },
  {
    src: "/assets/IMG_5419.jpg",
    title: "img3",
  },
  {
    src: "/assets/IMG_5395.jpg",
    title: "img2",
  },
  {
    src: "/assets/IMG_5467.jpg",
    title: "img4",
  },
];

const Photos = () => {
  return (
    <section className="min-h-screen content-center py-20 bg-black">
      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-bold text-white">
        Sesión de <span className="text-green">fotos</span>
        <span className="ml-2 bg-green">PROFESIONALES</span>.
      </h1>

      <div className="relative overflow-hidden w-full py-20">
        <div className="flex w-max animate-scroll gap-8 md:gap-16">
          {[...items, ...items].map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-[300px] w-auto aspect-auto flex items-center justify-center rounded-lg overflow-hidden bg-neutral-900 shadow-lg"
            >
              <Image
                src={item.src}
                alt={item.title}
                width={300}
                height={300}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Photos;
