"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  // Refs organizados por funcionalidad
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imagesRef = useRef({
    left: null,
    right: null,
    logo: null,
  });

  const tlRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const textElement = textRef.current;
    if (!textElement) return;

    // Cleanup previous timeline
    if (tlRef.current) {
      tlRef.current.kill();
    }

    // Split text for animation
    const split = new SplitType(textElement, {
      types: "chars, words",
      tagName: "span",
    });

    // Create new timeline
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => {
        // Cleanup split after animation
        split.revert();
      },
    });

    tlRef.current = tl;

    // Initial states
    gsap.set(imagesRef.current.left, {
      x: 300,
      opacity: 0,
      filter: "blur(10px)",
    });

    gsap.set(imagesRef.current.right, {
      x: -300,
      opacity: 0,
      filter: "blur(10px)",
    });

    gsap.set(imagesRef.current.logo, {
      rotate: -30,
      scale: 0.9,
      y: 90,
      opacity: 0,
      filter: "blur(5px)",
    });

    // Animate images with blur reveal
    tl.to(imagesRef.current.left, {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.8,
      ease: "power3.out",
    })
      .to(
        imagesRef.current.right,
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power3.out",
        },
        "-=1.5"
      )
      // Animate text characters
      .from(
        split.chars,
        {
          yPercent: 120,
          opacity: 0,
          rotation: 5,
          stagger: {
            amount: 0.8,
            from: "random",
          },
          duration: 1.2,
          ease: "back.out(1.2)",
        },
        "-=1.2"
      )
      // Animate logo
      .to(imagesRef.current.logo, {
        rotate: 3,
        scale: 1.05,
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
      })
      .to(imagesRef.current.logo, {
        rotate: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });

    // Responsive adjustments
    const handleResize = () => {
      if (window.innerWidth < 640) {
        gsap.set(imagesRef.current.left, { x: 150 });
        gsap.set(imagesRef.current.right, { x: -150 });
      } else {
        gsap.set(imagesRef.current.left, { x: 300 });
        gsap.set(imagesRef.current.right, { x: -300 });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      split.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <section className="relative bg-white h-screen flex flex-col justify-center overflow-hidden">
        <div className="relative sm:pl-4 flex flex-col sm:flex-row-reverse justify-items-end 2xl:justify-center items-center h-[300px] 2xl:h-[500px] w-full">
          <div
            className="text-bg font-ubuntu font-extrabold tracking-tight text-left sm:pr-5 
            text-[50px] leading-[41px] 
            sm:text-[80px] sm:leading-[58px] 
            lg:text-8xl lg:leading-[75px] 
            xl:text-[140px] xl:leading-[105px] 
            2xl:leading-[105px]"
          >
            <h1>CREAMOS</h1>
            <h1>EXPERIENCIAS</h1>
            <h1>DIGITALES</h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-white h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Left Image */}
      <Image
        ref={(el) => {
          imagesRef.current.left = el;
        }}
        src="/hero.png"
        alt="Hero decoration left"
        width={1000}
        height={1000}
        className="absolute brightness-75 left-[-90px] top-2 
          sm:left-[-150px] sm:top-5 
          lg:top-48 lg:-translate-y-[270px] 
          xl:left-0 xl:-translate-y-[300px] 
          2xl:translate-y-[-240px] 2xl:top-32 
          pointer-events-none select-none"
        priority
        loading="eager"
      />

      {/* Right Image */}
      <Image
        ref={(el) => {
          imagesRef.current.right = el;
        }}
        src="/hero.png"
        alt="Hero decoration right"
        width={1000}
        height={1000}
        className="absolute brightness-75 bottom-0 left-[100px] 
          sm:left-[200px] 
          xl:right-0 lg:-translate-y-[-100px] 
          xl:left-[500px] xl:-translate-y-[-120px] 
          2xl:left-[1200px] 2xl:-translate-y-[-100px] 
          pointer-events-none select-none"
        priority
        loading="eager"
      />

      <div className="relative pl-4 flex flex-col sm:flex-row-reverse justify-items-end 2xl:justify-center items-center h-[300px] 2xl:h-[500px] w-full">
        {/* Text Container */}
        <div
          ref={textRef}
          className="relative text-bg font-ubuntu font-extrabold tracking-tight text-left sm:pr-5 
            text-[55px] leading-[41px] 
            sm:text-[80px] sm:leading-[58px] 
            lg:text-8xl lg:leading-[75px] 
            xl:text-[140px] xl:leading-[105px] 
            2xl:leading-[105px] overflow-hidden"
          aria-label="CREAMOS EXPERIENCIAS DIGITALES"
        >
          <h1 className="will-change-transform">CREAMOS</h1>
          <h1 className="will-change-transform">EXPERIENCIAS</h1>
          <h1 className="will-change-transform">DIGITALES</h1>
        </div>

        {/* Logo */}
        <div className="w-2/3 mt-5 sm:mt-0 sm:w-auto">
          <Image
            ref={(el) => {
              imagesRef.current.logo = el;
            }}
            src="/logo-s.png"
            alt="STRING logo"
            width={400}
            height={800}
            className="will-change-transform select-none"
            priority
            loading="eager"
          />
        </div>
      </div>

      {/* Scroll Indicator (opcional) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray rounded-full flex justify-center">
          <div className="w-1 h-2 bg-gray rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
