import { Hero } from "@/components/home/Hero";
import { FatosHistoricos } from "@/components/home/FatosHistoricos";
import { BilheteriaDigital } from "@/components/home/BilheteriaDigital";
import { ComoVisitar } from "@/components/home/ComoVisitar";
import { Noticias } from "@/components/home/Noticias";
import { Agenda } from "@/components/home/Agenda";
import { RiderTecnico } from "@/components/home/RiderTecnico";
import { Contato } from "@/components/home/Contato";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FatosHistoricos />
      <BilheteriaDigital />
      <ComoVisitar />
      <Noticias />
      <Agenda />
      <RiderTecnico />
      <Contato />
    </>
  );
}
