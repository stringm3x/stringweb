import React from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import Link from "next/link";

const Us = () => {
  return (
    <div className="h-screen p-6 sm:p-20">
      <div className="relative h-full w-full p-3 sm:p-10">
        <Image
          src="/sonido.png"
          alt="us"
          fill
          className="object-cover absolute brightness-75 rounded-2xl"
        />

        <div className="relative font-bold tracking-tight text-4xl leading-[30px] sm:text-5xl sm:leading-[45px] lg:text-7xl xl:text-8xl lg:leading-[55px] ">
          <h1>Hemos ayudado a las</h1>
          <h1>marcas a crecer con</h1>
          <h1>claridad y confianza.</h1>
        </div>

        <Link href="/Us">
          <Button className="relative bg-green text-bg font-bold px-10">
            Acerca de STRING
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Us;
