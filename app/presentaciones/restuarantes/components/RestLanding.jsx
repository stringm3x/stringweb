"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RestHero from "./RestHero";
import RestProblema from "./RestProblema";
import RestOpciones from "./RestOpciones";
import RestComparativa from "./RestComparativa";
import RestSistema from "./RestSistema";
import RestTimeline from "./RestTimeline";
import RestCTA from "./RestCTA";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  { id: "hero", Component: RestHero },
  { id: "problema", Component: RestProblema },
  { id: "opciones", Component: RestOpciones },
  { id: "comparativa", Component: RestComparativa },
  { id: "sistema", Component: RestSistema },
  { id: "timeline", Component: RestTimeline },
  { id: "cta", Component: RestCTA },
];

const TOTAL = SLIDES.length;
const VH_PER_SLIDE = 120;

export default function RestLanding() {
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const mobileSectionsRef = useRef([]);
  const animatedSlides = useRef(new Set());

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop — horizontal scroll
  useEffect(() => {
    if (isMobile) return;
    let ctx;
    const init = () => {
      ctx = gsap.context(() => {
        const track = trackRef.current;
        if (!track) return;
        const slides = Array.from(track.querySelectorAll(".rest-slide"));

        slides.forEach((slide, i) => {
          if (i === 0) return;
          gsap.set(getAnimatables(slide), { opacity: 0, y: 40 });
        });

        animateSlide(slides[0]);
        animatedSlides.current.add(0);

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
  }, [isMobile]);

  // Mobile — scroll vertical
  useEffect(() => {
    if (!isMobile) return;
    const ctx = gsap.context(() => {
      mobileSectionsRef.current.forEach((section, i) => {
        if (!section) return;
        const els = getAnimatables(section);
        const root = section.firstElementChild;
        if (i === 0) {
          if (root?.__animateIn) root.__animateIn();
          else {
            gsap.set(els, { opacity: 0, y: 30 });
            gsap.to(els, {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.3,
            });
          }
          return;
        }
        if (root?.__animateIn) {
          ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            once: true,
            onEnter: () => root.__animateIn(),
          });
        } else {
          gsap.set(els, { opacity: 0, y: 30 });
          gsap.to(els, {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          });
        }
      });
    });
    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="bg-black">
        {SLIDES.map(({ id, Component }, i) => (
          <div
            key={id}
            ref={(el) => (mobileSectionsRef.current[i] = el)}
            className="min-h-screen w-full"
          >
            <Component />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-black/80 backdrop-blur-sm pointer-events-none">
        <span className="text-[10px] font-mono text-gray uppercase tracking-widest">
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
                className="rest-slide flex-shrink-0 w-screen h-screen overflow-hidden"
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
  const root = slide.firstElementChild;
  if (root?.__animateIn) {
    root.__animateIn();
    return;
  }
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
