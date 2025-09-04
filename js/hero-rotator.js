// hero-rotator.js - Sistema de rotatividade para a seção hero
class HeroRotator {
  constructor() {
    this.heroSection = document.querySelector(".hero");
    this.heroContent = document.querySelector(".hero-content");
    this.heroTitle = document.querySelector(".hero-title");
    this.heroDescription = document.querySelector(".hero-description");
    this.heroButtons = document.querySelector(".hero-buttons");

    this.heroData = [
      {
        title: "Jóias Brutas",
        description:
          "Um joalheiro de Nova York tenta encontrar um jeito de pagar seus credores e fazer as pazes com sua família. Mas ele não resiste quando vê uma chance de faturar alto e acaba se envolvendo em uma espiral de riscos e dinheiro.",
        image: "assets/uncutgems 1.jpg",
        playUrl: "#",
        infoUrl: "#",
      },
      {
        title: "Click",
        description:
          "Um arquiteto sobrecarregado encontra um controle remoto universal que permite avançar rapidamente pelas partes chatas de sua vida. Mas logo descobre que não pode voltar atrás.",
        image: "assets/click hero.jpg",
        playUrl: "#",
        infoUrl: "#",
      },
      {
        title: "Como Se Fosse a Primeira Vez",
        description:
          "Um mulherengo que não acredita no amor se apaixona por uma mulher com amnésia de curto prazo que esquece tudo cada manhã ao acordar.",
        image: "assets/50 first dates hero.jpg",
        playUrl: "#",
        infoUrl: "#",
      },
      {
        title: "Sandy Wexler",
        description:
          "Sandy Wexler é um agente determinado, empenhado e focado na evolução da carreira de seus excêntricos clientes. Sua rotina, no entanto, é abalada quando ele descobre em um parque de diversões a talentosa cantora Courtney Clarke, por quem acaba se apaixonando.",
        image: "assets/sandy wexler hero.png",
        playUrl: "#",
        infoUrl: "#",
      },
    ];

    this.currentIndex = 0;
    this.rotationInterval = null;
    this.rotationTime = 8000; // 8 segundos
    this.isPaused = false;

    this.init();
  }

  init() {
    // Iniciar a rotatividade
    this.startRotation();

    // Pausar quando o mouse estiver sobre a seção hero
    this.heroSection.addEventListener("mouseenter", () => {
      this.pauseRotation();
    });

    // Retomar quando o mouse sair
    this.heroSection.addEventListener("mouseleave", () => {
      this.resumeRotation();
    });

    // Também pausar ao focar nos botões (acessibilidade)
    const buttons = this.heroSection.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("focus", () => {
        this.pauseRotation();
      });

      button.addEventListener("blur", () => {
        // Só retomar se o mouse não estiver ainda sobre a seção
        if (!this.heroSection.matches(":hover")) {
          this.resumeRotation();
        }
      });
    });
  }

  startRotation() {
    this.rotationInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextHero();
      }
    }, this.rotationTime);
  }

  pauseRotation() {
    this.isPaused = true;
    // Adicionar classe para indicar que está pausado (opcional)
    this.heroSection.classList.add("rotation-paused");
  }

  resumeRotation() {
    this.isPaused = false;
    // Remover classe de pausado
    this.heroSection.classList.remove("rotation-paused");
  }

  nextHero() {
    this.currentIndex = (this.currentIndex + 1) % this.heroData.length;
    this.updateHeroContent();
  }

  updateHeroContent() {
    const hero = this.heroData[this.currentIndex];

    // Adicionar transição de fade out
    this.heroContent.style.opacity = "0";

    // Esperar a transição de fade out completar antes de atualizar o conteúdo
    setTimeout(() => {
      // Atualizar conteúdo
      this.heroTitle.textContent = hero.title;
      this.heroDescription.textContent = hero.description;

      // Atualizar imagem de fundo com transição suave
      this.heroSection.style.backgroundImage = `url('${hero.image}')`;

      // Atualizar URLs dos botões (se necessário)
      const playButton = this.heroButtons.querySelector(".btn-play");
      const infoButton = this.heroButtons.querySelector(".btn-more");

      if (playButton) playButton.setAttribute("data-url", hero.playUrl);
      if (infoButton) infoButton.setAttribute("data-url", hero.infoUrl);

      // Fade in do novo conteúdo
      this.heroContent.style.opacity = "1";
    }, 500); // Tempo correspondente à transição CSS
  }

  // Método para navegar manualmente (opcional)
  goToHero(index) {
    if (index >= 0 && index < this.heroData.length) {
      this.currentIndex = index;
      this.updateHeroContent();

      // Reiniciar o temporizador
      this.restartRotation();
    }
  }

  restartRotation() {
    clearInterval(this.rotationInterval);
    this.startRotation();
  }

  // Destruir o rotator quando não for mais necessário
  destroy() {
    clearInterval(this.rotationInterval);
    this.heroSection.removeEventListener("mouseenter", this.pauseRotation);
    this.heroSection.removeEventListener("mouseleave", this.resumeRotation);
  }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  const heroRotator = new HeroRotator();

  // Tornar acessível globalmente se necessário
  window.heroRotator = heroRotator;
});
