import "./modal.js";
export let filmesData = [];

// =================== CARREGAR FILMES ===================
let currentLang = localStorage.getItem("lang") || "pt";

async function carregarFilmes(lang = "pt") {
  const file = lang === "pt" ? "./data/filmes.json" : "./data/movies.json";

  try {
    const response = await fetch(file);
    filmesData = await response.json();
    atualizarFilmesNaTela();
    if (window.movieModal) setupCarouselItems(window.movieModal);
  } catch (err) {
    console.error("Erro ao carregar filmes:", err);
  }
}

// Atualiza títulos e infos dos cards
function atualizarFilmesNaTela() {
  const cards = document.querySelectorAll(".carousel-item img");

  cards.forEach((card) => {
    const movieKey = card.dataset.title;
    const movie = filmesData.find((f) => f.id === movieKey);

    if (movie) {
      card.alt = movie.title;
    }
  });
}

// =================== CARDS ===================
function setupCarouselItems(movieModal) {
  const carouselItems = document.querySelectorAll(".carousel-item");

  carouselItems.forEach((item) => {
    const img = item.querySelector("img");
    if (!img || !img.alt) return;

    const title = img.alt.trim();
    const filme = filmesData.find((f) => f.title === title);
    if (!filme) return;

    const newItem = item.cloneNode(true);
    item.parentNode.replaceChild(newItem, item);

    // Clique abre modal
    newItem.addEventListener("click", () => movieModal.open(filme));
    newItem.setAttribute("tabindex", "0");
    newItem.setAttribute("role", "button");
    newItem.setAttribute("aria-label", `Ver detalhes de ${filme.title}`);
    newItem.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        movieModal.open(filme);
      }
    });

    // Efeito hover
    newItem.style.cursor = "pointer";
    newItem.style.transition = "transform 0.2s ease";
    newItem.addEventListener(
      "mouseenter",
      () => (newItem.style.transform = "scale(1.05)")
    );
    newItem.addEventListener(
      "mouseleave",
      () => (newItem.style.transform = "scale(1)")
    );

    // **Mini player ao clicar no card**
    newItem.addEventListener("dblclick", () => {
      if (filme.link) openTrailer(filme.link);
    });
  });
}

// =================== SEARCH ===================
function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  const mainContent = document.querySelector(".main-content");
  const allSections = Array.from(
    document.querySelectorAll(".carousel-section")
  );
  let searchSection = null;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    // Limpar busca
    if (query.length === 0) {
      if (searchSection) searchSection.remove();
      allSections.forEach((s) => (s.style.display = "block"));
      return;
    }

    allSections.forEach((s) => (s.style.display = "none"));
    if (searchSection) searchSection.remove();

    searchSection = document.createElement("section");
    searchSection.classList.add("carousel-section");

    const titleEl = document.createElement("h3");
    titleEl.textContent = `Resultados para "${query}"`;
    searchSection.appendChild(titleEl);

    const carousel = document.createElement("div");
    carousel.classList.add("carousel");
    const container = document.createElement("div");
    container.classList.add("carousel-container");

    // Filtrar filmes pelo title (JSON) traduzido
    const filmesFiltrados = filmesData.filter((f) =>
      f.title.toLowerCase().includes(query)
    );

    filmesFiltrados.forEach((filme) => {
      const card = document.createElement("div");
      card.classList.add("carousel-item");
      card.dataset.title = filme.id;

      const img = document.createElement("img");
      img.src = filme.image;
      img.alt = filme.title;

      card.appendChild(img);
      container.appendChild(card);

      // Adicionar evento de clique para abrir modal
      card.addEventListener("click", () => window.movieModal.open(filme));
    });

    carousel.appendChild(container);
    searchSection.appendChild(carousel);
    mainContent.prepend(searchSection);
  });
}

// =================== HEADER, HERO, MOBILE ===================
function handleHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;
  const scrollThreshold = 50;
  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });
}

function setupHeroButtons() {
  const playButton = document.querySelector(".btn-play");
  const infoButton = document.querySelector(".btn-more");
  const destaque = filmesData[0];

  // if (playButton)
  //   playButton.addEventListener("click", () =>
  //     alert("Funcionalidade de reprodução será implementada!")
  //   );
  if (infoButton)
    infoButton.addEventListener("click", () => {
      const destaque = filmesData.find((f) => f.title === "Jóias Brutas");
      if (destaque && window.movieModal) window.movieModal.open(destaque);
    });
}

