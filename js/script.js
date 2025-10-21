// ========== DADOS DOS FILMES ==========
const filmesData = [
  {
    id: 1,
    title: "Como Se Fosse a Primeira Vez",
    year: "2004",
    genres: "Comédia, Romance",
    description:
      "Um mulherengo que não acredita no amor se apaixona por uma mulher com amnésia de curto prazo que esquece tudo cada manhã ao acordar.",
    role: "Henry Roth",
    image: "assets/50 first dates.png",
    banner: "assets/50 first dates.png",
    rating: "4.3",
    duration: "1h 39m",
  },
  {
    id: 2,
    title: "Esposa de Mentirinha",
    year: "2011",
    genres: "Comédia, Romance",
    description:
      "Um cirurgião plástico convence sua assistente a fingir ser sua esposa para enganar sua jovem namorada, mas acaba se apaixonando por ela.",
    role: "Dr. Daniel 'Danny' Maccabee",
    image: "assets/justgowithit.jpg",
    banner: "assets/justgowithit.jpg",
    rating: "4.2",
    duration: "1h 56m",
  },
  {
    id: 3,
    title: "Arremessando Alto",
    year: "2022",
    genres: "Drama, Esporte",
    description:
      "Um caça-talentos de basquete decide levar um fenômeno amador espanhol para os EUA e transformá-lo em uma estrela da NBA.",
    role: "Stanley Sugarman",
    image: "assets/arsembing-high.jpg",
    banner: "assets/arsembing-high-banner.jpg",
    rating: "3.9",
    duration: "1h 44m",
  },
  {
    id: 4,
    title: "Uncut Gems",
    year: "2019",
    genres: "Drama, Suspense",
    description:
      "Um joalheiro de Nova York tenta encontrar um jeito de pagar seus credores e fazer as pazes com sua família. Mas ele não resiste quando vê uma chance de faturar alto e acaba se envolvendo em uma espiral de riscos e dinheiro.",
    role: "Howard Ratner",
    image: "assets/uncutgems 2.jpg",
    banner: "assets/uncutgems 2.jpg",
    rating: "4.5",
    duration: "2h 15m",
  },
  {
    id: 5,
    title: "Happy Gilmore",
    year: "1996",
    genres: "Comédia, Esporte",
    description:
      "Um estudante universitário desajeitado descobre que tem um talento especial para o golfe, e tenta usar isso para vencer um torneio importante e impressionar a todos.",
    role: "Happy Gilmore",
    image: "assets/happy-gilmore.jpg",
    banner: "assets/happy-gilmore-banner.jpg",
    rating: "4.1",
    duration: "1h 32m",
  },
  {
    id: 6,
    title: "Gente Grande",
    year: "2010",
    genres: "Comédia",
    description:
      "Após a morte do treinador de basquete da infância, cinco amigos de infância se reúnem para o funeral e decidem passar um fim de semana prolongado juntos com suas famílias.",
    role: "Lenny Feder",
    image: "assets/grownups.jpg",
    banner: "assets/grownups.jpg",
    rating: "3.9",
    duration: "1h 42m",
  },
  {
    id: 7,
    title: "Zohan: Um Agente Bom de Corte",
    year: "2008",
    genres: "Comédia, Ação",
    description:
      "Um agente secreto israelense finge a própria morte para realizar seu sonho de se tornar cabeleireiro em Nova York, mas continua envolvido em confusões internacionais.",
    role: "Zohan Dvir",
    image: "assets/zohan.jpg",
    banner: "assets/zohan-banner.jpg",
    rating: "4.0",
    duration: "1h 53m",
  },
  {
    id: 8,
    title: "Click",
    year: "2006",
    genres: "Comédia, Drama, Fantasia",
    description:
      "Um arquiteto sobrecarregado encontra um controle remoto universal que permite avançar rapidamente pelas partes chatas de sua vida. Mas logo descobre que não pode voltar atrás.",
    role: "Michael Newman",
    image: "assets/click.jpg",
    banner: "assets/click.jpg",
    rating: "4.1",
    duration: "1h 47m",
  },
  {
    id: 9,
    title: "Cada Um Tem a Gêmea Que Merece",
    year: "2011",
    genres: "Comédia",
    description:
      "Um homem descobre que tem uma sósia idêntica e precisa lidar com confusões quando tenta conquistar sua amada.",
    role: "Jake Bouchard",
    image: "assets/you-dont-mess-with-the-zohan.jpg",
    banner: "assets/you-dont-mess-with-the-zohan-banner.jpg",
    rating: "3.9",
    duration: "1h 38m",
  },
  {
    id: 10,
    title: "Hotel Transilvânia",
    year: "2012",
    genres: "Animação, Comédia, Família",
    description:
      "Drácula gerencia um resort de luxo para monstros e precisa proteger sua filha quando um humano descobre o hotel.",
    role: "Drácula (voz)",
    image: "assets/hotel-transylvania.jpg",
    banner: "assets/hotel-transylvania-banner.jpg",
    rating: "4.3",
    duration: "1h 31m",
  },
  {
    id: 11,
    title: "Hubie Halloween",
    year: "2020",
    genres: "Comédia, Terror",
    description:
      "Um motorista de Uber nervoso e desajeitado se torna um herói improvável quando precisa salvar sua cidade no Dia das Bruxas.",
    role: "Hubie Dubois",
    image: "assets/hubie-halloween.jpg",
    banner: "assets/hubie-halloween-banner.jpg",
    rating: "3.9",
    duration: "1h 42m",
  },
  {
    id: 12,
    title: "Mistério no Mediterrâneo",
    year: "2019",
    genres: "Comédia, Mistério",
    description:
      "Um detetive de Nova York e sua esposa embarcam em uma viagem pela Europa para reacender a paixão em seu casamento, mas acabam envolvidos em um caso de assassinato.",
    role: "Detetive Nick Spitz",
    image: "assets/murder-mystery.jpg",
    banner: "assets/murder-mystery-banner.jpg",
    rating: "4.0",
    duration: "1h 37m",
  },
  {
    id: 13,
    title: "Happy Gilmore 2",
    year: "2025",
    genres: "Comédia, Esporte",
    description:
      "Happy Gilmore está de volta para ajudar sua família mais uma vez, e superar seus traumas.",
    role: "Happy Gilmore",
    image: "assets/happy_gilmore2.jpg",
    banner: "assets/happy_gilmore2-banner.jpg",
    rating: "4.0",
    duration: "1h 32m",
  },
  {
    id: 14,
    title: "O Paizão",
    year: "1999",
    genres: "Comédia",
    description:
      "Um preguiçoso que cria um filho para impressionar sua namorada acaba se apegando à criança e aprendendo sobre responsabilidade.",
    role: "Sonny Koufax",
    image: "assets/bigddaddy.png",
    banner: "assets/bigddaddy-banner.jpg",
    rating: "4.0",
    duration: "1h 33m",
  },
  {
    id: 15,
    title: "The Ridiculous 6",
    year: "2015",
    genres: "Comédia, Faroeste",
    description:
      "Seis irmãos separados no nascimento se reencontram e precisam lidar com trapaceiros e confusões em busca do tesouro de seu pai.",
    role: "Tommy 'White Knife'",
    image: "assets/the-ridiculous-6.jpg",
    banner: "assets/the-ridiculous-6-banner.jpg",
    rating: "3.5",
    duration: "1h 50m",
  },
  {
    id: 16,
    title: "Sandy Wexler",
    year: "2017",
    genres: "Comédia, Romance",
    description:
      "Um agente de talentos excêntrico trabalha para promover artistas em Los Angeles, enquanto enfrenta problemas amorosos e profissionais.",
    role: "Sandy Wexler",
    image: "assets/sandy-wexler.jpg",
    banner: "assets/sandy-wexler-banner.jpg",
    rating: "3.8",
    duration: "2h 14m",
  },
  {
    id: 17,
    title: "Diamantes Brutos",
    year: "2019",
    genres: "Drama, Suspense",
    description:
      "Um joalheiro de Nova York aposta alto em uma joia rara, enfrentando problemas com a lei, dívidas e mafiosos.",
    role: "Howard Ratner",
    image: "assets/uncutgems 2.jpg",
    banner: "assets/uncutgems 2.jpg",
    rating: "4.5",
    duration: "2h 15m",
  },
  {
    id: 18,
    title: "Little Nicky",
    year: "2000",
    genres: "Comédia, Fantasia",
    description:
      "O filho de Satanás precisa salvar o mundo quando seus irmãos escapam do inferno e causam caos na Terra.",
    role: "Nicky",
    image: "assets/little-nicky.jpg",
    banner: "assets/little-nicky-banner.jpg",
    rating: "3.7",
    duration: "1h 31m",
  },
  {
    id: 19,
    title: "Eu Os Declaro Marido e… Larry",
    year: "1997",
    genres: "Comédia",
    description:
      "Dois homens se tornam pais de uma criança e precisam aprender a viver juntos, enfrentando situações cômicas.",
    role: "Larry",
    image: "assets/marry-me.jpg",
    banner: "assets/marry-me-banner.jpg",
    rating: "3.6",
    duration: "1h 34m",
  },
  {
    id: 20,
    title: "Os 6 Ridículos",
    year: "2015",
    genres: "Comédia",
    description:
      "Seis irmãos que cresceram separados tentam se unir para resgatar seu legado e enfrentar vilões ao longo de muitas confusões.",
    role: "Tommy 'White Knife'",
    image: "assets/the-ridiculous-6.jpg",
    banner: "assets/the-ridiculous-6-banner.jpg",
    rating: "3.5",
    duration: "1h 50m",
  },
  {
    id: 21,
    title: "Juntos e Misturados",
    year: "2014",
    genres: "Comédia, Romance",
    description:
      "Duas famílias muito diferentes precisam conviver quando se encontram por causa de um casamento improvável, causando muitas confusões.",
    role: "Charlie",
    image: "assets/blended.jpg",
    banner: "assets/blended-banner.jpg",
    rating: "3.8",
    duration: "1h 57m",
  },
  {
    id: 22,
    title: "O Rei da Água",
    year: "1998",
    genres: "Comédia",
    description:
      "Um personagem desajeitado tenta se tornar uma estrela do surf e enfrenta situações hilárias ao longo do caminho.",
    role: "Chris Farber",
    image: "assets/waterboy.jpg",
    banner: "assets/waterboy-banner.jpg",
    rating: "3.7",
    duration: "1h 31m",
  },
  {
    id: 23,
    title: "Nossa Vida com Cães",
    year: "2005",
    genres: "Comédia",
    description:
      "Um homem aprende a lidar com sua família e seus cachorros, causando muitas confusões e situações engraçadas.",
    role: "Charlie",
    image: "/assets/mr deeds.jpg",
    banner: "/assets/mr deeds.jpg.jpg",
    rating: "3.6",
    duration: "1h 44m",
  },
  {
    id: 24,
    title: "The Week Of",
    year: "2018",
    genres: "Comédia",
    description:
      "Dois pais que não se gostam precisam organizar a festa de casamento dos filhos, causando uma série de desentendimentos hilários.",
    role: "Ken Howard",
    image: "assets/the-week-of.jpg",
    banner: "assets/the-week-of-banner.jpg",
    rating: "3.8",
    duration: "1h 46m",
  },
  {
    id: 25,
    title: "Você Não Mexe com o Zohan",
    year: "2008",
    genres: "Comédia, Ação",
    description:
      "Um agente israelense finge a própria morte para realizar seu sonho de ser cabeleireiro em Nova York e enfrenta confusões hilárias.",
    role: "Zohan Dvir",
    image: "assets/you-dont-mess-with-the-zohan.jpg",
    banner: "assets/you-dont-mess-with-the-zohan-banner.jpg",
    rating: "3.9",
    duration: "1h 53m",
  },
  {
    id: 26,
    title: "Grown Ups 2",
    year: "2013",
    genres: "Comédia",
    description:
      "Os amigos da infância se reencontram e precisam lidar com confusões, filhos e problemas familiares durante as férias de verão.",
    role: "Lenny Feder",
    image: "assets/grownups2.jpg",
    banner: "assets/grownups2-banner.jpg",
    rating: "3.7",
    duration: "1h 42m",
  },
  {
    id: 27,
    title: "The Meyerowitz Stories",
    year: "2017",
    genres: "Comédia, Drama",
    description:
      "Uma família disfuncional se reúne em Nova York para celebrar a carreira de seu pai, e antigos conflitos ressurgem entre irmãos e pais.",
    role: "Danny Meyerowitz",
    image: "assets/the-meyerowitz-stories.jpg",
    banner: "assets/the-meyerowitz-stories-banner.jpg",
    rating: "4.0",
    duration: "1h 49m",
  },
  {
    id: 28,
    title: "Uma Noite no Museu 2",
    year: "2009",
    genres: "Aventura, Comédia, Família",
    description:
      "Larry Daley descobre que as exposições do Museu de História Natural foram transferidas para Londres, e precisa salvar as peças que ganham vida à noite.",
    role: "Larry Daley",
    image: "assets/night-at-the-museum-2.jpg",
    banner: "assets/night-at-the-museum-2-banner.jpg",
    rating: "4.1",
    duration: "1h 45m",
  },
  {
    id: 29,
    title: "Funny People",
    year: "2009",
    genres: "Comédia, Drama",
    description:
      "Um comediante famoso recebe um diagnóstico de doença grave e começa a refletir sobre sua vida, amizade e relacionamentos amorosos.",
    role: "George Simmons",
    image: "assets/funny-people.jpg",
    banner: "assets/funny-people-banner.jpg",
    rating: "4.0",
    duration: "2h 26m",
  },
  {
    id: 30,
    title: "Waterboy",
    year: "1998",
    genres: "Comédia, Esporte",
    description:
      "Um jovem tímido que trabalha como 'boy da água' descobre seu talento para o futebol americano e tenta conquistar o sucesso e o amor.",
    role: "Bobby Boucher",
    image: "assets/waterboy.jpg",
    banner: "assets/waterboy-banner.jpg",
    rating: "3.9",
    duration: "1h 31m",
  },
  {
    id: 31,
    title: "Big Daddy",
    year: "1999",
    genres: "Comédia",
    description:
      "Um homem irresponsável acaba criando um filho para impressionar sua namorada, mas se apega à criança e aprende sobre responsabilidade.",
    role: "Sonny Koufax",
    image: "assets/bigddaddy.png",
    banner: "assets/bigddaddy-banner.jpg",
    rating: "4.0",
    duration: "1h 33m",
  },
  {
    id: 32,
    title: "The Do-Over",
    year: "2016",
    genres: "Comédia, Ação",
    description:
      "Dois amigos fingem suas mortes para começar uma nova vida, mas acabam se metendo em aventuras perigosas e hilárias.",
    role: "Charlie",
    image: "assets/do-over.jpg",
    banner: "assets/do-over-banner.jpg",
    rating: "3.8",
    duration: "1h 52m",
  },
  {
    id: 33,
    title: "That's My Boy",
    year: "2012",
    genres: "Comédia",
    description:
      "Um pai irresponsável tenta se reconectar com o filho adulto antes de sua cerimônia de formatura, causando caos e confusões familiares.",
    role: "Donny Berger",
    image: "assets/thats-my-boy.jpg",
    banner: "assets/thats-my-boy-banner.jpg",
    rating: "3.7",
    duration: "1h 50m",
  },
  {
    id: 34,
    title: "Spanglish",
    year: "2004",
    genres: "Comédia, Drama",
    description:
      "Uma governanta mexicana trabalha para uma família americana e precisa equilibrar diferenças culturais, mantendo sua dignidade e protegendo sua filha.",
    role: "John Clasky",
    image: "assets/spanglish.jpg",
    banner: "assets/spanglish-banner.jpg",
    rating: "4.0",
    duration: "2h 11m",
  },
  {
    id: 35,
    title: "Punch-Drunk Love",
    year: "2002",
    genres: "Comédia, Drama, Romance",
    description:
      "Um homem solitário com problemas de raiva conhece o amor, e precisa aprender a controlar suas emoções enquanto enfrenta situações inusitadas.",
    role: "Barry Egan",
    image: "assets/punch-drunk-love.jpg",
    banner: "assets/punch-drunk-love-banner.jpg",
    rating: "4.1",
    duration: "1h 36m",
  },
  {
    id: 36,
    title: "Eight Crazy Nights",
    year: "2002",
    genres: "Animação, Comédia",
    description:
      "Durante o Natal, um homem problemático enfrenta suas rivalidades, recordações e a chance de mudar sua vida, em meio a muitas confusões hilárias.",
    role: "Davey Stone",
    image: "assets/eight-crazy-nights.jpg",
    banner: "assets/eight-crazy-nights-banner.jpg",
    rating: "3.6",
    duration: "1h 20m",
  },
  {
    id: 37,
    title: "Airheads",
    year: "1994",
    genres: "Comédia, Música",
    description:
      "Uma banda desesperada invade uma rádio com armas de brinquedo para tocar sua música, causando caos e confusão na cidade.",
    role: "Chazz Darby",
    image: "assets/airheads.jpg",
    banner: "assets/airheads-banner.jpg",
    rating: "3.7",
    duration: "1h 31m",
  },
  {
    id: 38,
    title: "Bulletproof",
    year: "1996",
    genres: "Comédia, Ação",
    description:
      "Dois criminosos e um policial se envolvem em uma trama de enganos, perseguições e muitas confusões cômicas.",
    role: "Jack Carter",
    image: "assets/bulletproof.jpg",
    banner: "assets/bulletproof-banner.jpg",
    rating: "3.8",
    duration: "1h 45m",
  },
  {
    id: 39,
    title: "Coneheads",
    year: "1993",
    genres: "Comédia, Ficção",
    description:
      "Uma família alienígena tenta se adaptar à vida na Terra, enfrentando situações engraçadas por conta de sua aparência incomum.",
    role: "Beldar Conehead",
    image: "assets/coneheads.jpg",
    banner: "assets/coneheads-banner.jpg",
    rating: "3.9",
    duration: "1h 29m",
  },
];

