import { memo, useState } from "react";
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { useI18n } from "@/i18n/I18nContext";
import { useSelection } from "@/context/SelectionContext";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  /** Identidade do trilho de origem — torna o layoutId único por instância. */
  layoutScope: string;
  /** Carrega com prioridade (above-the-fold). */
  priority?: boolean;
}

/** layoutId compartilhado entre o card e o modal para o "poster que vira modal". */
export function posterLayoutId(scope: string, id: string): string {
  return `poster:${scope}:${id}`;
}

function MovieCardBase({ movie, layoutScope, priority = false }: MovieCardProps) {
  const { locale } = useI18n();
  const { open } = useSelection();
  const title = movie.translations[locale].title;
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.button
      type="button"
      layoutId={posterLayoutId(layoutScope, movie.id)}
      onClick={() => open(movie, layoutScope)}
      whileHover={{ scale: 1.06 }}
      whileFocus={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="group relative block w-full overflow-hidden rounded-md bg-bg-elevated shadow-base focus:outline-none"
      style={{ aspectRatio: "2 / 3" }}
      aria-label={title}
    >
      {!loaded && (
        <span className="skeleton absolute inset-0" aria-hidden="true" />
      )}
      <img
        src={movie.poster}
        alt={title}
        width={185}
        height={278}
        loading={priority ? "eager" : "lazy"}
        // atributo HTML nativo (lowercase) — react-dom 18 não mapeia a forma camelCase
        {...({ fetchpriority: priority ? "high" : "auto" } as Record<string, string>)}
        decoding="async"
        draggable={false}
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
      {/* legenda que aparece no hover/focus (desktop) + sempre legível no mobile */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 pt-6 text-left font-body text-xs font-medium leading-tight text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-sm"
      >
        {title}
      </span>
      <span className="pointer-events-none absolute right-1.5 top-1.5 rounded-base bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
        ★ {movie.rating.toFixed(1)}
      </span>
    </motion.button>
  );
}

export const MovieCard = memo(MovieCardBase);
