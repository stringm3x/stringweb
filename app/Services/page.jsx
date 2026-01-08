"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import servicios from "./data";
import Link from "next/link";
import { Button } from "@heroui/button";

const pageServices = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  useEffect(() => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      const tl = gsap.timeline({ paused: true });

      tl.to(card, {
        scale: 1.05,
        x: window.innerWidth >= 1024 ? 15 : 0,
        duration: 0.3,
        ease: "power2.out",
      });

      const enter = () => tl.play();
      const leave = () => tl.reverse();

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);

      return () => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      };
    });
  }, []);

  return (
    <section className="relative overflow-hidden flex flex-col py-10 mx-auto 2xl:max-w-[1280px]">
      <div className="relative flex flex-col justify-center py-20 ">
        <h1 className="relative text-6xl md:text-9xl font-ubuntu font-bold pl-5 md:pl-20 justify-self-center">
          SERVICIOS
        </h1>
      </div>

      <div className="relative px-5 md:px-20 flex flex-col gap-10">
        {servicios.map(({ id, service, img, title2 }) => (
          <div key={id}></div>
        ))}
      </div>
    </section>
  );
};

export default pageServices;
