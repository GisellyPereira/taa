"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretDownIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { LANGS, NAV_LEFT, NAV_RIGHT, ROUTES } from "@/lib/constants";
import logoHeader from "@/assets/images/logo-header.svg";

const VINHO = "#820A00";
const CREME = "#FDFCF3";

const NAV_ITEMS_ALL = [...NAV_LEFT, ...NAV_RIGHT];

function isActive(pathname: string, to: string) {
  return to === ROUTES.home ? pathname === "/" : pathname.startsWith(to);
}

export function Header() {
  const pathname = usePathname();
  const [lang, setLang] = useState<(typeof LANGS)[number]>("PT");
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Fecha o seletor de idioma ao clicar fora
  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [langOpen]);

  const linkClass = (active: boolean) =>
    `relative text-[0.82rem] tracking-wide transition-opacity hover:opacity-90 after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 ${
      active ? "after:scale-x-100" : ""
    }`;

  return (
    <header
      className="font-source uppercase"
      style={{ backgroundColor: VINHO, color: CREME }}
    >
      {/* Desktop — itens espalhados na largura do container (mesma da carta) */}
      <div className="container hidden items-center justify-between pt-2 lg:flex">
        {NAV_LEFT.map((item) => (
          <Link
            key={item.to}
            href={item.to}
            className={linkClass(isActive(pathname, item.to))}
          >
            {item.label}
          </Link>
        ))}

        {/* Logo central */}
        <Link href={ROUTES.home} aria-label="Página inicial" className="shrink-0">
          <Image
            src={logoHeader}
            alt="Teatro Arthur Azevedo"
            priority
            className="h-16 w-auto"
          />
        </Link>

        {NAV_RIGHT.map((item) => (
          <Link
            key={item.to}
            href={item.to}
            className={linkClass(isActive(pathname, item.to))}
          >
            {item.label}
          </Link>
        ))}

        {/* Seletor de idioma */}
        <div ref={langRef} className="relative">
          <button
            type="button"
            onClick={() => setLangOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={langOpen}
            className="inline-flex items-center gap-1 text-[0.82rem] tracking-wide transition hover:opacity-80"
          >
            {lang}
            <CaretDownIcon
              size={12}
              weight="bold"
              className={`transition ${langOpen ? "rotate-180" : ""}`}
            />
          </button>
          {langOpen && (
            <ul
              className="absolute left-1/2 top-full z-50 mt-2 min-w-[64px] -translate-x-1/2 overflow-hidden rounded-md text-center shadow-md"
              style={{ backgroundColor: "#6E0A00", color: CREME }}
            >
              {LANGS.map((l) => (
                <li key={l}>
                  <button
                    type="button"
                    onClick={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-center text-[0.82rem] transition hover:bg-black/15 ${
                      l === lang ? "opacity-100" : "opacity-75"
                    }`}
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mobile — logo + hambúrguer */}
      <div className="container flex items-center justify-between pt-2 lg:hidden">
        <Link href={ROUTES.home} aria-label="Página inicial">
          <Image
            src={logoHeader}
            alt="Teatro Arthur Azevedo"
            priority
            className="h-12 w-auto"
          />
        </Link>
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <XIcon size={26} /> : <ListIcon size={26} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="container flex flex-col gap-1 pb-4 lg:hidden">
          {NAV_ITEMS_ALL.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              onClick={() => setMenuOpen(false)}
              className={`py-2 text-[0.82rem] tracking-wide transition hover:opacity-80 ${
                isActive(pathname, item.to) ? "opacity-100" : "opacity-90"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex gap-4">
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`text-[0.82rem] transition ${
                  l === lang ? "opacity-100 underline" : "opacity-70"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
