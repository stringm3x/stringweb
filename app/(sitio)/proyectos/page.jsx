"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import SplitType from "split-type";
import { FiX, FiExternalLink, FiFilter } from "react-icons/fi";
import { proyects, categories, getProjectsByCategory } from "./data";

// ─── Componente ───────────────────────────────────────────────────────────────
const PageProyects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(proyects);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const cardRefs = useRef([]);
  const expandedRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const filterRef = useRef(null);

  // ── Filtrar proyectos ───────────────────────────────────────────────────────
  useEffect(() => {
    setFilteredProjects(getProjectsByCategory(activeCategory));
  }, [activeCategory]);

  // ── Animación de entrada ────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([tagRef.current, titleRef.current, filterRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set(cardRefs.current.filter(Boolean), { opacity: 0, y: 30 });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .to(
          titleRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          filterRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          cardRefs.current.filter(Boolean),
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Re-animar cards al filtrar ──────────────────────────────────────────────
  useEffect(() => {
    if (cardRefs.current.filter(Boolean).length === 0) return;
    gsap.fromTo(
      cardRefs.current.filter(Boolean),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: "power3.out" }
    );
  }, [filteredProjects]);

  // ── Animación expand ────────────────────────────────────────────────────────
  useEffect(() => {
    if (
      !activeProject ||
      selectedCard === null ||
      !cardRefs.current[selectedCard]
    )
      return;

    const cardElement = cardRefs.current[selectedCard];
    const rect = cardElement.getBoundingClientRect();

    gsap.set(expandedRef.current, {
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      zIndex: 100,
    });

    gsap.set(overlayRef.current, { opacity: 0 });

    const tl = gsap.timeline();

    tl.to(expandedRef.current, {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      duration: 0.8,
      ease: "power3.inOut",
    });

    tl.to(overlayRef.current, { opacity: 0.9, duration: 0.5 }, "-=0.4");

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

  // ── Close expand ────────────────────────────────────────────────────────────
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

    tl.to(textRef.current, { opacity: 0, duration: 0.2 });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
    tl.to(
      expandedRef.current,
      {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "-=0.1"
    );
  };

  const handleProjectClick = (item, index) => {
    setActiveProject(item);
    setSelectedCard(index);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-black min-h-screen px-6 sm:px-8 lg:px-12 py-24 relative overflow-hidden"
    >
      {/* ── Fondo decorativo ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-20 w-72 h-72 bg-green/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-green/3 rounded-full blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="mb-16 space-y-6">
          <div ref={tagRef}>
            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              Portafolio
            </span>
          </div>

          <h1
            ref={titleRef}
            className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.88] tracking-tighter text-white uppercase"
          >
            Nuestros <span className="text-green">proyectos</span>
          </h1>
        </div>

        {/* ── Filtros ───────────────────────────────────────────────────────── */}
        <div ref={filterRef} className="mb-12">
          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-px bg-white/5 w-fit">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-3 text-xs font-mono uppercase tracking-widest transition-colors duration-200 ${
                  activeCategory === cat.id
                    ? "bg-green text-black"
                    : "bg-black text-gray hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2.5 border border-white/10 text-gray hover:text-white hover:border-white/30 transition-all duration-200 text-xs font-mono uppercase tracking-widest"
            >
              <FiFilter className="text-green" />
              Filtrar
            </button>

            {/* Dropdown mobile — CSS transition */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isFilterOpen
                  ? "max-h-[300px] opacity-100 mt-2"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col gap-px bg-white/5 w-fit">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setIsFilterOpen(false);
                    }}
                    className={`px-5 py-3 text-xs font-mono uppercase tracking-widest text-left transition-colors duration-200 ${
                      activeCategory === cat.id
                        ? "bg-green text-black"
                        : "bg-black text-gray hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-[10px] font-mono text-gray uppercase tracking-widest mt-4">
            {filteredProjects.length} proyecto
            {filteredProjects.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* ── Grid de proyectos ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {filteredProjects.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => handleProjectClick(item, index)}
              className="relative cursor-pointer h-[320px] md:h-[420px] overflow-hidden group bg-black"
            >
              <Image
                src={item.img}
                alt={item.id}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-2 py-1 bg-green text-black text-[10px] font-bold uppercase tracking-wider">
                  {item.title}
                </span>
                <span className="px-2 py-1 bg-black/60 backdrop-blur-sm border border-white/20 text-white text-[10px] font-mono">
                  {item.year}
                </span>
              </div>

              {/* Título */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-anton text-2xl text-white leading-tight tracking-tight group-hover:-translate-y-1 transition-transform duration-300">
                  {item.id}
                </h3>
                <p className="text-[10px] font-mono text-green uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Ver proyecto →
                </p>
              </div>

              {/* Borde inferior */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-green group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Expanded Card ─────────────────────────────────────────────────── */}
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
            className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 md:px-16 space-y-6 z-10 overflow-y-auto py-12"
          >
            <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
              {activeProject.title}
            </span>

            <h2 className="font-anton text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              {activeProject.id}
            </h2>

            <p className="max-w-xl text-sm md:text-base text-white/70 leading-relaxed">
              {activeProject.info}
            </p>

            <a
              href={activeProject.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200"
            >
              Visitar sitio
              <FiExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          <button
            onClick={closeCard}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-200 text-white z-20"
          >
            <FiX className="text-lg" />
          </button>
        </div>
      )}
    </section>
  );
};

export default PageProyects;
