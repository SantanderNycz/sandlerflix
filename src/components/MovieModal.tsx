import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSelection } from "@/context/SelectionContext";
import { useI18n } from "@/i18n/I18nContext";
import { posterLayoutId } from "./MovieCard";
import { formatRuntime, genreLabel } from "@/lib/utils";

export function MovieModal() {
  const { selected, originId, close } = useSelection();
  const { locale, t } = useI18n();
  const reduce = useReducedMotion();

  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = Boolean(selected);

  // trava o scroll do body e gere foco/teclado enquanto o modal está aberto
  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // foca o botão de fechar no próximo frame (após a animação de layout iniciar)
    const raf = requestAnimationFrame(() => closeBtnRef.current?.focus());

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      // focus trap
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(raf);
      lastFocused.current?.focus?.();
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {selected && (
        <div
          className="fixed inset-0 z-modal flex items-start justify-center overflow-y-auto overscroll-contain p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 bg-overlay backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          {/* painel — compartilha o layoutId do poster do card clicado */}
          <motion.div
            ref={panelRef}
            layoutId={posterLayoutId(originId ?? selected.id, selected.id)}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 300, damping: 32 }
            }
            className="relative z-modal w-full max-w-3xl overflow-hidden rounded-none bg-bg-elevated shadow-modal sm:rounded-xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: reduce ? 0 : 0.15 } }}
              exit={{ opacity: 0 }}
            >
              {/* media: trailer do YouTube ou backdrop */}
              <div className="relative aspect-video w-full bg-black">
                {selected.trailerId ? (
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${selected.trailerId}?rel=0`}
                    title={selected.translations[locale].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <>
                    <img
                      src={selected.backdrop}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-black/70 p-2 text-center text-sm text-content-secondary">
                      {t("modal.noTrailer")}
                    </span>
                  </>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-elevated to-transparent" />

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={close}
                  aria-label={t("modal.close")}
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-lg text-white transition hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  ✕
                </button>
              </div>

              {/* corpo */}
              <div className="max-h-[55vh] overflow-y-auto p-5 sm:max-h-none sm:p-7">
                <h2
                  id="modal-title"
                  className="font-display text-4xl tracking-wide text-white"
                >
                  {selected.translations[locale].title}
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-sm text-content-secondary">
                  <span className="font-semibold text-green-400">
                    ★ {selected.rating.toFixed(1)}
                  </span>
                  <span>{selected.year}</span>
                  {formatRuntime(selected.runtime) && (
                    <span>{formatRuntime(selected.runtime)}</span>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.genres.map((g) => (
                    <span
                      key={g}
                      className="rounded-full border border-line px-2.5 py-0.5 text-xs text-content-secondary"
                    >
                      {genreLabel(g, locale)}
                    </span>
                  ))}
                </div>

                <p className="mt-4 font-body text-base leading-relaxed text-content">
                  {selected.translations[locale].synopsis}
                </p>

                {selected.sandlerRole && (
                  <p className="mt-4 font-body text-sm text-content-secondary">
                    <span className="text-content-muted">{t("modal.role")}: </span>
                    <span className="text-content">{selected.sandlerRole}</span>
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
