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

// Enable reveal/parallax enhancements only when JS is running
if (document.body?.classList.contains("homeCinematic")) {
  document.body.classList.add("motion-ready");
}

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

// Reveal on scroll
const revealItems = [...document.querySelectorAll("[data-reveal]")];
const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (revealItems.length) {
  if (motionReduced || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }
}

// Cinematic parallax + hero dimming
const heroSection = document.querySelector(".cinemaHero");
const cinemaTopline = document.querySelector(".cinemaHero__topline");
const parallaxItems = motionReduced
  ? []
  : [...document.querySelectorAll("[data-parallax]")];

if (heroSection || parallaxItems.length) {
  let ticking = false;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const updateMotion = () => {
    if (heroSection) {
      const heroRect = heroSection.getBoundingClientRect();
      const progress = clamp(
        -heroRect.top / (heroSection.offsetHeight * 0.9),
        0,
        1
      );
      heroSection.style.setProperty("--hero-progress", progress.toFixed(3));
      if (cinemaTopline) {
        cinemaTopline.classList.toggle("is-contrast", progress > 0.18);
      }
    }

    parallaxItems.forEach((node) => {
      const wrap = node.closest(".parallaxMedia") || node;
      const rect = wrap.getBoundingClientRect();
      if (rect.bottom < -140 || rect.top > window.innerHeight + 140) return;

      const speed = Number(node.dataset.parallaxSpeed || "0.1");
      const centerOffset =
        window.innerHeight / 2 - (rect.top + rect.height / 2);
      const shift = clamp(centerOffset * speed, -120, 120);
      node.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(1.08)`;
    });

    ticking = false;
  };

  const queueUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateMotion);
  };

  updateMotion();
  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
}

// Map vertical mouse-wheel to horizontal scrolling in Selected Work rail
const showcaseRail = document.querySelector(".homeRefShowcase__grid");
if (showcaseRail) {
  showcaseRail.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const maxScrollLeft = showcaseRail.scrollWidth - showcaseRail.clientWidth;
      if (maxScrollLeft <= 0) return;

      const nextScrollLeft = showcaseRail.scrollLeft + event.deltaY;
      const willMove =
        (event.deltaY > 0 && showcaseRail.scrollLeft < maxScrollLeft) ||
        (event.deltaY < 0 && showcaseRail.scrollLeft > 0);

      if (!willMove) return;

      event.preventDefault();
      showcaseRail.scrollLeft = Math.max(0, Math.min(maxScrollLeft, nextScrollLeft));
    },
    { passive: false }
  );
}
