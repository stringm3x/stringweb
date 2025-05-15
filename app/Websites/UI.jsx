"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  {
    title: "UX",
    description:
      "Centramos en la experiencia del usuario, la navegación, la arquitectura y cómo interactúa con la interfaz.",
  },
  {
    title: "UI",
    description:
      "Centramos en la apariencia del sitio, como los colores, fuentes, imágenes, botones y disposición de los elementos en la pantalla.",
  },
];

const CardSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <section className="h-screen bg-black flex flex-col items-center justify-center gap-12 p-4">
      <h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center">
        Diseño <span className="text-green">UX</span> &{" "}
        <span className="text-green">UI</span>.
      </h1>

      <div className="flex flex-col gap-10">
        {cards.map((card, index) => (
          <div key={index} className="relative h-40 w-full max-w-4xl">
            <motion.div
              animate={{ x: selectedIndex === index ? -220 : -40 }}
              transition={{ type: "spring", stiffness: 70 }}
              className="absolute left-0 top-0 w-64 h-40 rounded-xl flex items-center justify-center cursor-pointer z-10"
              onClick={() => handleClick(index)}
            >
              <span className="text-white text-6xl font-bold">
                {card.title}
              </span>
            </motion.div>

            <AnimatePresence>
              {selectedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ delay: 0.1 }}
                  className="lg:ml-60 xl:ml-72 h-40  text-white rounded-xl p-6 flex items-center max-w-xl"
                >
                  <p className="text-lg font-medium">{card.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardSlider;
