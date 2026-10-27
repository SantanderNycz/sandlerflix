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
 * Carrossel infinito, fluido e com a emenda INVISÍVEL.
 *
 * Em vez do `loop` nativo do Embla (que reposiciona os cards de forma visível —
 * o efeito de cards "passeando" até o fim da fila), replicamos a técnica da v1:
 *  - renderizamos a lista em N cópias idênticas e começamos na cópia do MEIO;
 *  - quando o scroll assenta ("settle"), se o utilizador saiu da cópia do meio,
 *    saltamos INSTANTANEAMENTE (sem animação) para a posição equivalente no
 *    meio. Como as cópias são idênticas, os cards visíveis são exatamente os
 *    mesmos — o salto não aparece. E como voltamos sempre ao meio, há sempre
 *    buffer dos dois lados: as setas/o swipe nunca "prendem" na ponta.
 */
// Cópias: mais para fileiras curtas (buffer suficiente para flings), 3 p/ longas.
function copiesFor(len: number): number {
  return len >= 8 ? 3 : 5;
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
    dragFree: false,
    containScroll: false,
    startIndex: centerCopy * n, // começa na cópia do meio
  });

  // Recentra para a cópia do meio quando o scroll assenta (salto invisível).
  useEffect(() => {
    if (!emblaApi || n === 0) return;
    const recenter = () => {
      const i = emblaApi.selectedScrollSnap();
      const within = ((i % n) + n) % n;
      const target = centerCopy * n + within;
      if (i !== target) emblaApi.scrollTo(target, true); // jump = sem animação
    };
    emblaApi.on("settle", recenter);
    return () => {
      emblaApi.off("settle", recenter);
    };
  }, [emblaApi, n, centerCopy]);

  // Setas avançam/recuam uma página (nº de cards visíveis). Como voltamos sempre
  // ao meio, há buffer de sobra e o scroll nunca clampa na ponta.
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
