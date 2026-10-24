import { memo } from "react";
import type { Locale, Movie } from "@/types/movie";
import { useSelection } from "@/context/SelectionContext";

interface Props {
  movie: Movie;
  locale: Locale;
}

/** Card da página de catálogo — markup/classe idênticos à v1 (.movie-alpha-card). */
function MovieAlphaCardBase({ movie, locale }: Props) {
  const { open } = useSelection();
  const title = movie.translations[locale].title;

  return (
    <article
      className="movie-alpha-card"
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes de ${title}`}
      onClick={() => open(movie)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(movie);
        }
      }}
    >
      <div className="movie-alpha-poster">
        <img src={movie.poster} alt={title} loading="lazy" decoding="async" />
        <div className="movie-alpha-overlay">
          <button
            className="movie-alpha-info"
            aria-label={`Ver detalhes de ${title}`}
            onClick={(e) => {
              e.stopPropagation();
              open(movie);
            }}
            tabIndex={-1}
          >
            <i className="fas fa-circle-info" aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="movie-alpha-title">{title}</p>
    </article>
  );
}

export const MovieAlphaCard = memo(MovieAlphaCardBase);
