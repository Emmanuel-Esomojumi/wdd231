import { escapeHTML } from "./utils.js";

const competitionSearch = document.querySelector("#competition-search");
const competitionFilter = document.querySelector("#competition-filter");
const competitionCount = document.querySelector("#competition-count");
const competitionsList = document.querySelector("#competitions-list");
const competitionEmpty = document.querySelector("#competition-empty");

let allCompetitions = [];
let allGames = [];

// Builds one competition card as a template literal
function createCompetitionCard(competition) {
    const game = allGames.find((item) => item.title === competition.game);
    const image = game?.image ? escapeHTML(game.image) : "";
    const gameTitle = escapeHTML(competition.game);

    return `
        <article class="competition-card">
            ${image ? `
                <img
                    class="game-card__image"
                    src="${image}"
                    alt="${gameTitle}"
                    loading="lazy"
                    width="640"
                    height="360"
                >
            ` : ""}

            <span class="competition-game">${gameTitle}</span>
            <h3>${escapeHTML(competition.title)}</h3>
            <p>${escapeHTML(competition.description)}</p>

            <div class="competition-details">
                <span><strong>Format:</strong> ${escapeHTML(competition.format)}</span>
                <span><strong>Level:</strong> ${escapeHTML(competition.level)}</span>
                <span><strong>Location:</strong> ${escapeHTML(competition.location)}</span>
            </div>
        </article>
    `;
}

// Shows the competitions that match the search box and game filter
function displayCompetitions() {
    const searchText = competitionSearch.value.trim().toLowerCase();
    const selectedGame = competitionFilter.value;

    const matches = allCompetitions.filter((competition) => {
        const searchable = `
            ${competition.title} ${competition.game} ${competition.description}
            ${competition.location} ${competition.level} ${competition.format}
        `.toLowerCase();

        return searchable.includes(searchText) &&
            (selectedGame === "all" || competition.game === selectedGame);
    });

    competitionCount.textContent =
        `${matches.length} competition${matches.length === 1 ? "" : "s"} found`;

    competitionsList.innerHTML = matches.map(createCompetitionCard).join("");

    competitionEmpty.textContent =
        "No competitions match your search. Try another name or game.";
    competitionEmpty.hidden = matches.length > 0;
    competitionsList.hidden = matches.length === 0;
}

async function loadCompetitions() {
    try {
        const [competitionResponse, gamesResponse] = await Promise.all([
            fetch("data/competitions.json"),
            fetch("data/games.json")
        ]);

        if (!competitionResponse.ok) {
            throw new Error(
                `Unable to load competitions (status ${competitionResponse.status})`
            );
        }

        if (!gamesResponse.ok) {
            throw new Error(
                `Unable to load games (status ${gamesResponse.status})`
            );
        }

        const [competitions, games] = await Promise.all([
            competitionResponse.json(),
            gamesResponse.json()
        ]);

        if (!Array.isArray(competitions) || !Array.isArray(games)) {
            throw new Error("Competition and game data should be lists.");
        }

        allCompetitions = competitions;
        allGames = games;
        displayCompetitions();
    } catch (error) {
        console.error("Error loading competitions:", error);

        competitionCount.textContent = "Competitions could not be loaded.";
        competitionsList.innerHTML = "";
        competitionsList.hidden = true;
        competitionEmpty.textContent =
            "We couldn't load the competitions. Please refresh the page and try again.";
        competitionEmpty.hidden = false;
    }
}

if (competitionsList && competitionSearch && competitionFilter) {
    competitionSearch.addEventListener("input", displayCompetitions);
    competitionFilter.addEventListener("change", displayCompetitions);
    loadCompetitions();
}