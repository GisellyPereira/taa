"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ConfettiIcon,
  MaskHappyIcon,
  MusicNotesIcon,
  SparkleIcon,
  type Icon,
} from "@phosphor-icons/react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type ProgramaCard = {
  title: string;
  Icon: Icon;
  bg: string;
  fg: string;
  rot: number; // rotação no "monte" enquanto está atrás
};

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.";

const CARDS: ProgramaCard[] = [
  { title: "Teatro", Icon: MaskHappyIcon, bg: "#820a00", fg: "#FDFCF3", rot: 0 },
  { title: "Música", Icon: MusicNotesIcon, bg: "#067581", fg: "#FDFCF3", rot: -6 },
  { title: "Dança", Icon: SparkleIcon, bg: "#F2B8C0", fg: "#820a00", rot: 5 },
  { title: "Infantil", Icon: ConfettiIcon, bg: "#FDF6EB", fg: "#067581", rot: -4 },
];

export function ProgramacaoCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Deck animado só no desktop/tablet e sem "reduzir movimento".
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          "[data-card]",
          stageRef.current,
        );
        const n = cards.length;

        // Estado inicial: card 0 à frente; os demais atrás, rotacionados/menores.
        cards.forEach((card, i) => {
          gsap.set(card, {
            zIndex: n - i,
            rotation: i === 0 ? 0 : CARDS[i].rot,
            scale: i === 0 ? 1 : 0.94,
            yPercent: i === 0 ? 0 : 3,
            transformOrigin: "50% 50%",
          });
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=" + (n - 1) * 90 + "%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Cada transição: o card da frente descola; o de trás se endireita.
        for (let k = 0; k < n - 1; k++) {
          tl.to(
            cards[k],
            { yPercent: -145, rotation: -16, autoAlpha: 0, ease: "power2.in" },
            k,
          );
          tl.to(cards[k + 1], { rotation: 0, scale: 1, yPercent: 0 }, k);
          if (cards[k + 2]) {
            tl.to(cards[k + 2], { scale: 0.97, yPercent: 1.5 }, k);
          }
        }
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg py-12 md:flex md:h-[72vh] md:items-center md:justify-center md:py-0"
    >
      <div
        ref={stageRef}
        className="mx-auto flex max-w-[16rem] flex-col gap-6 md:relative md:h-[clamp(360px,54vh,480px)] md:w-[clamp(240px,22vw,330px)] md:max-w-none md:gap-0"
      >
        {CARDS.map((card, i) => (
          <article
            key={i}
            data-card
            style={{ backgroundColor: card.bg, color: card.fg }}
            className="relative flex aspect-[4/5] w-full flex-col items-center justify-between rounded-3xl p-7 text-center shadow-[0_24px_60px_rgba(18,15,10,0.18)] will-change-transform md:absolute md:inset-0 md:aspect-auto md:h-full md:w-full"
          >
            {/* Kicker (Instrument Serif) + título (Playfair italic) */}
            <div>
              <p className="serif uppercase tracking-[0.3em] text-[clamp(0.55rem,0.9vw,0.7rem)] opacity-80">
                Em cartaz
              </p>
              <h3 className="mt-1.5 font-display italic font-semibold text-[clamp(1.5rem,2.4vw,2.1rem)]">
                {card.title}
              </h3>
            </div>

            <card.Icon size={54} weight="fill" />

            {/* Texto (Poppins) */}
            <p className="max-w-[15rem] font-sans text-[clamp(0.75rem,0.95vw,0.86rem)] leading-relaxed opacity-85">
              {LOREM}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
