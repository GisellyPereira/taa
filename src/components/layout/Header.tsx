"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, ROUTES } from "@/lib/constants";
import { SearchBar } from "@/components/ui/SearchBar";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-primary-hover text-text-inverse font-sans">
      <div className="container flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3 md:grid md:grid-cols-[1fr_auto_1fr] md:py-0 md:h-[72px]">
        <Link
          href={ROUTES.home}
          aria-label="Página inicial"
          className="inline-flex items-center shrink-0 text-text-inverse"
        >
          <Image
            src="/images/logo-header.svg"
            alt="Teatro Arthur Azevedo"
            width={23}
            height={27}
            unoptimized
            className="h-10 w-auto"
          />
        </Link>

        <nav className="order-3 basis-full flex items-center justify-center gap-2 md:order-none md:basis-auto">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.to === ROUTES.home ? pathname === "/" : pathname.startsWith(item.to);

            return (
              <Link
                key={item.to}
                href={item.to}
                className={`px-6 py-2 rounded-full text-sm font-medium transition hover:opacity-80 ${
                  isActive ? "bg-primary opacity-100" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="order-2 md:order-none md:justify-self-end">
          <SearchBar placeholder="Buscar" />
        </div>
      </div>
    </header>
  );
}
