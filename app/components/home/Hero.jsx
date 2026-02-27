"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

const Hero = () => {
  const textRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, {
      types: "chars",
    });

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
    });

    gsap.set(leftImageRef.current, { x: 300, opacity: 0 });
    gsap.set(rightImageRef.current, { x: -300, opacity: 0 });

    tl.to(leftImageRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
    });

    tl.to(
      rightImageRef.current,
      {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      },
      "-=1.2"
    );

    tl.from(
      split.chars,
      {
        yPercent: 120,
        opacity: 0,
        stagger: {
          amount: 0.8,
        },
        duration: 1.2,
      },
      "-=1"
    );

    gsap.set(logoRef.current, {
      rotate: -30,
      scale: 0.9,
      y: 90,
      opacity: 0,
    });

    tl.to(logoRef.current, {
      rotate: 3,
      scale: 1.05,
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    }).to(logoRef.current, {
      rotate: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    });

    return () => {
      split.revert();
      tl.kill();
    };
  }, []);

  return (
    <section className="relative bg-white h-screen flex flex-col justify-center overflow-hidden">
      {/* Imagen izquierda */}
      <Image
        ref={leftImageRef}
        src="/hero.png"
        alt="hero-left"
        width={1000}
        height={1000}
        className="absolute brightness-75 left-[-90px] top-2 
        sm:left-[-150px] sm:top-5 
        lg:top-48 lg:-translate-y-[270px] 
        xl:left-0 xl:-translate-y-[300px] 
        2xl:translate-y-[-240px] 2xl:top-32 
        pointer-events-none"
      />

      {/* Imagen derecha */}
      <Image
        ref={rightImageRef}
        src="/hero.png"
        alt="hero-right"
        width={1000}
        height={1000}
        className="absolute brightness-75 bottom-0 left-[100px] 
        sm:left-[200px] 
        xl:right-0 lg:-translate-y-[-100px] 
        xl:left-[500px] xl:-translate-y-[-120px] 
        2xl:left-[1200px] 2xl:-translate-y-[-100px] 
        pointer-events-none"
      />

      <div className="relative pl-4 flex flex-col sm:flex-row-reverse justify-items-end 2xl:justify-center items-center h-[300px] 2xl:h-[500px] w-full">
        <div
          ref={textRef}
          className="relative text-bg font-ubuntu font-extrabold tracking-tight text-left sm:pr-5 
          text-[55px] leading-[41px] 
          sm:text-[80px] sm:leading-[58px] 
          lg:text-8xl lg:leading-[75px] 
          xl:text-[140px] xl:leading-[105px] 
          2xl:leading-[105px] overflow-hidden"
        >
          <h1>CREAMOS</h1>
          <h1>EXPERIENCIAS</h1>
          <h1>DIGITALES</h1>
        </div>

        <div className="w-2/3 mt-5 sm:mt-0 sm:w-auto">
          <Image
            ref={logoRef}
            src="/logo-s.png"
            alt="logo-s"
            width={400}
            height={800}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
