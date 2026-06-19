"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

// useLayoutEffect no cliente (define o estado inicial antes do paint, sem flash),
// useEffect no SSR (evita warning do React).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function NoticiasMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    // Respeita quem prefere menos movimento: mantém tudo visível, sem animar.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pick = (selector: string) =>
      gsap.utils.toArray<HTMLElement>(selector, el);

    const intro = pick("[data-anim='intro']");
    const reveals = pick("[data-anim='reveal']");
    const images = pick("[data-anim='image']");
    const cards = pick("[data-anim='card']");

    // Estado inicial (escondido) — aplicado antes do paint.
    gsap.set(intro, { autoAlpha: 0, y: 30 });
    gsap.set(reveals, { autoAlpha: 0, y: 44 });
    gsap.set(cards, { autoAlpha: 0, y: 48 });
    images.forEach((wrap) => {
      gsap.set(wrap, { autoAlpha: 0, y: 40 });
      const img = wrap.querySelector("img");
      if (img) gsap.set(img, { scale: 1.14 });
    });

    const tweens: gsap.core.Tween[] = [];

    // 1) Intro — cabeçalho entra no carregamento
    tweens.push(
      gsap.to(intro, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.05,
      }),
    );

    const observers: IntersectionObserver[] = [];

    // 2) Reveal + imagem — entram ao surgir na viewport (IntersectionObserver
    //    é imune a mudanças de altura da página, ao contrário do ScrollTrigger).
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          revealIO.unobserve(target);

          if (target.dataset.anim === "image") {
            tweens.push(
              gsap.to(target, {
                autoAlpha: 1,
                y: 0,
                duration: 1.1,
                ease: "power3.out",
              }),
            );
            const img = target.querySelector("img");
            if (img) {
              tweens.push(
                gsap.to(img, { scale: 1, duration: 1.5, ease: "power3.out" }),
              );
            }
          } else {
            tweens.push(
              gsap.to(target, {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
              }),
            );
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    [...reveals, ...images].forEach((t) => revealIO.observe(t));
    observers.push(revealIO);

    // 3) Cards — quando o primeiro aparece, todos entram em cascata
    if (cards.length) {
      const cardIO = new IntersectionObserver(
        (entries, obs) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          obs.disconnect();
          tweens.push(
            gsap.to(cards, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.1,
            }),
          );
        },
        { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
      );
      cardIO.observe(cards[0]);
      observers.push(cardIO);
    }

    return () => {
      observers.forEach((o) => o.disconnect());
      tweens.forEach((t) => t.kill());
      // Restaura tudo visível (importante para o duplo-mount do Strict Mode).
      const all = [...intro, ...reveals, ...images, ...cards];
      gsap.set(all, { clearProps: "all" });
      images.forEach((wrap) => {
        const img = wrap.querySelector("img");
        if (img) gsap.set(img, { clearProps: "all" });
      });
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
