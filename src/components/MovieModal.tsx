import { useCallback, useEffect, useRef, useState } from "react";
import type { Movie } from "@/types/movie";
import { useSelection } from "@/context/SelectionContext";
import { useI18n } from "@/i18n/I18nContext";
import { formatRuntime, genreLabel } from "@/lib/utils";

type Phase = "closed" | "open" | "closing";

export function MovieModal() {
  const { selected, close } = useSelection();
  const { locale, t } = useI18n();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [phase, setPhase] = useState<Phase>("closed");
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selected) {
      setMovie(selected);
      setPhase("open");
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    }
  }, [selected]);

  const handleClose = useCallback(() => {
    setPhase("closing");
    window.setTimeout(() => {
      setPhase("closed");
      setMovie(null);
      document.body.style.overflow = "";
      close();
    }, 350);
  }, [close]);

  useEffect(() => {
    if (phase !== "open") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase, handleClose]);

  if (!movie) return null;

  const title = movie.translations[locale].title;
  const duration = formatRuntime(movie.runtime) ?? "N/A";

  return (
    <div
      className={`modal${phase === "open" ? " active" : ""}${phase === "closing" ? " closing" : ""}`}
      id="movie-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-detail-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="modal-content">
        <button
          className="modal-close"
          aria-label="Fechar modal"
          ref={closeBtnRef}
          onClick={handleClose}
        >
          <i className="fas fa-times" aria-hidden="true" />
        </button>

        <div
          className="modal-bg-blur"
          style={{ backgroundImage: `url('${movie.backdrop}')` }}
        />

        <div className="modal-detail-container">
          <div className="modal-detail-grid">
            <div className="modal-detail-main">
              <div className="modal-trailer-wrapper">
                {movie.trailerId ? (
                  <iframe
                    className="modal-trailer-iframe"
                    src={`https://www.youtube-nocookie.com/embed/${movie.trailerId}?rel=0`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={movie.backdrop}
                    alt={title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
              </div>
              <h2 className="modal-detail-title" id="modal-detail-title">
                {title}
              </h2>
              <p className="modal-detail-description">
                {movie.translations[locale].synopsis}
              </p>
            </div>

            <div className="modal-detail-sidebar">
              <div className="modal-detail-card">
                <h3 className="modal-detail-card-title">{t("modal-details")}</h3>
                <div className="modal-detail-info">
                  <div className="modal-info-item">
                    <div className="modal-info-icon rating">
                      <i className="fas fa-star" />
                    </div>
                    <div>
                      <p className="modal-info-label">{t("modal-rating")}</p>
                      <p className="modal-info-value">
                        <span className="modal-info-rating">
                          {movie.rating.toFixed(1)}
                        </span>
                        <span className="modal-info-sub">/ 5.0</span>
                      </p>
                    </div>
                  </div>

                  <div className="modal-info-item">
                    <div className="modal-info-icon">
                      <i className="fas fa-clock" />
                    </div>
                    <div>
                      <p className="modal-info-label">{t("modal-duration")}</p>
                      <p className="modal-info-value modal-info-duration">
                        {duration}
                      </p>
                    </div>
                  </div>

                  <div className="modal-info-item">
                    <div className="modal-info-icon">
                      <i className="fas fa-calendar" />
                    </div>
                    <div>
                      <p className="modal-info-label">{t("modal-year")}</p>
                      <p className="modal-info-value modal-info-year">
                        {movie.year}
                      </p>
                    </div>
                  </div>

                  <div className="modal-info-item">
                    <div className="modal-info-icon">
                      <i className="fas fa-user" />
                    </div>
                    <div>
                      <p className="modal-info-label">{t("modal-role")}</p>
                      <p className="modal-info-value modal-info-role">
                        {movie.sandlerRole ?? "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="modal-info-item">
                    <div className="modal-info-icon">
                      <i className="fas fa-film" />
                    </div>
                    <div>
                      <p className="modal-info-label">{t("modal-genres")}</p>
                      <div className="modal-info-genres">
                        {movie.genres.map((g) => (
                          <span className="genre-tag" key={g}>
                            {genreLabel(g, locale)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-detail-poster">
                <img src={movie.poster} alt={title} />
                <div className="modal-detail-poster-overlay">
                  <span>{t("modal-poster")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
