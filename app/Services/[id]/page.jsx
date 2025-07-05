"use client";

import React from "react";
import Link from "next/link";
import servicios from "../data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";

export default function ServicioPage({ params: paramsPromise }) {
  const params = React.use(paramsPromise);
  const servicio = servicios.find((p) => p.id.toString() === params.id);
  if (!servicio) return notFound();

  return (
    <section className="p-2 md:p-10 xl:p-20 space-y-20">
      <div className="bg-white w-full h-full rounded-2xl text-bg flex flex-col gap-5 items-center p-5 lg:p-10">
        <h1 className="text-xl lg:text-3xl text-gray">Servicio</h1>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4">{servicio.service}</h1>
        <p className="text-xl lg:text-2xl text-center lg:w-1/2 text-gray">{servicio.intro}</p>

        <div className="flex flex-col sm:flex-row gap-5 py-20">
          <p className="sm:w-1/2 lg:text-xl xl:text-2xl self-center text-center sm:text-left">{servicio.p}</p>
          <Image
            src={servicio.img2}
            alt={servicio.service}
            width={400}
            height={200}
            className="sm:w-1/2 border-1 border-bg"
          />
        </div>

        <div className="w-full flex flex-col gap-10">
          <div className="text-left font-ubuntu font-bold tracking-tight text-5xl leading-[40px] sm:text-6xl lg:ext-7xl xl:text-8xl sm:leading-[60px] xl:leading-[74px]">
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
                <Image
                  src={`/icons/feature-${idx + 1}.svg`}
                  alt=""
                  width={64}
                  height={64}
                  className="mb-4"
                />
                <p className="text-lg">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <Link href="/Services">
          <Button className="bg-green text-bg text-xl px-10 hover:text-white hover:bg-black">Volver a Servicios</Button>
        </Link>
      </div>
    </section>
  );
}
