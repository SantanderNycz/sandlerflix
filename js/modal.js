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

  // ===== FECHAR =====
  function closeMovieModal() {
    modal.classList.remove("active");
    modal.classList.add("closing");

    setTimeout(() => {
      modal.classList.remove("closing");
      document.body.style.overflow = "";

      // Para o trailer se estiver a tocar
      const trailer = modal.querySelector(".modal-trailer");
      if (trailer) trailer.remove();
    }, 350);
  }

  // ===== ABRIR =====
  function openMovieModal(filme) {
    if (!filme) {
      console.warn("Filme inválido ou indefinido.");
      return;
    }

    modalTitle.textContent = filme.title;
    modalDescription.textContent = filme.description;
    if (modalRole) modalRole.textContent = filme.role;
    modalYear.textContent = filme.year;
    modalGenres.textContent = filme.genres;

    // Banner com placeholder
    modalBanner.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='%23222'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23555'%3ECarregando...%3C/text%3E%3C/svg%3E`;
    modalBanner.alt = `Banner de ${filme.title}`;
    modalBanner.classList.remove("loaded");

    const img = new Image();
    img.onload = () => {
      modalBanner.src = filme.banner || filme.image;
      modalBanner.classList.add("loaded");
    };
    img.onerror = () =>
      console.warn("Erro ao carregar imagem", filme.banner || filme.image);
    img.src = filme.banner || filme.image;

    // Limpar metas antigas
    modal
      .querySelectorAll(".modal-rating, .modal-duration")
      .forEach((el) => el.remove());

    if (filme.rating) {
      const el = document.createElement("span");
      el.className = "modal-rating";
      el.innerHTML = `<i class="fas fa-star"></i> ${filme.rating}`;
      modalMeta.appendChild(el);
    }

    if (filme.duration) {
      const el = document.createElement("span");
      el.className = "modal-duration";
      el.innerHTML = `<i class="fas fa-clock"></i> ${filme.duration}`;
      modalMeta.appendChild(el);
    }

    // Trailer inline no banner ao hover
    if (filme.link) {
      modalBanner.style.cursor = "pointer";
      modalBanner.title = "Clique para ver o trailer";

      modalBanner.onclick = () => {
        // Evitar duplicar
        if (modal.querySelector(".modal-trailer")) return;

        const trailerWrapper = document.createElement("div");
        trailerWrapper.classList.add("modal-trailer");

        let embedUrl = filme.link;
        if (filme.link.includes("watch?v=")) {
          const videoId = new URL(filme.link).searchParams.get("v");
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (filme.link.includes("youtu.be/")) {
          const videoId = filme.link.split("youtu.be/")[1].split("?")[0];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }

        const autoplay = embedUrl.includes("?")
          ? embedUrl + "&autoplay=1"
          : embedUrl + "?autoplay=1";

        trailerWrapper.innerHTML = `
          <button class="modal-trailer-close" aria-label="Fechar trailer">
            <i class="fas fa-times"></i>
          </button>
          <iframe
            src="${autoplay}"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        `;

        modalBanner.parentElement.appendChild(trailerWrapper);

        // Fechar trailer inline
        trailerWrapper
          .querySelector(".modal-trailer-close")
          .addEventListener("click", () => {
            trailerWrapper.remove();
          });
      };
    } else {
      modalBanner.style.cursor = "default";
      modalBanner.onclick = null;
    }

    modal.classList.remove("closing");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Eventos de fecho
  closeBtn.addEventListener("click", closeMovieModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeMovieModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active"))
      closeMovieModal();
  });

  window.movieModal = {
    open: openMovieModal,
    close: closeMovieModal,
  };

  console.log("Modal configurado com sucesso!");
});
