import type { Metadata } from "next";
import { NoticiaDetalhe } from "@/components/noticias/NoticiaDetalhe";
import { OutrasNoticias } from "@/components/noticias/OutrasNoticias";
import { featuredNoticia, noticias, toCard } from "@/lib/noticias";

export const metadata: Metadata = {
  title: "Notícias — Teatro Arthur Azevedo",
};

export default function NoticiasPage() {
  return (
    <>
      <NoticiaDetalhe {...featuredNoticia} />
      <OutrasNoticias items={noticias.map(toCard)} />
    </>
  );
}
