import { fetchGames } from "./gamedata.js";
import { createGameCard } from "./gamecard.js";
import { setupGameCards } from "./cardevents.js";
import { getFavorites } from "./storage.js";

const featuredGames = document.querySelector("#featured-games");

// The home page shows the first three games as a preview
async function showFeaturedGames() {
    try {
        const games = await fetchGames();
        const featured = games.slice(0, 3);

        if (featured.length === 0) {
            featuredGames.innerHTML =
                '<p class="empty-message">No games are available right now.</p>';
            return;
        }

        const favorites = getFavorites();
        featuredGames.innerHTML = featured
            .map((game) => createGameCard(game, favorites))
            .join("");

        setupGameCards(featuredGames, games);
    } catch (error) {
        console.error("Unable to load featured games:", error);
        featuredGames.innerHTML = `
            <p class="empty-message">
                We couldn't load the games. Please refresh the page and try again.
            </p>
        `;
    }
}

if (featuredGames) {
    showFeaturedGames();
}
