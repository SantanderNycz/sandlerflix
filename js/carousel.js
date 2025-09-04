// carousel.js - Implementação do carrossel para Sandlerflix (CORRIGIDO)
class Carousel {
  constructor(carouselElement) {
    this.carousel = carouselElement;
    this.container = carouselElement.querySelector(".carousel-container");
    this.items = Array.from(carouselElement.querySelectorAll(".carousel-item"));
    this.controls = {
      left: carouselElement.querySelector(".carousel-control.left"),
      right: carouselElement.querySelector(".carousel-control.right"),
    };

    this.currentPosition = 0;
    this.itemWidth = 0;
    this.visibleItems = 6;
    this.itemsToScroll = 3; // Número de itens para scrollar por vez
    this.isAnimating = false;

    this.init();
  }

  init() {
    // Calcular a largura dos itens
    this.calculateDimensions();

    // Adicionar event listeners
    this.addEventListeners();

    // Atualizar controles
    this.updateControls();

    // Adicionar observador de redimensionamento
    window.addEventListener("resize", () => {
      this.calculateDimensions();
      this.updatePosition(true); // Reposicionar sem animação no resize
    });
  }

  calculateDimensions() {
    if (this.items.length === 0) return;

    // Determinar quantos itens são visíveis baseado na largura da tela
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

    // Calcular a largura de um item (incluindo gap)
    const containerStyle = getComputedStyle(this.container);
    const gap = parseInt(containerStyle.gap) || 8;

    // Usar o primeiro item para calcular a largura
    if (this.items[0]) {
      this.itemWidth = this.items[0].offsetWidth + gap;
    }
  }

  addEventListeners() {
    // Controles de navegação
    if (this.controls.left) {
      this.controls.left.addEventListener("click", () => this.scrollLeft());
    }

    if (this.controls.right) {
      this.controls.right.addEventListener("click", () => this.scrollRight());
    }

    // Navegação por teclado
    this.carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.scrollLeft();
      } else if (e.key === "ArrowRight") {
        this.scrollRight();
      }
    });

    // Swipe para dispositivos móveis
    this.enableSwipe();
  }

  enableSwipe() {
    let startX, endX;
    const swipeThreshold = 50;

    this.container.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );

    this.container.addEventListener(
      "touchmove",
      (e) => {
        endX = e.touches[0].clientX;
      },
      { passive: true }
    );

    this.container.addEventListener("touchend", () => {
      const diffX = startX - endX;

      if (Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
          this.scrollRight();
        } else {
          this.scrollLeft();
        }
      }
    });
  }

  scrollLeft() {
    if (this.isAnimating) return;

    // Calcular a nova posição
    const scrollDistance = this.itemsToScroll * this.itemWidth;
    this.currentPosition = Math.min(this.currentPosition + scrollDistance, 0);
    this.updatePosition();
  }

  scrollRight() {
    if (this.isAnimating) return;

    // Calcular a nova posição
    const scrollDistance = this.itemsToScroll * this.itemWidth;
    const containerWidth = this.container.offsetWidth;
    const totalContentWidth = this.items.length * this.itemWidth;
    const maxScroll = -(totalContentWidth - containerWidth);

    this.currentPosition = Math.max(
      this.currentPosition - scrollDistance,
      maxScroll
    );
    this.updatePosition();
  }

  updatePosition(instant = false) {
    if (instant) {
      this.container.style.transition = "none";
    } else {
      this.container.style.transition = "transform 0.5s ease-in-out";
      this.isAnimating = true;

      // Resetar flag quando a animação terminar
      setTimeout(() => {
        this.isAnimating = false;
      }, 500);
    }

    this.container.style.transform = `translateX(${this.currentPosition}px)`;
    this.updateControls();
  }

  updateControls() {
    const containerWidth = this.container.offsetWidth;
    const totalContentWidth = this.items.length * this.itemWidth;
    const maxScroll = -(totalContentWidth - containerWidth);

    if (this.controls.left) {
      if (this.currentPosition >= 0) {
        this.controls.left.classList.add("disabled");
      } else {
        this.controls.left.classList.remove("disabled");
      }
    }

    if (this.controls.right) {
      if (this.currentPosition <= maxScroll) {
        this.controls.right.classList.add("disabled");
      } else {
        this.controls.right.classList.remove("disabled");
      }
    }
  }
}

// Inicializar todos os carrosséis quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    new Carousel(carousel);
  });
});

// Exportar a classe para uso em outros módulos, se necessário
export default Carousel;
