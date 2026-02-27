"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import SplitType from "split-type";

const proyects = [
  {
    id: "ALBA AGUILAR",
    title: "Landing Page",
    href: "https://www.albaaguilar.com.mx/",
    img: "/proyects/alba&aguilar.png",
    info: "Empresa de construcción especializada en desarrollos residenciales y proyectos arquitectónicos de alto nivel en México.",
  },
  {
    id: "GARM",
    title: "E-Commerce",
    href: "https://garm.framer.website/",
    img: "/design/ropa.png",
    info: "Marca de moda con enfoque moderno, tienda en línea optimizada para experiencia de compra rápida y elegante.",
  },
  {
    id: "YUMA",
    title: "E-Commerce",
    href: "https://yuma-three.vercel.app/",
    img: "/proyects/yuma1.png",
    info: "Proyecto digital enfocado en diseño minimalista y experiencia de usuario moderna para marca emergente.",
  },
  {
    id: "DRIVOXE",
    title: "E-Commerce",
    href: "https://drivoxe.framer.website/",
    img: "/design/carros.png",
    info: "Plataforma digital enfocada en la venta de vehículos con experiencia visual potente y conversión optimizada.",
  },
  {
    id: "INCODE",
    title: "Landing Page",
    href: "https://incode-ten.vercel.app/",
    img: "/proyects/incode.png",
    info: "Landing corporativa moderna enfocada en tecnología y soluciones digitales empresariales.",
  },
  {
    id: "CAELORA",
    title: "E-commerce",
    href: "https://caelora.framer.website/",
    img: "/design/joyeria.png",
    info: "E-commerce de joyería con estética premium y experiencia visual enfocada en lujo y detalle.",
  },
  {
    id: "Pecado de Canela",
    title: "Menú Digital",
    href: "https://www.pecadodecanela.com/",
    img: "/proyects/pecadodecanela.png",
    info: "Panadería artesanal con presencia digital enfocada en branding cálido y experiencia gastronómica.",
  },
  {
    id: "SUSHI SENSATION",
    title: "Menú Digital",
    href: "https://qitchen-template.framer.website/?via=pawelgola",
    img: "/design/restuarante.png",
    info: "Menú digital interactivo con diseño moderno para restaurante especializado en cocina japonesa.",
  },
  {
    id: "Barrio Bravo",
    title: "E-commerce",
    href: "https://brarriobravo.myshopify.com/",
    img: "/proyects/barriobravo.png",
    info: "Tienda online en Shopify con enfoque urbano y estrategia visual enfocada en cultura street.",
  },
  {
    id: "CONSULT",
    title: "Landing Page",
    href: "https://agevia.framer.website/",
    img: "/design/landing.png",
    info: "Landing corporativa optimizada para conversión y captación de clientes empresariales.",
  },
  {
    id: "VERDANT",
    title: "Portafolio",
    href: "https://architects.framer.website/",
    img: "/design/portafolio.png",
    info: "Portafolio arquitectónico con enfoque minimalista y experiencia visual tipo estudio premium.",
  },
];

const PageProyects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const cardRefs = useRef([]);
  const expandedRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (
      !activeProject ||
      selectedCard === null ||
      !cardRefs.current[selectedCard]
    ) {
      return;
    }

    const cardElement = cardRefs.current[selectedCard];

    // Verificar que el elemento existe
    if (!cardElement) {
      console.error("Card element not found for index:", selectedCard);
      return;
    }

    const rect = cardElement.getBoundingClientRect();

    // Configurar estilos iniciales para la expansión
    gsap.set(expandedRef.current, {
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      borderRadius: "0.75rem",
      zIndex: 50,
    });

    gsap.set(overlayRef.current, { opacity: 0 });

    // Animación de expansión
    const tl = gsap.timeline();

    tl.to(expandedRef.current, {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      duration: 0.8,
      ease: "power3.inOut",
    });

    tl.to(
      overlayRef.current,
      {
        opacity: 0.8,
        duration: 0.5,
      },
      "-=0.4"
    );

    // Animación del texto
    if (textRef.current) {
      const split = new SplitType(textRef.current, { types: "lines" });

      tl.from(
        split.lines,
        {
          yPercent: 100,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.3"
      );

      return () => split.revert();
    }
  }, [activeProject, selectedCard]);

  const handleProjectClick = (item, index) => {
    console.log("Click en proyecto:", item.id, "índice:", index); // Para debugging
    console.log("Elemento de tarjeta:", cardRefs.current[index]); // Para debugging

    setActiveProject(item);
    setSelectedCard(index);
  };

  const closeCard = () => {
    if (selectedCard === null || !cardRefs.current[selectedCard]) return;

    const cardElement = cardRefs.current[selectedCard];
    const rect = cardElement.getBoundingClientRect();

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveProject(null);
        setSelectedCard(null);
      },
    });

    tl.to(textRef.current, {
      opacity: 0,
      duration: 0.2,
    });

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.3,
      },
      "-=0.2"
    );

    tl.to(
      expandedRef.current,
      {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: "0.75rem",
        duration: 0.8,
        ease: "power3.inOut",
      },
      "-=0.1"
    );
  };

  return (
    <section className="bg-white flex flex-col gap-16 md:gap-32 px-4 md:px-10 py-10 md:py-20 relative">
      <div className="text-center text-bg font-ubuntu font-extrabold tracking-tight text-6xl leading-[45px] md:text-8xl md:leading-[70px]">
        <h1>NUESTROS</h1>
        <h1>PROYECTOS</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 place-items-center relative">
        {proyects.map((item, index) => (
          <div
            key={`${item.id}-${index}`} // Key más único
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            onClick={() => handleProjectClick(item, index)}
            className="relative cursor-pointer w-full max-w-[440px] h-[350px] md:h-[500px] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={item.img}
              alt={item.id}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 440px"
              onError={(e) => {
                console.error("Error cargando imagen:", item.img);
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300" />

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-white text-xl md:text-2xl font-bold">
                {item.id}
              </h3>
              {item.title && (
                <p className="text-green text-xs md:text-sm">{item.title}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Card */}
      {activeProject && (
        <div
          ref={expandedRef}
          className="fixed overflow-hidden shadow-2xl"
          style={{ zIndex: 100 }}
        >
          <Image
            src={activeProject.img}
            alt={activeProject.id}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              console.error(
                "Error cargando imagen expandida:",
                activeProject.img
              );
            }}
          />

          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black"
            style={{ opacity: 0 }}
          />

          <div
            ref={textRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 md:px-10 space-y-4 md:space-y-6 z-10 overflow-y-auto py-10"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
              {activeProject.id}
            </h2>

            {activeProject.title && (
              <p className="text-lg md:text-2xl text-green">
                {activeProject.title}
              </p>
            )}

            <p className="max-w-2xl text-sm md:text-base lg:text-lg text-gray px-2">
              {activeProject.info}
            </p>

            <a
              href={activeProject.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 md:mt-6 px-6 md:px-8 py-2 md:py-3 bg-white text-black rounded-full hover:bg-green transition-colors duration-500 font-semibold text-sm md:text-base"
            >
              Visitar sitio
            </a>
          </div>

          <button
            onClick={closeCard}
            className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300 text-white text-2xl md:text-3xl z-20"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
};

export default PageProyects;
