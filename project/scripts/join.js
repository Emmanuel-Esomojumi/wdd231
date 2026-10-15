import { fetchGames } from "./gamedata.js";
import { getFavorites } from "./storage.js";

const form = document.querySelector(".join-form");
const timestamp = document.querySelector("#timestamp");
const favoritesNote = document.querySelector("#favorites-note");

// Hidden field: I record when the form was opened
if (timestamp) {
    timestamp.value = new Date().toISOString();
}

// I only show the red error style after a field has been visited or submitted
if (form) {
    form.addEventListener("focusout", (event) => event.target.classList.add("touched"));
    form.addEventListener("invalid", (event) => event.target.classList.add("touched"), true);
}

// If the visitor saved favorite games, I tick the matching interests for them
async function prefillInterests() {
    const favorites = getFavorites();

    if (favorites.length === 0) {
        return;
    }

    try {
        const games = await fetchGames();
        const categories = [...new Set(
            games
                .filter((game) => favorites.includes(String(game.id)))
                .map((game) => game.category)
        )];

        categories.forEach((category) => {
            const checkbox = document.querySelector(`input[name="games"][value="${category}"]`);

            if (checkbox) {
                checkbox.checked = true;
            }
        });

        if (categories.length > 0 && favoritesNote) {
            favoritesNote.textContent =
                "We ticked these interests from the games you saved as favorites.";
            favoritesNote.hidden = false;
        }
    } catch (error) {
        // The form still works without this, so I only log it
        console.warn("Could not prefill interests:", error);
    }
}

prefillInterests();
