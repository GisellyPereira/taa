export const ROUTES = {
  home: "/",
  generos: "/generos",
  noticias: "/noticias",
} as const;

export const NAV_ITEMS = [
  { label: "Início", to: ROUTES.home },
  { label: "Gêneros", to: ROUTES.generos },
  { label: "Notícias", to: ROUTES.noticias },
];
