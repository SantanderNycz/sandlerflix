// carousel.js - Implementação do carrossel com carregamento otimizado de imagens
class Carousel {
  constructor(carouselElement) {
    this.carousel = carouselElement;
    this.container = carouselElement.querySelector(".carousel-container");
    this.items = Array.from(carouselElement.querySelectorAll(".carousel-item"));
    this.images = Array.from(carouselElement.querySelectorAll(".carousel-img"));
    this.controls = {
      left: carouselElement.querySelector(".carousel-control.left"),
      right: carouselElement.querySelector(".carousel-control.right"),
    };

    this.currentPosition = 0;
    this.itemWidth = 0;
    this.visibleItems = 6;
    this.itemsToScroll = 3;
    this.isAnimating = false;
    this.observer = null;

    this.init();
  }

  init() {
    // Calcular a largura dos itens
    this.calculateDimensions();

    // Configurar o Intersection Observer para carregamento de imagens
    this.setupImageLoading();

    // Adicionar event listeners
    this.addEventListeners();

    // Atualizar controles
    this.updateControls();

    // Carregar imagens visíveis inicialmente
    this.loadVisibleImages();

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

    // Calcular a largura de um item (incluindo gap)
    const containerStyle = getComputedStyle(this.container);
    const gap = parseInt(containerStyle.gap) || 8;

    if (this.items[0]) {
      this.itemWidth = this.items[0].offsetWidth + gap;
    }
  }

  setupImageLoading() {
    // Configurar Intersection Observer para carregar imagens quando ficarem visíveis
    const options = {
      root: this.container,
      rootMargin: "100px", // Carregar imagens que estão próximas da área visível
      threshold: 0.01,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          this.observer.unobserve(img); // Parar de observar após o carregamento
        }
      });
    }, options);

    // Observar todas as imagens
    this.images.forEach((img) => {
      // Se a imagem já tem um src, marcar como carregada
      if (img.src && img.complete) {
        img.classList.add("loaded");
      } else {
        this.observer.observe(img);
      }
    });
  }

  loadImage(img) {
    // Se a imagem já está carregada, não fazer nada
    if (img.classList.contains("loaded") || img.src) return;

    // Obter o src do data-src se existir, ou usar o src atual
    const src = img.getAttribute("data-src") || img.getAttribute("src");

    if (!src) return;

    // Criar uma nova imagem para pré-carregamento
    const tempImg = new Image();
    tempImg.onload = () => {
      // Quando carregar, aplicar à imagem real
      img.src = src;
      img.classList.add("loaded");
    };

    tempImg.onerror = () => {
      console.error("Erro ao carregar imagem:", src);
    };

    tempImg.src = src;
  }

  loadVisibleImages() {
    // Carregar imediatamente as imagens visíveis
    this.images.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const containerRect = this.container.getBoundingClientRect();

      // Verificar se a imagem está visível ou próxima da área visível
      if (
        rect.right >= containerRect.left - 200 &&
        rect.left <= containerRect.right + 200
      ) {
        this.loadImage(img);
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

      // Após swipe, carregar imagens que agora estão visíveis
      setTimeout(() => this.loadVisibleImages(), 100);
    });
  }

  scrollLeft() {
    if (this.isAnimating) return;

    const scrollDistance = this.itemsToScroll * this.itemWidth;
    this.currentPosition = Math.min(this.currentPosition + scrollDistance, 0);
    this.updatePosition();

    // Após a animação, carregar imagens que agora estão visíveis
    setTimeout(() => this.loadVisibleImages(), 500);
  }

  scrollRight() {
    if (this.isAnimating) return;

    const scrollDistance = this.itemsToScroll * this.itemWidth;
    const containerWidth = this.container.offsetWidth;
    const totalContentWidth = this.items.length * this.itemWidth;
    const maxScroll = -(totalContentWidth - containerWidth);

    this.currentPosition = Math.max(
      this.currentPosition - scrollDistance,
      maxScroll
    );
    this.updatePosition();

    // Após a animação, carregar imagens que agora estão visíveis
    setTimeout(() => this.loadVisibleImages(), 500);
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
    const totalContentWidth = this.items.length * this.itemWidth;
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
