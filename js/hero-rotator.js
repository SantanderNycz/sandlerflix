import { filmesData } from "./script.js";

class HeroRotator {
  constructor() {
    this.heroSection = document.querySelector(".hero");
    this.heroContent = document.querySelector(".hero-content");
    this.heroTitle = document.querySelector(".hero-title");
    this.heroDescription = document.querySelector(".hero-description");
    this.heroButtons = document.querySelector(".hero-buttons");

    this.currentIndex = 0;
    this.rotationInterval = null;
    this.rotationTime = 8000;
    this.isPaused = false;

    // Pega idioma atual do localStorage
    this.lang = localStorage.getItem("lang") || "pt";

    this.init();
  }

  init() {
    const tryInit = () => {
      if (filmesData.length === 0) {
        setTimeout(tryInit, 100);
        return;
      }

      this.updateHeroContent(true);
      this.startRotation();

      this.heroSection.addEventListener("mouseenter", () =>
        this.pauseRotation(),
      );
      this.heroSection.addEventListener("mouseleave", () =>
        this.resumeRotation(),
      );
      const buttons = this.heroSection.querySelectorAll("button");
      buttons.forEach((button) => {
        button.addEventListener("focus", () => this.pauseRotation());
        button.addEventListener("blur", () => {
          if (!this.heroSection.matches(":hover")) this.resumeRotation();
        });
      });

      const infoButton = this.heroButtons.querySelector(".btn-more");
      if (infoButton) {
        infoButton.addEventListener("click", () => {
          const filmeAtual = this.heroData()[this.currentIndex];
          if (filmeAtual && window.movieModal) {
            window.movieModal.open(filmeAtual);
          }
        });
      }

      // Atualiza idioma quando muda
      document.addEventListener("languageChange", (e) => {
        this.lang = e.detail.lang;
        this.updateHeroContent();
      });
    };
    tryInit();
  }

  startRotation() {
    this.rotationInterval = setInterval(() => {
      if (!this.isPaused) this.nextHero();
    }, this.rotationTime);
  }

  pauseRotation() {
    this.isPaused = true;
    this.heroSection.classList.add("rotation-paused");
  }

  resumeRotation() {
    this.isPaused = false;
    this.heroSection.classList.remove("rotation-paused");
  }

  nextHero() {
    this.currentIndex = (this.currentIndex + 1) % this.heroData().length;
    this.updateHeroContent();
  }

  // Filtra os 4 primeiros filmes para o Hero
  heroData() {
    return filmesData.slice(0, 4).map((f) => {
      // Aplica tradução se existir
      const translatedTitle = f.title; // fallback
      const translatedDescription = f.description; // fallback

      if (window.translations && window.translations[this.lang]) {
        const trans = window.translations[this.lang][f.id]; // cada filme precisa ter chave "id" no JSON
        if (trans) {
          return {
            ...f,
            title: trans.title || f.title,
            description: trans.description || f.description,
            image: f.banner || f.image,
          };
        }
      }

      return {
        ...f,
        title: translatedTitle,
        description: translatedDescription,
        image: f.banner || f.image,
      };
    });
  }

  updateHeroContent(isFirst = false) {
    const hero = this.heroData()[this.currentIndex];
    if (!hero) return;

    // pro primeiro carregamento
    if (isFirst) {
      this.heroTitle.textContent = hero.title;
      this.heroDescription.textContent = hero.description;
      this.heroSection.style.backgroundImage = `url('${hero.image}')`;
      this.heroContent.style.opacity = "1";
      return;
    }

    // Rotações seguintes, com fade
    this.heroContent.style.opacity = "0";

    setTimeout(() => {
      this.heroTitle.textContent = hero.title;
      this.heroDescription.textContent = hero.description;
      this.heroSection.style.backgroundImage = `url('${hero.image}')`;
      this.heroContent.style.opacity = "1";
    }, 500);
  }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  const heroRotator = new HeroRotator();
  window.heroRotator = heroRotator;
});
