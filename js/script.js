import "./modal.js";

// ========== DADOS DOS FILMES ==========
export let filmesData = [];

fetch("./data/filmes.json")
  .then((response) => response.json())
  .then((data) => {
    filmesData = data;
    setupCarouselItems(window.movieModal);
  })
  .catch((error) => console.error("Erro ao carregar filmes:", error));

// ========== SISTEMA DE MODAL ==========
import "./modal.js";

// ========== CONFIGURAÇÃO DOS CARDS ==========
function setupCarouselItems(movieModal) {
  const carouselItems = document.querySelectorAll(".carousel-item");

  console.log(`Encontrados ${carouselItems.length} itens do carrossel`);

  carouselItems.forEach((item) => {
    const img = item.querySelector("img");
    if (!img || !img.alt) {
      console.warn("Item sem imagem ou alt, ignorado.");
      return;
    }

    const title = img.alt.trim();
    const filme = filmesData.find((f) => f.title === title);

    if (!filme) {
      console.warn("Filme não encontrado para título:", title);
      return;
    }

    // Remover event listeners antigos
    const newItem = item.cloneNode(true);
    item.parentNode.replaceChild(newItem, item);

    // Adicionar evento de clique
    newItem.addEventListener("click", () => {
      window.movieModal.open(filme);
    });

    // Tornar acessível por teclado
    newItem.setAttribute("tabindex", "0");
    newItem.setAttribute("role", "button");
    newItem.setAttribute("aria-label", `Ver detalhes de ${filme.title}`);

    newItem.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.movieModal.open(filme);
      }
    });

    // Feedback visual
    newItem.style.cursor = "pointer";
    newItem.style.transition = "transform 0.2s ease";

    newItem.addEventListener("mouseenter", () => {
      newItem.style.transform = "scale(1.05)";
    });

    newItem.addEventListener("mouseleave", () => {
      newItem.style.transform = "scale(1)";
    });
  });
}

// ========== CAMPO DE PESQUISA ==========

function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  const mainContent = document.querySelector(".main-content");
  const allSections = Array.from(
    document.querySelectorAll(".carousel-section")
  );
  const allItems = Array.from(document.querySelectorAll(".carousel-item"));

  let searchSection = null; // vai guardar a seção criada dinamicamente

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    const isSearching = query.length > 0;

    if (isSearching) {
      // Esconde todas as seções originais
      allSections.forEach((section) => {
        section.style.display = "none";
      });

      // Remove seção de pesquisa anterior se existir
      if (searchSection) {
        searchSection.remove();
      }

      // Cria nova seção para resultados
      searchSection = document.createElement("section");
      searchSection.classList.add("carousel-section");

      const title = document.createElement("h3");
      title.textContent = `Resultados para "${query}"`;
      searchSection.appendChild(title);

      const carousel = document.createElement("div");
      carousel.classList.add("carousel");
      const container = document.createElement("div");
      container.classList.add("carousel-container");

      const shownTitles = new Set();

      allItems.forEach((item) => {
        const img = item.querySelector("img");
        if (!img) return;
        const itemTitle = img.alt.toLowerCase();

        if (itemTitle.includes(query) && !shownTitles.has(itemTitle)) {
          const clone = item.cloneNode(true); // clona o card
          clone.style.display = "block";
          container.appendChild(clone);
          shownTitles.add(itemTitle);
        }
      });

      carousel.appendChild(container);
      searchSection.appendChild(carousel);

      // Adiciona a nova seção ao main
      mainContent.prepend(searchSection);
    } else {
      // Se não estiver pesquisando, remove seção de resultados e mostra seções originais
      if (searchSection) {
        searchSection.remove();
        searchSection = null;
      }
      allSections.forEach((section) => {
        section.style.display = "block";
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", setupSearch);

// ========== OUTRAS FUNÇÕES ==========
function handleHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  const scrollThreshold = 50;

  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function setupHeroButtons() {
  const playButton = document.querySelector(".btn-play");
  const infoButton = document.querySelector(".btn-more");

  if (playButton) {
    playButton.addEventListener("click", () => {
      alert("Funcionalidade de reprodução será implementada!");
    });
  }

  if (infoButton) {
    infoButton.addEventListener("click", () => {
      const destaque = filmesData.find((f) => f.title === "Jóias Brutas");
      if (destaque) window.movieModal.open(destaque);
    });
  }
}

function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }
}

// ========== INTRO ==========
window.addEventListener("load", () => {
  const videoContainer = document.getElementById("video-container");
  const video = document.getElementById("introVideo");

  video.play().catch(() => {
    console.log("O autoplay falhou. Talvez o navegador bloqueou som.");
  });

  video.addEventListener("ended", () => {
    // Reduz opacidade suavemente
    videoContainer.style.opacity = 0;

    // Remove o container depois da transição (5s)
    setTimeout(() => {
      videoContainer.style.display = "none";
    }, 500);
  });
});

// ========== INICIALIZAÇÃO ==========
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM carregado, inicializando...");

  if (!window.movieModal) {
    console.error("Falha crítica: movieModal não está disponível");
    return;
  }

  setupCarouselItems(window.movieModal);
  handleHeaderScroll();
  setupHeroButtons();
  setupMobileMenu();

  console.log("Inicialização concluída com sucesso!");
});
