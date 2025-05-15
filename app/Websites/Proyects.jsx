"use client";

import Link from "next/link";
import TiltedCard from "../UI/TiltedCard";

const images = [
  {
    src: "/assets/mulbet.png",
    title: "MULBET",
    href: "https://mulbet.vercel.app/",
  },
  {
    src: "/assets/incode.jpeg",
    title: "INCODE",
    href: "https://incodeweb.com/",
  },
  {
    src: "/assets/laceb.png",
    title: "LACEB S.A de C.V",
    href: "https://www.laceb-lab.com/",
  },
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
];

const Proyects = () => {
  return (
    <section
      id="proyectos"
      className="flex w-full flex-col bg-whitelight items-center gap-20 py-20"
    >
      <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        <span className="text-green ">STRING</span>{" "}
        <span className="bg-green px-4">PROYECTOS</span>.
      </h1>

      <div className="relative w-full flex flex-col gap-20  md:flex-row md:gap-20 md:overflow-x-auto scrollbar-hide md:p-20">
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

      <div>
        
      </div>
    </section>
  );
};

export default Proyects;
