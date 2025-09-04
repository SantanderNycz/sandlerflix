// script.js - Solução definitiva para os problemas do modal

// ========== DADOS DOS FILMES ==========
const filmesData = [
  {
    id: 1,
    title: "Jóias Brutas",
    year: "2019",
    genres: "Drama, Suspense",
    description:
      "Um joalheiro de Nova York tenta encontrar um jeito de pagar seus credores e fazer as pazes com sua família. Mas ele não resiste quando vê uma chance de faturar alto e acaba se envolvendo em uma espiral de riscos e dinheiro.",
    role: "Howard Ratner",
    image: "assets/uncutgems 2.jpg",
    banner: "assets/uncutgems 2.jpg",
    rating: "4.5",
    duration: "2h 15m",
  },
  {
    id: 2,
    title: "Gente Grande",
    year: "2010",
    genres: "Comédia",
    description:
      "Após a morte do treinador de basquete da infância, cinco amigos de infância se reúnem para o funeral e decidem passar um fim de semana prolongado juntos com suas famílias.",
    role: "Lenny Feder",
    image: "assets/grownups.jpg",
    banner: "assets/grownups.jpg",
    rating: "3.8",
    duration: "1h 42m",
  },
  {
    id: 3,
    title: "Click",
    year: "2006",
    genres: "Comédia, Drama, Fantasia",
    description:
      "Um arquiteto sobrecarregado encontra um controle remoto universal que permite avançar rapidamente pelas partes chatas de sua vida. Mas logo descobre que não pode voltar atrás.",
    role: "Michael Newman",
    image: "assets/click.jpg",
    banner: "assets/click.jpg",
    rating: "4.1",
    duration: "1h 47m",
  },
  {
    id: 6,
    title: "Como Se Fosse a Primeira Vez",
    year: "2004",
    genres: "Comédia, Romance",
    description:
      "Um mulherengo que não acredita no amor se apaixona por uma mulher com amnésia de curto prazo que esquece tudo cada manhã ao acordar.",
    role: "Henry Roth",
    image: "assets/50 first dates.png",
    banner: "assets/50 first dates.png",
    rating: "4.3",
    duration: "1h 39m",
  },
  {
    id: 5,
    title: "O Paizão",
    year: "1999",
    genres: "Comédia",
    description:
      "Um preguiçoso que cria um filho para impressionar sua namorada acaba se apegando à criança e aprendendo sobre responsabilidade.",
    role: "Sonny Koufax",
    image: "assets/bigddaddy.png",
    banner: "assets/bigddaddy.png",
    rating: "4.0",
    duration: "1h 33m",
  },
  {
    id: 4,
    title: "Esposa de Mentirinha",
    year: "2011",
    genres: "Comédia, Romance",
    description:
      "Um cirurgião plástico convence sua assistente a fingir ser sua esposa para enganar sua jovem namorada, mas acaba se apaixonando por ela.",
    role: "Dr. Daniel 'Danny' Maccabee",
    image: "assets/justgowithit.jpg",
    banner: "assets/justgowithit.jpg",
    rating: "4.2",
    duration: "1h 56m",
  },
  {
    id: 7,
    title: "O Paizão",
    year: "2020",
    genres: "Comédia",
    description:
      "Um motorista de Uber nervoso e desajeitado se torna um herói improvável quando precisa salvar sua cidade no Dia das Bruxas.",
    role: "Hubie Dubois",
    image: "assets/hubie-halloween.jpg",
    banner: "assets/hubie-halloween-banner.jpg",
    rating: "3.9",
    duration: "1h 42m",
  },
  {
    id: 8,
    title: "Mistério no Mediterrâneo",
    year: "2019",
    genres: "Comédia, Mistério",
    description:
      "Um detetive de Nova York e sua esposa embarcam em uma viagem pela Europa para reacender a paixão em seu casamento, mas acabam envolvidos em um caso de assassinato.",
    role: "Detetive Nick Spitz",
    image: "assets/murder-mystery.jpg",
    banner: "assets/murder-mystery-banner.jpg",
    rating: "4.0",
    duration: "1h 37m",
  },
];

