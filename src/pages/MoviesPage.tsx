import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MovieAlphaCard } from "@/components/MovieAlphaCard";
import { MOVIES } from "@/lib/loadData";
import { useI18n } from "@/i18n/I18nContext";
import { normalize } from "@/lib/utils";
import type { Movie } from "@/types/movie";

const DIGITS_BUCKET = "0–9";

/** Letra da secção a partir do título em inglês (como a v1 agrupava por id/EN). */
function bucketOf(movie: Movie): string {
  const ch = movie.translations.en.title.trim()[0]?.toUpperCase() ?? "#";
  return /[0-9]/.test(ch) ? DIGITS_BUCKET : ch;
}

export function MoviesPage() {
  const { t, locale } = useI18n();
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState("all");

  // Agrupa e ordena por letra (0–9 primeiro)
  const sections = useMemo(() => {
    const map = new Map<string, Movie[]>();
    for (const m of MOVIES) {
      const b = bucketOf(m);
      if (!map.has(b)) map.set(b, []);
      map.get(b)!.push(m);
    }
    const keys = [...map.keys()].sort((a, b) => {
      if (a === DIGITS_BUCKET) return -1;
      if (b === DIGITS_BUCKET) return 1;
      return a.localeCompare(b);
    });
    for (const k of keys) {
      map.get(k)!.sort((a, b) =>
        a.translations.en.title.localeCompare(b.translations.en.title),
      );
    }
    return keys.map((k) => ({ letter: k, movies: map.get(k)! }));
  }, []);

  const q = normalize(query);
  const results = useMemo(() => {
    if (!q) return [];
    return MOVIES.filter((m) => {
      const pt = normalize(m.translations.pt.title);
      const en = normalize(m.translations.en.title);
      return pt.includes(q) || en.includes(q);
    });
  }, [q]);

  const searching = q.length > 0;

  function pickLetter(letter: string) {
    setActiveLetter(letter);
    if (letter === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(`section-${letter}`);
    if (el) {
      const offset = 68 + 52 + 16;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  }

  return (
    <>
      <Header
        search={{
          value: query,
          onChange: setQuery,
          placeholder: t("movies-search-placeholder"),
        }}
      />

      <div className="movies-hero">
        <div className="movies-hero-content">
          <p className="movies-hero-eyebrow">{t("movies-eyebrow")}</p>
          <h1 className="movies-hero-title">{t("movies-title")}</h1>
          <p className="movies-hero-meta">
            <span>{MOVIES.length}</span> {t("movies-meta-suffix")}
          </p>
        </div>
      </div>

      {!searching && (
        <nav className="alpha-nav" aria-label="Navegação alfabética">
          <div className="alpha-nav-inner">
            <button
              className={`alpha-btn${activeLetter === "all" ? " active" : ""}`}
              onClick={() => pickLetter("all")}
            >
              {t("movies-btn-all")}
            </button>
            {sections.map((s) => (
              <button
                key={s.letter}
                className={`alpha-btn${activeLetter === s.letter ? " active" : ""}`}
                onClick={() => pickLetter(s.letter)}
              >
                {s.letter}
              </button>
            ))}
          </div>
        </nav>
      )}

      {searching ? (
        <section className="search-results">
          <div className="movies-page-container">
            <h2 className="letter-heading">{t("movies-results-heading")}</h2>
            {results.length > 0 ? (
              <div className="movies-alpha-grid">
                {results.map((m) => (
                  <MovieAlphaCard key={m.id} movie={m} locale={locale} />
                ))}
              </div>
            ) : (
              <p className="no-results">{t("movies-no-results")}</p>
            )}
          </div>
        </section>
      ) : (
        <main className="movies-page-container">
          {sections
            .filter((s) => activeLetter === "all" || s.letter === activeLetter)
            .map((s) => (
              <section
                className="letter-section"
                id={`section-${s.letter}`}
                key={s.letter}
              >
                <h2 className="letter-heading">
                  <span className="letter-char">{s.letter}</span>
                </h2>
                <div className="movies-alpha-grid">
                  {s.movies.map((m) => (
                    <MovieAlphaCard key={m.id} movie={m} locale={locale} />
                  ))}
                </div>
              </section>
            ))}
        </main>
      )}

      <Footer />
    </>
  );
}
