"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import servicios from "../data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiArrowLeft } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

const ServicePage = ({ params: paramsPromise }) => {
  const params = React.use(paramsPromise);
  const servicio = servicios.find((p) => p.id === params.id);

  if (!servicio) return notFound();

  const [openIndex, setOpenIndex] = useState(null);

  // Refs para GSAP
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const featuresRef = useRef([]);
  const faqRef = useRef(null);

  // ANIMACIONES CON USE-GSAP (más confiable)
  useGSAP(
    () => {
      // Timeline principal
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      // Header animation
      tl.from(headerRef.current, {
        opacity: 0,
        y: 50,
      })
        // Title animation
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
          },
          "-=0.4"
        )
        // Image animation
        .from(
          imageRef.current,
          {
            opacity: 0,
            x: 50,
            duration: 0.8,
          },
          "-=0.3"
        )
        // Content animation
        .from(
          contentRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
          },
          "-=0.4"
        )
        // Features animation (stagger)
        .from(
          featuresRef.current.filter(Boolean),
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(1.2)",
          },
          "-=0.2"
        );

      // Scroll animations para elementos que aparecen al hacer scroll
      gsap.from(".scroll-animate", {
        scrollTrigger: {
          trigger: ".scroll-animate",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
      });
    },
    { scope: sectionRef }
  );

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Variants para Framer Motion (solo para interacciones)
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const faqVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
    collapsed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 md:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Botón volver */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/Services"
            className="inline-flex items-center text-gray hover:text-green transition-colors duration-300 group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Volver a Servicios</span>
          </Link>
        </motion.div>

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 space-y-4">
          <span className="inline-block px-4 py-2 bg-green rounded-full text-sm font-semibold uppercase tracking-wider">
            Servicio Profesional
          </span>

          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-ubuntu font-black tracking-tighter"
          >
            <span className="bg-clip-text text-transparent">
              {servicio.service}
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray max-w-3xl mx-auto leading-relaxed">
            {servicio.intro}
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Texto */}
          <div ref={contentRef} className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-ubuntu font-bold">
              Transformamos tu visión en realidad digital
            </h2>

            <div className="space-y-4 text-gray leading-relaxed">
              <p className="text-lg">{servicio.p}</p>
            </div>

            {/* Features con refs para animación */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                "Metodología ágil",
                "Diseño personalizado",
                "Optimización SEO",
                "Soporte continuo",
              ].map((feature, i) => (
                <div
                  key={i}
                  ref={(el) => (featuresRef.current[i] = el)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-2 h-2 bg-green rounded-full" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen */}
          <div
            ref={imageRef}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={servicio.img}
              alt={servicio.service}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </div>

        {/* LO QUE HACEMOS POR TI - con clase para scroll animation */}
        <div className="scroll-animate mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold tracking-tight">
              <span className="bg-clip-text text-transparent">
                Lo que hacemos por ti
              </span>
            </h2>
            <div className="w-24 h-1 bg-green mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicio.content.map((texto, idx) => (
              <motion.div
                key={idx}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-green rounded-full flex items-center justify-center text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {idx + 1}
                </div>

                <div className="text-4xl mb-4">
                  {idx === 0 && "🎯"}
                  {idx === 1 && "⚡"}
                  {idx === 2 && "🎨"}
                  {idx === 3 && "🚀"}
                </div>

                <p className="text-gray text-lg font-medium leading-relaxed">
                  {texto}
                </p>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-green group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        {servicio.faqs && servicio.faqs.length > 0 && (
          <div ref={faqRef} className="scroll-animate max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-ubuntu font-bold text-green mb-2">
                Preguntas Frecuentes
              </h3>
              <p className="text-gray">
                Todo lo que necesitas saber sobre este servicio
              </p>
            </div>

            <div className="space-y-4">
              {servicio.faqs.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-black transition-colors duration-300"
                    >
                      <span
                        className={`text-lg md:text-xl font-semibold pr-8 ${
                          isOpen ? "text-green" : "text-gray"
                        }`}
                      >
                        {item.title}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isOpen
                            ? "bg-green text-white"
                            : "bg-gray-100 text-gray"
                        }`}
                      >
                        {isOpen ? <FiMinus /> : <FiPlus />}
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={faqVariants}
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 text-black leading-relaxed border-t border-gray-100">
                            {item.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="scroll-animate text-center mt-20 p-12 rounded-3xl text-white">
          <h3 className="text-3xl md:text-4xl font-ubuntu font-bold mb-4">
            ¿Listo para empezar?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Transformemos tu idea en un proyecto exitoso. Contáctame hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/Quote"
              className="inline-flex items-center px-8 py-4 bg-white text-green font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Solicitar cotización
              <FiArrowLeft className="ml-2 rotate-180" />
            </Link>
            <Link
              href="/proyects"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green transition-all duration-300"
            >
              Ver proyectos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePage;
