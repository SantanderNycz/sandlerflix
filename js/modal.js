// modal.js
import { filmesData } from "./script.js"; // Se você tiver um arquivo separado com o JSON

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("movie-modal");
  const modalTitle = modal.querySelector(".modal-title");
  const modalDescription = modal.querySelector(".modal-description");
  const modalRole = modal.querySelector(".modal-role span");
  const modalYear = modal.querySelector(".modal-year");
  const modalGenres = modal.querySelector(".modal-genres");
  const modalBanner = modal.querySelector(".modal-banner");
  const closeBtn = modal.querySelector(".modal-close");

  // Função para abrir o modal com os dados do filme
  function openMovieModal(movieId) {
    const id = parseInt(movieId);
    const filme = filmesData.find((f) => f.id === id);
    if (!filme) return;

    modalTitle.textContent = filme.title;
    modalDescription.textContent = filme.description;
    modalRole.textContent = filme.role;
    modalYear.textContent = filme.year;
    modalGenres.textContent = filme.genres;
    modalBanner.src = filme.image;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Função para fechar o modal
  function closeMovieModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Configura o clique no botão de fechar
  closeBtn.addEventListener("click", closeMovieModal);

  // Fechar modal ao clicar fora do conteúdo
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeMovieModal();
  });

  // Fechar modal com Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeMovieModal();
    }
  });

  // Configura os cliques nos itens do carrossel
  document.querySelectorAll(".carousel-item img").forEach((img) => {
    const movieId = img.getAttribute("data-id");
    if (movieId) {
      img.addEventListener("click", () => openMovieModal(movieId));
    }
  });

  // Botão "Mais Informações" do destaque (herói)
  const infoBtn = document.querySelector(".btn-more");
  if (infoBtn) {
    infoBtn.addEventListener("click", () => {
      const destaque = filmesData.find((f) => f.destaque);
      if (destaque) openMovieModal(destaque.id);
    });
  }

  console.log("Modal configurado com sucesso!");
});
