// Inicializa comportamentos do carrossel: botões, scroll por roda, arrastar, "abas" laterais e atualização de setas.
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

    // variáveis de layout que serão recalculadas
    let itemWidth = 0;
    let gap = 0;
    let visibleItems = 1;
    let scrollItems = 1;
    let scrollAmount = 300; // fallback

    function calcSizes() {
      const first = container.querySelector(".carousel-item");
      const cs = getComputedStyle(container);
      // pega gap (fallback 0)
      gap = parseFloat(cs.gap || cs.columnGap || 0) || 0;

      if (first) {
        const r = first.getBoundingClientRect();
        itemWidth = Math.round(r.width + gap);
      } else {
        itemWidth = Math.round(container.clientWidth * 0.25);
      }

      visibleItems = Math.max(1, Math.floor(container.clientWidth / itemWidth));
      // scroll menos que a tela inteira para não "pular demais" (ajusta para -1)
      scrollItems = Math.max(1, visibleItems - 1);
      scrollAmount = Math.round(scrollItems * itemWidth);
    }

    // Recalcula em resize e depois que as imagens carregarem
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        calcSizes();
        updateArrows();
      }, 120);
    });

    window.addEventListener("load", () => {
      calcSizes();
      updateArrows();
    });

    // Calcula logo de início também
    calcSizes();

    // Botões (com optional chaining para evitar erros)
    rightBtn?.addEventListener("click", () => {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    leftBtn?.addEventListener("click", () => {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    // roda do mouse: vertical -> horizontal
    container.addEventListener(
      "wheel",
      (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          container.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      },
      { passive: false }
    );

    // Drag para deslizar (pointer events)
    let isDragging = false;
    let startX = 0;
    let startScroll = 0;

    container.addEventListener("pointerdown", (e) => {
      isDragging = true;
      startX = e.clientX;
      startScroll = container.scrollLeft;
      container.classList.add("is-dragging");
      container.setPointerCapture?.(e.pointerId);
    });

    container.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      container.scrollLeft = startScroll - dx;
    });

    container.addEventListener("pointerup", (e) => {
      isDragging = false;
      container.classList.remove("is-dragging");
      container.releasePointerCapture?.(e.pointerId);
    });

    container.addEventListener("pointercancel", () => {
      isDragging = false;
      container.classList.remove("is-dragging");
    });

    // Aba lateral (hover) e clique nela para avançar
    carousel.addEventListener("mousemove", (e) => {
      const rect = carousel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const leftZone = rect.width * 0.12;
      const rightZone = rect.width * 0.88;

      if (e.target.closest(".carousel-control")) {
        carousel.dataset.edge = "";
        carousel.style.cursor = "default";
        return;
      }

      if (x < leftZone) {
        carousel.dataset.edge = "left";
        carousel.style.cursor = "w-resize";
      } else if (x > rightZone) {
        carousel.dataset.edge = "right";
        carousel.style.cursor = "e-resize";
      } else {
        carousel.dataset.edge = "";
        carousel.style.cursor = "default";
      }
    });

    carousel.addEventListener("mouseleave", () => {
      carousel.dataset.edge = "";
      carousel.style.cursor = "default";
    });

    carousel.addEventListener("click", (e) => {
      if (e.target.closest(".carousel-control")) return;
      const edge = carousel.dataset.edge;
      if (edge === "left")
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      if (edge === "right")
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    // Atualiza estado das setas
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

    container.addEventListener(
      "scroll",
      () => {
        // atualiza sem pesado
        window.requestAnimationFrame(updateArrows);
      },
      { passive: true }
    );

    // calcula novamente se elementos mudarem (útil se preenchimento dinâmico)
    const mo = new MutationObserver(() => {
      calcSizes();
      updateArrows();
    });
    mo.observe(container, { childList: true, subtree: true });

    // initial update
    updateArrows();
  });
}
