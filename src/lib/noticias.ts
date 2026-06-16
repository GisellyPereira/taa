import type { StaticImageData } from "next/image";
import type { NoticiaCard } from "@/components/noticias/OutrasNoticias";
import imageNoticias from "@/assets/images/image-noticias.png";
import imgNot1 from "@/assets/images/img-not1.png";
import imgNot2 from "@/assets/images/img-not2.png";
import imgNot3 from "@/assets/images/img-not3.png";
import imgNot4 from "@/assets/images/img-not4.png";
import imgNot5 from "@/assets/images/img-not5.png";
import imgNot6 from "@/assets/images/img-not6.png";

/**
 * Modelo de uma notícia. Hoje os dados são mock; no futuro virão da API
 * e serão mapeados para este mesmo formato (o layout não muda).
 */
export type Noticia = {
  slug: string;
  // Detalhe (props do NoticiaDetalhe)
  kicker: string;
  titleLines: string[];
  subtitle: string;
  publishedAt: string;
  body: string;
  quote?: string;
  image: StaticImageData;
  imageAlt: string;
  bodyColumns: string;
  bodyClosing: string;
  // Resumo (card em "Outras Notícias")
  cardMeta: string;
  excerpt: string;
};

const body =
  "Lorem ipsum dolor sit amet consectetur. Mauris malesuada tempor nisl pretium mi dolor id. Orci cursus habitasse nunc senectus facilisi. Senectus a eget sit nulla sed euismod ipsum. Egestas at id id mauris dolor facilisi. Nunc venenatis consectetur non pulvinar tellus gravida id suscipit nisl. Volutpat eu nisl nunc ullamcorper risus sagittis tristique consectetur. Massa augue quisque varius duis venenatis felis lectus risus. Laoreet praesent condimentum dui neque. Nibh sagittis sem tristique semper feugiat. In cras dictum dictum in mauris aliquet. Maecenas curabitur eu amet mauris dui sit purus quam. Massa nisl lectus nulla mauris dui diam posuere. Etiam nunc amet sit aliquet. Risus nunc venenatis sed dolor in neque amet eleifend sit. Dignissim sollicitudin suspendisse venenatis in ut eu porta. Et quisque dictumst convallis nisi ut sociis non scelerisque pretium. Faucibus ut non tempus feugiat in. Pellentesque gravida id proin nulla lacus. Vel facilisis ultrices tempor aenean mi urna et. Egestas vitae amet eu venenatis. At faucibus dolor aliquet integer penatibus. Sit dictum amet sapien ornare venenatis sollicitudin leo nisi ante. Montes lacus dui nulla velit cursus neque rutrum id nulla. Nisl viverra nibh justo eu. Et nulla platea tortor sociis eu commodo viverra elit. Sit sed mattis elementum quam iaculis in mauris aliquet. Maecenas curabitur eu amet mauris dui sit purus quam. Massa nisl lectus nulla mauris dui diam posuere. Etiam nunc amet sit aliquet. Risus nunc venenatis sed dolor in neque amet eleifend sit. Dignissim sollicitudin suspendisse venenatis in ut eu porta. Et quisque dictumst convallis nisi ut sociis non scelerisque pretium. Faucibus";

const bodyColumns =
  "Lorem ipsum dolor sit amet consectetur. Mauris malesuada tempor nisl pretium mi dolor id. Orci cursus habitasse nunc senectus facilisi. Senectus a eget sit nulla sed euismod ipsum. Egestas at id id mauris dolor facilisi. Nunc venenatis consectetur non pulvinar tellus gravida id suscipit nisl. Volutpat eu nisl nunc ullamcorper risus sagittis tristique consectetur. Massa augue quisque varius duis venenatis felis lectus risus. Laoreet praesent condimentum dui neque. Nibh sagittis sem tristique semper feugiat. In cras dictum dictum in mauris aliquet. Maecenas curabitur eu amet mauris dui sit purus quam. Massa nisl lectus nulla mauris dui diam posuere. Etiam nunc amet sit aliquet. Risus nunc venenatis sed dolor in neque amet eleifend sit. Dignissim sollicitudin suspendisse venenatis in ut eu porta. Et quisque dictumst convallis nisi ut sociis non scelerisque pretium. Faucibus ut non tempus feugiat in. Pellentesque gravida id proin nulla lacus. Vel facilisis ultrices tempor aenean mi urna et. Egestas vitae amet eu venenatis. At faucibus dolor aliquet integer penatibus. Sit dictum amet sapien ornare venenatis sollicitudin leo nisi ante. Montes lacus dui nulla velit cursus neque rutrum id nulla.";

