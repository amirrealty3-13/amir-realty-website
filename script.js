document.getElementById("year").textContent = new Date().getFullYear();

const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav nav");
menu.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll(".nav nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

function sendLead(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const interest = document.getElementById("interest").value;
  const message = document.getElementById("message").value.trim();
  const text = `Hello Amir Realty,%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AInterested in: ${encodeURIComponent(interest)}%0AMessage: ${encodeURIComponent(message)}`;
  window.open(`https://wa.me/923305522260?text=${text}`, "_blank");
}
