import Image, { type StaticImageData } from "next/image";

type NoticiaDetalheProps = {
  kicker: string;
  /** Cada item é uma linha do título; quebra exatamente onde você quiser. */
  titleLines: string[];
  subtitle: string;
  publishedAt: string;
  body: string;
  quote?: string;
  image?: StaticImageData;
  imageAlt?: string;
  /** Texto que será distribuído em duas colunas. */
  bodyColumns?: string;
  /** Parágrafo de fechamento, abaixo das colunas. */
  bodyClosing?: string;
};

export function NoticiaDetalhe({
  kicker,
  titleLines,
  subtitle,
  publishedAt,
  body,
  quote,
  image,
  imageAlt = "",
  bodyColumns,
  bodyClosing,
}: NoticiaDetalheProps) {
  return (
    <article className="w-full pt-6 sm:pt-10 lg:pt-12">
      {/* Cabeçalho + corpo — centralizados, largura controlada */}
      <div className="mx-auto flex max-w-6xl flex-col items-center px-3 text-center sm:px-6">
        {/* Kicker — Instrument Serif */}
        <p
          data-anim="intro"
          className="serif uppercase text-[clamp(0.9rem,3vw,1.35rem)] text-text"
        >
          {kicker}
        </p>

        {/* Título — Playfair Display italic */}
        <h1 className="mt-5 font-display italic font-semibold leading-[0.95] text-[clamp(1.9rem,8vw,5.25rem)] text-text sm:mt-8">
          {titleLines.map((line, i) => (
            <span key={i} data-anim="intro" className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* Subtítulo / olho — Playfair Display italic */}
        <p
          data-anim="intro"
          className="mt-8 max-w-4xl font-display italic text-[clamp(0.95rem,3vw,1.6rem)] leading-[1.45] text-text sm:mt-12 lg:mt-15"
        >
          {subtitle}
        </p>

        {/* Publicado — Instrument Serif */}
        <p
          data-anim="intro"
          className="serif mt-8 uppercase tracking-[0.2em] text-[clamp(0.72rem,1.4vw,0.85rem)] text-text-muted sm:mt-12 sm:tracking-[0.25em] lg:mt-15"
        >
          {publishedAt}
        </p>

        {/* Corpo — Poppins, com capitular de 3 linhas */}
        <div
          data-anim="reveal"
          className="mt-8 w-full max-w-5xl text-left sm:mt-12 lg:mt-15"
        >
          <p className="font-sans text-justify text-[0.8rem] leading-6 text-text sm:text-sm sm:leading-7 first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-display first-letter:not-italic first-letter:font-normal first-letter:text-[3rem] first-letter:leading-[0.72] first-letter:text-text sm:first-letter:mr-3 sm:first-letter:text-[4.5rem] lg:first-letter:text-[5.25rem]">
            {body}
          </p>
        </div>

        {/* Pull quote — Playfair Display italic */}
        {quote && (
          <blockquote
            data-anim="reveal"
            className="mt-10 max-w-3xl px-2 font-display italic text-[clamp(0.95rem,2.6vw,1.4rem)] leading-[1.6] text-text sm:mt-14 sm:px-0"
          >
            {`“${quote}”`}
          </blockquote>
        )}
      </div>

      {/* Imagem full-width — w-full = largura real do documento (sem 100vw, sem scroll lateral) */}
      {image && (
        <div data-anim="image" className="mt-10 w-full overflow-hidden sm:mt-14">
          <Image
            src={image}
            alt={imageAlt}
            sizes="100vw"
            className="h-auto w-full"
            priority={false}
          />
        </div>
      )}

      {/* Colunas + fechamento — centralizados, largura controlada */}
      {(bodyColumns || bodyClosing) && (
        <div className="mx-auto flex max-w-6xl flex-col items-center px-3 sm:px-6">
          {/* Corpo em duas colunas — Poppins */}
          {bodyColumns && (
            <div
              data-anim="reveal"
              className="mt-10 w-full max-w-5xl text-left sm:mt-14"
            >
              <p className="columns-1 gap-6 font-sans text-justify text-[0.8rem] leading-6 text-text sm:columns-2 sm:gap-16 sm:text-sm sm:leading-7">
                {bodyColumns}
              </p>
            </div>
          )}

          {/* Parágrafo de fechamento — Poppins */}
          {bodyClosing && (
            <div
              data-anim="reveal"
              className="mt-6 w-full max-w-5xl text-left sm:mt-8"
            >
              <p className="font-sans text-justify text-[0.8rem] leading-6 text-text sm:text-sm sm:leading-7">
                {bodyClosing}
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
