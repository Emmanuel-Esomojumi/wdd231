import { toggleFavorite } from "./storage.js";
import { showFavoriteState } from "./gamecard.js";
import { openGameModal } from "./modal.js";

// One click listener on the container handles every card's buttons
export function setupGameCards(container, games) {
    container.addEventListener("click", (event) => {
        const favoriteButton = event.target.closest("[data-favorite-id]");
        const detailsButton = event.target.closest("[data-details-id]");

        if (favoriteButton) {
            const isFavorite = toggleFavorite(favoriteButton.dataset.favoriteId);
            showFavoriteState(favoriteButton, isFavorite);
        }

        if (detailsButton) {
            const game = games.find((item) => String(item.id) === detailsButton.dataset.detailsId);

            if (game) {
                openGameModal(game);
            }
        }
    });
}
