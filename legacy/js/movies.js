/**
 * movies.js — Catálogo alfabético de filmes
 * - Filtro por letra / pesquisa em tempo real
 * - Abre modal ao clicar no card ou no ícone de info
 * - Lang switcher com re-render do hero text
 */

// ── Estado ────────────────────────────────────────────────────
let filmesData = [];
let translations = {};
let currentLang = localStorage.getItem("lang") || "pt";

// ── Carregar e aplicar traduções ───────────────────────────────
async function carregarTraducao() {
  try {
    const res = await fetch("./data/translations.json");
    translations = await res.json();
  } catch (err) {
    console.warn("Erro ao carregar traduções:", err);
  }
}

function aplicarTraducao(lang) {
  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.dataset.translate;
    const value = translations[lang]?.[key];
    if (!value) return;

    // Preservar elementos filhos (ex: .title-bar)
    const titleBar = el.querySelector(".title-bar");
    if (titleBar) {
      el.innerHTML = "";
      el.appendChild(titleBar);
      el.appendChild(document.createTextNode(value));
    } else {
      el.textContent = value;
    }
  });

  // Placeholder da search box — usa chave específica da página de filmes
  const placeholder =
    translations[lang]?.["movies-search-placeholder"] ||
    translations[lang]?.["search-placeholder"];
  if (searchInput && placeholder) searchInput.placeholder = placeholder;
}

// ── Elementos ─────────────────────────────────────────────────
const alphaNav = document.getElementById("alphaNav");
const alphaBtns = document.querySelectorAll(".alpha-btn");
const letterSects = document.querySelectorAll(".letter-section");
const searchInput = document.getElementById("searchInput");
const searchBox = document.getElementById("searchBox");
const searchResults = document.getElementById("searchResults");
const searchGrid = document.getElementById("searchGrid");
const noResults = document.getElementById("noResults");
const catalogMain = document.getElementById("catalogMain");
const mainHeader = document.getElementById("mainHeader");
const totalCountEl = document.getElementById("totalCount");

// ── Carregar dados JSON ────────────────────────────────────────
async function carregarFilmes(lang = currentLang) {
  const file = lang === "pt" ? "./data/filmes.json" : "./data/movies.json";
  try {
    const res = await fetch(file);
    filmesData = await res.json();
    atualizarTitulosCards();
  } catch (err) {
    console.warn("Erro ao carregar filmes:", err);
    filmesData = [];
  }
}

// ── Actualizar títulos dos cards com o valor localizado do JSON ─
function atualizarTitulosCards() {
  document.querySelectorAll(".movie-alpha-card").forEach((card) => {
    const filme = encontrarFilme(card.dataset.title);
    if (!filme) return;
    const titleEl = card.querySelector(".movie-alpha-title");
    if (titleEl) titleEl.textContent = filme.title;
  });
}

// ── Encontrar filme pelo data-title do card ────────────────────
function encontrarFilme(title) {
  if (!title) return null;
  // Tenta por id primeiro, depois por title
  return (
    filmesData.find((f) => f.id === title) ||
    filmesData.find((f) => f.title?.toLowerCase() === title.toLowerCase()) ||
    null
  );
}

// ── Abrir modal ────────────────────────────────────────────────
function abrirModal(title) {
  if (!window.movieModal) return;
  const filme = encontrarFilme(title);
  if (filme) {
    window.movieModal.open(filme);
  } else {
    // Fallback: abre com dados mínimos do HTML (imagem + título)
    const card = document.querySelector(
      `.movie-alpha-card[data-title="${CSS.escape(title)}"]`,
    );
    const img = card?.querySelector("img");
    window.movieModal.open({
      id: title,
      title: title,
      image: img?.src || "",
      banner: img?.src || "",
      description: "",
      rating: "N/A",
      duration: "N/A",
      year: "N/A",
      role: "N/A",
      genres: "",
      link: "",
    });
  }
}

