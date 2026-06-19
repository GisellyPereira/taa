import Image from "next/image";
import Link from "next/link";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { NAV_ITEMS } from "@/lib/constants";
import logoMaranhao from "@/assets/images/logo-maranhao.svg";
import logoAti from "@/assets/images/logo-ati.png";

const CREME = "#FDF6EB";
const VINHO = "#67100E";

const SOCIALS = [
  { Icon: InstagramLogoIcon, href: "#", label: "Instagram" },
  { Icon: FacebookLogoIcon, href: "#", label: "Facebook" },
  { Icon: YoutubeLogoIcon, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: VINHO, color: CREME }}>
      <div className="container pt-14 sm:pt-16">
        {/* Topo: título + colunas (menu / contatos) */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Título */}
          <h2 className="flex flex-col leading-[0.88]">
            <span className="font-display italic text-[clamp(2.4rem,6.5vw,5.5rem)]">
              Teatro Arthur
            </span>
            <span className="serif uppercase italic tracking-[0.02em] text-[clamp(2.4rem,6.5vw,5.5rem)]">
              Azevedo
            </span>
          </h2>

          {/* Colunas à direita */}
          <div className="flex gap-12 sm:gap-20">
            {/* Menu */}
            <nav>
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.1em]">
                Menu
              </p>
              <ul className="mt-4 space-y-2.5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <Link
                      href={item.to}
                      className="font-sans text-sm text-[#FDF6EB]/80 transition hover:text-[#FDF6EB]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contatos */}
            <div>
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.1em]">
                Contatos
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href="mailto:Teatro@gmail.com"
                    className="font-sans text-sm text-[#FDF6EB]/80 transition hover:text-[#FDF6EB]"
                  >
                    Teatro@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+5598900000000"
                    className="font-sans text-sm text-[#FDF6EB]/80 transition hover:text-[#FDF6EB]"
                  >
                    +55 98 90000-0000
                  </a>
                </li>
              </ul>

              {/* Redes sociais */}
              <div className="mt-10 flex gap-2.5">
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
          </div>
        </div>

        {/* Divisória */}
        <hr className="mt-12 border-[#FDF6EB]/20" />

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
      </div>

      {/* Rodapé final: ATI + copyright */}
      <div className="border-t border-[#FDF6EB]/15">
        <div className="container flex flex-col items-center gap-2 py-5 text-center">
          <Image src={logoAti} alt="ATI" className="h-9 w-auto" />
          <p className="font-sans text-[0.7rem] text-[#FDF6EB]/70">
            © Todos os direitos reservados.{"  "}|{"  "}Governo do Maranhão
          </p>
        </div>
      </div>
    </footer>
  );
}
