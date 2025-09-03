// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Load movie data from JSON file
  loadMovieData();

  // Initialize header scroll effect
  initHeaderScroll();

  // Initialize carousels (definida em carousel.js)
  initCarousels();

  // Initialize movie modal
  initMovieModal();

  // Initialize mobile menu
  initMobileMenu();
});

// Global variable to store movie data
let moviesData = [];

// Load movie data from JSON file
function loadMovieData() {
  fetch("../data/adam_sandler_filmes.json")
    .then((response) => response.json())
    .then((data) => {
      moviesData = data.filmes;
      populateCarousels();
    })
    .catch((error) => {
      console.error("Erro ao carregar dados dos filmes:", error);
      // Use placeholder data if fetch fails
      usePlaceholderData();
    });
}

function usePlaceholderData() {
  moviesData = [
    {
      titulo: "Uncut Gems",
      ano: 2019,
      papel: "Howard Ratner",
      genero: ["Drama", "Suspense", "Crime"],
      sinopse:
        "Um joalheiro carismático faz uma aposta de alto risco que pode levar à vida dos seus sonhos.",
    },
    {
      titulo: "Happy Gilmore",
      ano: 1996,
      papel: "Happy Gilmore",
      genero: ["Comédia", "Esporte"],
      sinopse:
        "Um jogador de hóquei fracassado descobre seu talento para o golfe.",
    },
    {
      titulo: "Big Daddy",
      ano: 1999,
      papel: "Sonny Koufax",
      genero: ["Comédia", "Drama"],
      sinopse: "Um homem adota uma criança para impressionar sua namorada.",
    },
  ];
  populateCarousels();
}

// Initialize header scroll effect
function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Populate carousels with movie data (attaches listeners aos itens existentes no HTML)
function populateCarousels() {
  const carouselItems = document.querySelectorAll(".carousel-item");

  carouselItems.forEach((item) => {
    item.addEventListener("click", function () {
      const movieId = this.querySelector("img")?.getAttribute("data-id");
      if (movieId) openMovieModal(movieId);
    });
  });
}

// Initialize movie modal
function initMovieModal() {
  const modal = document.getElementById("movie-modal");
  if (!modal) return;
  const closeBtn = modal.querySelector(".modal-close");

  closeBtn?.addEventListener("click", function () {
    closeMovieModal();
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeMovieModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeMovieModal();
    }
  });
}

function openMovieModal(movieId) {
  const modal = document.getElementById("movie-modal");
  if (!modal) return;
  const movieData = getMovieById(movieId);

  if (movieData) {
    modal.querySelector(".modal-title").textContent = movieData.titulo;
    modal.querySelector(".modal-year").textContent = movieData.ano;
    modal.querySelector(".modal-genres").textContent =
      movieData.genero.join(", ");
    modal.querySelector(".modal-description").textContent =
      movieData.sinopse || "Descrição não disponível.";
    modal.querySelector(".modal-role span").textContent = movieData.papel;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeMovieModal() {
  const modal = document.getElementById("movie-modal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function getMovieById(id) {
  // TODO: linkar com moviesData se quiseres.
  return {
    titulo: "Uncut Gems",
    ano: 2019,
    papel: "Howard Ratner",
    genero: ["Drama", "Suspense", "Crime"],
    sinopse:
      "Um joalheiro carismático faz uma aposta de alto risco que pode levar à vida dos seus sonhos, mas ele deve equilibrar negócios, família e inimigos em uma busca implacável pelo grande prêmio.",
  };
}

// Initialize mobile menu
function initMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");
  menuBtn?.addEventListener("click", function () {
    mainNav?.classList.toggle("active");
  });
}
