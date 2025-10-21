// Solução de emergência para o modal
document.addEventListener("DOMContentLoaded", function () {
  // Função simples para abrir modal
  function openMovieModal(movieId) {
    const modal = document.getElementById("movie-modal");
    if (!modal) return;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Fechar modal
  function setupModalClose() {
    const modal = document.getElementById("movie-modal");
    const closeBtn = modal.querySelector(".modal-close");

    closeBtn.addEventListener("click", function () {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    });

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Configurar cliques nos itens do carrossel
  document.querySelectorAll(".carousel-item").forEach(function (item) {
    const movieId = item.getAttribute("data-id");
    if (movieId) {
      item.addEventListener("click", function () {
        openMovieModal(movieId);
      });
    }
  });

  // Configurar botão "Mais Informações"
  const infoBtn = document.querySelector(".btn-more");
  if (infoBtn) {
    infoBtn.addEventListener("click", function () {
      openMovieModal("1"); // ID do filme em destaque
    });
  }

  // Configurar fechamento do modal
  setupModalClose();

  console.log("Solução de emergência para modal carregada");
});
