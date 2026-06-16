import Image from "next/image";
import monograma from "@/assets/images/logo-vinho-hero.png";
import lacre from "@/assets/images/lacre-dourado-hero.png";
import moldura from "@/assets/images/moldura-hero.png";
import ticket from "@/assets/images/ticket.png";
import chave from "@/assets/images/chave-hero.png";

export function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-[70vh] md:min-h-[clamp(480px,72vh,720px)] overflow-hidden">
      <Image
        src={lacre}
        alt=""
        aria-hidden
        className="absolute z-0 select-none pointer-events-none top-[4%] left-[4%] md:top-[1%] md:left-[1%]"
      />
      <Image
        src={moldura}
        alt=""
        aria-hidden
        className="absolute z-0 select-none pointer-events-none top-[3%] right-[4%] md:top-[10%] md:right-[10%]"
      />
      <Image
        src={ticket}
        alt=""
        aria-hidden
        className="absolute z-0 select-none pointer-events-none bottom-[6%] left-[2%] md:left-[8%]"
      />
      <Image
        src={chave}
        alt=""
        aria-hidden
        className="absolute z-0 select-none pointer-events-none bottom-[3%] right-[2%] md:bottom-[8%] md:right-[7%]"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <Image
          src={monograma}
          alt="Teatro Arthur Azevedo"
          className="w-[clamp(60px,6vw,90px)] h-auto mb-4"
        />
        <p className="serif uppercase tracking-[0.4em] text-[clamp(0.7rem,1vw,0.95rem)] text-secondary mb-2">
          Bem - vindo ao
        </p>
        <h1 className="flex flex-col items-center leading-[0.95] font-normal">
          <span className="font-display italic font-medium text-[clamp(3rem,8.5vw,8rem)] text-primary-hover">
            Teatro Arthur
          </span>
          <span className="serif italic uppercase tracking-[0.02em] text-[clamp(3rem,8.5vw,8rem)] text-primary">
            Azevedo
          </span>
        </h1>
      </div>
    </section>
  );
}
