import type { Metadata } from "next";
import { NoticiaDetalhe } from "@/components/noticias/NoticiaDetalhe";
import { OutrasNoticias } from "@/components/noticias/OutrasNoticias";
import { NoticiasMotion } from "@/components/noticias/NoticiasMotion";
import { featuredNoticia, noticias, toCard } from "@/lib/noticias";

export const metadata: Metadata = {
  title: "Notícias — Teatro Arthur Azevedo",
};

export default function NoticiasPage() {
  return (
    <NoticiasMotion>
      <NoticiaDetalhe {...featuredNoticia} />
      <OutrasNoticias items={noticias.map(toCard)} />
    </NoticiasMotion>
  );
}
