"use client";

import Link from "next/link";
import TiltedCard from "../UI/TiltedCard";

const images = [
  {
    src: "/assets/evolutiongym.jpeg",
    title: "Evolution GYM",
    href: "https://evolution-swart.vercel.app/",
  },
  {
    src: "/assets/josecarlos.jpeg",
    title: "Jose Carlos",
    href: "https://www.josecarloscervantes.com/",
  },
  {
    src: "/assets/incode.jpeg",
    title: "INCODE",
    href: "https://incodeweb.com/",
  },
];

const Proyects = () => {
  return (
    <section className="hidden md:flex w-full  flex-col bg-whitelight items-center gap-20 py-20">
      <h1 className="font-bold text-5xl md:text-7xl">
        <span className="text-green ">STRING</span> <span className="bg-green px-4">PROYECTOS</span>
      </h1>

      <div className="relative w-full flex flex-col gap-10  md:flex-row md:gap-20 md:overflow-x-auto scrollbar-hide md:p-20">
        {images.map((item, index) => (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TiltedCard
              key={index}
              imageSrc={item.src}
              altText={item.title}
              captionText={item.title}
              imageWidth="550px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text text-green">{item.title}</p>
              }
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Proyects;
