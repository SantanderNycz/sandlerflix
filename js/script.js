// script.js - Funcionalidades gerais do site Sandlerflix

// Modal de detalhes do filme
class MovieModal {
  constructor() {
    this.modal = document.getElementById("movie-modal");
    this.closeButton = this.modal.querySelector(".modal-close");
    this.movieData = {}; // Em um projeto real, viria de uma API

    this.init();
  }

  init() {
    // Fechar modal ao clicar no botão X
    this.closeButton.addEventListener("click", () => this.close());

    // Fechar modal ao clicar fora do conteúdo
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Fechar modal com a tecla ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.close();
      }
    });
  }

  open(movieId) {
    // Em um projeto real, buscaríamos os dados do filme por ID
    this.loadMovieData(movieId);
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Impede scroll da página
  }

  close() {
    this.modal.classList.remove("active");
    document.body.style.overflow = ""; // Restaura scroll da página
  }

  loadMovieData(movieId) {
    // Simulação de dados - em um projeto real, isso viria de uma API
    const mockData = {
      title: "Jóias Brutas",
      year: "2019",
      genres: "Drama, Suspense",
      description:
        "Um joalheiro de Nova York tenta encontrar um jeito de pagar seus credores e fazer as pazes com sua família. Mas ele não resiste quando vê uma chance de faturar alto e acaba se envolvendo em uma espiral de riscos e dinheiro.",
      role: "Howard Ratner",
      image: "assets/uncutgems 2.jpg",
    };

    // Preencher o modal com os dados
    this.modal.querySelector(".modal-title").textContent = mockData.title;
    this.modal.querySelector(".modal-year").textContent = mockData.year;
    this.modal.querySelector(".modal-genres").textContent = mockData.genres;
    this.modal.querySelector(".modal-description").textContent =
      mockData.description;
    this.modal.querySelector(".modal-role span").textContent = mockData.role;
    this.modal.querySelector(".modal-banner").src = mockData.image;
    this.modal.querySelector(
      ".modal-banner"
    ).alt = `Banner de ${mockData.title}`;
  }
}

// Header scroll behavior
function handleHeaderScroll() {
  const header = document.querySelector(".header");
  const scrollThreshold = 50;

  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar modal
  const movieModal = new MovieModal();

  // Adicionar event listeners aos itens do carrossel
  const carouselItems = document.querySelectorAll(".carousel-item");
  carouselItems.forEach((item) => {
    item.addEventListener("click", () => {
      const movieId = item.getAttribute("data-id");
      movieModal.open(movieId);
    });

    // Também tornar os itens focáveis e acionáveis por teclado
    item.setAttribute("tabindex", "0");
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const movieId = item.getAttribute("data-id");
        movieModal.open(movieId);
      }
    });
  });

  // Configurar comportamento do header no scroll
  handleHeaderScroll();

  // Botões do hero section
  const playButton = document.querySelector(".btn-play");
  const infoButton = document.querySelector(".btn-more");

  if (playButton) {
    playButton.addEventListener("click", () => {
      alert("Funcionalidade de reprodução será implementada!");
    });
  }

  if (infoButton) {
    infoButton.addEventListener("click", () => {
      // Abre o modal com o filme em destaque (Jóias Brutas)
      movieModal.open("1");
    });
  }
});

// Menu mobile (se necessário no futuro)
function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }
}