// ========== SISTEMA DE MODAL SIMPLIFICADO E FUNCIONAL ==========
function initMovieModal() {
  const modal = document.getElementById("movie-modal");
  if (!modal) {
    console.error("Modal não encontrado!");
    return null;
  }

  const closeButton = modal.querySelector(".modal-close");
  const modalTitle = modal.querySelector(".modal-title");
  const modalYear = modal.querySelector(".modal-year");
  const modalGenres = modal.querySelector(".modal-genres");
  const modalDescription = modal.querySelector(".modal-description");
  const modalRole = modal.querySelector(".modal-role span");
  const modalBanner = modal.querySelector(".modal-banner");
  const modalMeta = modal.querySelector(".modal-meta");

  // Fechar modal
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Configurar event listeners para fechar
  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Função para abrir o modal - VERSÃO CORRIGIDA
  function openModal(movieId) {
    const id = parseInt(movieId);
    console.log("Tentando abrir modal para o ID:", id);

    const movieData = filmesData.find((movie) => movie.id === id);

    if (!movieData) {
      console.error("Filme não encontrado para o ID:", id);
      // Usar o primeiro filme como fallback
      openModal(1);
      return;
    }

    console.log("Dados do filme encontrado:", movieData.title);

    // Preencher o modal com os dados do filme
    modalTitle.textContent = movieData.title;
    modalYear.textContent = movieData.year;
    modalGenres.textContent = movieData.genres;
    modalDescription.textContent = movieData.description;
    modalRole.textContent = movieData.role;

    // SOLUÇÃO DEFINITIVA PARA O BANNER:
    // 1. Primeiro garantir que temos um placeholder
    // 2. Depois tentar carregar a imagem

    // Configurar placeholder primeiro
    modalBanner.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23222'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23fff'%3ECarregando...%3C/text%3E%3C/svg%3E";
    modalBanner.alt = `Banner de ${movieData.title}`;

    // Tentar carregar a imagem
    const img = new Image();
    img.onload = function () {
      console.log(
        "Imagem carregada com sucesso:",
        movieData.banner || movieData.image
      );
      modalBanner.src = movieData.banner || movieData.image;
    };
    img.onerror = function () {
      console.error(
        "Erro ao carregar imagem:",
        movieData.banner || movieData.image
      );
      // Manter o placeholder se der erro
    };
    img.src = movieData.banner || movieData.image;

    // Limpar informações anteriores
    clearAdditionalInfo();

    // Adicionar informações extras
    if (movieData.rating) {
      addRatingInfo(movieData.rating);
    }

    if (movieData.duration) {
      addDurationInfo(movieData.duration);
    }

    // Abrir modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function clearAdditionalInfo() {
    const oldRating = modalMeta.querySelector(".modal-rating");
    const oldDuration = modalMeta.querySelector(".modal-duration");
    if (oldRating) oldRating.remove();
    if (oldDuration) oldDuration.remove();
  }

  function addRatingInfo(rating) {
    const ratingElement = document.createElement("span");
    ratingElement.className = "modal-rating";
    ratingElement.innerHTML = `<i class="fas fa-star"></i> ${rating}`;
    modalMeta.appendChild(ratingElement);
  }

  function addDurationInfo(duration) {
    const durationElement = document.createElement("span");
    durationElement.className = "modal-duration";
    durationElement.innerHTML = `<i class="fas fa-clock"></i> ${duration}`;
    modalMeta.appendChild(durationElement);
  }

  return {
    open: openModal,
    close: closeModal,
  };
}

