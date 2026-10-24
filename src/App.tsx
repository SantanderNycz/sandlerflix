import { useEffect } from "react";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { EntryPage } from "@/pages/EntryPage";
import { HomePage } from "@/pages/HomePage";
import { MoviesPage } from "@/pages/MoviesPage";
import { CategoriesPage } from "@/pages/CategoriesPage";
import { CategoryPage } from "@/pages/CategoryPage";
import { NotFound } from "@/pages/NotFound";
import { MovieModal } from "@/components/MovieModal";

/** Rola para o topo ao trocar de rota. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/filmes" element={<MoviesPage />} />
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/categoria/:genre" element={<CategoryPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      {/* Modal global — qualquer página pode abri-lo via contexto */}
      <MovieModal />
    </HashRouter>
  );
}
