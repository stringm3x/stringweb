import React from "react";

const prices = [
  {
    id: 1,
    title: "Básico",
    price: "$4,699",
    content: [
      "Landing Page optimizada",
      "Diseño Responsive",
      "Integración Básica",
    ],
  },
  {
    id: 2,
    title: "Empresarial",
    price: "$8,699",
    content: [
      "Sitio web Corporativo (5 secciones)",
      "SEO básico",
      "Formularios de contácto",
    ],
  },
  {
    id: 3,
    title: "E-Commerce",
    price: "$15,199",
    content: [
      "Tienda de linea completa",
      "Pasarela de pago",
      "Integración con inventario",
    ],
  },
];

const Prices = () => {
  return (
    <section id="precios" className="lg:h-screen flex flex-col gap-20 py-20">
      <div className="flex flex-col gap-3 lg:w-1/4 lg:ml-5 px-10 lg:px-0">
        <h1 className="text-7xl text-center mx-10 font-bold text-green bg-white">
          Precios
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-5 lg:justify-evenly">
        {prices.map((prices) => (
          <div key={prices.id} className="w-64 md:w-72 xl:w-80 h-72 flex flex-col items-center justify-around border-2 rounded-2xl border-green group hover:bg-white ">
            <div className="flex flex-col">
              <h1 className="text-4xl xl:text-5xl font-bold text-center p-3 group-hover:text-bg">{prices.title}</h1>
              <div className="h-1 bg-white group-hover:bg-bg"></div>
            </div>

            <div>
              <h1 className="text-7xl font-bold text-green">{prices.price}</h1>
            </div>

            <div className="group-hover:text-bg">
            <ul className="font-bold xl:text-xl list-disc list-inside space-y-2 mt-4">
              {prices.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Prices;
