// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Nav: scrolled state + mobile menu ---------- */
const siteNav = document.getElementById("siteNav");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const onScroll = () => {
  siteNav.classList.toggle("scrolled", window.scrollY > 30);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
});
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

/* ---------- Reveal-on-scroll ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ---------- Property finder (client-side filter) ---------- */
const findBtn = document.getElementById("findBtn");
const grid = document.getElementById("propertyGrid");
const noResults = document.getElementById("noResults");
const cards = Array.from(grid.querySelectorAll(".p-card"));

function applyFilters() {
  const purpose = document.getElementById("f-purpose").value;
  const type = document.getElementById("f-type").value;
  const location = document.getElementById("f-location").value;

  let visibleCount = 0;
  cards.forEach(card => {
    const matches =
      (!purpose || card.dataset.purpose === purpose) &&
      (!type || card.dataset.type === type) &&
      (!location || card.dataset.location === location);
    card.style.display = matches ? "" : "none";
    if (matches) visibleCount++;
  });

  noResults.style.display = visibleCount === 0 ? "block" : "none";
  grid.style.display = visibleCount === 0 ? "none" : "grid";
}

findBtn.addEventListener("click", () => {
  document.getElementById("properties").scrollIntoView({ behavior: "smooth" });
  applyFilters();
});

/* ---------- Video showcase cards ---------- */
document.querySelectorAll(".video-card").forEach(card => {
  const video = card.querySelector("video");
  const playBtn = card.querySelector(".play-btn");
  const muteBtn = card.querySelector(".mute-btn");
  const src = card.dataset.video;
  let loaded = false;

  function loadSource() {
    if (loaded) return;
    const source = document.createElement("source");
    source.src = src;
    source.type = "video/mp4";
    video.appendChild(source);
    video.load();
    loaded = true;
  }

  playBtn.addEventListener("click", () => {
    // pause any other playing video first
    document.querySelectorAll(".video-card.playing").forEach(other => {
      if (other !== card) {
        other.classList.remove("playing");
        other.querySelector("video").pause();
      }
    });
    loadSource();
    video.muted = false;
    video.play();
    card.classList.add("playing");
  });

  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      card.classList.add("playing");
    } else {
      video.pause();
      card.classList.remove("playing");
    }
  });

  muteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    video.muted = !video.muted;
  });
});

/* ---------- Landmark lightbox ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCap = document.getElementById("lightboxCap");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".landmark").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.dataset.cap;
    lightboxCap.textContent = item.dataset.cap;
    lightbox.classList.add("open");
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImg.src = "";
}
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* ---------- Lead form -> WhatsApp ---------- */
document.getElementById("leadForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const interest = document.getElementById("interest").value;
  const message = document.getElementById("message").value.trim();

  const lines = [
    "Hello Amir Realty,",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Interested in: ${interest}`,
    `Message: ${message}`
  ].join("\n");

  const text = encodeURIComponent(lines);
  window.open(`https://wa.me/923086262091?text=${text}`, "_blank");
});
