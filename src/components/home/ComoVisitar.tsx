"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lacreDourado from "@/assets/images/lacre-dourado.png";
import { Button } from "@/components/ui/Button";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ComoVisitar() {
  const sectionRef = useRef<HTMLElement>(null);
  const sealWrapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = sectionRef.current!;
      const seal = sealRef.current!;
      const masks = gsap.utils.toArray<HTMLElement>("[data-mask]", root);
      const fades = gsap.utils.toArray<HTMLElement>("[data-fade]", root);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          // refaz a animação toda vez que a seção volta a entrar
          toggleActions: "restart none none reset",
        },
      });

      // 1) Selo carimba: cai do alto, esmaga (impacto) e assenta
      tl.from(seal, { y: -150, autoAlpha: 0, duration: 0.45, ease: "power2.in" })
        .to(seal, {
          scaleX: 1.15,
          scaleY: 0.82,
          transformOrigin: "50% 100%",
          duration: 0.12,
          ease: "power2.out",
        })
        .to(seal, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.45)",
        })
        // 2) Texto revela por máscara, em cascata
        .from(
          masks,
          { yPercent: 120, duration: 0.9, ease: "power4.out", stagger: 0.12 },
          "-=0.25",
        )
        // 3) Parágrafo e botão entram com fade
        .from(
          fades,
          { autoAlpha: 0, y: 26, duration: 0.7, ease: "power3.out", stagger: 0.1 },
          "-=0.5",
        );

      // Interação: hover dá um leve "press" no selo (como apertar um carimbo)
      const enter = () =>
        gsap.to(seal, { scale: 0.95, duration: 0.2, ease: "power2.out" });
      const leave = () =>
        gsap.to(seal, { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" });
      const wrap = sealWrapRef.current!;
      wrap.addEventListener("mouseenter", enter);
      wrap.addEventListener("mouseleave", leave);

      return () => {
        wrap.removeEventListener("mouseenter", enter);
        wrap.removeEventListener("mouseleave", leave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg py-16 sm:py-20 lg:py-24">
      <div className="container">
        {/* Cartão rosa — mesma largura/altura da composição carta + envelope aberta */}
        <div className="relative mx-auto flex w-full flex-col items-center justify-center bg-rosa-200 px-6 py-16 text-center sm:px-10 lg:h-[640px] lg:py-0">
          {/* Selo de cera dourado — wrapper posiciona, interno é animado */}
          <div
            ref={sealWrapRef}
            className="absolute left-1/2 top-3 z-10 w-[clamp(100px,11vw,164px)] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          >
            <div ref={sealRef}>
              <Image src={lacreDourado} alt="" aria-hidden className="h-auto w-full" />
            </div>
          </div>

          {/* Kicker — Instrument Serif (revela por máscara) */}
          <div className="overflow-hidden pb-1">
            <p
              data-mask
              className="serif uppercase tracking-[0.4em] text-[clamp(0.72rem,1.4vw,1rem)] text-primary"
            >
              Visite o Arthur Azevedo
            </p>
          </div>

          {/* Título — Playfair italic + Instrument Serif italic (revela por máscara) */}
          <div className="mt-7 overflow-hidden pt-2">
            <h2
              data-mask
              className="flex flex-col items-center leading-[0.8] text-primary"
            >
              <span className="relative z-10 font-display italic font-bold tracking-[-0.05em] text-[clamp(2.8rem,9vw,6.25rem)]">
                como visitar o
              </span>
              <span className="serif uppercase italic font-bold text-[clamp(2.8rem,9vw,6.25rem)] text-primary">
                Teatro
              </span>
            </h2>
          </div>

          {/* Texto — Poppins */}
          <p
            data-fade
            className="mt-15 max-w-4xl font-sans italic text-[clamp(0.82rem,1.1vw,0.95rem)] font-bold leading-relaxed text-primary"
          >
            Visite o Teatro Arthur Azevedo e conheça de perto um dos mais
            importantes patrimônios culturais do Maranhão. Consulte informações
            sobre visitas, programação e atendimento, e entre em contato para
            planejar sua experiência.
          </p>

          {/* Botão */}
          <div data-fade className="mt-15">
            <Button variant="vinho">Entre em contato</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
