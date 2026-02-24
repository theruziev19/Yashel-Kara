import { projects } from "./data.js";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const titleEl = document.getElementById("pTitle");
const fallbackImage = "assets/cover.jpg";

if (titleEl) {
  if (!slug) {
    window.location.replace("projects.html");
  } else {
    const p = projects.find(x => x.slug === slug);
    if (!p) {
      window.location.replace("projects.html");
    } else {
      document.title = `${p.title} — Портфолио`;
      document.getElementById("pTypeLabel").textContent = p.typeLabel;
      titleEl.textContent = p.title;
      document.getElementById("pTagline").textContent = p.tagline;
      document.getElementById("pBreadcrumbCurrent").textContent = p.title;

      const facts = document.getElementById("pFacts");
      facts.innerHTML = "";
      const year = Number(p.meta.year);
      const designYear = Number.isInteger(year) ? String(year - 1) : p.meta.year;
      const factItems = [
        ["Студия", "Yashel KARA"],
        ["Архитекторы", p.authors || "Yashel Kara Team"],
        ["Расположение", p.meta.location],
        ["Площадь", p.meta.area],
        ["Год реализации", p.meta.year],
        ["Год проектирования", p.designYear || designYear],
        ["Категория", p.category === "interior" ? "Интерьеры" : "Частные дома"],
      ];
      factItems.forEach(([label, value]) => {
        const item = document.createElement("li");
        const key = document.createElement("span");
        key.className = "projectEditorial__factLabel";
        key.textContent = label;
        const val = document.createElement("span");
        val.className = "projectEditorial__factValue";
        val.textContent = value;
        item.append(key, val);
        facts.appendChild(item);
      });

      const narrative = document.getElementById("pNarrative");
      narrative.innerHTML = "";
      const descriptionParts = [
        p.lead,
        ...(Array.isArray(p.description) && p.description.length ? p.description : [p.body]),
      ];
      descriptionParts.forEach((text) => {
        const paragraph = document.createElement("p");
        paragraph.className = "muted";
        paragraph.textContent = text;
        narrative.appendChild(paragraph);
      });

      const layoutSection = document.getElementById("pLayoutSection");
      const plans = document.getElementById("pPlans");
      plans.innerHTML = "";
      if (Array.isArray(p.plans) && p.plans.length) {
        layoutSection.hidden = false;
        p.plans.forEach((plan) => {
          const card = document.createElement("article");
          card.className = "projectEditorial__plan";

          const title = document.createElement("h3");
          title.className = "projectEditorial__planTitle";
          title.textContent = plan.title;
          card.appendChild(title);

          const list = document.createElement("div");
          list.className = "projectEditorial__planList";

          plan.rooms.forEach(([name, area]) => {
            const row = document.createElement("div");
            row.className = "projectEditorial__planRow";
            const key = document.createElement("span");
            key.textContent = name;
            const val = document.createElement("span");
            val.textContent = area;
            row.append(key, val);
            list.appendChild(row);
          });

          card.appendChild(list);
          plans.appendChild(card);
        });
      } else {
        layoutSection.hidden = true;
      }

      const visuals = document.getElementById("pVisuals");
      visuals.innerHTML = "";
      const visualSources = [p.cover, ...p.gallery];
      const uniqueVisuals = visualSources.filter((src, index, all) => all.indexOf(src) === index);
      uniqueVisuals.forEach((src, index) => {
        const figure = document.createElement("figure");
        figure.className = `projectEditorial__visual ${
          index < 2 ? "projectEditorial__visual--wide" : "projectEditorial__visual--standard"
        }`;

        const image = document.createElement("img");
        image.src = src;
        image.alt = p.title;
        image.loading = index === 0 ? "eager" : "lazy";
        image.decoding = "async";
        image.addEventListener("error", () => {
          image.src = fallbackImage;
        });
        figure.appendChild(image);
        visuals.appendChild(figure);
      });
    }
  }
}
