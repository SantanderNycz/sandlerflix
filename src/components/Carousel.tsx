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
 * Fileira infinita com setas (desktop) + swipe (mobile). Markup/classe idênticos à v1.
 *
 * Em vez do `loop` do Embla (que, ao dar a volta, pode fazer um grupo de cards
 * "correr" pela tela), replicamos a técnica da v1: renderizamos a lista em 3
 * cópias e começamos na cópia do meio; quando o utilizador entra na primeira ou
 * última cópia, saltamos **instantaneamente** (sem animação) para a posição
 * equivalente na cópia do meio. Como as cópias são idênticas, o salto é
 * invisível e o carrossel parece infinito, sem nenhum card "atravessando".
 */
const COPIES = 3;

export function Carousel({ movies, title }: CarouselProps) {
  const base = movies;

  const slides = useMemo(
    () =>
      base.length === 0
        ? []
        : Array.from({ length: COPIES }, () => base).flat(),
    [base],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    dragFree: false,
    containScroll: false,
    startIndex: base.length, // começa na cópia do meio
  });

  // Recentra instantaneamente para a cópia do meio ao entrar nas cópias das pontas.
  useEffect(() => {
    if (!emblaApi || base.length === 0) return;
    const n = base.length;

    const recenter = () => {
      const i = emblaApi.selectedScrollSnap();
      if (i < n) emblaApi.scrollTo(i + n, true); // jump = sem animação
      else if (i >= n * 2) emblaApi.scrollTo(i - n, true);
    };

    emblaApi.on("select", recenter);
    return () => {
      emblaApi.off("select", recenter);
    };
  }, [emblaApi, base.length]);

  // Setas avançam/retrocedem uma página (nº de cards visíveis), como na v1.
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

  if (movies.length === 0) return null;

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