// ── Attach click em cada card ──────────────────────────────────
function attachCardClick(card) {
  // Clique no card inteiro → abre modal
  card.addEventListener("click", (e) => {
    // Não deixar o botão de info processar duas vezes
    if (e.target.closest(".movie-alpha-info")) return;
    abrirModal(card.dataset.title);
  });

  // Clique no botão de info → abre modal
  const infoBtn = card.querySelector(".movie-alpha-info");
  infoBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    abrirModal(card.dataset.title);
  });

  // Acessibilidade teclado
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Ver detalhes de ${card.dataset.title}`);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      abrirModal(card.dataset.title);
    }
  });
}

// ── Contagem e attach inicial ──────────────────────────────────
const allCards = document.querySelectorAll(".movie-alpha-card");
if (totalCountEl) totalCountEl.textContent = allCards.length;
allCards.forEach(attachCardClick);

// ── Header scroll ──────────────────────────────────────────────
window.addEventListener(
  "scroll",
  () => {
    mainHeader?.classList.toggle("scrolled", window.scrollY > 10);
  },
  { passive: true },
);

// ── Mobile menu ────────────────────────────────────────────────
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mainNav = document.querySelector(".main-nav");
mobileMenuBtn?.addEventListener("click", () =>
  mainNav?.classList.toggle("active"),
);

// ── Search box toggle ──────────────────────────────────────────
const searchIcon = searchBox?.querySelector("i");
searchIcon?.addEventListener("click", () => {
  searchBox.classList.toggle("active");
  if (searchBox.classList.contains("active")) {
    searchInput?.focus();
  } else {
    if (searchInput) searchInput.value = "";
    clearSearch();
  }
});

// ── Pesquisa em tempo real ─────────────────────────────────────
searchInput?.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    clearSearch();
    return;
  }

  catalogMain.hidden = true;
  searchResults.hidden = false;
  alphaBtns.forEach((b) => b.classList.remove("active"));

  const matched = [...allCards].filter((card) =>
    (card.dataset.title ?? "").toLowerCase().includes(query),
  );

  searchGrid.innerHTML = "";
  matched.forEach((card) => {
    const clone = card.cloneNode(true);
    attachCardClick(clone);
    searchGrid.appendChild(clone);
  });

  if (noResults) noResults.hidden = matched.length > 0;
});

function clearSearch() {
  catalogMain.hidden = false;
  searchResults.hidden = true;
  if (searchGrid) searchGrid.innerHTML = "";
  if (noResults) noResults.hidden = true;
  showAllSections();
  alphaBtns.forEach((b) => b.classList.remove("active"));
  document.querySelector('[data-letter="all"]')?.classList.add("active");
}

// ── Filtro alfabético ──────────────────────────────────────────
alphaBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (searchInput?.value) {
      searchInput.value = "";
      clearSearch();
    }

    alphaBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const letter = btn.dataset.letter;

    if (letter === "all") {
      showAllSections();
      window.scrollTo({
        top: (alphaNav?.offsetTop ?? 0) - (mainHeader?.offsetHeight ?? 68),
        behavior: "smooth",
      });
      return;
    }

    letterSects.forEach((s) =>
      s.classList.toggle("hidden", s.dataset.section !== letter),
    );

    const target = document.getElementById(`section-${letter}`);
    if (target) {
      const offset =
        (mainHeader?.offsetHeight ?? 68) + (alphaNav?.offsetHeight ?? 52) + 16;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  });
});

function showAllSections() {
  letterSects.forEach((s) => s.classList.remove("hidden"));
}

// ── IntersectionObserver — highlight letra no scroll ──────────
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const activeBtn = document.querySelector(".alpha-btn.active");
    if (activeBtn && activeBtn.dataset.letter !== "all") return;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const letter = entry.target.dataset.section;
        alphaBtns.forEach((b) =>
          b.classList.toggle("active", b.dataset.letter === letter),
        );
      }
    });
  },
  {
    rootMargin: `-${(mainHeader?.offsetHeight ?? 68) + 60}px 0px -60% 0px`,
    threshold: 0,
  },
);
letterSects.forEach((s) => sectionObserver.observe(s));

// ── Lang switcher ──────────────────────────────────────────────
const langSwitcher = document.getElementById("langSwitcher");
const langSelected = document.getElementById("langSelected");
const langSelectedText = document.getElementById("langSelectedText");
const langOptions = document.querySelectorAll(".lang-option");

if (langSwitcher && langSelected) {
  // Estado inicial
  langOptions.forEach((opt) => {
    if (opt.dataset.value === currentLang) {
      opt.classList.add("active");
      if (langSelectedText)
        langSelectedText.textContent = opt.dataset.value.toUpperCase();
    }
  });

  langSelected.addEventListener("click", (e) => {
    e.stopPropagation();
    langSwitcher.classList.toggle("open");
  });

  document.addEventListener("click", () =>
    langSwitcher.classList.remove("open"),
  );

  langOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      currentLang = option.dataset.value;
      localStorage.setItem("lang", currentLang);

      langOptions.forEach((o) => o.classList.remove("active"));
      option.classList.add("active");
      if (langSelectedText)
        langSelectedText.textContent = currentLang.toUpperCase();
      langSwitcher.classList.remove("open");

      // Aplicar traduções e recarregar dados no novo idioma
      aplicarTraducao(currentLang);
      carregarFilmes(currentLang);
    });
  });
}

// ── Init ───────────────────────────────────────────────────────
function waitForModal(tries = 0) {
  if (window.movieModal) {
    carregarTraducao().then(() => aplicarTraducao(currentLang));
    carregarFilmes(currentLang);
  } else if (tries < 20) {
    setTimeout(() => waitForModal(tries + 1), 50);
  }
}
waitForModal();
