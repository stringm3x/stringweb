"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import servicios from "../data";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiTarget,
  FiClock,
  FiAward,
  FiDollarSign,
  FiUsers,
  FiCalendar,
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicePage = ({ params: paramsPromise }) => {
  const router = useRouter();
  const params = React.use(paramsPromise);
  const servicio = servicios.find((p) => p.id === params.id);

  if (!servicio) return notFound();

  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("beneficios");
  const [mounted, setMounted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Refs para GSAP
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);
  const incluyeRef = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animación con ScrollTrigger
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Estado inicial
      gsap.set(
        [
          badgeRef.current,
          titleRef.current,
          headerRef.current,
          imageRef.current,
          contentRef.current,
          ctaRef.current,
          ...incluyeRef.current.filter(Boolean),
        ],
        { opacity: 0, y: 30 }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { duration: 0.5, ease: "power2.out" },
      });

      tl.to(badgeRef.current, { opacity: 1, y: 0 })
        .to(titleRef.current, { opacity: 1, y: 0 }, "-=0.3")
        .to(headerRef.current, { opacity: 1, y: 0 }, "-=0.2")
        .to(imageRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
        .to(contentRef.current, { opacity: 1, y: 0 }, "-=0.2")
        .to(
          incluyeRef.current.filter(Boolean),
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.4,
          },
          "-=0.2"
        )
        .to(ctaRef.current, { opacity: 1, y: 0 }, "-=0.1");
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const getIcon = (idx) => {
    const icons = ["🎯", "⚡", "🎨", "🚀", "💡", "🔧", "🔄", "📊"];
    return icons[idx] || "✅";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10 },
  };

  const faqVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    collapsed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
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
      className="min-h-screen bg-white py-12 px-4 md:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-green/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-green/5 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Botón volver */}
        <div className="mb-8">
          <button
            onClick={() => (window.location.href = "/Services")}
            className="inline-flex items-center text-gray hover:text-green transition-colors duration-300 group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Volver a Servicios</span>
          </button>
        </div>

        {/* Badge */}
        <div
          ref={badgeRef}
          className="mb-6 flex flex-col sm:flex-row items-center gap-3"
        >
          <span className="inline-block px-4 py-2 bg-green/10 text-green rounded-full text-sm font-mono border border-green/30">
            {servicio.service}
          </span>
          <span className="inline-block px-4 py-2 bg-green text-black rounded-full text-sm font-bold">
            {servicio.title2}
          </span>
        </div>

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-ubuntu font-black tracking-tight text-bg mb-4"
            >
              {servicio.service}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <FiDollarSign className="text-green text-2xl" />
              <span className="text-3xl font-bold text-green">
                {servicio.metric}
              </span>
            </div>

            <p className="text-lg text-black/80 leading-relaxed mb-6">
              {servicio.intro}
            </p>

            <div className="bg-green/5 p-4 rounded-xl border border-green/20 mb-6">
              <p className="text-sm font-mono text-green mb-1">OBJETIVO</p>
              <p className="text-black mb-3">{servicio.objetivo}</p>
              <p className="text-sm text-gray">
                <span className="font-semibold">Ideal para:</span>{" "}
                {servicio.ideal}
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              {servicio.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green/10 rounded-full flex items-center justify-center">
                    {i === 0 && <FiClock className="text-green text-sm" />}
                    {i === 1 && <FiUsers className="text-green text-sm" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black">{stat.value}</p>
                    <p className="text-xs text-gray">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen optimizada */}
          <div
            ref={imageRef}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100"
          >
            {!imagesLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
            )}
            <Image
              src={servicio.img}
              alt={servicio.service}
              fill
              className={`object-cover transition-opacity duration-500 ${
                imagesLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImagesLoaded(true)}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* Descripción */}
        <div ref={contentRef} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xl md:text-2xl text-black leading-relaxed">
            {servicio.p}
          </p>
        </div>

        {/* Qué incluye */}
        <div className="mb-16">
          <h2 className="text-3xl text-black font-ubuntu font-bold text-center mb-8">
            Qué <span className="text-green">incluye</span> este sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {servicio.incluye.map((item, index) => (
              <div
                key={index}
                ref={(el) => (incluyeRef.current[index] = el)}
                className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray/10"
              >
                <FiCheckCircle className="text-green text-xl mt-0.5 flex-shrink-0" />
                <span className="text-black">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs - CSS transitions en lugar de Framer Motion */}
        <div className="mb-16">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("beneficios")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === "beneficios"
                  ? "bg-green text-black shadow-lg shadow-green/30"
                  : "bg-white text-gray border border-gray/20 hover:border-green"
              }`}
            >
              Beneficios
            </button>
            <button
              onClick={() => setActiveTab("faqs")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === "faqs"
                  ? "bg-green text-black shadow-lg shadow-green/30"
                  : "bg-white text-gray border border-gray/20 hover:border-green"
              }`}
            >
              Preguntas Frecuentes
            </button>
          </div>

          {/* Beneficios - usando CSS transition para mejor rendimiento */}
          <div
            className={`transition-all duration-300 ${
              activeTab === "beneficios"
                ? "opacity-100 visible"
                : "opacity-0 invisible absolute"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {servicio.content.map((texto, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray/10 hover:-translate-y-2"
                >
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-green rounded-full flex items-center justify-center text-black font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {idx + 1}
                  </div>
                  <div className="text-4xl mb-4">{getIcon(idx)}</div>
                  <p className="text-bg text-base font-medium leading-relaxed">
                    {texto}
                  </p>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-green group-hover:w-full transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div
            className={`transition-all duration-300 ${
              activeTab === "faqs"
                ? "opacity-100 visible"
                : "opacity-0 invisible absolute"
            }`}
          >
            <div className="max-w-3xl mx-auto space-y-4">
              {servicio.faqs?.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-gray/20 rounded-xl overflow-hidden bg-white"
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                    >
                      <span
                        className={`text-lg font-semibold pr-8 ${
                          isOpen ? "text-green" : "text-bg"
                        }`}
                      >
                        {item.title}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? "bg-green text-black"
                            : "bg-gray/40 text-gray"
                        }`}
                      >
                        {isOpen ? <FiMinus /> : <FiPlus />}
                      </div>
                    </button>

                    <div
                      className={` overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "max-h-[300px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-6 pt-0 text-gray border-t border-gray">
                        {item.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className="text-center mt-20 p-12 bg-gradient-to-r from-green/5 to-green2/5 rounded-3xl border border-green/20"
        >
          <h3 className="text-3xl md:text-4xl font-ubuntu font-bold text-bg mb-4">
            ¿Listo para <span className="text-green">implementar</span> este
            sistema?
          </h3>
          <p className="text-gray max-w-2xl mx-auto mb-8 text-lg">
            Agenda un diagnóstico gratuito y descubre cómo este nivel puede
            transformar tu negocio.
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
      </div>
    </section>
  );
};

export default ServicePage;
