// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
if (menuBtn && mobileNav) {
  const setMobileNavState = (isOpen) => {
    mobileNav.classList.toggle("is-open", isOpen);
    mobileNav.setAttribute("aria-hidden", isOpen ? "false" : "true");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  menuBtn.setAttribute("aria-controls", "mobileNav");
  setMobileNavState(false);

  menuBtn.addEventListener("click", () => {
    setMobileNavState(!mobileNav.classList.contains("is-open"));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMobileNavState(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
      setMobileNavState(false);
    }
  });
}

// Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Demo form
const form = document.getElementById("form");
const note = document.getElementById("formNote");
if (form && note) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    note.textContent = "Заявка отправлена (демо). Подключим Telegram/почту/CRM.";
    form.reset();
  });
}
