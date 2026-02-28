import "./modal.js";
import Carousel from "./carousel.js";
export let filmesData = [];

// // =================== INTRO VIDEO ===================
// window.addEventListener("load", () => {
//   const video = document.getElementById("introVideo");
//   const audio = document.getElementById("tudumAudio");
//   const container = document.getElementById("video-container");

//   if (!container || !video) {
//     console.warn("Elementos da intro não encontrados");
//     return;
//   }

//   document.body.style.overflow = "hidden";
//   document.body.style.position = "fixed";
//   document.body.style.width = "100%";

//   const isMobile = window.innerWidth < 1200;
//   const videoSource = video.querySelector("source");

//   if (isMobile && video.dataset.mobileSrc) {
//     videoSource.src = video.dataset.mobileSrc;
//     video.load();
//   }

//   video.play().catch(() => console.log("Autoplay do vídeo falhou."));

//   setTimeout(() => {
//     audio?.play().catch(() => console.log("Autoplay do áudio falhou."));
//   }, 1400);

//   let introHidden = false;

//   function hideIntro() {
//     if (introHidden) return;
//     introHidden = true;

//     video.pause();
//     video.currentTime = 0;

//     container.style.transition = "opacity 0.5s ease";
//     container.style.opacity = "0";

//     setTimeout(() => {
//       container.style.display = "none";
//       document.body.style.overflow = "";
//       document.body.style.position = "";
//       document.body.style.width = "";
//       void document.body.offsetHeight;
//     }, 500);
//   }

//   video.addEventListener("ended", hideIntro);
//   setTimeout(hideIntro, 7000);
//   container.addEventListener("click", hideIntro);
// });

// =================== SKELETON LOADING ===================
function mostrarSkeletons() {
  const containers = document.querySelectorAll(".carousel-container");
  containers.forEach((container) => {
    for (let i = 0; i < 6; i++) {
      const skeleton = document.createElement("div");
      skeleton.classList.add("carousel-item", "skeleton-card");
      container.appendChild(skeleton);
    }
  });
}

function removerSkeletons() {
  document.querySelectorAll(".skeleton-card").forEach((el) => el.remove());
}

// =================== CARREGAR FILMES ===================
let currentLang = localStorage.getItem("lang") || "pt";

async function carregarFilmes(lang = "pt") {
  const file = lang === "pt" ? "./data/filmes.json" : "./data/movies.json";

  mostrarSkeletons();

  try {
    const response = await fetch(file);
    filmesData = await response.json();
    removerSkeletons();
    atualizarFilmesNaTela();
    if (window.movieModal) setupCarouselItems(window.movieModal);
  } catch (err) {
    removerSkeletons();
    console.error("Erro ao carregar filmes:", err);
  }
}

// Atualiza títulos e infos dos cards
function atualizarFilmesNaTela() {
  const cards = document.querySelectorAll(".carousel-item img");
  cards.forEach((card) => {
    const movieKey = card.dataset.title;
    const movie = filmesData.find((f) => f.id === movieKey);
    if (movie) card.alt = movie.title;
  });
}

