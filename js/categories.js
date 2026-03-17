const currentLang = localStorage.getItem("lang") || "pt";

function getDataFile(lang) {
  return lang === "pt" ? "./data/filmes.json" : "./data/movies.json";
}

async function carregarCategorias(lang = currentLang) {
  const res = await fetch(getDataFile(lang));
  const filmes = await res.json();

  const categoriasMap = {};
  filmes.forEach((filme) => {
    if (!filme.genres) return;
    const genres = filme.genres.split(",").map((g) => g.trim());
    genres.forEach((genre) => {
      if (!categoriasMap[genre]) {
        categoriasMap[genre] = { name: genre, cover: filme.image, count: 1 };
      } else {
        categoriasMap[genre].count++;
      }
    });
  });

  renderCategorias(Object.values(categoriasMap));
}

function renderCategorias(categorias) {
  const grid = document.getElementById("categoriesGrid");
  grid.innerHTML = "";

  categorias.sort((a, b) => a.name.localeCompare(b.name));

  categorias.forEach((cat) => {
    const card = document.createElement("div");
    card.classList.add("category-card");
    card.innerHTML = `
      <div class="category-card-img">
        <img src="${cat.cover}" alt="${cat.name}" loading="lazy" />
        <div class="category-card-overlay">
          <span class="category-card-count">${cat.count} ${cat.count === 1 ? "filme" : "filmes"}</span>
          <div class="category-card-info">
            <h2 class="category-card-name">${cat.name}</h2>
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `./category.html?genre=${encodeURIComponent(cat.name)}`;
    });

    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  carregarCategorias();

  // ── Lang switcher ──────────────────────────────────────────
  const langSwitcher = document.getElementById("langSwitcher");
  const langSelected = document.getElementById("langSelected");
  const langSelectedText = document.getElementById("langSelectedText");
  const langOptions = document.querySelectorAll(".lang-option");

  if (langSwitcher && langSelected) {
    // Definir estado inicial
    langOptions.forEach((opt) => {
      if (opt.dataset.value === currentLang) {
        opt.classList.add("active");
        langSelectedText.textContent = opt.dataset.value.toUpperCase();
      }
    });

    langSelected.addEventListener("click", (e) => {
      e.stopPropagation();
      langSwitcher.classList.toggle("open");
    });

    document.addEventListener("click", () => {
      langSwitcher.classList.remove("open");
    });

    langOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        const newLang = option.dataset.value;
        localStorage.setItem("lang", newLang);

        langOptions.forEach((o) => o.classList.remove("active"));
        option.classList.add("active");
        langSelectedText.textContent = newLang.toUpperCase();
        langSwitcher.classList.remove("open");

        carregarCategorias(newLang);
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
});
