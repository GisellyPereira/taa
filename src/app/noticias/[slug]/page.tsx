import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NoticiaDetalhe } from "@/components/noticias/NoticiaDetalhe";
import { OutrasNoticias } from "@/components/noticias/OutrasNoticias";
import { NoticiasMotion } from "@/components/noticias/NoticiasMotion";
import { getAllSlugs, getNoticiaBySlug, noticias, toCard } from "@/lib/noticias";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const noticia = getNoticiaBySlug(slug);

  if (!noticia) return {};

  return {
    title: `${noticia.titleLines.join(" ")} — Teatro Arthur Azevedo`,
  };
}

export default async function NoticiaPage({ params }: Params) {
  const { slug } = await params;
  const noticia = getNoticiaBySlug(slug);

  if (!noticia) notFound();

  return (
    <NoticiasMotion>
      <NoticiaDetalhe {...noticia} />
      {/* Sempre as 6 notícias na grade — não remove a que foi clicada. */}
      <OutrasNoticias items={noticias.map(toCard)} />
    </NoticiasMotion>
  );
}
