"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import fundoListrado from "@/assets/images/fundo-listrado.png";
import lacre from "@/assets/images/lacre-vermelho.png";
import ticket from "@/assets/images/ticket-emcena.png";

// useLayoutEffect no cliente (estado inicial antes do paint), useEffect no SSR.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const body =
  "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur. Excepteur Sint Occaecat Cupidatat Non Proident, Sunt In Culpa Qui Officia Deserunt Mollit Anim Id Est Laborum.";

// Estado inicial (carta dentro do envelope), em % da largura de cada peça.
const ENV_CENTER = -50; // envelope deslocado para o centro da tela (depende da largura w-[50%])
const CARD_HIDDEN = 34; // cartão escondido atrás do envelope (só a aba aparece)

export function FatosHistoricos() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const envRef = useRef<HTMLDivElement>(null);
  const lacreRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Efeito só no desktop e para quem não pediu menos movimento.
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        // Estado inicial: envelope no centro, cartão escondido atrás.
        gsap.set(envRef.current, { xPercent: ENV_CENTER });
        gsap.set(cardRef.current, { xPercent: CARD_HIDDEN });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", // começa assim que a seção entra na viewport
            end: "bottom top", // termina quando a seção sai por cima
            // scrub alto = a animação acompanha o scroll com mais inércia,
            // dando sensação de abertura mais lenta/suave. Suba para ir + devagar.
            scrub: 3,
            invalidateOnRefresh: true,
          },
        });

        // Proporções da animação (em "unidades" de timeline). A abertura recebe
        // mais corrida de scroll para abrir devagar; uma pequena pausa mantém a
        // carta aberta no centro antes de fechar.
        const OPEN = 2; // duração da abertura (antes era 0.5 padrão = rápido demais)
        const HOLD = 0.6; // pausa com a carta aberta
        const CLOSE = 1.2; // duração do fechamento

        // Abre (carta sai do envelope) — ápice no centro da viewport.
        tl.to(cardRef.current, { xPercent: 0, duration: OPEN }, 0)
          .to(envRef.current, { xPercent: 0, duration: OPEN }, 0)
          .to(lacreRef.current, { x: -18, duration: OPEN, ease: "power1.inOut" }, 0)
          // Fecha (carta volta para dentro, envelope recentraliza).
          .to(cardRef.current, { xPercent: CARD_HIDDEN, duration: CLOSE }, OPEN + HOLD)
          .to(envRef.current, { xPercent: ENV_CENTER, duration: CLOSE }, OPEN + HOLD)
          .to(lacreRef.current, { x: 0, duration: CLOSE, ease: "power1.inOut" }, OPEN + HOLD);
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate bg-[#82C1C8]">
      {/* Fundo listrado */}
      <Image
        src={fundoListrado}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <div className="container py-12 sm:py-16 lg:py-20">
        <div className="relative">
          {/* Envelope vermelho (move para a direita) */}
          <div
            ref={envRef}
            className="relative z-20 mt-8 h-80 w-full lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-full lg:w-[50%]"
          >
            {/* Corpo vermelho com a "boca" recortada (transparente) */}
            <div className="envelope-mouth absolute inset-0 bg-[#6E1313]" />

            {/* Lacre de cera — sempre visível, com leve parallax */}
            <div className="absolute left-1/2 top-1/2 w-[clamp(64px,9vw,120px)] -translate-x-1/2 -translate-y-1/2">
              <div ref={lacreRef}>
                <Image src={lacre} alt="" aria-hidden className="h-auto w-full" />
              </div>
            </div>

            {/* Ticket "Em Cena" — sempre visível no canto */}
            <Image
              src={ticket}
              alt="Em Cena"
              className="absolute -top-5 -right-4 z-30 w-[clamp(90px,12vw,150px)] sm:-top-6 lg:-top-7"
            />
          </div>

          {/* Cartão bege (sai para a esquerda) */}
          <div
            ref={cardRef}
            className="relative z-10 flex flex-col justify-center bg-[#FBF5EA] py-12 sm:py-16 lg:min-h-[640px] lg:w-[56%]"
          >
            {/* Área bege visível (antes da sobreposição do envelope): centraliza o conteúdo */}
            <div className="px-7 sm:px-10 lg:w-[89%]">
              <div className="mx-auto flex w-full max-w-lg flex-col items-start text-left">
              <p className="serif w-full text-center text-[clamp(0.72rem,1.2vw,0.92rem)] uppercase tracking-[0.35em] text-secondary">
                Fatos históricos do teatro
              </p>

              <h2 className="serif mt-7 leading-[0.95] text-[clamp(2rem,5.5vw,4rem)] text-secondary">
                <span className="block uppercase">Venha Conhecer</span>
                <span className="block">
                  <span className="uppercase">Nossa </span>
                  <span className="italic">historia</span>
                </span>
              </h2>

              <p className="mt-6 font-sans italic text-[clamp(0.78rem,1.1vw,0.92rem)] leading-relaxed text-secondary">
                {body}
              </p>

              <Button variant="vinho" className="mt-8">
                Saiba mais
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
