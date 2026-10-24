import type { Locale } from "@/types/movie";

/** Strings de interface (migradas de legacy/data/translations.json + novas da v2). */
export const messages = {
  pt: {
    "nav.home": "Início",
    "nav.movies": "Filmes",
    "nav.search": "Buscar",
    "brand.tagline": "A cinemateca definitiva do Adam Sandler",

    "intro.skip": "Pular introdução",
    "intro.enter": "Entrar",
    "intro.play": "Tocar introdução",
    "intro.muted": "Som desligado",
    "intro.unmute": "Ativar som",

    "hero.play": "Assistir",
    "hero.more": "Mais informações",

    "row.popular": "Populares na Sandlerflix",
    "row.comedy": "Comédias",
    "row.drama": "Dramas",
    "row.animation": "Animações",
    "row.action": "Ação e Aventura",
    "row.classics": "Clássicos do Adam Sandler",
    "row.unrated": "Não consigo defender",

    "row.prev": "Anterior",
    "row.next": "Próximo",

    "search.title": "Buscar",
    "search.placeholder": "Títulos, gêneros, personagens...",
    "search.empty": "Nenhum filme encontrado.",
    "search.results": (n: number) =>
      `${n} ${n === 1 ? "resultado" : "resultados"}`,
    "search.hint": "Digite para buscar no catálogo",
    "search.close": "Fechar busca",

    "modal.close": "Fechar",
    "modal.role": "Papel do Sandler",
    "modal.genres": "Gêneros",
    "modal.synopsis": "Sinopse",
    "modal.noTrailer": "Trailer indisponível",
    "modal.year": "Ano",
    "modal.runtime": "Duração",

    "meta.rating": "Nota",

    "error.title": "Algo deu errado",
    "error.retry": "Tentar de novo",

    "footer.disclaimer":
      "Projeto pessoal, sem fins lucrativos e para fins educacionais. Não afiliado à Netflix nem ao Adam Sandler — mas que eu queria, eu queria.",

    "lang.toggle": "English",
  },
  en: {
    "nav.home": "Home",
    "nav.movies": "Movies",
    "nav.search": "Search",
    "brand.tagline": "The definitive Adam Sandler cinematheque",

    "intro.skip": "Skip intro",
    "intro.enter": "Enter",
    "intro.play": "Play intro",
    "intro.muted": "Sound off",
    "intro.unmute": "Unmute",

    "hero.play": "Watch",
    "hero.more": "More info",

    "row.popular": "Popular on Sandlerflix",
    "row.comedy": "Comedies",
    "row.drama": "Dramas",
    "row.animation": "Animations",
    "row.action": "Action & Adventure",
    "row.classics": "Adam Sandler Classics",
    "row.unrated": "Can't defend these",

    "row.prev": "Previous",
    "row.next": "Next",

    "search.title": "Search",
    "search.placeholder": "Titles, genres, characters...",
    "search.empty": "No movies found.",
    "search.results": (n: number) => `${n} ${n === 1 ? "result" : "results"}`,
    "search.hint": "Type to search the catalog",
    "search.close": "Close search",

    "modal.close": "Close",
    "modal.role": "Sandler's role",
    "modal.genres": "Genres",
    "modal.synopsis": "Synopsis",
    "modal.noTrailer": "Trailer unavailable",
    "modal.year": "Year",
    "modal.runtime": "Runtime",

    "meta.rating": "Rating",

    "error.title": "Something went wrong",
    "error.retry": "Try again",

    "footer.disclaimer":
      "A personal, non-profit project for educational purposes. Not affiliated with Netflix or Adam Sandler — though I really wish it were.",

    "lang.toggle": "Português",
  },
} satisfies Record<Locale, Record<string, string | ((n: number) => string)>>;

export type MessageKey = keyof (typeof messages)["pt"];
