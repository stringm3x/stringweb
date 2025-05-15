"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const items = [
  {
    id: 1,
    title: "Seguridad y respaldo",
    content: [
      "Copias de seguridad semanales para evitar pérdidas de datos. ",
      "Monitoreo constante para prevenir ataques y vulnerabilidades. ",
    ],
  },
  {
    id: 2,
    title: "Correcion de errores",
    content: [
      "Solución de enlaces rotos, formularios que no funcionan, imágenes que no cargan, etc.",
    ],
  },
  {
    id: 3,
    title: "Actualización de contenido",
    content: [
      "Modificaciones en textos o imágenes según lo solicite el cliente.",
    ],
  },
  {
    id: 4,
    title: "Optimizcón del Rendimiento",
    content: [
      "Limpieza de caché y optimización de base de datos.  ",
      "Mejoras en la velocidad de carga y rendimiento general. ",
    ],
  },
];

const Browser = () => {
  const [selected, setSelected] = useState(items[0]);
  return (
    <section className="md:h-screen py-20">
      <div className="pb-10 pl-4">
        <h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
          ¡ <span className="w-full bg-green">Mantenimiento</span> después de tu{" "}
          <span className="text-green">entrega</span>!
        </h1>
      </div>

      <div className="gap-24 flex flex-col-reverse items-center justify-center py-20 lg:flex-row lg:gap-6">
        <motion.div
          key={selected.id}
          className="flex-2 p-6 w-full h-full content-center lg:w-1/2 lg:p-8 "
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div className="text-2xl text-whitelight w-full  text-center lg:text-left md:text-xl lg:text-2xl">
            {selected.content.map((line, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {line}
              </motion.li>
            ))}
          </motion.div>
        </motion.div>

        <div className="w-full p-6 lg:w-1/2 flex flex-col gap-2 lg:gap-8 lg:p-8 ">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className={`text-2xl lg:text-4xl transition-all duration-300 ${
                selected.id === item.id
                  ? "text-white bg-green md:px-4 md:py-2 shadow-lg rounded-2xl"
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
