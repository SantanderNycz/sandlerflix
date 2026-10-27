import { useCallback, useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";

interface CarouselProps {
  movies: Movie[];
  /** Conteúdo do título da secção (ex: "Comédias"). Opcional para resultados de busca. */
  title?: React.ReactNode;
}

/**
 * Carrossel infinito, com swipe SOLTO (momentum livre) e a emenda INVISÍVEL.
 *
 * - `dragFree: true` dá o arrasto fluido/deslizante (em vez de "agarrar" card a
 *   card como o snap do `slidesToScroll: 1`).
 * - A ilusão de infinito é feita com N cópias idênticas + recentramento: quando
 *   o scroll assenta fora da cópia do meio, saltamos para a posição equivalente
 *   no meio. O salto é por cópias inteiras (mesmos cards visíveis) → não aparece.
 *   Como voltamos sempre ao meio, há buffer dos dois lados e o fling nunca bate
 *   na ponta.
 */
// Mais cópias para fileiras curtas (buffer p/ flings do dragFree); menos p/ longas.
function copiesFor(len: number): number {
  if (len >= 12) return 3;
  if (len >= 7) return 5;
  return 7;
}

export function Carousel({ movies, title }: CarouselProps) {
  const n = movies.length;
  const copies = n > 0 ? copiesFor(n) : 1;
  const centerCopy = Math.floor(copies / 2);

  const slides = useMemo(
    () => (n === 0 ? [] : Array.from({ length: copies }, () => movies).flat()),
    [movies, n, copies],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    dragFree: true,
    containScroll: false,
    startIndex: centerCopy * n,
  });

  // Recentra para a cópia do meio quando o scroll assenta (salto invisível).
  useEffect(() => {
    if (!emblaApi || n === 0) return;
    const recenter = () => {
      const i = emblaApi.selectedScrollSnap();
      const within = ((i % n) + n) % n;
      const target = centerCopy * n + within;
      if (i !== target) emblaApi.scrollTo(target, true); // jump = instantâneo
    };
    emblaApi.on("settle", recenter);
    return () => {
      emblaApi.off("settle", recenter);
    };
  }, [emblaApi, n, centerCopy]);

  // Setas avançam/recuam uma página (nº de cards visíveis).
  const page = useCallback(
    (dir: 1 | -1) => {
      if (!emblaApi) return;
      const step = Math.max(1, emblaApi.slidesInView().length);
      emblaApi.scrollTo(emblaApi.selectedScrollSnap() + dir * step);
    },
    [emblaApi],
  );

  const scrollPrev = useCallback(() => page(-1), [page]);
  const scrollNext = useCallback(() => page(1), [page]);

  if (n === 0) return null;

  return (
    <section className="carousel-section">
      {title && (
        <h3 className="section-title">
          <span className="title-bar" />
          {title}
        </h3>
      )}
      <div className="carousel">
        <button
          className="carousel-control left"
          aria-label="Anterior"
          onClick={scrollPrev}
        >
          <i className="fa-solid fa-angle-left" aria-hidden="true" />
        </button>

        <div className="carousel-viewport" ref={emblaRef}>
          <div className="carousel-container">
            {slides.map((movie, i) => (
              <MovieCard key={`${movie.id}-${i}`} movie={movie} />
            ))}
          </div>
        </div>

        <button
          className="carousel-control right"
          aria-label="Próximo"
          onClick={scrollNext}
        >
          <i className="fa-solid fa-angle-right" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