// ========== CONFIGURAÇÃO DOS CARDS ==========
function setupCarouselItems(movieModal) {
  const carouselItems = document.querySelectorAll(".carousel-item");

  console.log(`Encontrados ${carouselItems.length} itens do carrossel`);

  carouselItems.forEach((item, index) => {
    let movieId = item.getAttribute("data-id");

    // Se não tem data-id, tentar encontrar de outra forma
    if (!movieId) {
      // Tentar encontrar pelo índice ou outro atributo
      movieId = index + 1; // IDs começando em 1
      item.setAttribute("data-id", movieId);
      console.warn(`Item sem data-id, atribuído ID: ${movieId}`);
    }

    // Remover event listeners antigos
    const newItem = item.cloneNode(true);
    item.parentNode.replaceChild(newItem, item);

    // Adicionar evento de clique
    newItem.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      console.log("Clicado no card com ID:", id);
      movieModal.open(id);
    });

    // Tornar acessível por teclado
    newItem.setAttribute("tabindex", "0");
    newItem.setAttribute("role", "button");
    newItem.setAttribute("aria-label", "Ver detalhes do filme");

    newItem.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const id = newItem.getAttribute("data-id");
        movieModal.open(id);
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

function setupHeroButtons(movieModal) {
  const playButton = document.querySelector(".btn-play");
  const infoButton = document.querySelector(".btn-more");

  if (playButton) {
    playButton.addEventListener("click", () => {
      alert("Funcionalidade de reprodução será implementada!");
    });
  }

  if (infoButton) {
    infoButton.addEventListener("click", () => {
      movieModal.open("1"); // Abre o primeiro filme (Jóias Brutas)
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

// ========== INICIALIZAÇÃO ==========
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM carregado, inicializando...");

  // Inicializar modal
  const movieModal = initMovieModal();

  if (!movieModal) {
    console.error("Falha crítica: não foi possível inicializar o modal");
    return;
  }

  // Configurar itens do carrossel
  setupCarouselItems(movieModal);

  // Configurar comportamento do header no scroll
  handleHeaderScroll();

  // Configurar botões da seção hero
  setupHeroButtons(movieModal);

  // Configurar menu mobile
  setupMobileMenu();

  console.log("Inicialização concluída com sucesso!");
});

// Função global para debug
window.debugModal = function (movieId = 1) {
  const movieModal = initMovieModal();
  if (movieModal) {
    movieModal.open(movieId.toString());
  }
};
