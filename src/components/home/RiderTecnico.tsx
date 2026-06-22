"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fundoRider from "@/assets/images/fundo-rider-rosa.png";
import { Button } from "@/components/ui/Button";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const body =
  "Informamos ainda que o Teatro Arthur Azevedo não dispõe de um sistema de MONITORAÇÃO DE PALCO para shows musicais e semelhantes como: MAINPOWER, MULTCABO, CONSOLE DE PALCO, AMPLIFICADORES DE BAIXO, GUITARRA, VIOLÃO, TECLADO E OUTROS, assim como microfones sem fio complementar para show musical, cabendo a produção do evento a locação dos mesmos.";

export function RiderTecnico() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = sectionRef.current!;
      const masks = gsap.utils.toArray<HTMLElement>("[data-mask]", root);
      const fades = gsap.utils.toArray<HTMLElement>("[data-fade]", root);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          toggleActions: "restart none none reset",
        },
      });

      // Kicker/título revelam por máscara; parágrafo e botão entram com fade.
      tl.from(masks, {
        yPercent: 120,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.12,
      }).from(
        fades,
        { autoAlpha: 0, y: 26, duration: 0.7, ease: "power3.out", stagger: 0.1 },
        "-=0.5",
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-secondary py-20 text-center sm:py-24 lg:py-32"
    >
      {/* Padrão ornamental repetido ao fundo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-repeat opacity-[0.10]"
        style={{ backgroundImage: `url(${fundoRider.src})` }}
      />

      <div className="container flex flex-col items-center">
        {/* Kicker */}
        <div className="overflow-hidden pb-1">
          <p
            data-mask
            className="serif uppercase tracking-[0.4em] text-[clamp(0.72rem,1.4vw,1rem)] text-rosa-200"
          >
            Fatos históricos do teatro
          </p>
        </div>

        {/* Título */}
        <div className="mt-6 overflow-hidden pt-2">
          <h2
            data-mask
            className="serif flex flex-col items-center uppercase leading-[0.9] tracking-[-0.01em] text-[clamp(2.4rem,7vw,5.5rem)] text-rosa-200"
          >
            <span>Acesse nosso</span>
            <span>Rider técnico</span>
          </h2>
        </div>

        {/* Texto */}
        <p
          data-fade
          className="mt-8 max-w-4xl font-sans italic font-bold text-[clamp(0.82rem,1.1vw,0.95rem)] leading-relaxed text-rosa-200"
        >
          {body}
        </p>

        {/* Botão */}
        <div data-fade className="mt-10">
          <Button variant="rosaSolido" className="font-semibold">
            Acesse aqui
          </Button>
        </div>
      </div>
    </section>
  );
}
