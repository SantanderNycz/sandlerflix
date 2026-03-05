// carousel.js
class Carousel {
  constructor(carouselElement) {
    this.carousel = carouselElement;
    this.container = carouselElement.querySelector(".carousel-container");
    this.originalItems = Array.from(
      carouselElement.querySelectorAll(".carousel-item"),
    );
    this.controls = {
      left: carouselElement.querySelector(".carousel-control.left"),
      right: carouselElement.querySelector(".carousel-control.right"),
    };

    this.gap = 8;
    this.visibleItems = 6;
    this.itemsToScroll = 3;
    this.isAnimating = false;
    this.itemWidth = 0;
    this.currentIndex = 0; // índice relativo aos originais

    this.init();
  }

  init() {
    this.cloneItems();

    // Aguardar o browser calcular as dimensões antes de inicializar
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.calculateDimensions();
        this.goTo(this.currentIndex, false);
        this.addEventListeners();
      }, 50);
    });

    window.addEventListener("resize", () => {
      this.calculateDimensions();
      this.goTo(this.currentIndex, false);
    });
  }

  cloneItems() {
    let total = this.originalItems.length;

    // 🔥 Garantir quantidade mínima para preencher o carrossel
    const minimumItems = this.visibleItems + this.itemsToScroll;

    if (total < minimumItems) {
      const needed = minimumItems - total;
      const times = Math.ceil(needed / total);

      for (let i = 0; i < times; i++) {
        this.originalItems.forEach((item) => {
          const clone = item.cloneNode(true);
          this.container.appendChild(clone);
        });
      }

      // Atualizar lista original
      this.originalItems = Array.from(
        this.container.querySelectorAll(".carousel-item"),
      );

      total = this.originalItems.length;
    }

    // 🔁 Clonagem infinita normal
    this.originalItems.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      this.container.appendChild(clone);
    });

    [...this.originalItems].reverse().forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      this.container.prepend(clone);
    });

    this.items = Array.from(this.container.querySelectorAll(".carousel-item"));

    this.currentIndex = total;
  }

  calculateDimensions() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 576) {
      this.visibleItems = 2;
      this.itemsToScroll = 1;
    } else if (screenWidth < 768) {
      this.visibleItems = 3;
      this.itemsToScroll = 1;
    } else if (screenWidth < 992) {
      this.visibleItems = 4;
      this.itemsToScroll = 2;
    } else if (screenWidth < 1200) {
      this.visibleItems = 5;
      this.itemsToScroll = 2;
    } else {
      this.visibleItems = 6;
      this.itemsToScroll = 3;
    }

    const containerWidth = this.carousel.offsetWidth;
    const totalGap = this.gap * (this.visibleItems - 1);
    this.itemWidth = (containerWidth - totalGap) / this.visibleItems;

    this.items.forEach((item) => {
      item.style.width = `${this.itemWidth}px`;
    });
  }

  goTo(index, animate = true) {
    this.container.style.transition = animate
      ? "transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)"
      : "none";

    const offset = -(index * (this.itemWidth + this.gap));
    this.container.style.transform = `translateX(${offset}px)`;

    if (!animate) {
      // Forçar reflow para aplicar imediatamente
      void this.container.offsetHeight;
    }
  }

  scrollRight() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.currentIndex += this.itemsToScroll;
    this.goTo(this.currentIndex);

    this.container.addEventListener(
      "transitionend",
      () => this.onTransitionEnd(),
      { once: true },
    );
  }

  scrollLeft() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.currentIndex -= this.itemsToScroll;
    this.goTo(this.currentIndex);

    this.container.addEventListener(
      "transitionend",
      () => this.onTransitionEnd(),
      { once: true },
    );
  }

  onTransitionEnd() {
    const total = this.originalItems.length;

    // Chegou ao fim — saltar silenciosamente para o início
    if (this.currentIndex >= total * 2) {
      this.currentIndex = total + (this.currentIndex - total * 2);
      this.goTo(this.currentIndex, false);
    }

    // Chegou ao início — saltar silenciosamente para o fim
    if (this.currentIndex < total) {
      this.currentIndex = total + this.currentIndex;
      this.goTo(this.currentIndex, false);
    }

    this.isAnimating = false;
  }

  addEventListeners() {
    if (this.controls.left) {
      this.controls.left.addEventListener("click", () => this.scrollLeft());
    }
    if (this.controls.right) {
      this.controls.right.addEventListener("click", () => this.scrollRight());
    }

    this.enableSwipe();
  }

  enableSwipe() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let isDragging = false;

    this.container.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
      },
      { passive: true },
    );

    this.container.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
        const diffX = Math.abs(startX - endX);
        const diffY = Math.abs(startY - e.touches[0].clientY);
        if (diffX > diffY) e.preventDefault();
      },
      { passive: false },
    );

    this.container.addEventListener("touchend", () => {
      if (!isDragging) return;
      const diff = startX - endX;
      if (Math.abs(diff) > 30) {
        diff > 0 ? this.scrollRight() : this.scrollLeft();
      }
      isDragging = false;
    });

    this.container.addEventListener("touchcancel", () => {
      isDragging = false;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel").forEach((carousel) => {
    new Carousel(carousel);
  });
});

export default Carousel;
