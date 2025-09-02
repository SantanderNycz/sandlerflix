// Sandleflix JavaScript Functionality

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Load movie data from JSON file
  loadMovieData();

  // Initialize header scroll effect
  initHeaderScroll();

  // Initialize carousels
  initCarousels();

  // Initialize movie modal
  initMovieModal();

  // Initialize mobile menu
  initMobileMenu();
});

// Global variable to store movie data
let moviesData = [];

// Load movie data from JSON file
function loadMovieData() {
  fetch("../data/adam_sandler_filmes.json")
    .then((response) => response.json())
    .then((data) => {
      moviesData = data.filmes;
      populateCarousels();
    })
    .catch((error) => {
      console.error("Erro ao carregar dados dos filmes:", error);
      // Use placeholder data if fetch fails
      usePlaceholderData();
    });
}

// Use placeholder data if JSON fetch fails
function usePlaceholderData() {
  // Simplified placeholder data
  moviesData = [
    {
      titulo: "Uncut Gems",
      ano: 2019,
      papel: "Howard Ratner",
      genero: ["Drama", "Suspense", "Crime"],
      sinopse:
        "Um joalheiro carismático faz uma aposta de alto risco que pode levar à vida dos seus sonhos.",
    },
    {
      titulo: "Happy Gilmore",
      ano: 1996,
      papel: "Happy Gilmore",
      genero: ["Comédia", "Esporte"],
      sinopse:
        "Um jogador de hóquei fracassado descobre seu talento para o golfe.",
    },
    {
      titulo: "Big Daddy",
      ano: 1999,
      papel: "Sonny Koufax",
      genero: ["Comédia", "Drama"],
      sinopse: "Um homem adota uma criança para impressionar sua namorada.",
    },
  ];
  populateCarousels();
}

// Initialize header scroll effect
function initHeaderScroll() {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Initialize carousels
function initCarousels() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const container = carousel.querySelector(".carousel-container");
    const leftBtn = carousel.querySelector(".carousel-control.left");
    const rightBtn = carousel.querySelector(".carousel-control.right");

    // Define quanto vai rolar: 80% da largura visível
    const scrollAmount = container.clientWidth * 0.8;

    // Botões
    rightBtn.addEventListener("click", () => {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    leftBtn.addEventListener("click", () => {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    // Hover nas laterais para desktops
    carousel.addEventListener("mousemove", (e) => {
      const bounds = carousel.getBoundingClientRect();
      const x = e.clientX - bounds.left;

      if (x < bounds.width * 0.15) {
        // Área esquerda
        container.style.cursor = "w-resize";
        carousel.onmousedown = () => {
          container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        };
      } else if (x > bounds.width * 0.85) {
        // Área direita
        container.style.cursor = "e-resize";
        carousel.onmousedown = () => {
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        };
      } else {
        container.style.cursor = "default";
        carousel.onmousedown = null;
      }
    });
  });
}

// Populate carousels with movie data
function populateCarousels() {
  // This would be implemented to dynamically populate carousels
  // For now, we'll use placeholder images in HTML

  // Add click event to all carousel items
  const carouselItems = document.querySelectorAll(".carousel-item");

  carouselItems.forEach((item) => {
    item.addEventListener("click", function () {
      const movieId = this.querySelector("img").getAttribute("data-id");
      openMovieModal(movieId);
    });
  });
}

// Initialize movie modal
function initMovieModal() {
  const modal = document.getElementById("movie-modal");
  const closeBtn = modal.querySelector(".modal-close");

  // Close modal when clicking the close button
  closeBtn.addEventListener("click", function () {
    closeMovieModal();
  });

  // Close modal when clicking outside the content
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeMovieModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeMovieModal();
    }
  });
}

document.querySelectorAll(".carousel").forEach((carousel) => {
  const container = carousel.querySelector(".carousel-container");
  const items = carousel.querySelectorAll(".carousel-item");
  const prevBtn = carousel.querySelector(".carousel-control.left");
  const nextBtn = carousel.querySelector(".carousel-control.right");

  let index = 0;
  const itemWidth = items[0].offsetWidth + 10; // largura + margem
  const visibleItems = Math.floor(carousel.offsetWidth / itemWidth);

  function updateCarousel() {
    container.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (index < items.length - visibleItems) {
      index++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });
});

// Open movie modal with specific movie data
function openMovieModal(movieId) {
  const modal = document.getElementById("movie-modal");
  const movieData = getMovieById(movieId);

  if (movieData) {
    // Update modal content with movie data
    modal.querySelector(".modal-title").textContent = movieData.titulo;
    modal.querySelector(".modal-year").textContent = movieData.ano;
    modal.querySelector(".modal-genres").textContent =
      movieData.genero.join(", ");
    modal.querySelector(".modal-description").textContent =
      movieData.sinopse || "Descrição não disponível.";
    modal.querySelector(".modal-role span").textContent = movieData.papel;

    // Show modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }
}

// Close movie modal
function closeMovieModal() {
  const modal = document.getElementById("movie-modal");
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

// Get movie data by ID
function getMovieById(id) {
  // For demo purposes, return placeholder data
  // In a real implementation, this would fetch from the moviesData array
  return {
    titulo: "Uncut Gems",
    ano: 2019,
    papel: "Howard Ratner",
    genero: ["Drama", "Suspense", "Crime"],
    sinopse:
      "Um joalheiro carismático faz uma aposta de alto risco que pode levar à vida dos seus sonhos, mas ele deve equilibrar negócios, família e inimigos em uma busca implacável pelo grande prêmio.",
  };
}

// Initialize mobile menu
function initMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");

  menuBtn.addEventListener("click", function () {
    mainNav.classList.toggle("active");
  });
}
