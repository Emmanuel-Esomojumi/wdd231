// Shared code that runs on every page: the footer and the mobile menu

const menuToggle = document.querySelector("#menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const currentYear = document.querySelector("#current-year");
const lastUpdated = document.querySelector("#last-updated");

// Footer: the year, and the date this page was last modified
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastUpdated) {
    const modified = new Date(document.lastModified);

    if (Number.isNaN(modified.getTime())) {
        lastUpdated.textContent = "Unavailable";
    } else {
        lastUpdated.textContent = modified.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        lastUpdated.dateTime = modified.toISOString();
    }
}

// Mobile menu
if (menuToggle && primaryNav) {
    const desktopQuery = window.matchMedia("(min-width: 800px)");

    function setMenu(isOpen) {
        primaryNav.classList.toggle("is-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    }

    menuToggle.addEventListener("click", () => {
        setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    // Picking a link closes the menu
    primaryNav.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setMenu(false);
        }
    });

    // Escape closes it and gives focus back to the button
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            setMenu(false);
            menuToggle.focus();
        }
    });

    // Tapping outside the menu closes it
    document.addEventListener("click", (event) => {
        if (!primaryNav.contains(event.target) && !menuToggle.contains(event.target)) {
            setMenu(false);
        }
    });

    // The menu resets when the screen grows to the desktop layout
    desktopQuery.addEventListener("change", () => setMenu(false));
}
