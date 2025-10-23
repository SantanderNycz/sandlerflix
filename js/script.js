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
  });
}

// =================== SEARCH ===================
function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  const mainContent = document.querySelector(".main-content");
  const allSections = Array.from(
    document.querySelectorAll(".carousel-section")
  );
  const allItems = Array.from(document.querySelectorAll(".carousel-item"));
  let searchSection = null;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length === 0) {
      if (searchSection) {
        searchSection.remove();
        searchSection = null;
      }
      allSections.forEach((s) => (s.style.display = "block"));
      return;
    }

    allSections.forEach((s) => (s.style.display = "none"));
    if (searchSection) searchSection.remove();

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
      const t = img.alt.toLowerCase();
      if (t.includes(query) && !shownTitles.has(t)) {
        const clone = item.cloneNode(true);
        clone.style.display = "block";
        container.appendChild(clone);
        shownTitles.add(t);
      }
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
  if (playButton)
    playButton.addEventListener("click", () =>
      alert("Funcionalidade de reprodução será implementada!")
    );
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
  const container = document.getElementById("video-container");
  video.play().catch(() => console.log("Autoplay falhou."));
  video.addEventListener("ended", () => {
    container.style.opacity = 0;
    setTimeout(() => {
      container.style.display = "none";
    }, 500);
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

// =================== SWITCH IDIOMA ===================
document.addEventListener("DOMContentLoaded", () => {
  carregarTraducao(currentLang);
  carregarFilmes(currentLang);

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
