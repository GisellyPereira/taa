"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fundoLeft from "@/assets/images/fundo left.png";
import fundoRight from "@/assets/images/fundo-rigth.png";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Evento = { time: string; title: string };
type Dia = { abbr: string; num: string; eventos: Evento[] };

const evento: Evento = { time: "19:00", title: "Pão com ovo" };

// Placeholder enquanto os dados não vêm da API (o layout não muda).
const DIAS: Dia[] = [
  { abbr: "Seg.", num: "01", eventos: [evento, evento] },
  { abbr: "Ter.", num: "02", eventos: [evento, evento] },
  { abbr: "Qua.", num: "03", eventos: [evento, evento] },
  { abbr: "Qui.", num: "04", eventos: [evento, evento] },
  { abbr: "Sex.", num: "05", eventos: [evento, evento] },
  { abbr: "Sáb.", num: "06", eventos: [evento, evento] },
  { abbr: "Dom.", num: "07", eventos: [evento, evento] },
];

export function Agenda() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = sectionRef.current!;
      const title = root.querySelector<HTMLElement>("[data-title]");
      const fades = gsap.utils.toArray<HTMLElement>("[data-fade]", root);
      const cols = gsap.utils.toArray<HTMLElement>("[data-col]", root);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          toggleActions: "restart none none reset",
        },
      });

      // Título revela por máscara; cabeçalho entra com fade; as colunas do
      // calendário sobem em cascada (efeito de "agenda se montando").
      tl.from(title, { yPercent: 120, duration: 1, ease: "power4.out" }, 0)
        .from(
          fades,
          { autoAlpha: 0, y: 24, duration: 0.7, ease: "power3.out", stagger: 0.12 },
          0.2,
        )
        .from(
          cols,
          { autoAlpha: 0, y: 44, duration: 0.7, ease: "power3.out", stagger: 0.08 },
          0.35,
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#FDFCF3] pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24"
    >
      {/* Florais decorativos de fundo: cada um ocupa metade da seção, colados,
          cobrindo a tela inteira. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/2 select-none opacity-80">
        <Image src={fundoLeft} alt="" aria-hidden fill sizes="50vw" className="object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 select-none opacity-80">
        <Image src={fundoRight} alt="" aria-hidden fill sizes="50vw" className="object-cover" />
      </div>

      <div className="container">
        {/* Título + subtítulo (centralizados) */}
        <div className="text-center">
          <div className="overflow-hidden pb-1">
            <h2
              data-title
              className="font-bold uppercase leading-none text-vinho-900 text-[clamp(2.4rem,5.5vw,4rem)]"
            >
              {/* Inicial em Playfair Display (itálico); o restante em Vina Sans
                  (reto), puxado para perto da inicial. */}
              <span className="font-display italic">A</span>
              <span className="font-[family-name:var(--font-vina)] font-normal -ml-[0.12em]">
                genda
              </span>{" "}
              <span className="font-display italic">S</span>
              <span className="font-[family-name:var(--font-vina)] font-normal -ml-[0.02em]">
                emanal
              </span>
            </h2>
          </div>
          <p
            data-fade
            className="mt-6 font-sans text-[clamp(0.9rem,1.4vw,1.1rem)] text-vinho-900"
          >
            Agenda de eventos e atividades culturais do teatro
          </p>
        </div>

        {/* Linha: selo de data (esquerda) + botão (direita) */}
        <div
          data-fade
          className="mt-16 flex flex-wrap items-center justify-between gap-6"
        >
          {/* Selo de data */}
          <div className="relative inline-block">
            <span className="absolute -top-3 left-6 z-10 rounded-md bg-vinho-900 px-4 py-1 font-sans text-sm italic text-white shadow-md">
              25.06 - 31.06
            </span>
            <div className="rounded-xl bg-vinho-900 px-8 py-5 shadow-md">
              <span className="font-display text-xl font-bold uppercase tracking-wide text-white">
                Junho de 2026
              </span>
            </div>
          </div>

          {/* Botão Agenda Completa */}
          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center rounded-md bg-vinho-900 px-7 py-2.5 font-sans text-sm italic text-white transition hover:bg-[#560808]"
          >
            Agenda Completa
          </button>
        </div>

        {/* Calendário — 7 colunas (rola na horizontal em telas estreitas).
            overflow-y-hidden evita a barra vertical transitória durante a
            animação de entrada das colunas. */}
        <div className="mt-16 overflow-x-auto overflow-y-hidden">
          <div className="grid min-w-[820px] grid-cols-7">
            {DIAS.map((dia) => (
              <div
                key={dia.num}
                data-col
                className="border-l border-[#848484]/20 first:border-l-0 last:border-r"
              >
                {/* Cabeçalho do dia (linhas superior e inferior) */}
                <div className="border-y border-[#848484]/20 px-4 py-4">
                  <span className="font-sans text-[0.8rem] font-semibold uppercase tracking-wide text-vinho-900">
                    {dia.abbr}
                  </span>
                </div>

                {/* Número + eventos (sem padding inferior: colado na próxima seção) */}
                <div className="px-4 pt-7">
                  <span className="block font-display text-[clamp(2rem,3vw,2.75rem)] leading-none text-vinho-900">
                    {dia.num}
                  </span>

                  <div className="mt-7">
                    {dia.eventos.map((ev, i) => (
                      <div
                        key={i}
                        className={
                          i > 0 ? "mt-5 border-t border-[#848484]/20 pt-5" : ""
                        }
                      >
                        <span className="inline-block rounded bg-primary px-1.5 py-0.5 font-sans text-[0.65rem] text-white">
                          {ev.time}
                        </span>
                        <p className="mt-1 font-sans text-[0.78rem] font-semibold uppercase tracking-wide text-vinho-900">
                          {ev.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
