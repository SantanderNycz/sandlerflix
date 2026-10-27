import { memo, useState } from "react";
import type { Movie } from "@/types/movie";
import { useI18n } from "@/i18n/I18nContext";
import { useSelection } from "@/context/SelectionContext";

interface MovieCardProps {
  movie: Movie;
}

/** Card do carrossel — markup/classe idênticos à v1 (.carousel-item). */
function MovieCardBase({ movie }: MovieCardProps) {
  const { locale } = useI18n();
  const { open } = useSelection();
  const [loaded, setLoaded] = useState(false);
  const title = movie.translations[locale].title;

  return (
    <div
      className="carousel-item"
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
      <img
        src={movie.poster}
        alt={title}
        /* eager: como os cards se repetem (poucas imagens únicas, deduplicadas
           pelo navegador), pré-carregar evita a espera ao rolar para os repetidos */
        loading="eager"
        decoding="async"
        draggable={false}
        ref={(el) => {
          // se já estiver em cache, mostra na hora (sem fade/esqueleto)
          if (el?.complete) setLoaded(true);
        }}
        onLoad={() => setLoaded(true)}
        className={`carousel-img${loaded ? " loaded" : ""}`}
      />
      <div className="card-hover-overlay">
        <div className="card-hover-content">
          <span className="card-hover-title">{title}</span>
        </div>
      </div>
    </div>
  );
}

export const MovieCard = memo(MovieCardBase);
