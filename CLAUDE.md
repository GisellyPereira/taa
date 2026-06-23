# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The line above is not decoration: this repo runs **Next.js 16.2.9 / React 19 / Tailwind v4**, which differ from older conventions. Before writing framework code, read the relevant guide under `node_modules/next/dist/docs/` (`01-app`, `02-pages`, `03-architecture`).

## Commands

```bash
npm run dev      # dev server (Turbopack) at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (flat config, eslint-config-next)
```

There is no test runner configured.

## Architecture

Marketing/institutional site for the **Teatro Arthur Azevedo**. Next.js **App Router**, TypeScript strict, Tailwind v4. UI text and code comments are in **Brazilian Portuguese** — match that.

- **Routing** — `src/app/`. Routes: `/` (`page.tsx`), `/generos`, `/noticias`. Page `<head>` is set via the per-route `metadata` export. `src/app/layout.tsx` is the only place `<html>/<body>` live; it wires fonts, `<SmoothScroll/>`, `<Header/>`, `<main>`, `<Footer/>`.
- **Components** — `src/components/`, grouped by area: `layout/`, `home/`, `noticias/`, `ui/`. Pages compose section components; most logic lives in the components, not the page.
- **Import alias** — `@/*` maps to `src/*` (see `tsconfig.json`).

### Server vs client components

Default is a Server Component. Add `"use client"` only when a file uses hooks, browser APIs, or animation. Pages stay server components and delegate interactivity to client section components (e.g. `/noticias` renders inside the client `NoticiasMotion` wrapper).

### Styling — Tailwind v4, no JS config

There is **no `tailwind.config.js`**. The design system is defined as CSS custom properties inside the `@theme` block of `src/app/globals.css`, which generates the utility classes. To add/change a color, font, radius, or the container width, edit `@theme` there — then use the generated utilities (`bg-bg`, `text-primary`, `font-display`, etc.). Fonts come from `next/font/google` in `layout.tsx`, exposed as `--font-*` variables and consumed by the `--font-display/serif/sans` theme tokens.

### Animation — GSAP + Lenis

Scroll-driven animation uses **GSAP** (with `ScrollTrigger`) and **Lenis** smooth scroll. Conventions to follow when adding animation:

- `SmoothScroll` (in `layout.tsx`) owns the single Lenis instance and drives `ScrollTrigger.update` from GSAP's ticker. Don't create a second Lenis.
- Animate inside `useLayoutEffect` (use the `useIsomorphicLayoutEffect` pattern from `Hero.tsx`), register plugins inside the effect, and clean up via the returned function.
- Always gate motion on `prefers-reduced-motion` (via `gsap.matchMedia()` or a `matchMedia` check) and ensure content is visible in the reduced-motion branch — elements often start at `opacity-0` in markup and are revealed by GSAP, so the no-motion path must set them visible.
- Animation targets are selected by `data-*` attributes (`data-reveal`, `data-piece`) rather than refs.

### Data layer (currently mocked)

`src/lib/noticias.ts` holds the news content as **mock data** shaped to a stable `Noticia` type; helpers (`getNoticiaBySlug`, `toCard`, etc.) read from it. The comment in that file states the API will later map into this same shape so the layout doesn't change — preserve the type contract when wiring a real backend.

`src/lib/http-client.ts` is a thin `fetch` wrapper (`httpClient.get/post/...`) that prefixes `env.apiBaseUrl`, JSON-encodes bodies, and throws `HttpError` on non-2xx. `src/config/env.ts` centralizes env access (`NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_APP_NAME`); read env through it, not `process.env` directly.

Other `src/lib/` utilities: `format.ts`, `validators.ts`, `use-local-storage.ts`, `constants.ts` (route table `ROUTES` + `NAV_ITEMS` — add new routes here).