function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");
  if (mobileMenuBtn && mainNav)
    mobileMenuBtn.addEventListener("click", () =>
      mainNav.classList.toggle("active")
    );
}

// =================== INTRO VIDEO ===================
window.addEventListener("load", () => {
  const video = document.getElementById("introVideo");
  const audio = document.getElementById("tudumAudio");
  const container = document.getElementById("video-container");

  // Tenta tocar o vídeo
  video.play().catch(() => console.log("Autoplay do vídeo falhou."));

  // Toca o áudio junto com o vídeo
  setTimeout(() => {
    audio.play().catch(() => console.log("Autoplay do áudio falhou."));
  }, 1400);

  // Quando o vídeo termina, esconde o container
  video.addEventListener("ended", () => {
    container.style.opacity = 0;
    setTimeout(() => {
      container.style.display = "none";
    }, 500);
  });
});

// =================== MINI PLAYER ===================
const overlay = document.getElementById("trailerOverlay");
const trailerIframe = document.getElementById("trailerIframe");
const closeBtn = document.getElementById("closeTrailer");

// Função para abrir o trailer do YouTube
function openTrailer(youtubeUrl) {
  const autoplayUrl = youtubeUrl.includes("?")
    ? youtubeUrl + "&autoplay=1"
    : youtubeUrl + "?autoplay=1";

  trailerIframe.src = autoplayUrl;
  overlay.style.display = "flex";
}

// Fecha o overlay e para o vídeo
function closeTrailer() {
  trailerIframe.src = "";
  overlay.style.display = "none";
}

closeBtn.addEventListener("click", closeTrailer);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeTrailer();
});

document.querySelectorAll(".btn-play").forEach((button) => {
  button.addEventListener("click", () => {
    openTrailer(
      "https://www.youtube.com/embed/vTfJp2Ts9X8?si=Q_OijVeIBSVMq7x4"
    );
  });
});

// ==================== TRADUÇÃO =====================
let translations = {};

async function carregarTraducao(lang = "pt") {
  const res = await fetch("./data/translations.json");
  translations = await res.json();
  aplicarTraducao(lang);
}

function aplicarTraducao(lang = "pt") {
  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.dataset.translate;
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  const searchInput = document.getElementById("searchInput");
  if (searchInput)
    searchInput.placeholder = translations[lang]["search-placeholder"];
  const btnPlay = document.querySelector(".btn-play");
  if (btnPlay) btnPlay.textContent = translations[lang]["btn-play"];
  const btnMore = document.querySelector(".btn-more");
  if (btnMore) btnMore.textContent = translations[lang]["btn-more"];
  const heroDesc = document.querySelector(".hero-description");
  if (heroDesc) heroDesc.textContent = translations[lang]["hero-description"];
}

// =================== SWITCH IDIOMA ===================
document.addEventListener("DOMContentLoaded", () => {
  carregarTraducao(currentLang);
  carregarFilmes(currentLang);

  // Botão 'Assistir' no modal
  const modalPlayBtn = document.querySelector(".btn-modal-play");

  if (modalPlayBtn && window.movieModal) {
    const originalOpen = window.movieModal.open;
    window.movieModal.open = function (filme) {
      originalOpen(filme);

      if (filme.link) {
        modalPlayBtn.onclick = () => {
          window.movieModal.close();
          openTrailer(filme.link);
        };
      } else {
        modalPlayBtn.onclick = null;
      }
    };
  }

  const languageSwitch = document.getElementById("languageSwitch");
  if (languageSwitch) {
    languageSwitch.value = currentLang;
    languageSwitch.addEventListener("change", (e) => {
      currentLang = e.target.value;
      localStorage.setItem("lang", currentLang);
      aplicarTraducao(currentLang);

      // Dispara evento customizado para HeroRotator
      document.dispatchEvent(
        new CustomEvent("languageChange", { detail: { lang: currentLang } })
      );

      carregarFilmes(currentLang);
    });
  }

  if (!window.movieModal) {
    console.error("movieModal não disponível");
    return;
  }

  setupCarouselItems(window.movieModal);
  setupSearch();
  handleHeaderScroll();
  setupHeroButtons();
  setupMobileMenu();
});
