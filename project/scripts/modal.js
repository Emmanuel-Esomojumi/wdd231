const dialog = document.querySelector("#game-dialog");

// Fills the dialog with one game and opens it
export function openGameModal(game) {
    if (!dialog) {
        return;
    }

    dialog.querySelector("#game-dialog-category").textContent = game.category;
    dialog.querySelector("#game-dialog-title").textContent = game.title;
    dialog.querySelector("#game-dialog-description").textContent = game.description;
    dialog.querySelector("#game-dialog-players").textContent = game.players;
    dialog.querySelector("#game-dialog-level").textContent = game.level;

    dialog.showModal();
}

// Clicking the dark backdrop closes the dialog too. Escape already works.
if (dialog) {
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
}
