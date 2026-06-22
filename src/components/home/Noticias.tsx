"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import imgNoticia from "@/assets/images/img-secaonoticia.png";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const body =
  "Lorem ipsum dolor sit amet consectetur. Mauris malesuada tempor nisl pretium mi dolor id. Orci cursus habitasse nunc senectus facilisi. Senectus a eget sit nulla sed euismod ipsum. Egestas at id id mauris dolor facilisi. Nunc venenatis consectetur non pulvinar tellus gravida id suscipit nisl.";

// Persiana: a imagem é fatiada em N tiras verticais que caem em cascata.
const SLAT_COUNT = 6;
const SLATS = Array.from({ length: SLAT_COUNT }, (_, i) => i);

export function Noticias() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = sectionRef.current!;
      const masks = gsap.utils.toArray<HTMLElement>("[data-mask]", root);
      const fades = gsap.utils.toArray<HTMLElement>("[data-fade]", root);
      const slats = gsap.utils.toArray<HTMLElement>("[data-slat]", root);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          // refaz a animação toda vez que a seção volta a entrar
          toggleActions: "restart none none reset",
        },
      });

      // 1) Tiras verticais caem do topo, em cascata da esquerda p/ a direita,
      //    montando a foto. 2) Texto entra por máscara e fade.
      tl.from(
        slats,
        {
          yPercent: -105,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.13,
        },
        0,
      )
        .from(
          masks,
          { yPercent: 120, duration: 1, ease: "power4.out", stagger: 0.14 },
          0.5,
        )
        .from(
          fades,
          { autoAlpha: 0, y: 28, duration: 0.8, ease: "power3.out", stagger: 0.12 },
          "-=0.45",
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#FDF6EB]">
      <div className="grid items-stretch lg:grid-cols-[1.4fr_1fr]">
        {/* Texto — alinhado à esquerda do container do site */}
        <div className="flex items-center px-6 py-16 sm:px-10 sm:py-20 lg:py-28 lg:pr-12 lg:pl-[max(2rem,calc((100vw-var(--container-max))/2+1rem))]">
          <div className="max-w-xl">
            {/* Kicker — Instrument Serif (revela por máscara) */}
            <div className="overflow-hidden pb-1">
              <p
                data-mask
                className="serif text-center uppercase tracking-[0.4em] text-[clamp(0.72rem,1.4vw,1rem)] text-secondary"
              >
                Notícias
              </p>
            </div>

            {/* Título — Playfair italic (revela por máscara) */}
            <div className="mt-6 overflow-hidden pt-1">
              <h2
                data-mask
                className="font-display italic font-bold leading-[0.95] tracking-[-0.02em] text-[clamp(2.6rem,6vw,4.5rem)] text-secondary"
              >
                Does This Sound Familiar
              </h2>
            </div>

            {/* Corpo — Poppins */}
            <p
              data-fade
              className="mt-7 max-w-md font-sans italic text-[clamp(0.8rem,1vw,0.95rem)] leading-relaxed text-secondary"
            >
              {body}
            </p>

            {/* Botão */}
            <div data-fade className="mt-9">
              <Button variant="rosa">Saiba mais</Button>
            </div>
          </div>
        </div>

        {/* Imagem em persiana — sangra na borda direita. Cada tira mostra uma
            fatia da foto e cai do topo em cascata. */}
        <div className="relative flex overflow-hidden min-h-[320px] sm:min-h-[420px] lg:min-h-[600px]">
          {SLATS.map((i) => (
            <div key={i} className="relative flex-1 overflow-hidden">
              {/* Wrapper animado (cai do topo) */}
              <div data-slat className="absolute inset-0">
                {/* Fatia da imagem: imagem em tamanho cheio, deslocada p/ que
                    cada tira mostre a sua coluna. */}
                <div
                  className="absolute inset-y-0"
                  style={{
                    width: `${SLAT_COUNT * 100}%`,
                    left: `${-i * 100}%`,
                  }}
                >
                  <Image
                    src={imgNoticia}
                    alt={
                      i === 0
                        ? "Bailarinos em apresentação no palco do Teatro Arthur Azevedo"
                        : ""
                    }
                    aria-hidden={i !== 0}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
