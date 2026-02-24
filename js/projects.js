import { projects } from "./data.js";

const grid = document.getElementById("projectsGrid");
if (grid) {
  const tabs = Array.from(document.querySelectorAll(".tab[data-filter]"));

  const createProjectCard = (project) => {
    const card = document.createElement("a");
    card.className = "projectCard";
    card.href = `project.html?slug=${encodeURIComponent(project.slug)}`;
    card.setAttribute("aria-label", `Открыть проект ${project.title}`);

    const cover = document.createElement("img");
    cover.src = project.cover;
    cover.alt = project.title;
    cover.loading = "lazy";
    cover.decoding = "async";
    cover.addEventListener("error", () => {
      cover.src = "assets/cover.jpg";
    });

    const info = document.createElement("div");
    info.className = "projectCard__info";

    const title = document.createElement("div");
    title.className = "projectCard__title";
    title.textContent = project.title;

    const type = document.createElement("div");
    type.className = "projectCard__type";
    type.textContent = project.typeLabel;

    info.append(title, type);
    card.append(cover, info);
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
