# 🎬 Sandlerflix v2

> Uma plataforma de streaming temática dedicada à filmografia de **Adam Sandler** — espírito Netflix com personalidade própria e **curadoria autoral** (do indefensável ao clássico). Reconstrução da [v1 em HTML/CSS/JS puro](https://github.com/SantanderNycz/sandlerflix) com uma stack moderna, mais fluida, mais polida e **mobile-first de verdade**.

[![Stack](https://img.shields.io/badge/stack-Vite%20%7C%20React%20%7C%20TypeScript-646CFF?logo=vite)](https://vite.dev)
[![Motion](https://img.shields.io/badge/motion-Framer%20Motion-ff0055)](https://www.framer.com/motion/)
[![Styling](https://img.shields.io/badge/styling-Tailwind%20CSS-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## ✨ O que tem de novo na v2

| Área | v1 | v2 |
| --- | --- | --- |
| Stack | HTML/CSS/JS puro | **Vite + React + TypeScript (strict)** |
| Dados | `movies_pt.json` + `movies_en.json` (duplicados) | **`movies.json` normalizado** (1 filme, traduções embutidas) + `rows.json` |
| Validação | — | **Zod** no carregamento (`schema → z.infer`), falha com erro claro |
| Carrossel | scroll manual | **Embla** (swipe fluido no mobile, setas no desktop, loop) |
| Modal | abre/fecha | **layout animation** (`layoutId`): o poster "vira" o modal sem corte |
| Animações | CSS | **Framer Motion** (hero, modal, intro, menu) |
| Responsividade | ponto fraco | **requisito de primeira classe** — testada em 360/390/768/1024/1440 |
| Intro vertical | faixas pretas | **fundo borrado** do próprio vídeo preenchendo a viewport |
| i18n | JSON + DOM | **contexto React** leve, PT/EN, persistido em `localStorage` |

---

## 🧱 Stack

- **Vite + React 18 + TypeScript** (strict, zero `any`)
- **Tailwind CSS** — tokens de design migrados do `variables.css` da v1 para o `tailwind.config.ts`
- **Framer Motion** — animações, incluindo layout animation card → modal
- **Embla Carousel** — carrosséis acessíveis e fluidos
- **Zod** — validação do JSON de dados + tipos derivados
- Dados **JSON local curado** (sem TMDB — fica no roadmap)

---

## 🗂️ Estrutura

```
.
├── public/
│   ├── assets/           # pôsteres, backdrops, intro.mp4 / intro-mobile.mp4, fontes de mídia
│   └── fonts/            # Netflix Sans (local)
├── src/
│   ├── components/       # Header, Hero, Row, MovieCard, MovieModal, Intro, SearchOverlay, ErrorBoundary
│   ├── context/          # SelectionContext (card ↔ modal)
│   ├── data/             # movies.json + rows.json (modelo normalizado)
│   ├── i18n/             # I18nContext + messages (PT/EN)
│   ├── lib/              # loadData (valida com Zod), utils, validateData
│   ├── types/            # schemas Zod + tipos (movie.ts)
│   ├── App.tsx
│   └── main.tsx
├── legacy/               # v1 completa, preservada para referência
├── tailwind.config.ts    # tokens de design (cores, tipografia, sombras, z-index…)
└── vite.config.ts        # server.host = true (host de rede para testar no celular)
```

### Modelo de dados

- **`movies.json`** — cada filme **uma vez**. Campos neutros na raiz (`year`, `runtime`,
  `rating`, `genres`, `sandlerRole`, `poster`, `backdrop`, `trailerId`); campos traduzíveis
  em `translations.pt` / `translations.en` (`title`, `synopsis`). IDs em **slug legível**
  (`happy-gilmore`). `genres` como **enum tipado**.
- **`rows.json`** — curadoria das fileiras referenciando `movieIds` (a mesma obra aparece em
  várias fileiras **sem duplicar** dados).
- Validados por **Zod** no carregamento, incluindo integridade referencial (toda fileira
  aponta para um filme existente).

---

## 📱 Responsividade (prioridade alta)

- **Mobile-first**, testado em 360 / 390 / 768 / 1024 / 1440.
- Sem scroll horizontal indesejado; alvos de toque ≥ 44px; tipografia fluida.
- Cards por fileira por breakpoint: **2** (mobile) → **3** (tablet) → **5–6** (desktop).
- Header com **menu mobile funcional**.
- **Intro responsiva (ponto crítico):** vídeo horizontal com uma camada de **fundo em
  `object-fit: cover` + `blur`** que estende as cores do próprio vídeo até as bordas
  (técnica tipo YouTube/Instagram), e a camada da frente em `object-fit: contain` no aspect
  ratio real. Fallback de autoplay (poster + botão) e opção de **pular a intro**. Já
  preparada (via `<source media>`) para servir um corte vertical dedicado no mobile.

---

## ♿ Acessibilidade & performance

- Foco gerido no modal (trap + restauração), navegação por teclado, `Esc` para fechar, ARIA.
- `prefers-reduced-motion` respeitado em toda a UI (intro, hero, carrosséis, modal).
- Imagens com `width`/`height` explícitos, `fetchpriority` nas above-the-fold, `lazy` no
  resto, skeleton shimmer enquanto carregam, transforms GPU-friendly, `touch-action` correto.

---

## 🚀 Rodando localmente

```bash
npm install
npm run dev
```

O Vite expõe também um **host de rede** (`server.host = true`) — use o endereço `Network:`
impresso no terminal para testar no celular na mesma rede Wi-Fi.

| Script | O que faz |
| --- | --- |
| `npm run dev` | sobe o dev server (local + rede) |
| `npm run build` | typecheck (`tsc -b`) + build de produção |
| `npm run preview` | serve o build de produção |
| `npm run data:check` | valida `movies.json` + `rows.json` com Zod |

---

## 🗺️ Roadmap

- [ ] Integração opcional com **TMDB** (hoje os dados são 100% curados localmente)
- [ ] Corte vertical dedicado do vídeo de intro no mobile (já estruturado)
- [ ] Página de categorias / filtro por gênero
- [ ] Testes (Vitest + Testing Library)
- [ ] Lighthouse CI

---

## ⚠️ Aviso

Projeto pessoal, sem fins lucrativos e para fins educacionais. Não afiliado à Netflix nem ao
Adam Sandler — mas que eu queria, eu queria.
