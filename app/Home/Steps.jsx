import React from "react";

const Circle = ({ number, title, items, className }) => {
  return (
    <div
      className={`
          relative rounded-full
          flex flex-col items-center justify-center
          p-10 md:mb-0
          transition-transform duration-300
          hover:scale-105
          ${className}
        `}
    >
      <span className="text-3xl md:text-5xl font-bold mb-2">{number}</span>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>

      <ul className="text-[13px] lg:text-sm xl:text-md list-disc list-inside opacity-90">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const Steps = () => {
  return (
    <section className="relative min-h-screen overflow-hidden py-20 mx-auto 2xl:max-w-[1280px]">
      {/* TÍTULO */}
      <div className="relative z-10 max-w-xl mb-16 px-10">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          ASÍ <span className="text-green">POTENCIAMOS</span>
          <br />
          EL ÉXITO DE TU
          <br />
          NEGOCIO
        </h2>
      </div>

      {/* CONTENEDOR */}
      <div className="relative min-h-[800px] flex flex-col items-center md:gap-16 md:block">
        {/* PASO 1 */}
        <Circle
          number="1"
          title="PLANIFICACIÓN"
          items={[
            "Definición de objetivos y alcance del proyecto.",
            "Creación del prototipo visual y mapa del sitio.",
          ]}
          className="
            bg-white text-black w-[250px] h-[250px] xl:w-[300px] xl:h-[300px] md:absolute md:bottom-10 xl:left-0 z-10"
        />

        {/* PASO 2 */}
        <Circle
          number="2"
          title="DESARROLLO"
          items={[
            "Implementación de funcionalidades.",
            "Programación.",
            "Uso de tecnologías modernas.",
          ]}
          className="
           bg-green2 w-[300px] h-[300px]
  xl:w-[400px] xl:h-[400px]
  md:absolute bottom-8 md:bottom-40 xl:bottom-32 md:left-36 lg:left-48 xl:left-56
  z-20
          "
        />

        {/* PASO 3 */}
        <Circle
          number="3"
          title="PRUEBAS"
          items={["Testeo en diferentes dispositivos y navegadores."]}
          className="
           bg-green3 w-[350px] h-[350px] lg:w-[400px] lg:h-[400px]
  xl:w-[500px] xl:h-[500px]
  md:absolute bottom-12 md:top-[10%] lg:top-[8%] md:left-[38%] lg:left-[35%]
  z-30
          "
        />

        {/* PASO 4 */}
        <Circle
          number="4"
          title="LANZAMIENTO"
          items={["Publicación del sitio web y monitoreo inicial."]}
          className="
            bg-green4 w-[400px] h-[400px] lg:w-[450px] lg:h-[450px]
            xl:w-[550px] xl:h-[550px]
  md:absolute bottom-20 md:top-[-25%] lg:top-[-27%] xl:top-[-20%] md:right-[-32] lg:right-2
  z-40
          "
        />
      </div>
    </section>
  );
};

export default Steps;
