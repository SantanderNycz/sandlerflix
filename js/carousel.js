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
    if (this.items.length > 0) {
      // Largura total do container - (espaço entre itens * (número de itens visíveis - 1))
      // Dividido pelo número de itens visíveis
      const containerWidth = this.carousel.offsetWidth;
      const totalGap = this.gap * (this.visibleItems - 1);
      this.itemWidth = (containerWidth - totalGap) / this.visibleItems;

      // Aplicar a largura calculada a todos os itens para garantir consistência
      this.items.forEach((item) => {
        item.style.width = `${this.itemWidth}px`;
      });
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

    this.enableSwipe();
  }

  enableSwipe() {
    let startX = 0;
    let endX = 0;
    let startY = 0; // Adicionado
    let endY = 0; // Adicionado
    let isDragging = false;
    const swipeThreshold = 50;

    this.container.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY; // Adicionado para rastrear o eixo Y
        isDragging = true;
      },
      { passive: true }
    );

    this.container.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
        endY = e.touches[0].clientY; // Adicionado para rastrear o eixo Y

        const diffX = Math.abs(startX - endX);
        const diffY = Math.abs(startY - endY);

        // Se o movimento horizontal for significativamente maior que o vertical,
        // impede o scroll da página (comportamento padrão)
        if (diffX > diffY) {
          e.preventDefault();
        }
      },
      { passive: false } // Alterado para false para permitir preventDefault
    );

    this.container.addEventListener("touchend", () => {
      if (!isDragging) return;

      // Apenas para garantir que o endY está definido, embora não seja estritamente necessário no touchend
      // A lógica de preventDefault já foi tratada no touchmove

      // Calcula a diferença: positivo = swipe para esquerda, negativo = swipe para direita
      const diffX = startX - endX;

      if (Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
          this.scrollRight();
        } else {
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

    const scrollDistance = this.itemsToScroll * (this.itemWidth + this.gap);

    this.currentPosition = Math.min(this.currentPosition + scrollDistance, 0);

    this.updatePosition();
  }

  scrollRight() {
    if (this.isAnimating) return;

    const scrollDistance = this.itemsToScroll * (this.itemWidth + this.gap);
    const containerWidth = this.container.offsetWidth;
    const totalContentWidth = this.items.length * (this.itemWidth + this.gap);
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

      setTimeout(() => {
        this.isAnimating = false;
      }, 500);
    }

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

document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    new Carousel(carousel);
  });
});

export default Carousel;
