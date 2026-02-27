window.addEventListener("load", () => {
  const video = document.getElementById("introVideo");
  const audio = document.getElementById("tudumAudio");
  const container = document.getElementById("video-container");
  const profilesScreen = document.getElementById("profiles-screen");
  const mainProfile = document.getElementById("mainProfile");

  if (!container || !video) {
    console.warn("Elementos da intro não encontrados");
    showProfiles();
    return;
  }

  // Bloquear scroll durante a intro
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.width = "100%";

  // Mobile source
  const isMobile = window.innerWidth < 1200;
  const videoSource = video.querySelector("source");
  if (isMobile && video.dataset.mobileSrc) {
    videoSource.src = video.dataset.mobileSrc;
    video.load();
  }

  video.play().catch(() => console.log("Autoplay do vídeo falhou."));

  setTimeout(() => {
    audio?.play().catch(() => console.log("Autoplay do áudio falhou."));
  }, 1400);

  let introHidden = false;

  function hideIntro() {
    if (introHidden) return;
    introHidden = true;

    video.pause();
    video.currentTime = 0;

    container.style.transition = "opacity 0.5s ease";
    container.style.opacity = "0";

    setTimeout(() => {
      container.style.display = "none";

      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      void document.body.offsetHeight;

      showProfiles();
    }, 500);
  }

  video.addEventListener("ended", hideIntro);
  setTimeout(hideIntro, 7000);
  container.addEventListener("click", hideIntro);

  // ===== MOSTRAR PERFIS =====
  function showProfiles() {
    profilesScreen.classList.add("visible", "entering");
  }

  // ===== CLICAR NO PERFIL =====
  mainProfile.addEventListener("click", () => {
    profilesScreen.classList.remove("entering");
    profilesScreen.classList.add("exiting");

    setTimeout(() => {
      window.location.href = "./main.html";
    }, 500);
  });

  // ===== FALLBACK AVATAR =====
  const avatarImg = document.querySelector(".profile-avatar img");
  if (avatarImg) {
    avatarImg.onerror = () => {
      const avatarDiv = avatarImg.parentElement;
      avatarDiv.classList.add("no-image");
      avatarDiv.innerHTML = "S";
    };
  }
});
