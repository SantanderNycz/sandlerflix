// carousel.js - Implementação simplificada com carregamento de imagens
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

    // Carregar imagens visíveis
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

  loadVisibleImages() {
    // Esta função será chamada sempre que o carrossel se mover
    const containerRect = this.container.getBoundingClientRect();

    this.images.forEach((img) => {
      const imgRect = img.getBoundingClientRect();

      // Verificar se a imagem está visível ou próxima
      const isVisible =
        imgRect.right >= containerRect.left - 300 &&
        imgRect.left <= containerRect.right + 300;

      if (isVisible && !img.classList.contains("loaded")) {
        this.loadImage(img);
      }
    });
  }

  loadImage(img) {
    // Se a imagem já está carregada, não fazer nada
    if (img.classList.contains("loaded")) return;

    // Obter o src real do data-src se existir
    const realSrc = img.getAttribute("data-src") || img.getAttribute("src");

    if (!realSrc) return;

    // Criar uma nova imagem para pré-carregamento
    const newImg = new Image();
    newImg.onload = () => {
      // Quando carregar, aplicar à imagem real
      img.src = realSrc;
      img.classList.add("loaded");
    };

    newImg.onerror = () => {
      console.error("Erro ao carregar imagem:", realSrc);
    };

    newImg.src = realSrc;
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

    const scrollDistance = this.itemsToScroll * this.itemWidth;
    this.currentPosition = Math.min(this.currentPosition + scrollDistance, 0);
    this.updatePosition();
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
  }

  updatePosition(instant = false) {
    if (instant) {
      this.container.style.transition = "none";
    } else {
      this.container.style.transition = "transform 0.5s ease-in-out";
      this.isAnimating = true;

      // Quando a animação terminar, carregar imagens visíveis
      setTimeout(() => {
        this.isAnimating = false;
        this.loadVisibleImages();
      }, 500);
    }

    this.container.style.transform = `translateX(${this.currentPosition}px)`;
    this.updateControls();

    // Carregar imagens visíveis imediatamente também
    if (!instant) {
      setTimeout(() => this.loadVisibleImages(), 100);
    }
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

  // Carregar imagens visíveis após um pequeno delay
  setTimeout(() => {
    carousels.forEach((carousel) => {
      const instance = new Carousel(carousel);
      instance.loadVisibleImages();
    });
  }, 500);
});

// Função auxiliar para forçar o carregamento de todas as imagens se necessário
function loadAllCarouselImages() {
  document.querySelectorAll(".carousel img").forEach((img) => {
    const realSrc = img.getAttribute("data-src") || img.getAttribute("src");
    if (realSrc && !img.classList.contains("loaded")) {
      img.src = realSrc;
      img.classList.add("loaded");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Solução direta: carregar todas as imagens após um delay
  setTimeout(() => {
    const allImages = document.querySelectorAll(".carousel img");
    allImages.forEach((img) => {
      const realSrc = img.getAttribute("data-src") || img.getAttribute("src");
      if (realSrc && !img.classList.contains("loaded")) {
        img.src = realSrc;
        img.classList.add("loaded");
      }
    });
  }, 1000);
});

// Exportar a classe para uso em outros módulos
export default Carousel;
