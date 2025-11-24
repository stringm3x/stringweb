"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

const Hero = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = new SplitType(textRef.current, { types: "chars" });

    gsap.from(text.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
    });
  }, []);

  return (
    <section className="relative bg-white h-screen flex flex-col justify-center overflow-hidden">
      <Image
        src="/hero.png"
        alt="hero-left"
        width={1000}
        height={1000}
        className="absolute brightness-75 left-[-90] top-2 sm:left-[-150] sm:top-5 lg:top-48 lg:-translate-y-[270px] xl:left-0 xl:-translate-y-[300px] 2xl:translate-y-[-240px] 2xl:top-48 pointer-events-none"
      />

      <Image
        src="/hero.png"
        alt="hero-right"
        width={1000}
        height={1000}
        className="absolute brightness-75 bottom-0 left-[100] sm:left-[200] xl:right-0 lg:-translate-y-[-100px] xl:left-[500] xl:-translate-y-[-120px] 2xl:left-[900] 2xl:-translate-y-[-70px] pointer-events-none"
      />

      <div className="relative flex flex-col sm:flex-row-reverse justify-items-end 2xl:justify-center items-center h-[300px] w-full">
        <div
          className="relative text-bg font-ubuntu font-extrabold tracking-tight text-left sm:pr-5 text-6xl leading-[45px] sm:text-7xl sm:leading-[50px] lg:text-8xl lg:leading-[75px] xl:text-9xl xl:leading-[95px] "
        >
          <h1>CREAMOS</h1>
          <h1>EXPERIENCIAS</h1>
          <h1>DIGITALES</h1>
        </div>

        <div className="w-2/3 mt-5 sm:mt-0 sm:w-auto">
          <Image src="/logo-s.png" alt="logo-s" width={400} height={800} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
