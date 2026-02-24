const projects = [
  {
    slug: "horizon-house",
    label: "PROJECT 01:",
    title: "HORIZON HOUSE",
    tagline: "Дом, растворяющий границу между океаном и жильцом.",
    style: "modern",
    location: "Algarve, Portugal",
    area: "180 м²",
    year: "2024",
    cover: "assets/p1-1.jpg",
    quote: "НЕ ПУСТОТА.\nЯСНОСТЬ.",
    lead: "Горизонт становится частью интерьера: длинные линии, тишина, свет.",
    body: "Проект построен на редукции: один главный объем, терраса как продолжение гостиной, минимальный набор материалов. Переходы между внутренним и внешним пространством почти исчезают благодаря панорамным проемам и глубокой тени карнизов.",
    gallery: ["assets/p1-3.jpg", "assets/p1-2.jpg", "assets/p1-1.jpg", "assets/p1-2.jpg", "assets/p1-3.jpg"]
  },
  {
    slug: "forest-pavilion",
    label: "PROJECT 02:",
    title: "FOREST PAVILION",
    tagline: "Павильон в лесу: тёплое дерево и строгая геометрия.",
    style: "scandi",
    location: "Lisbon, Portugal",
    area: "96 м²",
    year: "2023",
    cover: "assets/p2-1.jpg",
    quote: "ТИШИНА —\nЭТО МАТЕРИАЛ.",
    lead: "Лёгкая структура, большие проемы, ощущение укрытия.",
    body: "Дом раскрывается в сторону просвета леса, но сохраняет приватность за счет глубины рам и сдвинутых объемов. Дерево внутри — как продолжение стволов снаружи.",
    gallery: ["assets/p2-1.jpg","assets/p2-2.jpg","assets/p2-1.jpg","assets/p2-2.jpg","assets/p2-1.jpg"]
  },
  {
    slug: "stone-frame",
    label: "PROJECT 03:",
    title: "STONE FRAME",
    tagline: "Каменный каркас и вырезы света — строго и спокойно.",
    style: "classic",
    location: "Baku, Azerbaijan",
    area: "210 м²",
    year: "2022",
    cover: "assets/p3-1.jpg",
    quote: "ПРОПОРЦИЯ.\nСВЕТ.\nРИТМ.",
    lead: "Классика без декора: конструкция говорит сама.",
    body: "Проект построен на последовательности “кадров”: вход — двор — гостиная — вид. Камень снаружи и светлые плоскости внутри делают контраст мягким.",
    gallery: ["assets/p3-1.jpg","assets/p3-2.jpg","assets/p3-1.jpg","assets/p3-2.jpg","assets/p3-1.jpg"]
  }
];

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("is-open");
    mobileNav.setAttribute("aria-hidden", mobileNav.classList.contains("is-open") ? "false" : "true");
  });
  mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileNav.classList.remove("is-open")));
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Index grid render
const grid = document.getElementById("grid");
if (grid) {
  const chips = Array.from(document.querySelectorAll("[data-filter]"));

  const render = (filter = "all") => {
    grid.innerHTML = "";
    const list = filter === "all" ? projects : projects.filter(p => p.style === filter);

    list.forEach((p, idx) => {
      const card = document.createElement("a");
      card.href = `project.html?slug=${encodeURIComponent(p.slug)}`;
      card.className = "card " + (idx === 0 ? "card--big" : "");
      card.innerHTML = `
        <img src="${p.cover}" alt="${p.title}">
        <div class="card__body">
          <div class="card__title">${p.title}</div>
          <div class="card__meta">${p.location} · ${p.area} · ${p.year}</div>
        </div>
      `;
      grid.appendChild(card);
    });
  };

  render("all");

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      render(chip.dataset.filter);
    });
  });
}

// Project page render
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
if (slug && document.getElementById("pTitle")) {
  const p = projects.find(x => x.slug === slug) || projects[0];

  document.title = `${p.title} — Portfolio`;

  document.getElementById("pLabel").textContent = p.label;
  document.getElementById("pTitle").textContent = p.title;
  document.getElementById("pTagline").textContent = p.tagline;

  const cover = document.getElementById("pCover");
  cover.src = p.cover;
  cover.alt = p.title;

  document.getElementById("pQuote").textContent = p.quote;
  document.getElementById("pLead").textContent = p.lead;
  document.getElementById("pBody").textContent = p.body;

  const meta = document.getElementById("pMeta");
  meta.innerHTML = `
    <div><div class="meta__k">Локация</div><div class="meta__v">${p.location}</div></div>
    <div><div class="meta__k">Площадь</div><div class="meta__v">${p.area}</div></div>
    <div><div class="meta__k">Год</div><div class="meta__v">${p.year}</div></div>
    <div><div class="meta__k">Стиль</div><div class="meta__v">${p.style}</div></div>
  `;

  const gallery = document.getElementById("pGallery");
  gallery.innerHTML = p.gallery.map(src => `<img src="${src}" alt="${p.title}">`).join("");
}

// Demo form
const form = document.getElementById("form");
const note = document.getElementById("formNote");
if (form && note) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    note.textContent = "Заявка отправлена (демо). Подключим отправку в Telegram/почту/CRM.";
    form.reset();
  });
} 