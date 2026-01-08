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
    <section className="overflow-hidden min-h-screen mx-auto  flex flex-col justify-center py-10">
      <div className="flex flex-col justify-center py-16 ">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-ubuntu font-bold pl-5 md:pl-20 justify-self-center">
          SERVICIOS
        </h1>
      </div>

      <div className="flex flex-wrap gap-5 justify-center xl:gap-0 xl:flex-row xl:justify-around">
        {servicios.map(({ id, service, img, title2 }) => (
          <Link href={`/Services/${id}`} key={id}>
            <div className="card w-[330px] h-[400px] 2xl:w-[410px] rounded-3xl flex flex-col justify-center bg-white group hover:bg-black hover:border-green border-2 py-5">
              <div className=" tracking-tigh font-ubuntu font-extrabold px-5 2xl:px-2">
                <h1 className="text-bg group-hover:text-white text-3xl leading-[30px] lg:leading-[10px]">
                  {service}
                </h1>
                <h1 className="text-green text-3xl leading-[30px] lg:leading-[40px]">
                  {title2}
                </h1>
              </div>

              <Image
                src={img}
                alt={service}
                width={500}
                height={500}
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default pageServices;
