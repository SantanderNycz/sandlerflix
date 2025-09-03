// Mantém o resto do teu comportamento e chama initCarousels (definida em carousel.js)

document.addEventListener("DOMContentLoaded", function () {
  loadMovieData();
  initHeaderScroll();
  initCarousels(); // função importada de js/carousel.js
  initMovieModal();
  initMobileMenu();
});

let moviesData = [];

function loadMovieData() {
  fetch("../data/adam_sandler_filmes.json")
    .then((r) => r.json())
    .then((data) => {
      moviesData = data.filmes;
      populateCarousels();
    })
    .catch((err) => {
      console.error("Erro ao carregar dados dos filmes:", err);
      usePlaceholderData();
    });
}

function usePlaceholderData() {
  moviesData = [
    {
      titulo: "Uncut Gems",
      ano: 2019,
      papel: "Howard Ratner",
      genero: ["Drama"],
      sinopse: "...",
    },
    {
      titulo: "Happy Gilmore",
      ano: 1996,
      papel: "Happy Gilmore",
      genero: ["Comédia"],
      sinopse: "...",
    },
  ];
  populateCarousels();
}

function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
}

function populateCarousels() {
  const items = document.querySelectorAll(".carousel-item");
  items.forEach((item) => {
    item.addEventListener("click", function () {
      const id = this.querySelector("img")?.getAttribute("data-id");
      if (id) openMovieModal(id);
    });
  });
}

function initMovieModal() {
  const modal = document.getElementById("movie-modal");
  if (!modal) return;
  const closeBtn = modal.querySelector(".modal-close");
  closeBtn?.addEventListener("click", closeMovieModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeMovieModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active"))
      closeMovieModal();
  });
}

function openMovieModal(movieId) {
  const modal = document.getElementById("movie-modal");
  if (!modal) return;
  const movie = getMovieById(movieId);
  if (!movie) return;
  modal.querySelector(".modal-title").textContent = movie.titulo;
  modal.querySelector(".modal-year").textContent = movie.ano;
  modal.querySelector(".modal-genres").textContent = movie.genero.join(", ");
  modal.querySelector(".modal-description").textContent =
    movie.sinopse || "Descrição não disponível.";
  modal.querySelector(".modal-role span").textContent = movie.papel || "";
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMovieModal() {
  const modal = document.getElementById("movie-modal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function getMovieById(id) {
  // Se mais tarde quiseres mapear com moviesData, faz aqui a busca
  return (
    moviesData.find((m) => String(m.id) === String(id)) ||
    moviesData[0] || {
      titulo: "Sem título",
      ano: "-",
      genero: [],
      sinopse: "",
      papel: "",
    }
  );
}

function initMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");
  menuBtn?.addEventListener("click", () => mainNav?.classList.toggle("active"));
}