// =================== LAZY LOADING ===================
function setupLazyLoading() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          if (!src) return;

          img.src = src;
          img.removeAttribute("data-src");
          img.classList.add("img-loaded");
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: "100px", // Começa a carregar 100px antes de aparecer
      threshold: 0.1,
    },
  );

  document.querySelectorAll("img[data-src]").forEach((img) => {
    observer.observe(img);
  });

  return observer;
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

    const newImg = newItem.querySelector("img");
    if (newImg) {
      newImg.dataset.src = newImg.src || newImg.dataset.src;
      newImg.removeAttribute("src");
      newImg.classList.add("lazy-img");
    }

    newItem.setAttribute("tabindex", "0");
    newItem.setAttribute("role", "button");
    newItem.setAttribute("aria-label", `Ver detalhes de ${filme.title}`);
    newItem.style.cursor = "pointer";

    // Clique abre modal
    newItem.addEventListener("click", () => movieModal.open(filme));
    newItem.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        movieModal.open(filme);
      }
    });

    // Hover overlay
    const hoverOverlay = document.createElement("div");
    hoverOverlay.classList.add("card-hover-overlay");
    hoverOverlay.innerHTML = `
      <div class="card-hover-content">
        <button class="card-play-btn" aria-label="Assistir ${filme.title}">
          <i class="fas fa-play"></i>
        </button>
        <div class="card-hover-info">
          <span class="card-hover-title">${filme.title}</span>
          <div class="card-hover-meta">
            ${filme.year ? `<span>${filme.year}</span>` : ""}
            ${filme.rating ? `<span><i class="fas fa-star"></i> ${filme.rating}</span>` : ""}
          </div>
          <div class="card-hover-genres">${filme.genres || ""}</div>
        </div>
      </div>
    `;
    newItem.appendChild(hoverOverlay);

    // Botão play no hover abre trailer diretamente
    const cardPlayBtn = hoverOverlay.querySelector(".card-play-btn");
    cardPlayBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (filme.link) openTrailer(filme.link);
    });

    // Duplo clique também abre trailer
    newItem.addEventListener("dblclick", () => {
      if (filme.link) openTrailer(filme.link);
    });
  });
  setupLazyLoading();
}

// =================== SEARCH ===================
function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  const mainContent = document.querySelector(".main-content");
  const allSections = Array.from(
    document.querySelectorAll(".carousel-section"),
  );
  let searchSection = null;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

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

    const filmesFiltrados = filmesData.filter((f) =>
      f.title.toLowerCase().includes(query),
    );

    filmesFiltrados.forEach((filme) => {
      const card = document.createElement("div");
      card.classList.add("carousel-item");
      card.dataset.title = filme.id;

      const img = document.createElement("img");
      img.alt = filme.title;
      img.dataset.src = filme.image;
      img.classList.add("lazy-img");

      card.appendChild(img);
      container.appendChild(card);

      card.addEventListener("click", () => window.movieModal.open(filme));
    });

    carousel.appendChild(container);
    searchSection.appendChild(carousel);
    mainContent.prepend(searchSection);
    setupLazyLoading();
  });
}

// =================== HEADER ===================
function handleHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });
}

const navLinks = document.querySelectorAll(".main-nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") {
      e.preventDefault();
    }

    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

function setupHeroButtons() {
  const infoButton = document.querySelector(".btn-more");
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
      mainNav.classList.toggle("active"),
    );
}

// =================== MINI PLAYER ===================
const overlay = document.getElementById("trailerOverlay");
const trailerIframe = document.getElementById("trailerIframe");
const closeBtn = document.getElementById("closeTrailer");

function openTrailer(youtubeUrl) {
  let embedUrl = youtubeUrl;

  if (youtubeUrl.includes("watch?v=")) {
    const videoId = new URL(youtubeUrl).searchParams.get("v");
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (youtubeUrl.includes("youtu.be/")) {
    const videoId = youtubeUrl.split("youtu.be/")[1].split("?")[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  const autoplayUrl = embedUrl.includes("?")
    ? embedUrl + "&autoplay=1"
    : embedUrl + "?autoplay=1";

  trailerIframe.src = autoplayUrl;
  overlay.style.display = "flex";
}

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
      "https://www.youtube.com/embed/vTfJp2Ts9X8?si=Q_OijVeIBSVMq7x4",
    );
  });
});

// =================== TRADUÇÃO ===================
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

// =================== INIT ===================
document.addEventListener("DOMContentLoaded", () => {
  carregarTraducao(currentLang);
  carregarFilmes(currentLang);

  const modalPlayBtn = document.querySelector(".btn-modal-play");
  if (modalPlayBtn && window.movieModal) {
    const originalOpen = window.movieModal.open;
    window.movieModal.open = (filme) => {
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
      document.dispatchEvent(
        new CustomEvent("languageChange", { detail: { lang: currentLang } }),
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
