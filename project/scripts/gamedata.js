// One place that loads the games so every page gets the same checks
export async function fetchGames() {
    const response = await fetch("data/games.json");

    // fetch doesn't throw on a 404, so I check the status myself
    if (!response.ok) {
        throw new Error(`Could not load games (status ${response.status})`);
    }

    const games = await response.json();

    if (!Array.isArray(games)) {
        throw new Error("The games data should be a list.");
    }

    // I skip any record that is missing the fields a card needs
    return games.filter((game) =>
        game && game.id !== undefined && game.title && game.category && game.description
    );
}
