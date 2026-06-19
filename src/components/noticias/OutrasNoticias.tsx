import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export type NoticiaCard = {
  href: string;
  image: StaticImageData;
  imageAlt?: string;
  meta: string;
  title: string;
  excerpt: string;
};

type OutrasNoticiasProps = {
  title?: string;
  items: NoticiaCard[];
};

const COLUMN_COUNT = 3;

export function OutrasNoticias({
  title = "Outras Notícias",
  items,
}: OutrasNoticiasProps) {
  // Distribui em 3 colunas na vertical: col1 = [1,4], col2 = [2,5], col3 = [3,6].
  const columns: NoticiaCard[][] = Array.from({ length: COLUMN_COUNT }, () => []);
  items.forEach((item, i) => {
    columns[i % COLUMN_COUNT].push(item);
  });

  return (
    <section className="mx-auto mt-16 max-w-6xl px-3 pb-16 sm:mt-20 sm:px-6 sm:pb-20">
      {/* Título — Instrument Serif italic */}
      <h2
        data-anim="reveal"
        className="serif text-center italic uppercase text-[clamp(1.5rem,4vw,2.5rem)] text-text"
      >
        {title}
      </h2>

      {/* 3 colunas explícitas (1 no mobile → 2 no sm → 3 no lg). */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {columns.map((column, ci) => (
          <div key={ci} className="flex flex-col gap-6 lg:gap-8">
            {column.map((item, i) => (
              <Link
                key={i}
                data-anim="card"
                href={item.href}
                className="block bg-[#F4EDE1] p-2.5 transition-opacity hover:opacity-90 sm:p-3"
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt ?? ""}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full"
                />
                <div className="mt-2.5 text-left sm:mt-3">
                  {/* Metadados — Instrument Serif */}
                  <p className="serif text-[0.62rem] uppercase tracking-[0.18em] text-text-muted">
                    {item.meta}
                  </p>
                  {/* Título — Playfair Display italic */}
                  <h3 className="mt-3 font-display italic text-[clamp(1.1rem,1.5vw,1.35rem)] text-text">
                    {item.title}
                  </h3>
                  {/* Resumo — Poppins */}
                  <p className="mt-3 font-sans text-xs leading-5 text-text-muted">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
