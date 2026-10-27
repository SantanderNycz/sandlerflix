import { useCallback, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";

interface CarouselProps {
  movies: Movie[];
  /** Conteúdo do título da secção (ex: "Comédias"). Opcional para resultados de busca. */
  title?: React.ReactNode;
}

/**
 * Mínimo de slides para o loop do Embla ficar contínuo: com poucos cards não há
 * buffer para reposicionar fora da tela, e o card aparece "atravessando" até o
 * fim. Com slides suficientes (≈2× o máximo visível no desktop + folga) o
 * reposicionamento acontece fora de vista — loop infinito e sem o "voo".
 */
const MIN_SLIDES = 16;

/** Fileira com setas (desktop) + swipe (mobile). Markup/classe idênticos à v1. */
export function Carousel({ movies, title }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: "auto",
    dragFree: false,
  });

  // Duplica a lista (mantendo a ordem) até ter cards suficientes para o loop.
  const slides = useMemo(() => {
    if (movies.length === 0) return [];
    if (movies.length >= MIN_SLIDES) return movies;
    const times = Math.ceil(MIN_SLIDES / movies.length);
    return Array.from({ length: times }, () => movies).flat();
  }, [movies]);

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
