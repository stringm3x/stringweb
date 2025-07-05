"use client";

import React from "react";
import Image from "next/image";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="h-screen flex flex-col gap-10 items-center p-10 md:p-20">
      <Image src="/logo-s.png" alt="logo" width={100} height={200} />

      <div className="flex flex-col gap-10">
        <h1 className="text-center text-5xl md:text-7xl">¡Trabajemos Juntos!</h1>

        <div
          className="w-{90px} p-5 flex flex-col gap-5 bg-beige2 rounded-2xl"
        >
          <div className="flex flex-row gap-2">
            <Textarea
              isRequired
              className="w-1/2"
              label="Nombre"
              labelPlacement="outside"
              placeholder="Nombre completo"
            />
            <Textarea
              isRequired
              className="w-1/2"
              label="Numero"
              labelPlacement="outside"
              placeholder="Número"
            />
          </div>

          <Textarea
            isRequired
            className="w-full"
            label="E-Mail"
            labelPlacement="outside"
            placeholder="Escribe tu correo."
          />

          <Textarea
            isRequired
            className="w-full"
            label="Mensaje"
            labelPlacement="outside"
            placeholder="Describe lo que necesitas."
          />
        </div>

        <Button className="lg:w-52 py-8 px-8 lg:py-7 bg-green text-xl text-black self-center rounded-3xl">
          Enviar
        </Button>
      </div>
    </section>
  );
};

export default Contact;
