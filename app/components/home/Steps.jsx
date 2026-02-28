"use client"
import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stepsData = [
  {
    number: "1",
    title: "PLANIFICACIÓN",
    items: [
      "Definición de objetivos y alcance del proyecto",
      "Creación del prototipo visual y mapa del sitio",
      "Investigación de mercado y competencia",
      "Estrategia de contenido",
    ],
    gradient: "from-blue-500 to-cyan-500",
    icon: "📋",
    size: "w-[250px] h-[250px] xl:w-[300px] xl:h-[300px]",
    position: "md:absolute md:bottom-10 xl:left-0",
    zIndex: "z-10",
  },
  {
    number: "2",
    title: "DESARROLLO",
    items: [
      "Implementación de funcionalidades",
      "Programación con tecnologías modernas",
      "Integración de bases de datos",
      "Optimización de rendimiento",
    ],
    gradient: "from-green-500 to-emerald-500",
    icon: "💻",
    size: "w-[300px] h-[300px] xl:w-[400px] xl:h-[400px]",
    position:
      "md:absolute bottom-8 md:bottom-40 xl:bottom-32 md:left-36 lg:left-48 xl:left-56",
    zIndex: "z-20",
  },
  {
    number: "3",
    title: "PRUEBAS",
    items: [
      "Testeo en diferentes dispositivos",
      "Pruebas de usabilidad",
      "Corrección de bugs",
      "Validación con usuarios",
    ],
    gradient: "from-orange-500 to-red-500",
    icon: "🔍",
    size: "w-[350px] h-[350px] xl:w-[500px] xl:h-[500px]",
    position:
      "md:absolute bottom-12 md:top-[10%] lg:top-[8%] md:left-[38%] lg:left-[35%]",
    zIndex: "z-30",
  },
  {
    number: "4",
    title: "LANZAMIENTO",
    items: [
      "Publicación del sitio web",
      "Monitoreo inicial",
      "Configuración de analytics",
      "Plan de mantenimiento",
    ],
    gradient: "from-purple-500 to-pink-500",
    icon: "🚀",
    size: "w-[400px] h-[400px] xl:w-[550px] xl:h-[550px]",
    position:
      "md:absolute bottom-20 md:top-[-25%] lg:top-[-27%] xl:top-[-20%] md:right-[-32] lg:right-2",
    zIndex: "z-40",
  },
];

const StepCircle = ({
  number,
  title,
  items,
  gradient,
  icon,
  size,
  position,
  zIndex,
  index,
}) => {
  const circleRef = useRef(null);
  const isInView = useInView(circleRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={circleRef}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      className={`
        relative rounded-full
        flex flex-col items-center justify-center
        p-6 md:p-8
        transition-all duration-500
        cursor-pointer
        ${size} ${position} ${zIndex}
        bg-gradient-to-br ${gradient}
        shadow-2xl hover:shadow-3xl
        border-4 border-white/20
        backdrop-blur-sm
      `}
      style={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* Número decorativo de fondo */}
      <span className="absolute text-8xl md:text-9xl font-black text-white/10 select-none -z-0">
        {number}
      </span>

      {/* Número */}
      <span className="text-2xl md:text-3xl font-black text-white mb-2 relative z-10">
        PASO {number}
      </span>

      {/* Título */}
      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 text-center relative z-10">
        {title}
      </h3>

      {/* Lista de items */}
      <ul className="text-xs md:text-[15px] text-white/90 space-y-1 px-4 relative z-10">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex items-start gap-2"
          >
            <span className="text-white mt-1">•</span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 rounded-full bg-white/0 hover:bg-white/10 transition-colors duration-300" />
    </motion.div>
  );
};

const Steps = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(titleRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        subtitleRef.current,
        {
          opacity: 0,
          x: -30,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />

        {/* Líneas de conexión entre círculos */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.1 }}
        >
          <line
            x1="15%"
            y1="30%"
            x2="35%"
            y2="50%"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <line
            x1="35%"
            y1="50%"
            x2="55%"
            y2="35%"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <line
            x1="55%"
            y1="35%"
            x2="80%"
            y2="15%"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="relative z-10 max-w-2xl mb-20">
          <motion.div ref={titleRef} className="space-y-2">
            <span className="inline-block px-4 py-2 bg-green/10 text-green rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              Nuestro Proceso
            </span>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-ubuntu font-black tracking-tight leading-tight">
              ASÍ{" "}
              <span className="bg-gradient-to-r from-green to-green2 bg-clip-text text-transparent">
                POTENCIAMOS
              </span>
            </h2>

            <h2
              ref={subtitleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-ubuntu font-black tracking-tight leading-tight text-white"
            >
              EL ÉXITO DE TU
              <br />
              NEGOCIO
            </h2>
          </motion.div>

          {/* Descripción corta */}
          <p className="text-lg text-gray mt-6 max-w-md">
            Un proceso meticuloso y probado para garantizar resultados
            excepcionales en cada proyecto.
          </p>
        </div>

        {/* Contenedor de círculos */}
        <div className="relative min-h-[1000px] flex flex-col items-center md:gap-16 md:block">
          {stepsData.map((step, index) => (
            <StepCircle
              key={index}
              index={index}
              number={step.number}
              title={step.title}
              items={step.items}
              gradient={step.gradient}
              icon={step.icon}
              size={step.size}
              position={step.position}
              zIndex={step.zIndex}
            />
          ))}
        </div>

        {/* Llamada a la acción */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <a
            href="/quote"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green to-green2 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>Comienza tu proyecto</span>
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Estilos personalizados */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
};

export default Steps;
