// modal.js
import { filmesData } from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("movie-modal");
  if (!modal) return;

  const modalTitle = modal.querySelector(".modal-title");
  const modalDescription = modal.querySelector(".modal-description");
  const modalRole = modal.querySelector(".modal-role span");
  const modalYear = modal.querySelector(".modal-year");
  const modalGenres = modal.querySelector(".modal-genres");
  const modalBanner = modal.querySelector(".modal-banner");
  const modalMeta = modal.querySelector(".modal-meta");
  const closeBtn = modal.querySelector(".modal-close");

  function closeMovieModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openMovieModal(filme) {
    if (!filme) return;

    modalTitle.textContent = filme.title;
    modalDescription.textContent = filme.description;
    modalRole.textContent = filme.role;
    modalYear.textContent = filme.year;
    modalGenres.textContent = filme.genres;

    // Placeholder inicial
    modalBanner.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='%23222'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23fff'%3ECarregando...%3C/text%3E%3C/svg%3E";
    modalBanner.alt = `Banner de ${filme.title}`;

    // Tenta carregar a imagem real
    const img = new Image();
    img.onload = () => (modalBanner.src = filme.banner || filme.image);
    img.onerror = () =>
      console.warn("Erro ao carregar imagem", filme.banner || filme.image);
    img.src = filme.banner || filme.image;

    // Limpar informações antigas
    const oldRating = modalMeta.querySelector(".modal-rating");
    const oldDuration = modalMeta.querySelector(".modal-duration");
    if (oldRating) oldRating.remove();
    if (oldDuration) oldDuration.remove();

    // Adicionar informações extras
    if (filme.rating) {
      const ratingElement = document.createElement("span");
      ratingElement.className = "modal-rating";
      ratingElement.innerHTML = `<i class="fas fa-star"></i> ${filme.rating}`;
      modalMeta.appendChild(ratingElement);
    }

    if (filme.duration) {
      const durationElement = document.createElement("span");
      durationElement.className = "modal-duration";
      durationElement.innerHTML = `<i class="fas fa-clock"></i> ${filme.duration}`;
      modalMeta.appendChild(durationElement);
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Eventos de fechamento
  closeBtn.addEventListener("click", closeMovieModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeMovieModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active"))
      closeMovieModal();
  });

  // Botão "Mais Informações" do destaque
  const infoBtn = document.querySelector(".btn-more");
  if (infoBtn) {
    infoBtn.addEventListener("click", () => {
      const destaque = filmesData.find((f) => f.destaque);
      if (destaque) openMovieModal(destaque);
    });
  }

  window.movieModal = { open: openMovieModal, close: closeMovieModal };
  console.log("Modal configurado com sucesso!");
});
