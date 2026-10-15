import { fetchGames } from "./gamedata.js";
import { createGameCard } from "./gamecard.js";
import { setupGameCards } from "./cardevents.js";
import { getFavorites } from "./storage.js";

const gamesList = document.querySelector("#games-list");
const gameSearch = document.querySelector("#game-search");
const categoryFilter = document.querySelector("#category-filter");
const gamesCount = document.querySelector("#games-count");
const emptyMessage = document.querySelector("#empty-message");

let allGames = [];

// Shows the games that match the search box and the category
function displayGames() {
    if (allGames.length === 0) {
        return;
    }

    const searchTerm = gameSearch.value.trim().toLowerCase();
    const category = categoryFilter.value;

    const matches = allGames.filter((game) => {
        const searchable = `${game.title} ${game.description} ${game.category}`.toLowerCase();
        const matchesSearch = searchable.includes(searchTerm);
        const matchesCategory = category === "all" || game.category === category;

        return matchesSearch && matchesCategory;
    });

    const favorites = getFavorites();
    gamesList.innerHTML = matches
        .map((game) => createGameCard(game, favorites))
        .join("");

    gamesCount.textContent = `Showing ${matches.length} of ${allGames.length} games`;
    emptyMessage.hidden = matches.length > 0;
}

async function loadGames() {
    try {
        allGames = await fetchGames();

        if (allGames.length === 0) {
            gamesList.innerHTML =
                '<p class="empty-message">No games are available right now.</p>';
            gamesCount.textContent = "No games available.";
            return;
        }

        displayGames();
        setupGameCards(gamesList, allGames);
    } catch (error) {
        console.error("Error loading games:", error);
        gamesList.innerHTML = `
            <p class="empty-message">
                We couldn't load the games. Please refresh the page and try again.
            </p>
        `;
        gamesCount.textContent = "Games could not be loaded.";
    }
}

if (gamesList && gameSearch && categoryFilter) {
    gameSearch.addEventListener("input", displayGames);
    categoryFilter.addEventListener("change", displayGames);
    loadGames();
}
