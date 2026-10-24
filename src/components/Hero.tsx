import { useEffect, useRef, useState } from "react";
import type { Movie } from "@/types/movie";
import { useI18n } from "@/i18n/I18nContext";
import { useSelection } from "@/context/SelectionContext";

interface HeroProps {
  movies: Movie[]; // primeiros 5 (como na v1)
}

const ROTATE_MS = 8000;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Hero({ movies }: HeroProps) {
  const { locale, t } = useI18n();
  const { open } = useSelection();
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (movies.length <= 1 || prefersReducedMotion()) return;

    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      // fade out → troca → fade in (igual à v1)
      setFading(true);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % movies.length);
        setFading(false);
      }, 500);
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [movies.length]);

  if (movies.length === 0) return null;
  const movie = movies[index];
  const title = movie.translations[locale].title;
  const description = movie.translations[locale].synopsis;

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url('${movie.backdrop}')` }}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="hero-shadow" />
      <div className="hero-content" style={{ opacity: fading ? 0 : 1 }}>
        <h2 className="hero-title">{title}</h2>
        <p className="hero-description">{description}</p>
        <div className="hero-buttons">
          <button className="btn btn-more" onClick={() => open(movie)}>
            <i className="fa-solid fa-circle-info" /> {t("btn-more")}
          </button>
        </div>
      </div>
    </section>
  );
}
