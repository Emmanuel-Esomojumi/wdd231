// Favorites live in localStorage so they survive a page reload
const FAVORITES_KEY = "matchup-favorites";

// I fall back to an empty list if storage is blocked or the saved value is broken
export function getFavorites() {
    try {
        const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
        return Array.isArray(saved) ? saved.map(String) : [];
    } catch (error) {
        console.error("Could not read favorites:", error);
        return [];
    }
}

function saveFavorites(favorites) {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        return true;
    } catch (error) {
        console.error("Could not save favorites:", error);
        return false;
    }
}

// Adds or removes one game and returns true if it is now a favorite
export function toggleFavorite(gameId) {
    const id = String(gameId);
    const favorites = getFavorites();
    const isFavorite = favorites.includes(id);
    const updated = isFavorite
        ? favorites.filter((savedId) => savedId !== id)
        : [...favorites, id];

    // If saving fails I keep the old state so the button never lies
    if (!saveFavorites(updated)) {
        return isFavorite;
    }

    return !isFavorite;
}
