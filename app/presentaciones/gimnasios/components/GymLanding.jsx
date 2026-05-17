"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GymHero from "./GymHero";
import GymProblem from "./GymProblem";
import GymSolution from "./GymSolution";
import GymCaseStudy from "./GymCaseStudy";
import GymProcess from "./GymProcess";
import GymCTA from "./GymCTA";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  { id: "hero", Component: GymHero },
  { id: "problem", Component: GymProblem },
  { id: "solution", Component: GymSolution },
  { id: "case", Component: GymCaseStudy },
  { id: "process", Component: GymProcess },
  { id: "cta", Component: GymCTA },
];

const TOTAL = SLIDES.length;
// vh por slide — controla la velocidad del scroll
const VH_PER_SLIDE = 120;

export default function GymLanding() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const animatedSlides = useRef(new Set());

  useEffect(() => {
    let ctx;

    const init = () => {
      ctx = gsap.context(() => {
        const track = trackRef.current;
        if (!track) return;

        const slides = Array.from(track.querySelectorAll(".gym-slide"));

        // Ocultar todos excepto el Hero
        slides.forEach((slide, i) => {
          if (i === 0) return;
          gsap.set(getAnimatables(slide), { opacity: 0, y: 40 });
        });

        // Hero entra de inmediato
        animateSlide(slides[0]);
        animatedSlides.current.add(0);

        // ScrollTrigger único
        const totalDistance = (TOTAL - 1) * window.innerWidth;
        const scrollLength = TOTAL * VH_PER_SLIDE * (window.innerHeight / 100);

        gsap.to(track, {
          x: -totalDistance,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            start: "top top",
            end: `+=${scrollLength}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const index = Math.min(
                Math.floor(self.progress * TOTAL),
                TOTAL - 1
              );
              if (!animatedSlides.current.has(index)) {
                animatedSlides.current.add(index);
                animateSlide(slides[index]);
              }
            },
          },
        });
      }, wrapperRef);
    };

    const t = setTimeout(init, 150);

    return () => {
      clearTimeout(t);
      ctx?.revert();
      animatedSlides.current.clear();
    };
  }, []);

  return (
    <>
      {/* Indicador de scroll */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-black/80 backdrop-blur-sm pointer-events-none">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          Scroll
        </span>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path
            d="M1 5h14M10 1l4 4-4 4"
            stroke="#50ff05"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Wrapper con altura total de scroll */}
      <div ref={wrapperRef} style={{ height: `${TOTAL * VH_PER_SLIDE}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-screen will-change-transform"
            style={{ width: `${TOTAL * 100}vw` }}
          >
            {SLIDES.map(({ id, Component }) => (
              <div
                key={id}
                className="gym-slide flex-shrink-0 w-screen h-screen overflow-hidden"
              >
                <Component />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function animateSlide(slide) {
  if (!slide) return;
  const els = getAnimatables(slide);
  if (!els.length) return;
  gsap.to(els, {
    opacity: 1,
    y: 0,
    stagger: 0.09,
    duration: 0.65,
    ease: "power3.out",
    overwrite: "auto",
  });
}

function getAnimatables(slide) {
  const els = [];
  [
    ".slide-line",
    ".slide-tag",
    ".slide-heading",
    ".slide-sub",
    ".slide-item",
    ".slide-cta",
  ].forEach((sel) => slide.querySelectorAll(sel).forEach((el) => els.push(el)));
  return els;
}
