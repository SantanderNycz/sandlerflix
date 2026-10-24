import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MOVIES } from "@/lib/loadData";
import { useI18n } from "@/i18n/I18nContext";
import { genreLabel } from "@/lib/utils";
import { MovieCard } from "./MovieCard";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const { locale, t, tn } = useI18n();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return MOVIES.filter((m) => {
      const title = normalize(m.translations[locale].title);
      const altTitle = normalize(
        m.translations[locale === "pt" ? "en" : "pt"].title,
      );
      const role = normalize(m.sandlerRole ?? "");
      const genres = m.genres.map((g) => normalize(genreLabel(g, locale)));
      return (
        title.includes(q) ||
        altTitle.includes(q) ||
        role.includes(q) ||
        genres.some((g) => g.includes(q))
      );
    });
  }, [query, locale]);

  const trimmed = query.trim().length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-overlay flex flex-col bg-bg/98 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={t("search.title")}
        >
          <div className="page-gutter flex h-header shrink-0 items-center gap-3 border-b border-line">
            <span className="text-xl text-content-secondary" aria-hidden>
              ⌕
            </span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="h-full w-full bg-transparent font-body text-lg text-white placeholder:text-content-muted focus:outline-none"
              aria-label={t("search.placeholder")}
            />
            <button
              type="button"
              onClick={onClose}
              aria-label={t("search.close")}
              className="shrink-0 rounded-full px-3 py-1.5 text-white transition hover:bg-bg-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              ✕
            </button>
          </div>

          <div className="page-gutter flex-1 overflow-y-auto py-6">
            {!trimmed && (
              <p className="mt-8 text-center font-body text-content-muted">
                {t("search.hint")}
              </p>
            )}

            {trimmed && (
              <>
                <p
                  className="mb-4 font-body text-sm text-content-secondary"
                  aria-live="polite"
                >
                  {results.length > 0
                    ? tn("search.results", results.length)
                    : t("search.empty")}
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
                  {results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} layoutScope="search" />
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
