import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MOVIES } from "@/lib/loadData";
import { GENRES, type Genre } from "@/types/movie";
import { useI18n } from "@/i18n/I18nContext";
import { genreLabel } from "@/lib/utils";

export function CategoriesPage() {
  const { t, locale, unit } = useI18n();

  const categories = useMemo(() => {
    const list = GENRES.map((g: Genre) => {
      const movies = MOVIES.filter((m) => m.genres.includes(g));
      return {
        genre: g,
        name: genreLabel(g, locale),
        count: movies.length,
        cover: movies[0]?.poster ?? "",
      };
    }).filter((c) => c.count > 0);
    list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [locale]);

  return (
    <>
      <Header />
      <main className="categories-main">
        <div className="categories-header">
          <h1 className="categories-title">{t("categories-title")}</h1>
          <p className="categories-subtitle">{t("categories-subtitle")}</p>
        </div>
        <div className="categories-grid">
          {categories.map((c) => (
            <Link
              key={c.genre}
              to={`/categoria/${c.genre}`}
              className="category-card"
              aria-label={c.name}
            >
              <div className="category-card-img">
                <img src={c.cover} alt={c.name} loading="lazy" />
                <div className="category-card-overlay">
                  <span className="category-card-count">
                    {c.count} {unit(c.count)}
                  </span>
                  <div className="category-card-info">
                    <h2 className="category-card-name">{c.name}</h2>
                    <i className="fas fa-arrow-right" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
