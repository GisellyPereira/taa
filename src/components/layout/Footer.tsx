import Image from "next/image";
import Link from "next/link";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ROUTES } from "@/lib/constants";
import logoMaranhao from "@/assets/images/logo-maranhao.svg";
import logoAti from "@/assets/images/logo-ati.png";

const CREME = "#FDF6EB";
const VINHO = "#67100E";

const MENU = [
  { label: "Início", href: ROUTES.home },
  { label: "Sobre o teatro", href: "#" },
  { label: "Notícias", href: ROUTES.noticias },
  { label: "Agenda", href: "#" },
  { label: "Acervo", href: "#" },
  { label: "Rider Técnico", href: "#" },
];

const CONTATOS = [
  { label: "pauta.taa@gmail.com", href: "mailto:pauta.taa@gmail.com" },
  {
    label: "pauta.taa@secma.ma.gov.br",
    href: "mailto:pauta.taa@secma.ma.gov.br",
  },
  { label: "+55 (98) 2016-4368", href: "tel:+559820164368" },
];

const SOCIALS = [
  { Icon: InstagramLogoIcon, href: "#", label: "Instagram" },
  { Icon: FacebookLogoIcon, href: "#", label: "Facebook" },
  { Icon: YoutubeLogoIcon, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: VINHO, color: CREME }}>
      <div className="container pt-14 sm:pt-16">
        {/* Topo: menu (esq) · logo + redes (centro) · fale conosco (dir) */}
        <div className="grid gap-12 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          {/* Menu */}
          <nav className="lg:justify-self-start">
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.12em]">
              Menu
            </p>
            <ul className="mt-5 space-y-2.5">
              {MENU.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-[#FDF6EB]/80 transition hover:text-[#FDF6EB]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logo central + redes sociais */}
          <div className="flex flex-col items-center text-center">
            <h2 className="flex flex-col leading-[0.85]">
              <span className="font-display italic text-[clamp(2.2rem,5.5vw,4.75rem)]">
                Teatro Arthur
              </span>
              <span className="serif uppercase italic tracking-[0.02em] text-[clamp(2.2rem,5.5vw,4.75rem)]">
                Azevedo
              </span>
            </h2>

            <div className="mt-7 flex gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full bg-[#FDF6EB]/10 transition hover:bg-[#FDF6EB]/20"
                >
                  <Icon size={18} weight="fill" />
                </a>
              ))}
            </div>
          </div>

          {/* Fale conosco */}
          <div className="lg:justify-self-end">
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.12em]">
              Fale conosco
            </p>
            <ul className="mt-5 space-y-2.5">
              {CONTATOS.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="font-sans text-sm text-[#FDF6EB]/80 transition hover:text-[#FDF6EB]"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divisória */}
        <hr className="mt-14 border-[#FDF6EB]/20" />

        {/* Linha: monograma + nome / logo Maranhão */}
        <div className="flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-header.svg"
              alt=""
              aria-hidden
              width={23}
              height={27}
              unoptimized
              className="h-9 w-auto"
            />
            <span className="font-display text-lg font-semibold tracking-wide">
              Teatro Arthur Azevedo
            </span>
          </div>

          <Image
            src={logoMaranhao}
            alt="Governo do Maranhão"
            className="h-9 w-auto"
          />
        </div>

        {/* ATI + copyright (centralizado) */}
        <div className="flex flex-col items-center gap-3 pb-8 pt-2 text-center">
          <Image src={logoAti} alt="ATI Maranhão" className="h-14 w-auto" />
          <p className="font-sans text-[0.78rem] text-[#FDF6EB]/80">
            © Todos os direitos reservados.
            <span className="mx-3 text-[#FDF6EB]/40">|</span>
            Governo do Maranhão
          </p>
        </div>
      </div>
    </footer>
  );
}
