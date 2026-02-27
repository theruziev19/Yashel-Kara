import { projects } from "./data.js?v=20260228";

const site = {
  studioName: "Yashel KARA",
  email: "hello@example.com",
  phoneDisplay: "+7 (000) 000-00-00",
  phoneRaw: "+70000000000",
  instagramDisplay: "@studio",
  instagramUrl: "https://instagram.com/studio",
};

const parseArea = (areaValue) => {
  const normalized = String(areaValue ?? "")
    .replace(",", ".")
    .replace(/[^0-9.]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const years = projects
  .map((project) => Number(project.meta?.year))
  .filter((year) => Number.isInteger(year));

const currentYear = new Date().getFullYear();
const startYear = years.length ? Math.min(...years) : currentYear;
const practiceYears = Math.max(1, currentYear - startYear + 1);
const totalArea = Math.round(
  projects.reduce((sum, project) => sum + parseArea(project.meta?.area), 0)
);

const metrics = {
  currentYear: String(currentYear),
  projectsCount: String(projects.length),
  architectureCount: String(
    projects.filter((project) => project.category === "architecture").length
  ),
  interiorCount: String(
    projects.filter((project) => project.category === "interior").length
  ),
  practiceYears: String(practiceYears),
  totalArea: `${totalArea} м²`,
};

const textMap = {
  studioName: site.studioName,
  email: site.email,
  phone: site.phoneDisplay,
  instagram: site.instagramDisplay,
  ...metrics,
};

const hrefMap = {
  email: `mailto:${site.email}`,
  phone: `tel:${site.phoneRaw}`,
  instagram: site.instagramUrl,
};

document.querySelectorAll("[data-site-text]").forEach((node) => {
  const key = node.getAttribute("data-site-text");
  if (key && textMap[key] !== undefined) {
    node.textContent = textMap[key];
  }
});

document.querySelectorAll("[data-site-href]").forEach((node) => {
  const key = node.getAttribute("data-site-href");
  if (key && hrefMap[key] !== undefined) {
    node.setAttribute("href", hrefMap[key]);
  }
});
