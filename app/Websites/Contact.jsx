"use client";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const form = useRef();
  const sectionRef = useRef();
  const inputRefs = useRef([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      inputRefs.current.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_g7ikcrb", "template_x5736kv", form.current, {
        publicKey: "oAMxLOr_PKDOIxuO8",
      })
      .then(
        () => {
          setSuccess("SUCCESS!");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div
      ref={sectionRef}
      id="contacto"
      className="h-screen flex flex-col gap-20 py-10"
    >
      <h1 className="contact-title text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center pl-5">
        <span className="bg-green mr-3">CONTÁCTANOS</span>y trabaja con{" "}
        <span className="text-green">nostros</span>.
      </h1>

      <div className="flex flex-col items-center">
        <Form
          ref={form}
          onSubmit={sendEmail}
          className="w-60 max-w-80 flex flex-col gap-4 md:w-72"
          validationBehavior="native"
        >
          <Input
            isRequired
            errorMessage="Please enter a valid username"
            label="Nombre."
            labelPlacement="outside"
            name="from_name"
            placeholder="Escribe tu nombre."
            type="text"
            ref={(el) => (inputRefs.current[0] = el)}
          />

          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Número."
            labelPlacement="outside"
            name="number"
            placeholder="Escribe tu número."
            type="tel"
            ref={(el) => (inputRefs.current[1] = el)}
          />

          <Textarea
            isRequired
            size="lg"
            errorMessage="Please enter a valid email"
            label="Descripción."
            labelPlacement="outside"
            name="message"
            placeholder="Describe tu negocio y tus intereses."
            type="text"
            ref={(el) => (inputRefs.current[2] = el)}
          />

          <div
            className="flex gap-2 self-center"
            ref={(el) => (inputRefs.current[3] = el)}
          >
            <Button color="primary" type="submit">
              Enviar
            </Button>
            <Button type="reset" variant="flat" value="Send">
              Borrar
            </Button>
          </div>
        </Form>
        {success && (
          <p className="text-green justify-self-center mt-5">
            ¡Formulario enviado con éxito!
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
