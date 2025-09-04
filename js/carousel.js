// carousel.js - Implementação simplificada e funcional
class Carousel {
  constructor(carouselElement) {
    this.carousel = carouselElement;
    this.container = carouselElement.querySelector(".carousel-container");
    this.items = Array.from(carouselElement.querySelectorAll(".carousel-item"));
    this.images = Array.from(carouselElement.querySelectorAll("img"));
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

    // Forçar o carregamento de todas as imagens
    this.loadAllImages();

    // Adicionar observador de redimensionamento
    window.addEventListener("resize", () => {
      this.calculateDimensions();
      this.updatePosition(true);
    });

    // Ajustar máscara de gradiente dinamicamente
    this.updateGradientMask();
    window.addEventListener("resize", () => {
      this.updateGradientMask();
      this.updateArrowsWidth();
    });
  }

  // Novo método para atualizar a máscara de gradiente
  updateGradientMask() {
    const screenWidth = window.innerWidth;
    let gradientSize = 60; // tamanho base em pixels

    if (screenWidth < 576) {
      gradientSize = 20;
    } else if (screenWidth < 768) {
      gradientSize = 30;
    } else if (screenWidth < 992) {
      gradientSize = 40;
    } else if (screenWidth < 1200) {
      gradientSize = 50;
    }

    // Aplicar máscara de gradiente
    this.carousel.style.maskImage = `linear-gradient(to right, transparent 0%, black ${gradientSize}px, black calc(100% - ${gradientSize}px), transparent 100%)`;
    this.carousel.style.webkitMaskImage = `linear-gradient(to right, transparent 0%, black ${gradientSize}px, black calc(100% - ${gradientSize}px), transparent 100%)`;
  }

  // Método para verificar suporte a mask-image
  hasMaskSupport() {
    return (
      CSS.supports(
        "mask-image",
        "linear-gradient(to right, transparent, black)"
      ) ||
      CSS.supports(
        "-webkit-mask-image",
        "linear-gradient(to right, transparent, black)"
      )
    );
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

  loadAllImages() {
    // Solução direta: carregar TODAS as imagens
    this.images.forEach((img) => {
      const realSrc = img.getAttribute("data-src") || img.getAttribute("src");
      if (realSrc && !img.classList.contains("loaded")) {
        // Usar Image object para pré-carregamento
        const newImg = new Image();
        newImg.onload = () => {
          img.src = realSrc;
          img.classList.add("loaded");
        };
        newImg.onerror = () => {
          console.error("Erro ao carregar imagem:", realSrc);
        };
        newImg.src = realSrc;
      }
    });
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

    // Manter setas visíveis quando o mouse estiver sobre elas
    this.controls.left.addEventListener("mouseenter", () => {
      this.controls.left.style.opacity = "0.9";
    });

    this.controls.left.addEventListener("mouseleave", () => {
      if (!this.carousel.matches(":hover")) {
        this.controls.left.style.opacity = "0";
      }
    });

    this.controls.right.addEventListener("mouseenter", () => {
      this.controls.right.style.opacity = "0.9";
    });

    this.controls.right.addEventListener("mouseleave", () => {
      if (!this.carousel.matches(":hover")) {
        this.controls.right.style.opacity = "0";
      }
    });

    // Manter setas visíveis em dispositivos touch
    if ("ontouchstart" in window) {
      this.controls.left.style.opacity = "0.7";
      this.controls.right.style.opacity = "0.7";
    }

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

  // Forçar carregamento de todas as imagens após um pequeno delay
  setTimeout(() => {
    document.querySelectorAll(".carousel img").forEach((img) => {
      const realSrc = img.getAttribute("data-src") || img.getAttribute("src");
      if (realSrc && !img.classList.contains("loaded")) {
        img.src = realSrc;
        img.classList.add("loaded");
      }
    });
  }, 500);
});

export default Carousel;
