// ===== Helpers =====
const $ = (selector) => document.querySelector(selector);

const themeBtn = $("#themeBtn");
const yearEl = $("#year");
const greetingEl = $("#greeting");
const navToggle = $("#navToggle");
const navLinks = $("#navLinks");
const form = $("#contactForm");
const formMsg = $("#formMsg");

// ===== Footer year =====
yearEl.textContent = new Date().getFullYear();

// ===== Greeting by time =====
(function setGreetingByTime() {
  const hour = new Date().getHours();
  let msg = "Hello!";

  if (hour >= 5 && hour < 12) msg = "Good morning!";
  else if (hour >= 12 && hour < 17) msg = "Good afternoon!";
  else if (hour >= 17 && hour < 22) msg = "Good evening!";
  else msg = "Good night!";

  greetingEl.textContent = msg;
})();

// ===== Theme toggle (dark/light) =====
(function initTheme() {
  const saved = localStorage.getItem("theme"); // "dark" or "light"
  if (saved === "dark") document.body.classList.add("dark");
  updateThemeIcon();
})();

function updateThemeIcon() {
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "☀️" : "🌙";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon();
});

// ===== Mobile nav toggle =====
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after clicking a link (mobile)
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && navLinks.classList.contains("open")) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// ===== Contact form (front-end only) =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const message = $("#message").value.trim();

  if (!name || !email || !message) {
    formMsg.textContent = "Please fill in all fields.";
    return;
  }

  // basic email check (simple, not perfect)
  if (!email.includes("@") || !email.includes(".")) {
    formMsg.textContent = "Please enter a valid email.";
    return;
  }

  formMsg.textContent = `Thanks, ${name}! Your message is ready (no backend connected).`;
  form.reset();
});
