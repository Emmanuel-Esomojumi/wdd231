import { places } from "../data/places.mjs";

const grid = document.querySelector("#discoverGrid");
const visitMessage = document.querySelector("#visitMessage");
const STORAGE_KEY = "ekoDiscoverLastVisit";
const DAY_IN_MS = 24 * 60 * 60 * 1000;

function showVisitMessage() {
  const now = Date.now();
  let previousVisit = 0;


  try {
    previousVisit = Number(localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    previousVisit = 0;
  }

  if (!Number.isFinite(previousVisit) || previousVisit <= 0) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const elapsed = now - previousVisit;

    if (elapsed < DAY_IN_MS) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const days = Math.floor(elapsed / DAY_IN_MS);
      visitMessage.textContent = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
  }

  try {
    localStorage.setItem(STORAGE_KEY, String(now));
  } catch (error) {

  }
}

function createPlaceCard(place, index) {
  const article = document.createElement("article");
  article.className = "discover-card";

  const figure = document.createElement("figure");
  figure.className = "discover-card__image";
  const image = document.createElement("img");
  image.src = place.image;
  image.alt = place.alt;
  image.width = 300;
  image.height = 200;
  image.decoding = "async";

  image.loading = index === 0 ? "eager" : "lazy";
  figure.append(image);

  const body = document.createElement("div");
  body.className = "discover-card__body";

  const heading = document.createElement("h2");
  heading.textContent = place.name;

  const address = document.createElement("address");
  address.textContent = place.address;

  const description = document.createElement("p");
  description.textContent = place.description;

  const more = document.createElement("p");
  more.className = "discover-card__more";
  more.id = `more-${place.id}`;
  more.textContent = place.moreInfo;
  more.hidden = true;

  const button = document.createElement("button");
  button.className = "discover-card__button";
  button.type = "button";
  button.textContent = "Learn More";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", more.id);
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    more.hidden = expanded;
    button.setAttribute("aria-expanded", String(!expanded));
    button.textContent = expanded ? "Learn More" : "Show Less";
  });

  body.append(heading, address, description, more, button);
  article.append(figure, body);
  return article;
}

function renderPlaces() {
  grid.replaceChildren(...places.map(createPlaceCard));
}

showVisitMessage();
renderPlaces();
