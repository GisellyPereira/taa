"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function BilheteriaDigital() {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current!;
      const lines = gsap.utils.toArray<HTMLElement>("[data-line]", titleRef.current);

      // Entrada: cada elemento sobe revelado por trás de uma máscara (overflow-hidden).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          // refaz a animação toda vez que a seção volta a entrar pela parte de cima
          toggleActions: "restart none none reset",
        },
      });
      tl.from(kickerRef.current, {
        yPercent: 130,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          lines,
          {
            yPercent: 120,
            duration: 1.15,
            ease: "power4.out",
            stagger: 0.12,
          },
          "-=0.15",
        )
        .from(
          btnRef.current,
          { opacity: 0, y: 26, duration: 0.7, ease: "back.out(1.8)" },
          "-=0.55",
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="container flex flex-col items-center pt-20 pb-10 text-center sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-16"
    >
      {/* Kicker — Instrument Serif */}
      <div className="overflow-hidden pb-1">
        <p
          ref={kickerRef}
          className="serif uppercase tracking-[0.4em] text-[clamp(0.72rem,1.4vw,1rem)] text-secondary"
        >
          Veja nossas programações
        </p>
      </div>

      {/* Título — revelado por máscara, linha a linha */}
      <h2 ref={titleRef} className="mt-6 leading-[1] text-secondary sm:mt-8">
        <span className="block overflow-hidden">
          <span
            data-line
            className="block leading-[0.85] font-display italic font-semibold text-[clamp(2.4rem,7.5vw,5.25rem)]"
          >
            acesse a
          </span>
        </span>
        <span className="block overflow-hidden">
          <span
            data-line
            className="block pb-[0.12em] font-display italic font-semibold text-[clamp(2.4rem,7.5vw,5.25rem)]"
          >
            Bilheteria Digital
          </span>
        </span>
        <span className="block overflow-hidden">
          <span
            data-line
            className="serif block pb-[0.22em] pt-[0.12em] uppercase text-[clamp(2.4rem,7.5vw,5.25rem)]"
          >
            E veja a programação
          </span>
        </span>
      </h2>

      {/* Botão — rosa claro com texto vinho */}
      <div ref={btnRef} className="mt-10 sm:mt-12">
        <Button variant="rosa">Acessar Bilheteria</Button>
      </div>
    </section>
  );
}
