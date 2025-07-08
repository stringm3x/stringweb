"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_uxw22vj", // e.g. service_xxx
        "template_4c3eeqp", // e.g. template_yyy
        formRef.current,
        "oAMxLOr_PKDOIxuO8" // e.g. user_zzz
      )
      .then(
        () => {
          setStatus("SUCCESS");
          e.target.reset();
        },
        () => {
          setStatus("ERROR");
        }
      );
  };

  return (
    <section className="h-screen flex flex-col gap-10 items-center p-10 md:p-20">
      <Image src="/logo-s.png" alt="logo" width={100} height={200} />

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col gap-10"
      >
        <h1 className="text-center text-4xl md:text-7xl">
          ¡Trabajemos Juntos!
        </h1>

        <div className="p-5 flex flex-col gap-5 bg-beige2 rounded-2xl">
          <div className="flex flex-col sm:flex-row gap-5">
            <Textarea
              isRequired
              name="user_name"
              className="w-full"
              label="Nombre"
              labelPlacement="outside"
              placeholder="Nombre completo"
            />
            <Textarea
              isRequired
              name="user_phone"
              className="w-full"
              label="Número"
              labelPlacement="outside"
              placeholder="Número"
            />
          </div>

          <Textarea
            isRequired
            name="user_email"
            className="w-full"
            label="E-Mail"
            labelPlacement="outside"
            placeholder="Escribe tu correo."
          />

          <Textarea
            isRequired
            name="message"
            className="w-full"
            label="Mensaje"
            labelPlacement="outside"
            placeholder="Describe lo que necesitas."
          />
        </div>

        <Button
          type="submit"
          className="lg:w-52 py-8 px-8 lg:py-7 bg-green text-xl text-black self-center rounded-3xl"
        >
          Enviar
        </Button>

        {status === "SUCCESS" && (
          <p className="text-green text-center">¡Mensaje enviado!</p>
        )}
        {status === "ERROR" && (
          <p className="text-red-500 text-center">
            Ocurrió un error. Intenta de nuevo.
          </p>
        )}
      </form>
    </section>
  );
}
