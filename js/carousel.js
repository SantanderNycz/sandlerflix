function initCarousels() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const container = carousel.querySelector(".carousel-container");
    const prevBtn = carousel.querySelector(".carousel-control.left");
    const nextBtn = carousel.querySelector(".carousel-control.right");

    if (!container) return;

    // Garante que o container não permita scroll nativo
    container.style.overflow = "hidden";

    // Cria (se necessário) um track interno para aplicar transform
    let track = container.querySelector(".carousel-track");
    if (!track) {
      track = document.createElement("div");
      track.className = "carousel-track";

      // Move os itens para dentro do track
      while (container.firstChild) {
        track.appendChild(container.firstChild);
      }
      container.appendChild(track);
    }

    track.style.display = "flex";
    track.style.willChange = "transform";
    track.style.transition =
      "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

    let items = Array.from(track.children).filter((n) => n.nodeType === 1);
    let itemWidth = 0;
    let gap = 0;
    let visibleItems = 1;
    let scrollItems = 1;
    let maxIndex = 0;
    let index = 0;

    function readGap() {
      const cs = getComputedStyle(track);
      const parsed = Number.parseFloat(cs.gap || cs.columnGap || "8") || 8;
      gap = parsed;
    }

    function calcSizes() {
      items = Array.from(track.children).filter((n) => n.nodeType === 1);
      readGap();

      const first = items[0];
      if (first) {
        const rect = first.getBoundingClientRect();
        itemWidth = rect.width;
      } else {
        itemWidth = Math.round(container.clientWidth / 4);
      }

      const containerWidth = container.clientWidth;
      visibleItems = Math.floor(containerWidth / (itemWidth + gap));

      scrollItems = Math.max(1, Math.min(3, visibleItems));

      maxIndex = Math.max(0, items.length - visibleItems);

      // Garante que o índice não ultrapasse o máximo
      if (index > maxIndex) {
        index = maxIndex;
      }

      updatePosition();
      updateButtons();
    }

    function clamp(v, a, b) {
      return Math.max(a, Math.min(b, v));
    }

    function updatePosition() {
      const x = index * (itemWidth + gap);
      track.style.transform = `translateX(-${x}px)`;
    }

    function updateButtons() {
      if (prevBtn) {
        prevBtn.classList.toggle("disabled", index === 0);
        prevBtn.style.opacity = index === 0 ? "0.3" : "1";
      }
      if (nextBtn) {
        nextBtn.classList.toggle("disabled", index >= maxIndex);
        nextBtn.style.opacity = index >= maxIndex ? "0.3" : "1";
      }
    }

    let isAnimating = false;

    nextBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      if (isAnimating || index >= maxIndex) return;

      isAnimating = true;
      index = clamp(index + scrollItems, 0, maxIndex);
      updatePosition();
      updateButtons();

      setTimeout(() => {
        isAnimating = false;
      }, 500);
    });

    prevBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      if (isAnimating || index === 0) return;

      isAnimating = true;
      index = clamp(index - scrollItems, 0, maxIndex);
      updatePosition();
      updateButtons();

      setTimeout(() => {
        isAnimating = false;
      }, 500);
    });

    carousel.addEventListener("click", (e) => {
      if (e.target.closest(".carousel-control") || isAnimating) return;

      const rect = carousel.getBoundingClientRect();
      const x = e.clientX - rect.left;

      if (x < rect.width * 0.15 && index > 0) {
        isAnimating = true;
        index = clamp(index - scrollItems, 0, maxIndex);
        updatePosition();
        updateButtons();
        setTimeout(() => {
          isAnimating = false;
        }, 500);
      } else if (x > rect.width * 0.85 && index < maxIndex) {
        isAnimating = true;
        index = clamp(index + scrollItems, 0, maxIndex);
        updatePosition();
        updateButtons();
        setTimeout(() => {
          isAnimating = false;
        }, 500);
      }
    });

    const ro = new ResizeObserver(() => {
      setTimeout(calcSizes, 100); // Debounce para evitar cálculos excessivos
    });
    ro.observe(container);

    const mo = new MutationObserver(() => {
      setTimeout(calcSizes, 50);
    });
    mo.observe(track, { childList: true });

    // Inicializa
    calcSizes();

    setTimeout(updateButtons, 100);
  });
}
