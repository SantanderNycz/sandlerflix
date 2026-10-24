import "./modal.js";

const currentLang = localStorage.getItem("lang") || "pt";
const file = currentLang === "pt" ? "./data/filmes.json" : "./data/movies.json";
let translations = {};

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
    const titleBar = el.querySelector(".title-bar");
    if (titleBar) {
      el.innerHTML = "";
      el.appendChild(titleBar);
      el.appendChild(document.createTextNode(value));
    } else {
      el.textContent = value;
    }
  });
}

// Pegar o género da URL
const params = new URLSearchParams(window.location.search);
const genre = params.get("genre");

async function carregarFilmesDaCategoria() {
  if (!genre) {
    window.location.href = "./categories.html";
    return;
  }

  const res = await fetch(file);
  const filmes = await res.json();

  // Filtrar filmes que têm este género
  const filtrados = filmes.filter((f) => {
    if (!f.genres) return false;
    const genres = f.genres.split(",").map((g) => g.trim());
    return genres.includes(genre);
  });

  // Atualizar título da página
  document.title = `Sandlerflix — ${genre}`;
  document.getElementById("categoryTitle").textContent = genre;
  document.getElementById("categoryCount").textContent =
    `${filtrados.length} ${filtrados.length === 1 ? "filme" : "filmes"}`;

  renderFilmes(filtrados);
}

function renderFilmes(filmes) {
  const grid = document.getElementById("moviesGrid");

  filmes.forEach((filme) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Ver detalhes de ${filme.title}`);
    card.innerHTML = `
      <div class="movie-card-img">
        <img src="${filme.image}" alt="${filme.title}" loading="lazy" />
        <div class="movie-card-overlay">
          <div class="movie-card-info">
            <span class="movie-card-title">${filme.title}</span>
            <span class="movie-card-year">${filme.year || ""}</span>
          </div>
        </div>
      </div>
    `;

    // Clique e teclado abrem apenas o modal
    card.addEventListener("click", () => {
      if (window.movieModal) window.movieModal.open(filme);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (window.movieModal) window.movieModal.open(filme);
      }
    });

    grid.appendChild(card);
  });
}

// Mini player
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

closeBtn.addEventListener("click", () => {
  trailerIframe.src = "";
  overlay.style.display = "none";
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    trailerIframe.src = "";
    overlay.style.display = "none";
  }
});

// Botão "Assistir" no modal — abre trailer a partir do modal
document.addEventListener("DOMContentLoaded", () => {
  carregarTraducao().then(() => aplicarTraducao(currentLang));
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

  // ── Lang switcher ──────────────────────────────────────────
  const langSwitcher = document.getElementById("langSwitcher");
  const langSelected = document.getElementById("langSelected");
  const langSelectedText = document.getElementById("langSelectedText");
  const langOptions = document.querySelectorAll(".lang-option");

  if (langSwitcher && langSelected) {
    langSelected.addEventListener("click", (e) => {
      e.stopPropagation();
      langSwitcher.classList.toggle("open");
    });

    document.addEventListener("click", () => {
      langSwitcher.classList.remove("open");
    });

    langOptions.forEach((option) => {
      if (option.dataset.value === currentLang) {
        option.classList.add("active");
        langSelectedText.textContent = option.dataset.value.toUpperCase();
      }

      option.addEventListener("click", (e) => {
        e.stopPropagation();
        const newLang = option.dataset.value;
        localStorage.setItem("lang", newLang);

        langOptions.forEach((o) => o.classList.remove("active"));
        option.classList.add("active");
        langSelectedText.textContent = newLang.toUpperCase();
        langSwitcher.classList.remove("open");

        // Recarregar filmes no novo idioma
        const newFile =
          newLang === "pt" ? "./data/filmes.json" : "./data/movies.json";
        fetch(newFile)
          .then((r) => r.json())
          .then((filmes) => {
            const filtrados = filmes.filter((f) => {
              if (!f.genres) return false;
              return f.genres
                .split(",")
                .map((g) => g.trim())
                .includes(genre);
            });
            document.getElementById("moviesGrid").innerHTML = "";
            renderFilmes(filtrados);
            document.getElementById("categoryCount").textContent =
              `${filtrados.length} ${filtrados.length === 1 ? "filme" : "filmes"}`;
            aplicarTraducao(newLang);
          });
      });
    });
  }

  // ── Header scroll ──────────────────────────────────────────
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
      },
      { passive: true },
    );
  }

  // ── Mobile menu ────────────────────────────────────────────
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () =>
      mainNav.classList.toggle("active"),
    );
  }

  carregarFilmesDaCategoria();
});
