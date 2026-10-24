import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MOVIES } from "@/lib/loadData";
import { genreSchema, type Movie } from "@/types/movie";
import { useI18n } from "@/i18n/I18nContext";
import { genreLabel } from "@/lib/utils";
import { useSelection } from "@/context/SelectionContext";

function MovieGridCard({ movie, locale }: { movie: Movie; locale: "pt" | "en" }) {
  const { open } = useSelection();
  const title = movie.translations[locale].title;
  return (
    <div
      className="movie-card"
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
      <div className="movie-card-img">
        <img src={movie.poster} alt={title} loading="lazy" />
        <div className="movie-card-overlay">
          <div className="movie-card-info">
            <span className="movie-card-title">{title}</span>
            <span className="movie-card-year">{movie.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategoryPage() {
  const { genre } = useParams<{ genre: string }>();
  const { t, locale, unit } = useI18n();

  const parsed = genreSchema.safeParse(genre);
  const movies = useMemo(
    () =>
      parsed.success ? MOVIES.filter((m) => m.genres.includes(parsed.data)) : [],
    [parsed.success, parsed.success ? parsed.data : null],
  );

  if (!parsed.success) return <Navigate to="/categorias" replace />;

  const name = genreLabel(parsed.data, locale);

  return (
    <>
      <Header />
      <main className="category-main">
        <div className="category-header">
          <Link to="/categorias" className="btn-back">
            <i className="fas fa-arrow-left" aria-hidden="true" /> {t("category-back")}
          </Link>
          <h1 className="category-title">{name}</h1>
          <span className="category-count">
            {movies.length} {unit(movies.length)}
          </span>
        </div>
        <div className="movies-grid">
          {movies.map((m) => (
            <MovieGridCard key={m.id} movie={m} locale={locale} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
