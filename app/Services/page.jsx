"use client";

import { useState } from "react";
import React from "react";
import Image from "next/image";
import servicios from "./data";
import Link from "next/link";
import { Button } from "@heroui/button";

const pageServices = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative overflow-hidden flex flex-col py-10">
      <div className="relative flex flex-col justify-center h-72 lg:h-80 xl:h-96">
        <Image
          src="/hero.png"
          alt="string"
          width={500}
          height={1000}
          className="absolute md:w-2/3 top-[-30] md:top-[-50] lg:top-[-100] xl:top-[-150] brightness-50"
        />

        <h1 className="relative text-6xl md:text-9xl font-ubuntu font-bold pl-5 md:pl-20 justify-self-center">
          SERVICIOS
        </h1>

        <Image
          src="/hero.png"
          alt="string"
          width={500}
          height={1000}
          className="absolute md:w-2/3 right-[-50]  bottom-[-10] md:right-[-100] md:bottom-[-50] lg:bottom-[-100]  xl:bottom-[-150] self-end brightness-50"
        />
      </div>

      <div className="relative px-5 md:px-20 flex flex-col gap-10">
        {servicios.map(({ id, service, img }) => (
          <div
            className="bg-white md:h-72 lg:h-80 w-full rounded-2xl p-4 md:p-10 flex flex-col md:flex-row"
            key={id}
          >
            <div className="md:w-2/3 h-full">
              <h1 className=" text-green font-ubuntu font-extrabold tracking-tight text-left text-4xl md:text-6xl lg:text-8xl leading-[70px]">
                {service}
              </h1>
              <Image src={img} alt={service} width={900} height={500} className="object-cover" />
            </div>

            <div className="md:w-1/3 h-full content-end">
              <Link href={`/Services/${id}`} className="">
                <Button className="xl:w-60 p-7 md:p-10 text-2xl rounded-full text-green bg-bg hover:text-bg hover:bg-green">Ver Servicio</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default pageServices;
