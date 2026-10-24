import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/I18nContext";

type Phase = "intro" | "profiles" | "exiting";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Tela de entrada fiel à v1: intro em tela cheia (vídeo cover + "tudum") e,
 * em seguida, a tela de perfis "Quem está a ver?". Clicar no perfil → /inicio.
 */
export function EntryPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const reduce = prefersReducedMotion();

  const [phase, setPhase] = useState<Phase>(reduce ? "profiles" : "intro");
  const [introOpacity, setIntroOpacity] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hiddenRef = useRef(false);

  // trava o scroll enquanto estiver na entrada
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // intro: autoplay do vídeo (muted) + "tudum" (som) após 1.4s, igual à v1
  useEffect(() => {
    if (phase !== "intro") return;

    const video = videoRef.current;
    video?.play().catch(() => {
      /* autoplay bloqueado — o clique/skip resolve */
    });

    const audioTimer = window.setTimeout(() => {
      audioRef.current?.play().catch(() => {
        /* autoplay de áudio bloqueado */
      });
    }, 1400);

    const maxTimer = window.setTimeout(() => hideIntro(), 7000);

    return () => {
      window.clearTimeout(audioTimer);
      window.clearTimeout(maxTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function hideIntro() {
    if (hiddenRef.current) return;
    hiddenRef.current = true;
    videoRef.current?.pause();
    setIntroOpacity(0);
    window.setTimeout(() => setPhase("profiles"), 500);
  }

  function selectProfile() {
    setPhase("exiting");
    window.setTimeout(() => navigate("/inicio"), 500);
  }

  // escolhe o corte do vídeo conforme a largura (melhoria de responsividade)
  const introSrc =
    typeof window !== "undefined" && window.innerWidth < 1200
      ? "/assets/intro-mobile.mp4"
      : "/assets/intro.mp4";

  return (
    <div className="entry-page">
      <header className="header">
        <div className="header-container">
          <div>
            <Link to="/inicio">
              <img className="logo" src="/assets/logo.png" alt="Sandlerflix" />
            </Link>
          </div>
        </div>
      </header>

      {phase === "intro" && (
        <div
          id="video-container"
          aria-hidden="true"
          style={{ opacity: introOpacity }}
          onClick={hideIntro}
        >
          <video
            id="introVideo"
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            onEnded={hideIntro}
          >
            <source src={introSrc} type="video/mp4" />
          </video>
          <audio ref={audioRef} src="/assets/tudum.mp3" preload="auto" />
        </div>
      )}

      <div
        id="profiles-screen"
        className={
          phase === "profiles"
            ? "visible entering"
            : phase === "exiting"
              ? "visible exiting"
              : ""
        }
      >
        <div className="profiles-container">
          <h1 className="profiles-title">{t("profiles-title")}</h1>
          <div className="profiles-list">
            <div
              className="profile-item"
              id="mainProfile"
              role="button"
              tabIndex={0}
              onClick={selectProfile}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectProfile();
                }
              }}
            >
              <div className="profile-avatar">
                <img src="/assets/avatar.webp" alt="Perfil de Adam" />
              </div>
              <span className="profile-name">Adam</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
