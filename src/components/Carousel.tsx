import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";

interface CarouselProps {
  movies: Movie[];
  /** Conteúdo do título da secção (ex: "Comédias"). Opcional para resultados de busca. */
  title?: React.ReactNode;
}

/** Fileira com setas (desktop) + swipe (mobile). Markup/classe idênticos à v1. */
export function Carousel({ movies, title }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: "auto",
    dragFree: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
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
