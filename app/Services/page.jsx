"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowRight,
  FiUsers,
  FiBarChart2,
  FiClock,
  FiAward,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import { MdOutlineAnalytics, MdOutlineRocketLaunch } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import servicios from "./data";

gsap.registerPlugin(ScrollTrigger);

// Stats principales con React Icons
const statsPrincipales = [
  { value: "50+", label: "Sistemas implementados", icon: FiUsers },
  { value: "85%", label: "Aumento en conversión", icon: FiBarChart2 },
  { value: "24h", label: "Respuesta inicial", icon: FiClock },
  { value: "100%", label: "Personalizado", icon: FiAward },
];

// Placeholder para imágenes
const ImagePlaceholder = () => (
  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-t-2xl" />
);

// Mapeo de iconos por servicio (para los que están en data.js)
const getIconComponent = (iconName) => {
  const icons = {
    FiTarget,
    FiTrendingUp,
    FiZap,
    MdOutlineRocketLaunch,
  };
  // Buscar el icono por nombre o retornar FiTarget por defecto
  const foundIcon = Object.values(icons).find(
    (icon) => icon.name === iconName?.name
  );
  return foundIcon || FiTarget;
};

const PageServices = () => {
  const [mounted, setMounted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animación con ScrollTrigger
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [
          headerRef.current,
          ...cardsRef.current.filter(Boolean),
          ctaRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      })
        .to(
          cardsRef.current.filter(Boolean),
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.1"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  const handleImageLoad = (id) => {
    setImagesLoaded((prev) => ({ ...prev, [id]: true }));
  };

  if (!mounted) {
    return (
      <section className="min-h-screen bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-96 bg-gray-100 animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-white py-20 px-4 md:px-6 lg:px-8"
    >
      {/* Header */}
      <div ref={headerRef} className="text-center mb-16 space-y-4">
        <span className="inline-block px-4 py-2 bg-green/10 text-green rounded-full text-sm font-mono border border-green/30">
          ✦ SISTEMAS DE CONVERSIÓN
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-ubuntu font-black tracking-tight">
          <span className="text-black">SERVICIOS</span>
          <span className="text-green ml-4">ESTRATÉGICOS</span>
        </h1>
        <p className="text-black/70 max-w-2xl mx-auto text-lg md:text-xl">
          No vendemos páginas. Implementamos sistemas digitales diseñados para
          convertir visitas en clientes reales.
        </p>
      </div>

      {/* Stats principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
        {statsPrincipales.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="text-center p-4 bg-white/50 rounded-xl border border-gray/20"
            >
              <Icon className="text-2xl text-green mx-auto mb-2" />
              <p className="text-xl font-bold text-black">{stat.value}</p>
              <p className="text-xs text-gray">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Grid de servicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicios.map((servicio, index) => {
          const Icon = servicio.icon;
          const isHovered = hoveredCard === index;
          const isImageLoaded = imagesLoaded[servicio.id];

          return (
            <Link
              href={`/Services/${servicio.id}`}
              key={servicio.id}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="block group"
            >
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray/10"
              >
                {/* Imagen optimizada */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  {!isImageLoaded && <ImagePlaceholder />}
                  <Image
                    src={servicio.img}
                    alt={servicio.service}
                    fill
                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                      isImageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading={index < 2 ? "eager" : "lazy"}
                    onLoad={() => handleImageLoad(servicio.id)}
                    quality={75}
                  />
                </div>

                <div className="p-6">
                  {/* Header con icono React Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${servicio.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="text-2xl text-white" />
                    </div>
                    <span className="text-xs font-mono bg-green/10 text-green px-3 py-1 rounded-full border border-green/30">
                      {servicio.metric}
                    </span>
                  </div>

                  <h2 className="text-2xl font-ubuntu font-bold text-black mb-1">
                    {servicio.service}
                  </h2>
                  <h3 className="text-sm text-green mb-3 font-mono">
                    {servicio.title2}
                  </h3>
                  <p className="text-gray text-sm mb-4 line-clamp-2">
                    {servicio.intro}
                  </p>

                  {/* Stats rápidas */}
                  <div className="flex gap-3 mb-4">
                    {servicio.stats.map((stat, i) => (
                      <div key={i} className="text-xs">
                        <span className="font-bold text-black">
                          {stat.value}
                        </span>
                        <span className="text-gray ml-1">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium text-gray group-hover:text-green transition-colors">
                      Ver detalles
                    </span>
                    <div className="w-8 h-8 rounded-full bg-green/10 flex items-center justify-center group-hover:bg-green transition-colors">
                      <FiArrowRight className="text-green group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      <div ref={ctaRef} className="text-center mt-20">
        <Link href="/quote">
          <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-green to-green2 text-black font-bold rounded-full overflow-hidden transition-all hover:pr-12 hover:shadow-2xl hover:shadow-green/30">
            <span className="relative z-10">Diagnosticar mi negocio</span>
            <FiArrowRight className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
          </button>
        </Link>
        <p className="text-sm text-gray mt-4">
          Diagnóstico gratuito · Respuesta en 24h
        </p>
      </div>
    </section>
  );
};

export default PageServices;
