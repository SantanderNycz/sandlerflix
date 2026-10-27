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
 * Buffer mínimo de slides para o loop contínuo do Embla ficar fluido: com cards
 * suficientes a emenda do loop acontece fora da tela (nenhum card "atravessa").
 */
const MIN_SLIDES = 24;

/**
 * Fileira infinita e fluida. Usa o loop NATIVO do Embla (reposicionamento
 * contínuo, sem saltos/travadas) com `slidesToScroll: 1` — assim não há "grupo
 * parcial" na volta (a causa do antigo efeito de cards "correndo"). As setas
 * avançam uma página inteira via `scrollTo`, que no loop vai pelo caminho mais
 * curto (para a frente/trás conforme a seta). Swipe no mobile segue nativo.
 */
export function Carousel({ movies, title }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    dragFree: false,
  });

  // Duplica a lista (mantendo a ordem) até ter buffer suficiente para o loop.
  const slides = useMemo(() => {
    if (movies.length === 0) return [];
    if (movies.length >= MIN_SLIDES) return movies;
    const times = Math.ceil(MIN_SLIDES / movies.length);
    return Array.from({ length: times }, () => movies).flat();
  }, [movies]);

  // Avança/recua uma página (nº de cards visíveis) mantendo a sensação da v1.
  const page = useCallback(
    (dir: 1 | -1) => {
      if (!emblaApi) return;
      const count = emblaApi.scrollSnapList().length;
      const step = Math.max(1, emblaApi.slidesInView().length);
      const target = (emblaApi.selectedScrollSnap() + dir * step + count) % count;
      emblaApi.scrollTo(target);
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
