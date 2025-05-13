"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const items = [
  {
    id: 1,
    title: "Seguridad y respaldo",
    content:
      "Cuando programas desde cero, tienes control total sobre el diseño, la funcionalidad y la experiencia del usuario, sin limitaciones impuestas por plantillas predefinidas.",
  },
  {
    id: 2,
    title: "Correcion de errores",
    content:
      "Las páginas hechas con código suelen ser más rápidas y ligeras, ya que puedes optimizar el código y evitar el exceso de scripts o plugins innecesarios.",
  },
  {
    id: 3,
    title: "Actualización de contenido",
    content:
      "Los sitios creados con código propio son menos vulnerables a ataques comunes en plataformas populares, como los exploits en WordPress o Joomla.",
  },
  {
    id: 4,
    title: "Optimizcón del Rendimiento",
    content:
      "Si necesitas agregar nuevas funcionalidades, puedes hacerlo sin depender de plugins o actualizaciones de terceros, permitiendo que tu web crezca de manera eficiente.",
  },
];

const Browser = () => {
  const [selected, setSelected] = useState(items[0]);
  return (
    <section className="h-screen py-20">
      <div className="pb-10 pl-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
          ¡ <span className="w-full bg-green">Mantenimiento</span> después de tu{" "}
          <span className="text-green">entrega</span>!
        </h1>
      </div>

      <div className="gap-24 flex flex-col items-center justify-center py-20  lg:flex-row lg:gap-6">
        <motion.div
          key={selected.id}
          className="flex-2 p-6 w-full h-full content-center lg:w-1/2 lg:p-8 "
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div className="text-xl text-whitelight w-full  text-center lg:text-left md:text-xl lg:text-2xl">
            {selected.content}
          </motion.div>
        </motion.div>

        <div className="w-full p-6 lg:w-1/2 flex flex-col gap-2 lg:gap-8 lg:p-8 ">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className={`text-2xl lg:text-4xl transition-all duration-300 ${
                selected.id === item.id
                  ? "text-white bg-green md:px-4 md:py-2 shadow-lg"
                  : "text-gray hover:text-white"
              }`}
            >
              {item.title}.
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Browser;
