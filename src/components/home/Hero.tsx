"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import monograma from "@/assets/images/logo-vinho-hero.png";
import lacre from "@/assets/images/lacre-dourado-hero.png";
import moldura from "@/assets/images/moldura-hero.png";
import ticket from "@/assets/images/ticket.png";
import chave from "@/assets/images/chave-hero.png";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = sectionRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      const pieces = gsap.utils.toArray<HTMLElement>("[data-piece]", root);
      const vw = window.innerWidth || 1200;
      const vh = window.innerHeight || 800;

      // Estado inicial escondido (os elementos já vêm com opacity-0 no HTML).
      // Distância de partida menor (~meia tela) p/ entrarem na área visível bem antes.
      gsap.set(reveals, { autoAlpha: 0, y: 40 });
      pieces.forEach((el) =>
        gsap.set(el, {
          autoAlpha: 0,
          x: Number(el.dataset.fx) * vw * 0.3,
          y: Number(el.dataset.fy) * vh * 0.3,
          rotation: Number(el.dataset.fx) * 18,
        }),
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          toggleActions: "restart none none reset",
        },
      });

      // 1) Nome (monograma + kicker + título) revela primeiro, em cascata
      tl.to(reveals, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      })
        // 2) Peças já começam a viajar (de fora) JUNTO com o nome — sem tempo morto.
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

      return () => {
        gsap.set([...reveals, ...pieces], { clearProps: "all" });
      };
    });

    // Sem animação: apenas revela (sobrescreve o opacity-0 do HTML).
    mm.add("(prefers-reduced-motion: reduce)", () => {
      const all = gsap.utils.toArray<HTMLElement>(
        "[data-reveal], [data-piece]",
        root,
      );
      gsap.set(all, { autoAlpha: 1 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-[85vh] md:min-h-[clamp(620px,90vh,920px)] overflow-hidden"
    >
      {/* lacre — entra do canto superior-esquerdo */}
      <Image
        src={lacre}
        alt=""
        aria-hidden
        data-piece
        data-fx="-1"
        data-fy="-0.7"
        className="absolute z-0 opacity-0 select-none pointer-events-none top-[7%] left-[10%] md:top-[7%] md:left-[13%]"
      />
      {/* moldura — entra de cima */}
      <Image
        src={moldura}
        alt=""
        aria-hidden
        data-piece
        data-fx="0.35"
        data-fy="-1"
        className="absolute z-0 opacity-0 select-none pointer-events-none top-[7%] right-[10%] md:top-[10%] md:right-[13%]"
      />
      {/* ticket — entra do canto inferior-esquerdo */}
      <Image
        src={ticket}
        alt=""
        aria-hidden
        data-piece
        data-fx="-0.9"
        data-fy="0.9"
        className="absolute z-0 opacity-0 select-none pointer-events-none bottom-[8%] left-[8%] md:bottom-[10%] md:left-[13%]"
      />
      {/* chave — entra do canto inferior-direito */}
      <Image
        src={chave}
        alt=""
        aria-hidden
        data-piece
        data-fx="1"
        data-fy="0.8"
        className="absolute z-0 opacity-0 select-none pointer-events-none bottom-[8%] right-[8%] md:bottom-[10%] md:right-[13%]"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <Image
          src={monograma}
          alt="Teatro Arthur Azevedo"
          data-reveal
          className="w-[clamp(60px,6vw,90px)] h-auto mb-4 opacity-0"
        />
        <p
          data-reveal
          className="serif uppercase tracking-[0.4em] text-[clamp(0.7rem,1vw,0.95rem)] text-secondary mb-2 opacity-0"
        >
          Bem - vindo ao
        </p>
        <h1
          data-reveal
          className="flex flex-col items-center leading-[0.95] font-normal opacity-0"
        >
          <span className="font-display italic font-medium text-[clamp(3rem,8.5vw,8rem)] text-primary-hover">
            Teatro Arthur
          </span>
          <span className="serif italic uppercase tracking-[0.02em] text-[clamp(3rem,8.5vw,8rem)] text-primary">
            Azevedo
          </span>
        </h1>
      </div>
    </section>
  );
}