// ========== SISTEMA DE MODAL SIMPLIFICADO E FUNCIONAL ==========
function initMovieModal() {
  const modal = document.getElementById("movie-modal");
  if (!modal) {
    console.error("Modal não encontrado!");
    return null;
  }

  const closeButton = modal.querySelector(".modal-close");
  const modalTitle = modal.querySelector(".modal-title");
  const modalYear = modal.querySelector(".modal-year");
  const modalGenres = modal.querySelector(".modal-genres");
  const modalDescription = modal.querySelector(".modal-description");
  const modalRole = modal.querySelector(".modal-role span");
  const modalBanner = modal.querySelector(".modal-banner");
  const modalMeta = modal.querySelector(".modal-meta");

  // Fechar modal
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Configurar event listeners para fechar
  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Função para abrir o modal - VERSÃO CORRIGIDA
  function openModal(movieId) {
    const id = parseInt(movieId);
    console.log("Tentando abrir modal para o ID:", id);

    const movieData = filmesData.find((movie) => movie.id === id);

    if (!movieData) {
      console.error("Filme não encontrado para o ID:", id);
      // Usar o primeiro filme como fallback
      openModal(1);
      return;
    }

    console.log("Dados do filme encontrado:", movieData.title);

    // Preencher o modal com os dados do filme
    modalTitle.textContent = movieData.title;
    modalYear.textContent = movieData.year;
    modalGenres.textContent = movieData.genres;
    modalDescription.textContent = movieData.description;
    modalRole.textContent = movieData.role;

    // SOLUÇÃO DEFINITIVA PARA O BANNER:
    // 1. Primeiro garantir que temos um placeholder
    // 2. Depois tentar carregar a imagem

    // Configurar placeholder primeiro
    modalBanner.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23222'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23fff'%3ECarregando...%3C/text%3E%3C/svg%3E";
    modalBanner.alt = `Banner de ${movieData.title}`;

    // Tentar carregar a imagem
    const img = new Image();
    img.onload = function () {
      console.log(
        "Imagem carregada com sucesso:",
        movieData.banner || movieData.image
      );
      modalBanner.src = movieData.banner || movieData.image;
    };
    img.onerror = function () {
      console.error(
        "Erro ao carregar imagem:",
        movieData.banner || movieData.image
      );
      // Manter o placeholder se der erro
    };
    img.src = movieData.banner || movieData.image;

    // Limpar informações anteriores
    clearAdditionalInfo();

    // Adicionar informações extras
    if (movieData.rating) {
      addRatingInfo(movieData.rating);
    }

    if (movieData.duration) {
      addDurationInfo(movieData.duration);
    }

    // Abrir modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function clearAdditionalInfo() {
    const oldRating = modalMeta.querySelector(".modal-rating");
    const oldDuration = modalMeta.querySelector(".modal-duration");
    if (oldRating) oldRating.remove();
    if (oldDuration) oldDuration.remove();
  }

  function addRatingInfo(rating) {
    const ratingElement = document.createElement("span");
    ratingElement.className = "modal-rating";
    ratingElement.innerHTML = `<i class="fas fa-star"></i> ${rating}`;
    modalMeta.appendChild(ratingElement);
  }

  function addDurationInfo(duration) {
    const durationElement = document.createElement("span");
    durationElement.className = "modal-duration";
    durationElement.innerHTML = `<i class="fas fa-clock"></i> ${duration}`;
    modalMeta.appendChild(durationElement);
  }

  return {
    open: openModal,
    close: closeModal,
  };
}

// ========== CONFIGURAÇÃO DOS CARDS ==========
function setupCarouselItems(movieModal) {
  const carouselItems = document.querySelectorAll(".carousel-item");

  console.log(`Encontrados ${carouselItems.length} itens do carrossel`);

  carouselItems.forEach((item, index) => {
    let movieId = item.getAttribute("data-id");

    // Se não tem data-id, tentar encontrar de outra forma
    if (!movieId) {
      // Tentar encontrar pelo índice ou outro atributo
      movieId = index + 1; // IDs começando em 1
      item.setAttribute("data-id", movieId);
      console.warn(`Item sem data-id, atribuído ID: ${movieId}`);
    }

    // Remover event listeners antigos
    const newItem = item.cloneNode(true);
    item.parentNode.replaceChild(newItem, item);

    // Adicionar evento de clique
    newItem.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      console.log("Clicado no card com ID:", id);
      movieModal.open(id);
    });

    // Tornar acessível por teclado
    newItem.setAttribute("tabindex", "0");
    newItem.setAttribute("role", "button");
    newItem.setAttribute("aria-label", "Ver detalhes do filme");

    newItem.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const id = newItem.getAttribute("data-id");
        movieModal.open(id);
      }
    });

    // Feedback visual
    newItem.style.cursor = "pointer";
    newItem.style.transition = "transform 0.2s ease";

    newItem.addEventListener("mouseenter", () => {
      newItem.style.transform = "scale(1.05)";
    });

    newItem.addEventListener("mouseleave", () => {
      newItem.style.transform = "scale(1)";
    });
  });
}

// ========== OUTRAS FUNÇÕES ==========
function handleHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  const scrollThreshold = 50;

  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function setupHeroButtons(movieModal) {
  const playButton = document.querySelector(".btn-play");
  const infoButton = document.querySelector(".btn-more");

  if (playButton) {
    playButton.addEventListener("click", () => {
      alert("Funcionalidade de reprodução será implementada!");
    });
  }

  if (infoButton) {
    infoButton.addEventListener("click", () => {
      movieModal.open("1"); // Abre o primeiro filme (Jóias Brutas)
    });
  }
}

function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM carregado, inicializando...");

  // Inicializar modal
  const movieModal = initMovieModal();

  if (!movieModal) {
    console.error("Falha crítica: não foi possível inicializar o modal");
    return;
  }

  // Configurar itens do carrossel
  setupCarouselItems(movieModal);

  // Configurar comportamento do header no scroll
  handleHeaderScroll();

  // Configurar botões da seção hero
  setupHeroButtons(movieModal);

  // Configurar menu mobile
  setupMobileMenu();

  console.log("Inicialização concluída com sucesso!");
});

// Função global para debug
window.debugModal = function (movieId = 1) {
  const movieModal = initMovieModal();
  if (movieModal) {
    movieModal.open(movieId.toString());
  }
};
