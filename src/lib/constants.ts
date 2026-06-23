export const ROUTES = {
  home: "/",
  oTeatro: "/o-teatro",
  noticias: "/noticias",
  agenda: "/agenda",
  acervo: "/acervo",
  visita: "/visita",
  contatos: "/contatos",
  rider: "/rider",
  galeria: "/galeria",
} as const;

export const NAV_ITEMS = [
  { label: "Início", to: ROUTES.home },
  { label: "O Teatro", to: ROUTES.oTeatro },
  { label: "Notícias", to: ROUTES.noticias },
  { label: "Agenda", to: ROUTES.agenda },
  { label: "Acervo", to: ROUTES.acervo },
  { label: "Visita", to: ROUTES.visita },
  { label: "Contatos", to: ROUTES.contatos },
];

export const LANGS = ["PT", "EN", "ES", "FR"] as const;
