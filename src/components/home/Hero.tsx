"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import predio from "@/assets/images/image.png";
import monograma from "@/assets/images/logo-vinho-hero.png";
import lacre from "@/assets/images/selo-hero.png";
import chave from "@/assets/images/chave-hero.png";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    // Entrada roda UMA vez na montagem (sem ScrollTrigger). O Hero fica sempre
    // no topo, então não precisa re-disparar — e assim trocar de aba/voltar não
    // refaz nem bagunça o layout.
    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const pieces = gsap.utils.toArray<HTMLElement>("[data-piece]");
      const bg = root.querySelector<HTMLElement>("[data-bg]");

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Sem animação: apenas revela.
      if (reduce) {
        gsap.set(
          [...reveals, ...pieces, bg].filter(Boolean) as HTMLElement[],
          { autoAlpha: 1 },
        );
        return;
      }

      const vw = window.innerWidth || 1200;
      const vh = window.innerHeight || 800;

      // Estado inicial escondido (os elementos já vêm com opacity-0 no HTML).
      gsap.set(reveals, { autoAlpha: 0, y: 40 });
      if (bg) gsap.set(bg, { autoAlpha: 0 });
      pieces.forEach((el) =>
        gsap.set(el, {
          autoAlpha: 0,
          x: Number(el.dataset.fx) * vw * 0.3,
          y: Number(el.dataset.fy) * vh * 0.3,
          rotation: Number(el.dataset.fx) * 18,
        }),
      );

      const tl = gsap.timeline();

      // Fundo do prédio entra com fade leve
      if (bg) tl.to(bg, { autoAlpha: 1, duration: 1.6, ease: "power2.out" }, 0);

      // Nome (monograma + kicker + título) revela em cascata
      tl.to(
        reveals,
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 },
        0.1,
      )
        // Peças deslizam de fora (stop-motion) junto com o nome
        .to(
          pieces,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 1.5,
            ease: "steps(9)",
            stagger: 0.18,
          },
          0,
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex items-center overflow-hidden bg-bg h-[calc(100svh-56px)] lg:h-[calc(100svh-72px)]"
    >
      {/* Fundo: prédio do teatro (à direita, esmaecido) */}
      <Image
        src={predio}
        alt=""
        aria-hidden
        data-bg
        fill
        priority
        sizes="100vw"
        className="-z-10 select-none object-cover object-center opacity-0"
      />

      {/* Chave — canto superior-esquerdo */}
      <Image
        src={chave}
        alt=""
        aria-hidden
        data-piece
        data-fx="-1"
        data-fy="-0.8"
        className="absolute z-0 select-none pointer-events-none opacity-0 top-[6%] left-[3%] w-[clamp(90px,12vw,170px)] md:top-[8%] md:left-[5%]"
      />
      {/* Selo de cera — canto inferior-esquerdo */}
      <Image
        src={lacre}
        alt=""
        aria-hidden
        data-piece
        data-fx="-0.9"
        data-fy="0.9"
        className="absolute z-0 select-none pointer-events-none opacity-0 bottom-0 left-0 w-[clamp(200px,24vw,380px)]"
      />

      {/* Conteúdo à esquerda */}
      <div className="relative z-10 w-full pl-[clamp(2.5rem,9vw,11rem)] pr-4">
        <div className="flex w-fit max-w-full flex-col items-start">
          <Image
            src={monograma}
            alt="Teatro Arthur Azevedo"
            data-reveal
            className="h-auto w-[clamp(54px,5vw,84px)] self-center opacity-0 mb-3"
          />
          <p
            data-reveal
            className="serif self-center uppercase tracking-[0.4em] text-[clamp(0.72rem,1.4vw,1rem)] text-primary opacity-0 mb-3"
          >
            Bem - vindo ao
          </p>
          <h1
            data-reveal
            className="flex flex-col items-start text-left font-normal leading-[0.95] opacity-0"
          >
            <span className="font-display italic font-medium text-[clamp(3rem,8.5vw,8rem)] text-primary-hover">
              Teatro Arthur
            </span>
            <span className="serif italic uppercase tracking-[0.02em] text-[clamp(3rem,8.5vw,8rem)] text-primary">
              Azevedo
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
