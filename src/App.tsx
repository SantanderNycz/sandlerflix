import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Row } from "@/components/Row";
import { Intro } from "@/components/Intro";
import { MovieModal } from "@/components/MovieModal";
import { SearchOverlay } from "@/components/SearchOverlay";
import { ROWS, moviesForRow } from "@/lib/loadData";
import type { MessageKey } from "@/i18n/messages";
import { useI18n } from "@/i18n/I18nContext";

const INTRO_KEY = "sandlerflix:intro-seen";

export default function App() {
  const { t } = useI18n();
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return window.sessionStorage.getItem(INTRO_KEY) !== "1";
    } catch {
      return true;
    }
  });
  const [searchOpen, setSearchOpen] = useState(false);

  function finishIntro() {
    try {
      window.sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignora */
    }
    setShowIntro(false);
  }

  // resolve filmes de cada fileira uma vez
  const rows = ROWS.map((row) => ({
    row,
    movies: moviesForRow(row),
  }));
  const heroMovies = rows.find((r) => r.row.id === "popular")?.movies.slice(0, 5) ??
    rows[0]?.movies.slice(0, 5) ??
    [];

  useEffect(() => {
    document.title = "Sandlerflix";
  }, []);

  return (
    <>
      {showIntro && <Intro onFinish={finishIntro} />}

      <a
        href="#movies"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-toast focus:rounded-base focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        {t("nav.movies")}
      </a>

      <Header onOpenSearch={() => setSearchOpen(true)} />

      <main id="top">
        <Hero movies={heroMovies} />

        <div id="movies" className="relative z-raised -mt-10 pt-10 sm:-mt-16 sm:pt-16">
          {rows.map(({ row, movies }, i) => (
            <Row
              key={row.id}
              id={row.id}
              titleKey={row.titleKey as MessageKey}
              movies={movies}
              priority={i === 0}
            />
          ))}
        </div>

        <footer className="page-gutter border-t border-line py-10 text-center">
          <p className="mx-auto max-w-2xl font-body text-xs leading-relaxed text-content-muted">
            {t("footer.disclaimer")}
          </p>
          <p className="mt-3 font-display text-xl tracking-wider text-primary/70">
            SANDLERFLIX
          </p>
        </footer>
      </main>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MovieModal />
    </>
  );
}
