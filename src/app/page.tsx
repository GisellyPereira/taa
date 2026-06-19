import fs from "node:fs";
import path from "node:path";
import { Hero } from "@/components/home/Hero";
import { FatosHistoricos } from "@/components/home/FatosHistoricos";
import { BilheteriaDigital } from "@/components/home/BilheteriaDigital";
import { ComoVisitar } from "@/components/home/ComoVisitar";
import { Contato } from "@/components/home/Contato";

// SVG nomeado lido no servidor (inline) para o GSAP poder animar as partes.
const arthurSvg = fs.readFileSync(
  path.join(process.cwd(), "src/assets/images/figura_nomeada.svg"),
  "utf8",
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <FatosHistoricos />
      <BilheteriaDigital />
      <ComoVisitar />
      <Contato svgMarkup={arthurSvg} />
    </>
  );
}
