import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";
import { useI18n } from "@/i18n/I18nContext";
import type { MessageKey } from "@/i18n/messages";
import { cn } from "@/lib/utils";

interface RowProps {
  id: string;
  titleKey: MessageKey;
  movies: Movie[];
  /** Primeira fileira carrega posters com prioridade. */
  priority?: boolean;
}

function ArrowButton({
  side,
  onClick,
  disabled,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "absolute top-0 z-raised hidden h-full w-[4vw] min-w-10 items-center justify-center bg-gradient-to-r from-bg/90 to-transparent text-white transition-opacity md:flex",
        side === "left" ? "left-0" : "right-0 bg-gradient-to-l",
        disabled && "pointer-events-none opacity-0",
      )}
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-black/60 text-xl transition-transform hover:scale-110 hover:bg-black/80">
        {side === "left" ? "‹" : "›"}
      </span>
    </button>
  );
}

export function Row({ id, titleKey, movies, priority = false }: RowProps) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
    duration: reduce ? 0 : 22,
  });

  const [canScroll, setCanScroll] = useState({ prev: true, next: true });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScroll({
      prev: emblaApi.canScrollPrev(),
      next: emblaApi.canScrollNext(),
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (movies.length === 0) return null;

  return (
    <section aria-labelledby={`row-${id}`} className="mb-8 md:mb-12">
      <h2
        id={`row-${id}`}
        className="page-gutter mb-3 flex items-center gap-2 font-display text-2xl tracking-wide text-white sm:text-3xl"
      >
        <span className="inline-block h-6 w-1 rounded-full bg-primary" aria-hidden />
        {t(titleKey)}
      </h2>

      <div className="group/row relative">
        <ArrowButton
          side="left"
          label={t("row.prev")}
          disabled={!canScroll.prev}
          onClick={() => emblaApi?.scrollPrev()}
        />

        {/* viewport do Embla: touch-action pan-y deixa o scroll vertical da página livre */}
        <div
          className="overflow-hidden page-gutter"
          ref={emblaRef}
          style={{ touchAction: "pan-y" }}
        >
          <div className="flex gap-2 sm:gap-3">
            {movies.map((movie, i) => (
              <div
                key={movie.id}
                className="min-w-0 shrink-0 grow-0 basis-[42%] xs:basis-[38%] sm:basis-[31%] md:basis-[23%] lg:basis-[18.5%] xl:basis-[15.5%]"
              >
                <MovieCard
                  movie={movie}
                  layoutScope={id}
                  priority={priority && i < 6}
                />
              </div>
            ))}
          </div>
        </div>

        <ArrowButton
          side="right"
          label={t("row.next")}
          disabled={!canScroll.next}
          onClick={() => emblaApi?.scrollNext()}
        />
      </div>
    </section>
  );
}
