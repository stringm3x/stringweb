"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import SplitType from "split-type";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiFilter } from "react-icons/fi";

// Importar datos
import { proyects, categories, getProjectsByCategory } from "./data";

const PageProyects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(proyects);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const cardRefs = useRef([]);
  const expandedRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filtrar proyectos por categoría
  useEffect(() => {
    setFilteredProjects(getProjectsByCategory(activeCategory));
  }, [activeCategory]);

  // Animación de entrada
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Aseguramos que todo sea visible
      gsap.set([titleRef.current, filterRef.current, ...cardRefs.current.filter(Boolean)], {
        opacity: 1,
        y: 0,
        visibility: "visible"
      });

      // Animación de entrada
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8
      })
      .from(filterRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, "-=0.4")
      .from(cardRefs.current.filter(Boolean), {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.7,
        ease: "back.out(1.2)"
      }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  useEffect(() => {
    if (
      !activeProject ||
      selectedCard === null ||
      !cardRefs.current[selectedCard]
    ) {
      return;
    }

    const cardElement = cardRefs.current[selectedCard];

    if (!cardElement) {
      console.error("Card element not found for index:", selectedCard);
      return;
    }

    const rect = cardElement.getBoundingClientRect();

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
        opacity: 0.9,
        duration: 0.5,
      },
      "-=0.4"
    );

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

  if (!mounted) {
    return (
      <section className="bg-white flex flex-col gap-16 md:gap-32 px-4 md:px-10 py-10 md:py-20 overflow-hidden">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-ubuntu font-extrabold">NUESTROS PROYECTOS</h1>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="bg-white flex flex-col gap-16 md:gap-32 px-4 md:px-10 py-10 md:py-20 relative min-h-screen"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-20 w-72 h-72 bg-green/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-green/10 text-green rounded-full text-sm font-semibold tracking-wider mb-4 border border-green/20">
            ✦ Portafolio
          </span>
          
          <h1 className="text-6xl md:text-8xl font-ubuntu font-extrabold tracking-tight leading-[45px] md:leading-[70px]">
            <span className="text-black">
              NUESTROS
            </span>
            <br />
            <span className="text-black">
              PROYECTOS
            </span>
          </h1>
        </div>

        {/* Filtros */}
        <div ref={filterRef} className="mb-12">
          {/* Mobile filter button */}
          <div className="lg:hidden flex justify-center mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-gray text-gray"
            >
              <FiFilter className="text-green" />
              <span>Filtrar por categoría</span>
            </button>
          </div>

          {/* Filter tabs - desktop */}
          <div className="hidden lg:flex justify-center flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-green text-black shadow-lg shadow-green/30"
                    : "bg-white text-gray hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Filter dropdown - mobile */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="lg:hidden flex flex-col items-center gap-2 mt-2"
              >
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setIsFilterOpen(false);
                    }}
                    className={`w-64 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeCategory === cat.id
                        ? "bg-green text-black"
                        : "bg-white text-gray border border-gray-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result count */}
          <p className="text-center text-gray mt-4">
            Mostrando {filteredProjects.length} proyectos
          </p>
        </div>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 place-items-center relative">
          {filteredProjects.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => handleProjectClick(item, index)}
              className="relative cursor-pointer w-full max-w-[440px] h-[350px] md:h-[500px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <Image
                src={item.img}
                alt={item.id}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 440px"
              />
              
              {/* Overlay en hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Badge de categoría */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-green text-black text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {item.category === "landing" && "Landing"}
                {item.category === "ecommerce" && "E-commerce"}
                {item.category === "menu" && "Menú Digital"}
                {item.category === "portfolio" && "Portafolio"}
              </div>

              {/* Badge de año */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/30">
                {item.year}
              </div>

              {/* Títulos */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white text-xl md:text-2xl font-bold transform group-hover:translate-y-[-5px] transition-transform duration-300">
                  {item.id}
                </h3>
                {item.title && (
                  <p className="text-green text-xs md:text-sm transform group-hover:translate-y-[-5px] transition-transform duration-300">
                    {item.title}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div> 
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

            <p className="max-w-2xl text-sm md:text-base lg:text-lg text-gray-200 px-2">
              {activeProject.info}
            </p>

            <a
              href={activeProject.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 mt-4 md:mt-6 px-6 md:px-8 py-2 md:py-3 bg-white text-black rounded-full hover:bg-green transition-all duration-500 font-semibold text-sm md:text-base hover:pr-10"
            >
              <span>Visitar sitio</span>
              <FiExternalLink className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          <button
            onClick={closeCard}
            className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300 text-white text-2xl md:text-3xl z-20"
          >
            <FiX />
          </button>
        </div>
      )}
    </section>
  );
};

export default PageProyects;