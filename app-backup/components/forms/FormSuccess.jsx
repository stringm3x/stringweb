"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const FormSuccess = ({ data, onReset }) => {
  const containerRef = useRef(null);
  const checkRef = useRef(null);
  const whatsappUrl = `https://wa.me/521234567890?text=${encodeURIComponent(
    `Hola! Te escribo por mi cotización:\n\n` +
      `Nombre: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `WhatsApp: ${data.whatsapp}\n` +
      `Proyecto: ${data.projectType}\n` +
      `Objetivo: ${data.objective}\n` +
      `Fecha ideal: ${data.idealDate}\n` +
      `Presupuesto: $${data.budget} USD`
  )}`;

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    ).fromTo(
      checkRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" },
      "-=0.2"
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-center py-8 px-4 bg-black rounded-2xl"
    >
      <div
        ref={checkRef}
        className="w-20 h-20 bg-green rounded-full mx-auto mb-6 flex items-center justify-center"
      >
        <svg
          className="w-10 h-10 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-white mb-2">
        ¡Cotización Enviada!
      </h3>

      <p className="text-gray mb-8">
        Recibirás un email con los detalles. Te contactaremos en menos de 24h.
      </p>

      <div className="space-x-8">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 group bg-white text-black hover:bg-green hover:text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.181-.076.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.072.043.419-.101.824z" />
          </svg>
          Contactar por WhatsApp
        </a>

        <button
          onClick={onReset}
          className="inline-block text-gray hover:text-white underline"
        >
          Nueva cotización
        </button>
      </div>
    </div>
  );
};
