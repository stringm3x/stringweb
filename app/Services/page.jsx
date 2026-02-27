"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import servicios from "./data";

const PageServices = () => {
  return (
    <section className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green rounded-full text-sm font-semibold mb-4">
            ✦ Lo que hacemos
          </span>

          <h1 className="text-5xl md:text-7xl font-ubuntu font-extrabold text-black mb-4">
            Servicios
          </h1>

          <p className="text-gray max-w-2xl mx-auto text-lg">
            Soluciones digitales personalizadas para llevar tu negocio al
            siguiente nivel.
          </p>
        </div>

        {/* Grid de servicios - Versión simplificada */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicios.map((servicio, index) => (
            <Link
              href={`/Services/${servicio.id}`}
              key={servicio.id}
              className="block"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* Imagen */}
                <div className="relative h-48 w-full">
                  <Image
                    src={servicio.img}
                    alt={servicio.service}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h2 className="text-2xl font-ubuntu font-bold text-black mb-1">
                    {servicio.service}
                  </h2>

                  <h3 className="text-lg font-ubuntu text-green mb-3">
                    {servicio.title2}
                  </h3>

                  <p className="text-gray text-sm line-clamp-2">
                    {servicio.intro}
                  </p>

                  <div className="mt-4 flex items-center text-green font-medium">
                    Ver detalles
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray mb-6">
            ¿No encuentras lo que buscas? Todos los proyectos son
            personalizados.
          </p>

          <Link
            href="/Quote"
            className="inline-flex items-center px-6 py-3 bg-green text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
          >
            Hablemos de tu proyecto
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageServices;
