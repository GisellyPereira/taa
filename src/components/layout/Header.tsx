"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { NAV_ITEMS, ROUTES } from "@/lib/constants";
import logoHeader from "@/assets/images/logo-branca.png";

const VINHO = "#820A00";
const CREME = "#FDFCF3";

function isActive(pathname: string, to: string) {
  return to === ROUTES.home ? pathname === "/" : pathname.startsWith(to);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (active: boolean) =>
    `text-[0.82rem] tracking-wide transition-opacity hover:opacity-90 ${
      active ? "opacity-100" : ""
    }`;

  return (
    <header
      className="font-source uppercase"
      style={{ backgroundColor: VINHO, color: CREME }}
    >
      {/* Desktop — logo à esquerda, itens centralizados na largura toda.
          Grid [1fr_auto_1fr]: a coluna vazia à direita equilibra a logo
          à esquerda, mantendo o nav (coluna central) sempre no centro. */}
      <div className="container hidden items-center py-2 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {/* Logo à esquerda */}
        <Link
          href={ROUTES.home}
          aria-label="Página inicial"
          className="shrink-0 justify-self-start"
        >
          <Image
            src={logoHeader}
            alt="Teatro Arthur Azevedo"
            priority
            className="h-12 w-auto"
          />
        </Link>

        {/* Itens de navegação (centralizados) */}
        <nav className="flex items-center justify-self-center gap-8 xl:gap-12">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className={linkClass(isActive(pathname, item.to))}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Coluna vazia para equilibrar (mantém o nav centralizado) */}
        <span aria-hidden />
      </div>

      {/* Mobile — logo + hambúrguer */}
      <div className="container flex items-center justify-between py-2 lg:hidden">
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
          {NAV_ITEMS.map((item) => (
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
        </nav>
      )}
    </header>
  );
}
