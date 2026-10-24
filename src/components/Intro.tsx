import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n/I18nContext";

interface IntroProps {
  onFinish: () => void;
}

/**
 * Tela de intro do vídeo horizontal.
 *
 * Responsividade (telas verticais): usamos DUAS camadas do mesmo vídeo:
 *  - FUNDO: object-cover + scale + blur → estende as cores/gradiente do
 *    próprio vídeo até as bordas da viewport (técnica tipo YouTube/Instagram),
 *    sem precisar de um fundo externo.
 *  - FRENTE: object-contain no aspect ratio real, centralizado por cima.
 * Gradiente CSS escuro nas bordas integra o vídeo ao fundo da página.
 *
 * Fallback: se o autoplay for bloqueado (ou prefers-reduced-motion), mostramos
 * o poster e um botão para entrar/tocar — a entrada no site nunca trava.
 */
export function Intro({ onFinish }: IntroProps) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const frontRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (reduce) {
      setBlocked(true); // reduced-motion: não autoplaya, oferece "Entrar"
      return;
    }
    const front = frontRef.current;
    const bg = bgRef.current;
    if (!front) return;

    bg?.play().catch(() => {});
    front
      .play()
      .catch(() => setBlocked(true)); // autoplay bloqueado → fallback
  }, [reduce]);

  function handleManualPlay() {
    setBlocked(false);
    bgRef.current?.play().catch(() => {});
    frontRef.current?.play().catch(() => onFinish());
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-toast flex items-center justify-center overflow-hidden bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* CAMADA DE FUNDO: mesmo vídeo, cover + blur, preenchendo a viewport */}
        <video
          ref={bgRef}
          className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl saturate-150"
          muted
          loop
          playsInline
          aria-hidden="true"
          poster="/assets/placeholder-large.jpg"
        >
          {/* No futuro: corte vertical dedicado no mobile.
              <source src="/assets/intro-mobile.mp4" media="(max-aspect-ratio: 1/1)" type="video/mp4" /> */}
          <source src="/assets/intro.mp4" type="video/mp4" />
        </video>

        {/* CAMADA DA FRENTE: vídeo nítido, contain, no aspect ratio real */}
        <video
          ref={frontRef}
          className="relative z-raised max-h-full max-w-full object-contain"
          muted
          playsInline
          onEnded={onFinish}
          poster="/assets/placeholder-large.jpg"
        >
          <source
            src="/assets/intro-mobile.mp4"
            media="(max-aspect-ratio: 3/4)"
            type="video/mp4"
          />
          <source src="/assets/intro.mp4" type="video/mp4" />
        </video>

        {/* Gradiente escuro nas bordas integrando ao fundo da página */}
        <div
          className="pointer-events-none absolute inset-0 z-raised"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(0,0,0,0.85) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Fallback de autoplay / reduced-motion */}
        {blocked && (
          <button
            type="button"
            onClick={handleManualPlay}
            className="absolute z-overlay grid h-20 w-20 place-items-center rounded-full bg-primary/90 text-3xl text-white shadow-glow transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={t("intro.play")}
          >
            ▶
          </button>
        )}

        {/* Pular introdução — sempre disponível */}
        <button
          type="button"
          onClick={onFinish}
          className="absolute bottom-6 right-6 z-overlay rounded-base border border-line-hover bg-black/50 px-4 py-2 font-body text-sm text-white backdrop-blur-sm transition hover:border-white hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {t("intro.skip")} ›
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
