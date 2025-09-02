// Carrossel por scroll horizontal + setas + "abas" laterais
function initCarousels() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const container = carousel.querySelector(".carousel-container");
    const leftBtn = carousel.querySelector(".carousel-control.left");
    const rightBtn = carousel.querySelector(".carousel-control.right");

    if (!container) {
      console.warn("[carousel] .carousel-container não encontrado", carousel);
      return;
    }

    const getScrollAmount = () => Math.round(container.clientWidth * 0.9);

    // --- Ações dos botões ---
    rightBtn?.addEventListener("click", () => {
      container.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });

    leftBtn?.addEventListener("click", () => {
      container.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });

    // --- Scroll com roda do mouse (vertical -> horizontal) ---
    container.addEventListener(
      "wheel",
      (e) => {
        // Se o usuário está rolando mais vertical que horizontal, converte para X
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          container.scrollBy({ left: e.deltaY, behavior: "auto" });
          e.preventDefault();
        }
      },
      { passive: false }
    );

    // --- "Abas" laterais via hover + click no desktop ---
    carousel.addEventListener("mousemove", (e) => {
      const { left, width } = carousel.getBoundingClientRect();
      const x = e.clientX - left;
      const inLeft = x < width * 0.12;
      const inRight = x > width * 0.88;

      // Cursor só no corpo do carrossel, não nos botões
      if (e.target.closest(".carousel-control")) {
        carousel.style.cursor = "pointer";
        carousel.dataset.edge = "";
        return;
      }

      if (inLeft) {
        carousel.style.cursor = "w-resize";
        carousel.dataset.edge = "left";
      } else if (inRight) {
        carousel.style.cursor = "e-resize";
        carousel.dataset.edge = "right";
      } else {
        carousel.style.cursor = "default";
        carousel.dataset.edge = "";
      }
    });

    carousel.addEventListener("click", (e) => {
      // Não disparar se clicou no botão
      if (e.target.closest(".carousel-control")) return;

      const edge = carousel.dataset.edge;
      if (edge === "left") {
        container.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
      } else if (edge === "right") {
        container.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
      }
    });

    // --- Estado visual das setas (desabilitar no início/fim) ---
    function updateArrows() {
      if (!leftBtn || !rightBtn) return;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const atStart = container.scrollLeft <= 0;
      const atEnd = container.scrollLeft >= maxScroll - 1;

      leftBtn.classList.toggle("disabled", atStart);
      rightBtn.classList.toggle("disabled", atEnd);
      leftBtn.setAttribute("aria-disabled", atStart);
      rightBtn.setAttribute("aria-disabled", atEnd);
    }

    container.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    updateArrows(); // inicial
  });
}
