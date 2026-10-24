import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { useI18n } from "@/i18n/I18nContext";
import { useSelection } from "@/context/SelectionContext";
import { formatRuntime } from "@/lib/utils";

interface HeroProps {
  movies: Movie[];
}

const ROTATE_MS = 8000;

export function Hero({ movies }: HeroProps) {
  const { locale, t } = useI18n();
  const { open } = useSelection();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || movies.length <= 1) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % movies.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, movies.length]);

  if (movies.length === 0) return null;
  const movie = movies[index];
  const title = movie.translations[locale].title;

  return (
    <section
      className="relative h-[72vh] min-h-[460px] w-full overflow-hidden sm:h-[80vh]"
      aria-roledescription="carousel"
      aria-label={t("row.popular")}
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={movie.id}
          src={movie.backdrop}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-top"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 1.1 }}
        />
      </AnimatePresence>

      {/* gradientes para legibilidade do texto e integração com as fileiras */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="page-gutter relative flex h-full max-w-site flex-col justify-end pb-[18%] sm:justify-center sm:pb-0">
        <motion.div
          key={movie.id + ":copy"}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5 }}
          className="max-w-xl"
        >
          <h1 className="font-display text-5xl leading-none tracking-wide text-white drop-shadow-lg sm:text-7xl">
            {title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-sm text-content-secondary">
            <span className="font-semibold text-green-400">
              ★ {movie.rating.toFixed(1)}
            </span>
            <span>{movie.year}</span>
            {formatRuntime(movie.runtime) && (
              <span>{formatRuntime(movie.runtime)}</span>
            )}
          </div>
          <p className="mt-3 line-clamp-3 max-w-lg font-body text-sm text-content-secondary sm:text-base">
            {movie.translations[locale].synopsis}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => open(movie, "hero")}
              className="flex items-center gap-2 rounded-base bg-white px-6 py-2.5 font-body font-semibold text-black transition hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              ▶ {t("hero.play")}
            </button>
            <button
              type="button"
              onClick={() => open(movie, "hero")}
              className="flex items-center gap-2 rounded-base bg-white/20 px-6 py-2.5 font-body font-semibold text-white backdrop-blur-sm transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              ⓘ {t("hero.more")}
            </button>
          </div>
        </motion.div>

        {/* indicadores */}
        {movies.length > 1 && (
          <div className="mt-6 flex gap-1.5" role="tablist" aria-hidden>
            {movies.map((m, i) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={m.translations[locale].title}
                className={`h-1 rounded-full transition-all ${
                  i === index ? "w-6 bg-primary" : "w-3 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
