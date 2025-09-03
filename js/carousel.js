function initCarousels() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const container = carousel.querySelector(".carousel-container");
    const prevBtn = carousel.querySelector(".carousel-control.left");
    const nextBtn = carousel.querySelector(".carousel-control.right");

    if (!container) return;

    container.style.overflow = "hidden";

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
    track.style.gap = "8px";
    track.style.willChange = "transform";
    track.style.transition =
      "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

    let items = Array.from(track.children).filter((n) => n.nodeType === 1);
    let itemWidth = 0;
    const gap = 8; // Gap fixo para cálculos mais precisos
    let visibleItems = 1;
    let scrollItems = 1;
    let maxIndex = 0;
    let index = 0;

    function calcSizes() {
      items = Array.from(track.children).filter((n) => n.nodeType === 1);

      if (items.length === 0) return;

      const first = items[0];
      if (first) {
        const rect = first.getBoundingClientRect();
        itemWidth = rect.width;
      } else {
        itemWidth = Math.round((container.clientWidth - 5 * gap) / 6);
      }

      const containerWidth = container.clientWidth;
      visibleItems = Math.floor((containerWidth + gap) / (itemWidth + gap));
      visibleItems = Math.max(1, Math.min(visibleItems, items.length));

      scrollItems = Math.max(1, Math.min(2, visibleItems - 1));

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

      console.log("[v0] Carousel position updated:", {
        index,
        itemWidth,
        gap,
        translateX: x,
      });
    }

    function updateButtons() {
      if (prevBtn) {
        const isDisabled = index === 0;
        prevBtn.classList.toggle("disabled", isDisabled);
        prevBtn.style.opacity = isDisabled ? "0.3" : "1";
        prevBtn.disabled = isDisabled;
      }
      if (nextBtn) {
        const isDisabled = index >= maxIndex;
        nextBtn.classList.toggle("disabled", isDisabled);
        nextBtn.style.opacity = isDisabled ? "0.3" : "1";
        nextBtn.disabled = isDisabled;
      }

      console.log("[v0] Buttons updated:", {
        index,
        maxIndex,
        canGoPrev: index > 0,
        canGoNext: index < maxIndex,
      });
    }

    let isAnimating = false;

    nextBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isAnimating || index >= maxIndex) {
        console.log("[v0] Next button blocked:", {
          isAnimating,
          index,
          maxIndex,
        });
        return;
      }

      isAnimating = true;
      const newIndex = clamp(index + scrollItems, 0, maxIndex);
      console.log("[v0] Moving next:", { from: index, to: newIndex });

      index = newIndex;
      updatePosition();
      updateButtons();

      setTimeout(() => {
        isAnimating = false;
      }, 500);
    });

    prevBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isAnimating || index === 0) {
        console.log("[v0] Prev button blocked:", { isAnimating, index });
        return;
      }

      isAnimating = true;
      const newIndex = clamp(index - scrollItems, 0, maxIndex);
      console.log("[v0] Moving prev:", { from: index, to: newIndex });

      index = newIndex;
      updatePosition();
      updateButtons();

      setTimeout(() => {
        isAnimating = false;
      }, 500);
    });

    const ro = new ResizeObserver(() => {
      setTimeout(() => {
        console.log("[v0] Resize detected, recalculating...");
        calcSizes();
      }, 100);
    });
    ro.observe(container);

    const mo = new MutationObserver(() => {
      setTimeout(() => {
        console.log("[v0] DOM mutation detected, recalculating...");
        calcSizes();
      }, 50);
    });
    mo.observe(track, { childList: true });

    console.log("[v0] Initializing carousel:", { itemsCount: items.length });
    calcSizes();

    setTimeout(() => {
      updateButtons();
      console.log("[v0] Carousel initialized successfully");
    }, 100);
  });
}