const bodyClosing =
  "Lorem ipsum dolor sit amet consectetur. Mauris malesuada tempor nisl pretium mi dolor id. Orci cursus habitasse nunc senectus facilisi. Senectus a eget sit nulla sed euismod ipsum. Egestas at id id mauris dolor facilisi. Nunc venenatis consectetur non pulvinar tellus gravida id suscipit nisl. Volutpat eu nisl nunc ullamcorper risus sagittis tristique consectetur. Massa augue quisque varius duis venenatis felis lectus risus. Laoreet praesent condimentum dui neque. Nibh sagittis sem tristique semper feugiat. In cras dictum dictum in mauris aliquet. Maecenas curabitur eu amet mauris dui sit purus quam. Massa nisl lectus nulla mauris dui diam posuere.";

const cardExcerpt =
  "Lorem ipsum dolor sit amet consectetur. Maecenas curabitur eu amet mauris dui sit purus quam. Massa nisl lectus nulla mauris dui diam posuere. Etiam nunc amet sit aliquet. Risus nunc venenatis sed dolor in neque amet eleifend sit.";

/** Fábrica para reduzir repetição enquanto o conteúdo é placeholder. */
function makeNoticia(
  slug: string,
  image: StaticImageData,
  imageAlt: string,
): Noticia {
  return {
    slug,
    kicker: "Notícias",
    titleLines: ["Does This", "Sound Familiar"],
    subtitle:
      "Em Açailândia, Governo do Maranhão entrega mais de 10 mil tablets para estudantes do ensino médio, quadra poliesportiva, equipamentos para agentes de saúde e Estação Tech",
    publishedAt: "Publicado: 11 . Junho . 2026 às 12:36",
    body,
    quote:
      "Eu quero dizer que não só eu estou feliz, mas todos os alunos estão felizes de receber os tablets para auxiliar nos estudos. Nem todos os alunos têm condições de ter um tablet, então nós todos ficamos muitos agradecidos por essa iniciativa do Governo do Maranhão",
    image,
    imageAlt,
    bodyColumns,
    bodyClosing,
    cardMeta: "Publicado · 11 Junho · 2026 · 12:36",
    excerpt: cardExcerpt,
  };
}

/** Notícia em destaque exibida na página /noticias. */
export const featuredNoticia: Noticia = makeNoticia(
  "acailandia-tablets",
  imageNoticias,
  "Bailarinos em apresentação no palco do Teatro Arthur Azevedo",
);

/** Demais notícias que aparecem na grade "Outras Notícias". */
export const noticias: Noticia[] = [
  makeNoticia("noticia-1", imgNot1, "Teatro Arthur Azevedo"),
  makeNoticia("noticia-2", imgNot2, "Teatro Arthur Azevedo"),
  makeNoticia("noticia-3", imgNot3, "Teatro Arthur Azevedo"),
  makeNoticia("noticia-4", imgNot4, "Teatro Arthur Azevedo"),
  makeNoticia("noticia-5", imgNot5, "Teatro Arthur Azevedo"),
  makeNoticia("noticia-6", imgNot6, "Teatro Arthur Azevedo"),
];

const todas: Noticia[] = [featuredNoticia, ...noticias];

export function getNoticiaBySlug(slug: string): Noticia | undefined {
  return todas.find((n) => n.slug === slug);
}

export function getAllSlugs(): string[] {
  return todas.map((n) => n.slug);
}

/** Converte uma notícia no formato de card (com link para o detalhe). */
export function toCard(noticia: Noticia): NoticiaCard {
  return {
    href: `/noticias/${noticia.slug}`,
    image: noticia.image,
    imageAlt: noticia.imageAlt,
    meta: noticia.cardMeta,
    title: noticia.titleLines.join(" "),
    excerpt: noticia.excerpt,
  };
}
