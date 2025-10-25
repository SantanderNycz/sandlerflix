// carousel.js - Implementação simplificada e funcional
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
    this.gap = 8;
    this.visibleItems = 6;
    this.itemsToScroll = 3;
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
      this.updatePosition(true);
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

    // Calcular a largura de um item
    if (this.items[0]) {
      this.itemWidth = this.items[0].offsetWidth;
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

    // Swipe para dispositivos móveis
    this.enableSwipe();
  }

  enableSwipe() {
    let startX = 0;
    let endX = 0;
    let isDragging = false;
    const swipeThreshold = 50;

    this.container.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      },
      { passive: true }
    );

    this.container.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
      },
      { passive: true }
    );

    this.container.addEventListener("touchend", () => {
      if (!isDragging) return;

      const diffX = startX - endX;

      if (Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
          // Swipe para a esquerda = avançar
          this.scrollRight();
        } else {
          // Swipe para a direita = voltar
          this.scrollLeft();
        }
      }

      isDragging = false;
      startX = 0;
      endX = 0;
    });

    // Cancelar o swipe se o toque for cancelado
    this.container.addEventListener("touchcancel", () => {
      isDragging = false;
      startX = 0;
      endX = 0;
    });
  }

  scrollLeft() {
    if (this.isAnimating) return;

    const isMobile = window.innerWidth < 1200;
    const scrollDistance = this.itemsToScroll * (this.itemWidth + this.gap);

    if (isMobile) {
      // Mobile: ScrollLeft aumenta a posição (menos negativo)
      this.currentPosition = Math.min(this.currentPosition + scrollDistance, 0);
    } else {
      // Desktop: ScrollLeft aumenta a posição (menos negativo)
      this.currentPosition = Math.min(this.currentPosition + scrollDistance, 0);
    }

    this.updatePosition();
  }

  scrollRight() {
    if (this.isAnimating) return;

    const isMobile = window.innerWidth < 1200;
    const scrollDistance = this.itemsToScroll * (this.itemWidth + this.gap);
    const containerWidth = this.container.offsetWidth;
    const totalContentWidth = this.items.length * (this.itemWidth + this.gap);
    const maxScroll = -(totalContentWidth - containerWidth);

    if (isMobile) {
      // Mobile: ScrollRight diminui a posição (mais negativo)
      this.currentPosition = Math.max(
        this.currentPosition - scrollDistance,
        maxScroll
      );
    } else {
      // Desktop: ScrollRight diminui a posição (mais negativo)
      this.currentPosition = Math.max(
        this.currentPosition - scrollDistance,
        maxScroll
      );
    }

    this.updatePosition();
  }

  updatePosition(instant = false) {
    if (instant) {
      this.container.style.transition = "none";
    } else {
      this.container.style.transition = "transform 0.5s ease-in-out";
      this.isAnimating = true;

      setTimeout(() => {
        this.isAnimating = false;
      }, 500);
    }

    // Sempre usa o valor direto (sem inverter)
    this.container.style.transform = `translateX(${this.currentPosition}px)`;

    // Forçar reflow para garantir que a transição seja aplicada
    if (instant) {
      this.container.offsetHeight;
      this.container.style.transition = "transform 0.5s ease-in-out";
    }

    this.updateControls();
  }

  updateControls() {
    const containerWidth = this.container.offsetWidth;
    const totalContentWidth = this.items.length * (this.itemWidth + this.gap);
    const maxScroll = -(totalContentWidth - containerWidth);

    if (this.controls.left) {
      this.controls.left.classList.toggle(
        "disabled",
        this.currentPosition >= 0
      );
    }

    if (this.controls.right) {
      this.controls.right.classList.toggle(
        "disabled",
        this.currentPosition <= maxScroll
      );
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

export default Carousel;
