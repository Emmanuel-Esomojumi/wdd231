import { escapeHTML } from "./utils.js";

// Builds one game card as a template literal
export function createGameCard(game, favorites = []) {
    const id = escapeHTML(game.id);
    const title = escapeHTML(game.title);
    const image = escapeHTML(game.image || "");
    const isFavorite = favorites.includes(String(game.id));

    return `
        <article class="game-card">
            ${image ? `
                <img
                    class="game-card__image"
                    src="${image}"
                    alt="${title}"
                    loading="lazy"
                    width="640"
                    height="360"
                >
            ` : ""}

            <span class="game-category">${escapeHTML(game.category)}</span>
            <h3>${title}</h3>
            <p>${escapeHTML(game.description)}</p>

            <div class="game-details">
                <span>Players: ${escapeHTML(game.players)}</span>
                <span>Level: ${escapeHTML(game.level)}</span>
            </div>

            <div class="card-actions">
                <button class="details-button" type="button" data-details-id="${id}">
                    Details<span class="visually-hidden"> about ${title}</span>
                </button>
                <button class="favorite-button" type="button" data-favorite-id="${id}"
                    aria-pressed="${isFavorite}">
                    <span aria-hidden="true">${isFavorite ? "♥" : "♡"}</span>
                    Favorite<span class="visually-hidden"> ${title}</span>
                </button>
            </div>
        </article>
    `;
}

// I update the button in place so keyboard focus stays where it was
export function showFavoriteState(button, isFavorite) {
    button.setAttribute("aria-pressed", String(isFavorite));
    button.querySelector("[aria-hidden]").textContent = isFavorite ? "♥" : "♡";
}