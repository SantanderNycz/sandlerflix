document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("movie-modal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".modal-close");

  function closeMovieModal() {
    modal.classList.remove("active");
    modal.classList.add("closing");

    setTimeout(() => {
      modal.classList.remove("closing");
      document.body.style.overflow = "";

      const trailer = modal.querySelector(".modal-trailer-iframe");
      if (trailer) trailer.src = "";
    }, 350);
  }

  function openMovieModal(filme) {
    if (!filme) return;

    // Fundo desfocado
    const bgBlur = modal.querySelector(".modal-bg-blur");
    bgBlur.style.backgroundImage = `url('${filme.banner || filme.image}')`;

    // Trailer
    const trailer = modal.querySelector(".modal-trailer-iframe");
    if (filme.link) {
      let embedUrl = filme.link;
      if (filme.link.includes("watch?v=")) {
        const videoId = new URL(filme.link).searchParams.get("v");
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (filme.link.includes("youtu.be/")) {
        const videoId = filme.link.split("youtu.be/")[1].split("?")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
      trailer.src = embedUrl;
    } else {
      trailer.src = "";
    }

    // Título e descrição
    modal.querySelector(".modal-detail-title").textContent = filme.title;
    modal.querySelector(".modal-detail-description").textContent =
      filme.description;

    // Detalhes
    modal.querySelector(".modal-info-rating").textContent =
      filme.rating || "N/A";
    modal.querySelector(".modal-info-duration").textContent =
      filme.duration || "N/A";
    modal.querySelector(".modal-info-year").textContent = filme.year || "N/A";
    modal.querySelector(".modal-info-role").textContent = filme.role || "N/A";

    // Géneros como tags
    const genresEl = modal.querySelector(".modal-info-genres");
    genresEl.innerHTML = "";
    if (filme.genres) {
      filme.genres.split(",").forEach((g) => {
        const tag = document.createElement("span");
        tag.classList.add("genre-tag");
        tag.textContent = g.trim();
        genresEl.appendChild(tag);
      });
    }

    // Poster
    const poster = modal.querySelector(".modal-detail-poster img");
    poster.src = filme.image;
    poster.alt = filme.title;

    modal.classList.remove("closing");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeBtn.addEventListener("click", closeMovieModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeMovieModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active"))
      closeMovieModal();
  });

  window.movieModal = { open: openMovieModal, close: closeMovieModal };
  console.log("Modal configurado com sucesso!");
});
