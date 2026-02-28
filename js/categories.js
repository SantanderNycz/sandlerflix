const currentLang = localStorage.getItem("lang") || "pt";
const file = currentLang === "pt" ? "./data/filmes.json" : "./data/movies.json";

async function carregarCategorias() {
  const res = await fetch(file);
  const filmes = await res.json();

  // Extrair todas as categorias únicas
  const categoriasMap = {};

  filmes.forEach((filme) => {
    if (!filme.genres) return;

    const genres = filme.genres.split(",").map((g) => g.trim());

    genres.forEach((genre) => {
      if (!categoriasMap[genre]) {
        // Primeiro filme desta categoria vira a capa
        categoriasMap[genre] = {
          name: genre,
          cover: filme.image,
          count: 1,
        };
      } else {
        categoriasMap[genre].count++;
      }
    });
  });

  renderCategorias(Object.values(categoriasMap));
}

function renderCategorias(categorias) {
  const grid = document.getElementById("categoriesGrid");

  // Ordenar alfabeticamente
  categorias.sort((a, b) => a.name.localeCompare(b.name));

  categorias.forEach((cat) => {
    const card = document.createElement("div");
    card.classList.add("category-card");
    card.innerHTML = `
      <div class="category-card-img">
    <img src="${cat.cover}" alt="${cat.name}" />
    <div class="category-card-overlay">
      <span class="category-card-count">${cat.count} ${cat.count === 1 ? "filme" : "filmes"}</span>
      <div class="category-card-info">
        <h2 class="category-card-name">${cat.name}</h2>
        <i class="fas fa-chevron-right"></i>
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

document.addEventListener("DOMContentLoaded", carregarCategorias);
