// fetches chamber members and shows 2-3 randomly chosen gold/silver spotlights on every load
const url = "data/members.json";
const spotlightList = document.getElementById("spotlightList");

async function getSpotlights() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const eligible = data.companies.filter(
      (company) => company.membership === "gold" || company.membership === "silver"
    );
    const count = Math.random() < 0.5 ? 2 : 3;
    const chosen = pickRandom(eligible, count);
    displaySpotlights(chosen);
  } catch (error) {
    spotlightList.innerHTML = "<p>Spotlights are unavailable right now.</p>";
    console.error("Error fetching spotlight data:", error);
  }
}

function pickRandom(array, count) {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function displaySpotlights(companies) {
  spotlightList.innerHTML = companies
    .map((company) => {
      const badgeClass = `badge-${company.membership}`;
      const badgeText = company.membership === "gold" ? "Gold Member" : "Silver Member";

      return `
      <li class="spotlight-card">
        <div class="spotlight-card__logo">
          <img src="${company.image}" alt="${company.name} logo" loading="lazy" width="160" height="80">
        </div>
        <div class="spotlight-card__body">
          <p class="spotlight-card__name">${company.name}</p>
          <p class="spotlight-card__detail">${company.address}</p>
          <p class="spotlight-card__detail">${company.phone}</p>
          <p class="spotlight-card__detail"><a href="${company.website}" target="_blank" rel="noopener">${company.website.replace("https://", "")}</a></p>
          <span class="badge ${badgeClass}">${badgeText}</span>
        </div>
      </li>
    `;
    })
    .join("");
}

getSpotlights();