import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Carousel } from "@/components/Carousel";
import { Footer } from "@/components/Footer";
import { MOVIES, ROWS, moviesForRow } from "@/lib/loadData";
import { useI18n } from "@/i18n/I18nContext";
import type { MessageKey } from "@/i18n/messages";
import { normalize } from "@/lib/utils";

export function HomePage() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");

  const heroMovies = useMemo(() => MOVIES.slice(0, 5), []);
  const rows = useMemo(
    () => ROWS.map((row) => ({ row, movies: moviesForRow(row) })),
    [],
  );

  const q = normalize(query);
  const results = useMemo(() => {
    if (!q) return [];
    return MOVIES.filter((m) => {
      const pt = normalize(m.translations.pt.title);
      const en = normalize(m.translations.en.title);
      return pt.includes(q) || en.includes(q);
    });
  }, [q]);

  return (
    <>
      <Header
        search={{
          value: query,
          onChange: setQuery,
          placeholder: t("search-placeholder"),
        }}
      />

      <Hero movies={heroMovies} />

      <main className="main-content">
        {q ? (
          <Carousel
            title={`${t("search-results-for")} "${query.trim()}"`}
            movies={results}
          />
        ) : (
          rows.map(({ row, movies }) => (
            <Carousel
              key={row.id}
              title={t(`section-${row.id}` as MessageKey)}
              movies={movies}
            />
          ))
        )}
      </main>

      <Footer />
    </>
  );
}
