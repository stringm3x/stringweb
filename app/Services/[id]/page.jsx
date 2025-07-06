"use client";
import React, { useState } from "react";
import Link from "next/link";
import servicios from "../data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@heroui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const contentVariants = {
  open: { scaleY: 1, opacity: 1 },
  collapsed: { scaleY: 0, opacity: 0 },
};

export default function ServicioPage({ params: paramsPromise }) {
  // Desempaqueta params Promise
  const params = React.use(paramsPromise);
  // Busca el servicio por id
  const servicio = servicios.find((p) => p.id === params.id);
  if (!servicio) return notFound();

  // Usa el array dinámico de FAQs
  const items = servicio.faqs || [];
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section className="p-2 md:p-10 xl:p-20 space-y-20 overflow-hidden">
      {/* Contenido principal */}
      <div className="bg-white w-full h-full rounded-2xl text-bg flex flex-col gap-5 items-center p-5 lg:p-10">
        <h1 className="text-xl lg:text-3xl text-gray">Servicio</h1>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4">
          {servicio.service}
        </h1>
        <p className="text-xl lg:text-2xl text-center lg:w-1/2 text-gray">
          {servicio.intro}
        </p>

        <div className="flex flex-col sm:flex-row gap-5 py-20">
          <p className="sm:w-1/2 lg:text-xl xl:text-2xl self-center text-center sm:text-left">
            {servicio.p}
          </p>
          <Image
            src={servicio.img}
            alt={servicio.service}
            width={400}
            height={200}
            className="sm:w-1/2"
          />
        </div>

        <div className="w-full flex flex-col gap-10">
          <div className="text-left font-ubuntu font-bold tracking-tight text-5xl leading-[40px] sm:text-6xl lg:text-7xl xl:text-8xl sm:leading-[60px] xl:leading-[74px]">
            <h1>LO QUE</h1>
            <h1>LO HACEMOS</h1>
            <h1 className="font-sans font-light text-green">POR TI:</h1>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {servicio.content.map((texto, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-4"
              >
                <li className="md:text-xl">{texto}</li>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botón volver */}
      <div>
        <Link href="/Services">
          <Button className="bg-green text-bg text-xl md:py-7 md:px-10 hover:text-white hover:bg-black">
            Volver a Servicios
          </Button>
        </Link>
      </div>

      <div className="w-full max-h-min space-y-10 pb-20">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index}>
              <motion.button
                onClick={() => toggle(index)}
                layout
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className={`w-full flex items-center justify-between px-3 py-5 rounded-t-2xl transition-all duration-300 ${
                  isOpen
                    ? "bg-white text-white"
                    : "bg-black text-gray hover:text-white"
                }`}
              >
                <span
                  className={`text-xl text-left md:text-4xl font-bold ${
                    isOpen ? "text-green" : ""
                  }`}
                >
                  {item.title}
                </span>
                <motion.span
                  initial={false}
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <FaMinus className="text-sm text-bg" />
                  ) : (
                    <FaPlus className="text-sm" />
                  )}
                </motion.span>
              </motion.button>

              <AnimatePresence initial={false} mode="wait">
                {isOpen && (
                  <motion.div
                    key={`panel-${index}`}
                    variants={contentVariants}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ originY: 0 }}
                    className="overflow-hidden bg-white px-2 pb-6 rounded-b-2xl"
                  >
                    <p className="text-bg md:text-xl text-left pt-2">
                      {item.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
