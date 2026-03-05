"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import servicios from "../data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiTarget,
  FiClock,
  FiAward,
} from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicePage = ({ params: paramsPromise }) => {
  const params = React.use(paramsPromise);
  const servicio = servicios.find((p) => p.id === params.id);

  if (!servicio) return notFound();

  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("beneficios");
  const [mounted, setMounted] = useState(false);

  // Refs para GSAP
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!mounted) return;

      gsap.set(
        [
          badgeRef.current,
          titleRef.current,
          headerRef.current,
          imageRef.current,
          contentRef.current,
          ctaRef.current,
        ],
        { opacity: 1, y: 0, visibility: "visible" }
      );

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.from(badgeRef.current, { opacity: 0, y: 30 })
        .from(titleRef.current, { opacity: 0, y: 40 }, "-=0.4")
        .from(headerRef.current, { opacity: 0, y: 30 }, "-=0.3")
        .from(imageRef.current, { opacity: 0, x: 50 }, "-=0.3")
        .from(contentRef.current, { opacity: 0, y: 30 }, "-=0.4")
        .from(ctaRef.current, { opacity: 0, y: 30 }, "-=0.1");
    },
    { scope: sectionRef, dependencies: [mounted] }
  );

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  const getIcon = (idx) => {
    const icons = ["🎯", "⚡", "🎨", "🚀", "💡", "🔧"];
    return icons[idx] || "✅";
  };

  // Variants para animación de contenido
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
    exit: { opacity: 0, y: -20, scale: 0.9 },
  };

  const faqVariants = {
    open: { height: "auto", opacity: 1, transition: { duration: 0.4 } },
    collapsed: { height: 0, opacity: 0, transition: { duration: 0.3 } },
  };

  if (!mounted) {
    return (
      <section className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-96 bg-gray-100 animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-white py-12 px-4 md:px-6 lg:px-8 relative"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-green/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-green/5 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
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
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Volver a Servicios</span>
          </Link>
        </motion.div>

        {/* Badge */}
        <div ref={badgeRef} className="mb-6">
          <span className="inline-block px-4 py-2 bg-green/10 text-green rounded-full text-sm font-mono border border-green/30">
            ✦ SISTEMA DE CONVERSIÓN
          </span>
        </div>

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-ubuntu font-black tracking-tight text-bg mb-4"
            >
              {servicio.service}
            </h1>
            <h2
              ref={headerRef}
              className="text-2xl md:text-3xl text-green font-light mb-6"
            >
              {servicio.title2}
            </h2>
            <p className="text-lg text-black leading-relaxed">
              {servicio.intro}
            </p>

            {/* Stats rápidas */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <FiTarget className="text-green text-xl" />
                <span className="text-sm text-bg">+85% conversión</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-green text-xl" />
                <span className="text-sm text-bg">24h respuesta</span>
              </div>
              <div className="flex items-center gap-2">
                <FiAward className="text-green text-xl" />
                <span className="text-sm text-bg">100% personalizado</span>
              </div>
            </div>
          </div>

          {/* Imagen */}
          <div
            ref={imageRef}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={servicio.img}
              alt={servicio.service}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* Descripción detallada */}
        <div ref={contentRef} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xl md:text-2xl text-black leading-relaxed">
            {servicio.p}
          </p>
        </div>

        {/* Tabs: Beneficios / FAQ */}
        <div className="mb-16">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("beneficios")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "beneficios"
                  ? "bg-green text-black shadow-lg shadow-green/30"
                  : "bg-white text-gray border border-gray/20 hover:border-green"
              }`}
            >
              Beneficios
            </button>
            <button
              onClick={() => setActiveTab("faqs")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "faqs"
                  ? "bg-green text-black shadow-lg shadow-green/30"
                  : "bg-white text-gray border border-gray/20 hover:border-green"
              }`}
            >
              Preguntas Frecuentes
            </button>
          </div>

          <AnimatePresence mode="wait">
            {/* Beneficios - CON ANIMACIÓN DE CONTENIDO */}
            {activeTab === "beneficios" && (
              <motion.div
                key="beneficios"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {servicio.content.map((texto, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray/10"
                  >
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-green rounded-full flex items-center justify-center text-black font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      {idx + 1}
                    </div>
                    <div className="text-4xl mb-4">{getIcon(idx)}</div>
                    <p className="text-bg text-base font-medium leading-relaxed">
                      {texto}
                    </p>
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-green group-hover:w-full transition-all duration-300" />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* FAQs - CON ANIMACIÓN DE CONTENIDO */}
            {activeTab === "faqs" && servicio.faqs && (
              <motion.div
                key="faqs"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-3xl mx-auto space-y-4"
              >
                {servicio.faqs.map((item, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="border border-gray/20 rounded-xl overflow-hidden bg-white"
                    >
                      <button
                        onClick={() => toggle(index)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white transition-colors"
                      >
                        <span
                          className={`text-lg font-semibold pr-8 ${
                            isOpen ? "text-green" : "text-bg"
                          }`}
                        >
                          {item.title}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isOpen
                              ? "bg-green text-black"
                              : "bg-gray text-green"
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
                            <div className="p-6 pt-0 text-gray border-t border-gray-100">
                              {item.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className="text-center mt-20 p-12 bg-gradient-to-r from-green/5 to-green2/5 rounded-3xl border border-green/20"
        >
          <h3 className="text-3xl md:text-4xl font-ubuntu font-bold text-bg mb-4">
            ¿Listo para <span className="text-green">transformar</span> tu
            negocio?
          </h3>
          <p className="text-gray max-w-2xl mx-auto mb-8 text-lg">
            Implementa este sistema de conversión y comienza a generar
            resultados reales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-green to-green2 text-black font-bold rounded-full overflow-hidden hover:shadow-2xl hover:shadow-green/30 transition-all">
                <span className="relative z-10 flex items-center gap-2">
                  Diagnosticar mi negocio
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </Link>
            <Link href="/Proyects">
              <button className="px-8 py-4 border-2 border-green/30 text-bg font-bold rounded-full hover:bg-green/5 transition-colors">
                Ver casos de éxito
              </button>
            </Link>
          </div>
          <p className="text-sm text-gray mt-4">
            Diagnóstico gratuito · Respuesta en 24h
          </p>
        </div>

        {/* Mensaje final */}
        <div className="text-center mt-8 text-sm text-gray">
          <p>Este es un sistema de conversión, no solo una página.</p>
        </div>
      </div>
    </section>
  );
};

export default ServicePage;
