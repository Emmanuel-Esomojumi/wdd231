// fetches chamber member data and renders it as toggleable grid/list cards
const url = "data/members.json";
const directoryList = document.getElementById("directoryList");
const directoryCount = document.getElementById("directoryCount");
const gridBtn = document.getElementById("gridViewBtn");
const listBtn = document.getElementById("listViewBtn");

const badgeLabels = {
  np: "NP Member",
  bronze: "Bronze Member",
  silver: "Silver Member",
  gold: "Gold Member",
};

async function getMembers() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.companies);
  } catch (error) {
    directoryList.innerHTML = `<p>Sorry, member information could not be loaded right now.</p>`;
    console.error("Error fetching member data:", error);
  }
}

function displayMembers(companies) {
  directoryCount.textContent = `${companies.length} member businesses`;

  directoryList.innerHTML = companies
    .map((company) => {
      const badgeClass = `badge-${company.membership}`;
      const badgeText = badgeLabels[company.membership] || "Member";

      return `
      <li class="member-card">
        <div class="member-card__logo">
          <img src="${company.image}" alt="${company.name} logo" loading="lazy" width="200" height="100">
        </div>
        <div class="member-card__body">
          <p class="member-card__category">${company.category}</p>
          <p class="member-card__name">${company.name}</p>
          <p class="member-card__tagline">${company.tagline}</p>
          <p class="member-card__description">${company.description}</p>
          <div class="member-card__details">
            <p><strong>Address:</strong> ${company.address}</p>
            <p><strong>Phone:</strong> ${company.phone}</p>
            <p><strong>Email:</strong> <a href="mailto:${company.email}">${company.email}</a></p>
            <p><strong>Website:</strong> <a href="${company.website}" target="_blank" rel="noopener">${company.website.replace("https://", "")}</a></p>
          </div>
          <div class="member-card__footer">
            <span class="badge ${badgeClass}">${badgeText}</span>
          </div>
        </div>
      </li>
    `;
    })
    .join("");
}

function setView(view) {
  const isList = view === "list";
  directoryList.classList.toggle("is-list-view", isList);
  gridBtn.classList.toggle("is-active", !isList);
  listBtn.classList.toggle("is-active", isList);
  gridBtn.setAttribute("aria-pressed", String(!isList));
  listBtn.setAttribute("aria-pressed", String(isList));
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

getMembers();