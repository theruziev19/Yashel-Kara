import { projects } from "./data.js?v=20260228";

const grid = document.getElementById("projectsGrid");
if (grid) {
  const tabs = Array.from(document.querySelectorAll(".tab[data-filter]"));
  const locationShortMap = {
    "Raubichi, Belarus": "RAUBICHI, BY",
    "Algarve, Portugal": "ALGARVE, PT",
    "Prague, Czechia": "PRAGUE, CZ",
    "Lisbon, Portugal": "LISBON, PT",
    "Riga, Latvia": "RIGA, LV",
    "Tallinn, Estonia": "TALLINN, EE",
    "Vilnius, Lithuania": "VILNIUS, LT",
  };

  const getProjectMeta = (project) => {
    const location = locationShortMap[project.meta.location] || project.meta.location;
    return `${project.meta.year} / ${location}`;
  };

  const createProjectCard = (project) => {
    const card = document.createElement("a");
    card.className = "projectCard";
    card.href = `project.html?slug=${encodeURIComponent(project.slug)}&v=20260228`;
    card.setAttribute("aria-label", `Открыть проект ${project.title}`);

    const media = document.createElement("div");
    media.className = "projectCard__media";

    const cover = document.createElement("img");
    cover.src = project.cover;
    cover.alt = `Визуал проекта ${project.title}`;
    cover.loading = "lazy";
    cover.decoding = "async";
    cover.addEventListener("error", () => {
      cover.src = "assets/cover.jpg";
    });
    media.appendChild(cover);

    const info = document.createElement("div");
    info.className = "projectCard__info";

    const title = document.createElement("p");
    title.className = "projectCard__title";
    title.textContent = project.title;

    const meta = document.createElement("p");
    meta.className = "projectCard__meta";
    meta.textContent = getProjectMeta(project);

    const description = document.createElement("p");
    description.className = "projectCard__description";
    description.textContent = project.tagline || project.body;

    const cta = document.createElement("span");
    cta.className = "projectCard__cta";
    cta.textContent = "ОТКРЫТЬ ПРОЕКТ →";

    info.append(title, meta, description, cta);
    card.append(media, info);
    return card;
  };

  const render = (filter = "all") => {
    grid.innerHTML = "";

    const list = (filter === "all")
      ? projects
      : projects.filter(p => p.category === filter);

    if (!list.length) {
      const empty = document.createElement("p");
      empty.className = "projectsEmpty";
      empty.textContent = "По этому фильтру пока нет проектов.";
      grid.appendChild(empty);
      return;
    }

    list.forEach((project) => {
      grid.appendChild(createProjectCard(project));
    });
  };

  render("all");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => { t.classList.remove("is-active"); t.setAttribute("aria-selected","false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected","true");
      render(tab.dataset.filter);
    });
  });
}
