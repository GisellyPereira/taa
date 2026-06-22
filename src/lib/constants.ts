export const ROUTES = {
  home: "/",
  oTeatro: "/o-teatro",
  noticias: "/noticias",
  agenda: "/agenda",
  acervo: "/acervo",
  rider: "/rider",
  galeria: "/galeria",
} as const;

export const NAV_LEFT = [
  { label: "Início", to: ROUTES.home },
  { label: "O Teatro", to: ROUTES.oTeatro },
  { label: "Notícias", to: ROUTES.noticias },
  { label: "Agenda", to: ROUTES.agenda },
];

export const NAV_RIGHT = [
  { label: "Acervo", to: ROUTES.acervo },
  { label: "Rider", to: ROUTES.rider },
  { label: "Galeria", to: ROUTES.galeria },
];

export const NAV_ITEMS = [...NAV_LEFT, ...NAV_RIGHT];

export const LANGS = ["PT", "EN", "ES", "FR"] as const;
