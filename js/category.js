import "./modal.js";

const currentLang = localStorage.getItem("lang") || "pt";
const file = currentLang === "pt" ? "./data/filmes.json" : "./data/movies.json";

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
    card.innerHTML = `
 <div class="movie-card-img">
    <img src="${filme.image}" alt="${filme.title}" />
    <div class="movie-card-overlay">
      <button class="movie-card-play" aria-label="Assistir ${filme.title}">
        &#9654;
      </button>
      <div class="movie-card-info">
        <span class="movie-card-title">${filme.title}</span>
        <span class="movie-card-year">${filme.year || ""}</span>
      </div>
    </div>
  </div>
    `;

    // Clique abre modal
    card.addEventListener("click", () => {
      if (window.movieModal) window.movieModal.open(filme);
    });

    // Botão play abre trailer
    const playBtn = card.querySelector(".movie-card-play");
    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (filme.link) openTrailer(filme.link);
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

// Botão "Assistir" no modal
document.addEventListener("DOMContentLoaded", () => {
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

  carregarFilmesDaCategoria();
});
