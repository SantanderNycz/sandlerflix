// Carrossel por translateX (clique nas setas movimenta; não cria scroll horizontal nativo)
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

    // estilos do track (pode ser feito por CSS também)
    track.style.display = "flex";
    track.style.willChange = "transform";
    track.style.transition = "transform 420ms cubic-bezier(.22,.9,.35,1)";

    let items = Array.from(track.children).filter((n) => n.nodeType === 1);
    let itemWidth = 0;
    let gap = 0;
    let visibleItems = 1;
    let scrollItems = 1;
    let maxIndex = 0;
    let index = 0;

    function readGap() {
      // tenta pegar gap via CSS (fallback 0)
      const cs = getComputedStyle(container);
      const parsed = parseFloat(cs.gap || cs.columnGap || cs.rowGap) || 0;
      gap = parsed;
    }

    function calcSizes() {
      items = Array.from(track.children).filter((n) => n.nodeType === 1);
      readGap();
      const first = items[0];
      if (first) {
        const rect = first.getBoundingClientRect();
        itemWidth = Math.round(rect.width + gap);
      } else {
        itemWidth = Math.round(container.clientWidth / 4);
      }
      visibleItems = Math.max(1, Math.floor(container.clientWidth / itemWidth));
      // passo do clique: quanto avançar; evita "pular demais"
      scrollItems = Math.max(1, visibleItems - 1);
      maxIndex = Math.max(0, items.length - visibleItems);
      if (index > maxIndex) index = maxIndex;
      updatePosition();
      updateButtons();
    }

    function clamp(v, a, b) {
      return Math.max(a, Math.min(b, v));
    }

    function updatePosition() {
      const x = index * itemWidth;
      track.style.transform = `translateX(-${x}px)`;
    }

    function updateButtons() {
      if (prevBtn) prevBtn.classList.toggle("disabled", index === 0);
      if (nextBtn) nextBtn.classList.toggle("disabled", index === maxIndex);
    }

    // Handlers das setas
    nextBtn?.addEventListener("click", () => {
      index = clamp(index + scrollItems, 0, maxIndex);
      updatePosition();
      updateButtons();
    });

    prevBtn?.addEventListener("click", () => {
      index = clamp(index - scrollItems, 0, maxIndex);
      updatePosition();
      updateButtons();
    });

    // Click nas "abas" laterais (opcional): clicar nas laterais avança/regressa
    carousel.addEventListener("click", (e) => {
      if (e.target.closest(".carousel-control")) return; // não quando clicou seta
      const rect = carousel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x < rect.width * 0.12) {
        index = clamp(index - scrollItems, 0, maxIndex);
        updatePosition();
        updateButtons();
      } else if (x > rect.width * 0.88) {
        index = clamp(index + scrollItems, 0, maxIndex);
        updatePosition();
        updateButtons();
      }
    });

    // Recalcula tamanhos em resize e quando itens mudam
    const ro = new ResizeObserver(calcSizes);
    ro.observe(container);
    const mo = new MutationObserver(calcSizes);
    mo.observe(track, { childList: true });

    // inicializa
    calcSizes();
    // garante que botões estejam corretos
    updateButtons();
  });
}
