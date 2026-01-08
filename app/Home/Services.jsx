"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const items = [
  {
    title: "Diseño UI/UI",
    content: "Interfaz amigable y moderna para tus usuarios.",
  },
  {
    title: "Desarrollo Web",
    content: "Sitios rápidos, accesibles y funcionales.",
  },
  {
    title: "Optimización SEO",
    content: "Haz que te encuentren en Google.",
  },
  {
    title: "Pruebas y mantenimiento",
    content: "Nos aseguramos de que todo funcione bien.",
  },
  {
    title: "Adaptabilidad Mobile",
    content: "Diseño responsivo para todos los dispositivos.",
  },
];

const contentVariants = {
  open: { height: "auto", opacity: 1 },
  collapsed: { height: 0, opacity: 0 },
};

const Services = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section className="flex flex-col gap-20 bg-white p-8 md:p-10">
      <div className="mx-auto 2xl:max-w-[1280px] xl:w-2/3 text-bg font-ubuntu tracking-tight font-bold leading-[37px] text-5xl md:leading-[60px] md:text-7xl lg:leading-[75px] lg:text-8xl">
        <h1>POTENCIA TUS</h1>
        <h1>RESULTADOS</h1>
        <h1>COMERCIALES.</h1>
      </div>

      <Button className="bg-green text-bg text-xl md:text-2xl font-bold p-8 rounded-full">
        Conoce nuestros servicios
      </Button>

      <div className=" mx-auto  2xl:max-w-[1280px] w-full max-h-min space-y-10 pb-20">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index}>
              <motion.button
                onClick={() => toggle(index)}
                className={`w-full flex items-center justify-between px-6 py-5 rounded-t-2xl transition-all duration-300 ${
                  isOpen
                    ? "bg-black text-white"
                    : "bg-white text-gray hover:text-black"
                }`}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <span
                  className={`text-xl md:text-4xl font-bold ${
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
                    <FaMinus className="text-sm" />
                  ) : (
                    <FaPlus className="text-sm" />
                  )}
                </motion.span>
              </motion.button>

              <AnimatePresence initial={false} mode="wait">
                {isOpen && (
                  <motion.div
                    key={`panel-${index}`}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ originY: 0 }}
                    className="overflow-hidden bg-black px-6 pb-6 rounded-b-2xl"
                  >
                    <p className="text-white md:text-xl pt-2">{item.content}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
