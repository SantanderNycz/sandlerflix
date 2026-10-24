import { useEffect, useState } from "react";
import type { Genre, Locale } from "@/types/movie";

/** Concatena classes condicionais sem dependência externa. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Normaliza texto para busca (minúsculas, sem acentos). */
export function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Minutos → "2h 15m" / "47m". */
export function formatRuntime(minutes: number | null): string | null {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/** Rótulos de gênero por idioma. */
const GENRE_LABELS: Record<Locale, Record<Genre, string>> = {
  pt: {
    comedy: "Comédia",
    drama: "Drama",
    romance: "Romance",
    sports: "Esporte",
    action: "Ação",
    fantasy: "Fantasia",
    family: "Família",
    animation: "Animação",
    horror: "Terror",
    mystery: "Mistério",
    thriller: "Suspense",
    western: "Faroeste",
    "sci-fi": "Ficção Científica",
    adventure: "Aventura",
    musical: "Musical",
  },
  en: {
    comedy: "Comedy",
    drama: "Drama",
    romance: "Romance",
    sports: "Sports",
    action: "Action",
    fantasy: "Fantasy",
    family: "Family",
    animation: "Animation",
    horror: "Horror",
    mystery: "Mystery",
    thriller: "Thriller",
    western: "Western",
    "sci-fi": "Sci-Fi",
    adventure: "Adventure",
    musical: "Musical",
  },
};

export function genreLabel(genre: Genre, locale: Locale): string {
  return GENRE_LABELS[locale][genre];
}

/** Media query reativa para decisões de layout (ex: setas só no desktop). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
