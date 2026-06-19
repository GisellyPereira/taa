"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AtIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import fundoTa from "@/assets/images/fundo-ta.png";
import molduraContato from "@/assets/images/moldura-semfundo.png";

const CARD = "#FBF1E1";
const VINHO = "#6E1313";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Contato({ svgMarkup }: { svgMarkup: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const fundoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const molduraRef = useRef<HTMLDivElement>(null);
  const retratoRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const reveals = gsap.utils.toArray<HTMLElement>(
        "[data-reveal]",
        cardRef.current,
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "restart none none reset",
        },
      });

      // Fundo entra pela esquerda + card entra pela direita (se encontram)
      tl.from(fundoRef.current, {
        xPercent: -120,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          cardRef.current,
          { x: 220, autoAlpha: 0, duration: 1, ease: "power3.out" },
          0,
        )
        // Moldura cai de cima
        .from(
          molduraRef.current,
          { y: -280, autoAlpha: 0, duration: 0.8, ease: "power3.out" },
          "-=0.45",
        )
        // Textos e botões entram em cascata
        .from(
          reveals,
          {
            y: 40,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.4",
        );
    });

    return () => mm.revert();
  }, []);

  // Personagem animado: cabeça acena, braço/dedo gesticulam, olhos piscam
  useIsomorphicLayoutEffect(() => {
    if (!svgMarkup) return;
    const scope = retratoRef.current;
    if (!scope) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to("#cabeca", {
        rotation: 6,
        duration: 1.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        transformOrigin: "550px 575px",
      });
      gsap.to("#braco_levantado", {
        rotation: -8,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        transformOrigin: "915px 790px",
      });
      gsap.to("#dedo", {
        rotation: 13,
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        transformOrigin: "1000px 605px",
      });

      // Piscar — fecha e abre as pálpebras (origem no topo), em intervalos variados
      const lids = gsap.utils.toArray<SVGRectElement>(
        "#palpebra_esquerda rect, #palpebra_direita rect",
        scope,
      );
      if (lids.length) {
        gsap.set(lids, { transformOrigin: "50% 0%", scaleY: 0 });
        const piscar = () => {
          gsap
            .timeline({
              onComplete: () =>
                gsap.delayedCall(gsap.utils.random(2, 4), piscar),
            })
            .to(lids, { scaleY: 1, duration: 0.08, ease: "power2.in" })
            .to(lids, { scaleY: 0, duration: 0.12, ease: "power2.out" }, "+=0.07");
        };
        gsap.delayedCall(gsap.utils.random(0.8, 2), piscar);
      }
    }, scope);

    return () => ctx.revert();
  }, [svgMarkup]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-bg py-24 sm:py-32"
    >
      {/* Letra decorativa vinho (entra pela esquerda) */}
      <div
        ref={fundoRef}
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-[92%] select-none"
      >
        <Image src={fundoTa} alt="" aria-hidden className="h-full w-auto" />
      </div>

      <div className="container relative z-10">
        {/* Card — entra pela direita */}
        <div
          ref={cardRef}
          className="relative mx-auto flex w-full flex-col items-center gap-10 px-8 py-12 text-center md:h-[440px] md:flex-row md:justify-between md:py-0 md:pl-16 md:text-left"
          style={{ backgroundColor: CARD }}
        >
          {/* Esquerda — texto + contatos */}
          <div className="flex flex-col items-center text-center md:max-w-[52%]">
            <p
              data-reveal
              className="serif uppercase tracking-[0.4em] text-[clamp(0.72rem,1.4vw,1rem)] text-primary/60"
            >
              Est. 2026
            </p>

            <h2
              data-reveal
              className="mt-3 flex flex-col items-center leading-[0.85]"
            >
              <span className="font-display italic font-semibold text-[clamp(3rem,6.5vw,4.5rem)] text-rosa-400">
                entre Em
              </span>
              <span className="serif uppercase text-[clamp(2.4rem,5vw,3.6rem)] text-rosa-400">
                Contato
              </span>
            </h2>

            {/* Pills de contato */}
            <div data-reveal className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="tel:+5598900000000"
                className="inline-flex items-center gap-2.5 rounded-lg px-4 py-2.5 font-sans text-sm transition hover:opacity-90"
                style={{ backgroundColor: VINHO, color: CARD }}
              >
                <span
                  className="grid h-6 w-6 place-items-center rounded-full border"
                  style={{ borderColor: CARD }}
                >
                  <PhoneIcon size={13} weight="fill" />
                </span>
                +55 98 90000-0000
              </a>

              <a
                href="mailto:Teatro@gmail.com"
                className="inline-flex items-center gap-2.5 rounded-lg px-4 py-2.5 font-sans text-sm transition hover:opacity-90"
                style={{ backgroundColor: VINHO, color: CARD }}
              >
                <span
                  className="grid h-6 w-6 place-items-center rounded-full border"
                  style={{ borderColor: CARD }}
                >
                  <AtIcon size={13} weight="bold" />
                </span>
                Teatro@gmail.com
              </a>
            </div>
          </div>

          {/* Direita — moldura dourada (cai de cima) */}
          <div className="w-[clamp(200px,50vw,320px)] md:absolute md:right-6 md:top-1/3 md:w-[clamp(320px,36vw,480px)] md:-translate-y-1/2">
            <div ref={molduraRef} className="relative">
              {/* Retrato do Arthur Azevedo (SVG inline) dentro do vão oval */}
              <div className="absolute inset-x-[17%] inset-y-[12%] overflow-hidden rounded-[50%] bg-white">
                <div
                  ref={retratoRef}
                  role="img"
                  aria-label="Arthur Azevedo"
                  className="h-full w-full [&>svg]:mx-auto [&>svg]:mt-[5%] [&>svg]:block [&>svg]:h-auto [&>svg]:w-[82%]"
                  dangerouslySetInnerHTML={{ __html: svgMarkup }}
                />
              </div>

              {/* Moldura por cima */}
              <Image
                src={molduraContato}
                alt=""
                aria-hidden
                className="relative h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
