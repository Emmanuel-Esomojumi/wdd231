// The form sends its answers in the URL, so I read them back with URLSearchParams
const params = new URLSearchParams(window.location.search);

const summary = document.querySelector("#summary");
const thanksMessage = document.querySelector("#thanks-message");
const missingMessage = document.querySelector("#missing-message");

function formatSubmitted(value) {
    const date = new Date(value);

    if (!value || Number.isNaN(date.getTime())) {
        return "Not provided";
    }

    return date.toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" });
}

const firstName = params.get("firstName");
const email = params.get("email");

// Someone who opens this page directly has no form data to show
if (!firstName || !email) {
    summary.hidden = true;
    thanksMessage.hidden = true;
    missingMessage.hidden = false;
} else {
    const interests = params.getAll("games");

    const answers = [
        ["Name", `${firstName} ${params.get("lastName") || ""}`.trim()],
        ["Email", email],
        ["City", params.get("city") || "Not provided"],
        ["Experience level", params.get("level") || "Not provided"],
        ["Interests", interests.length > 0 ? interests.join(", ") : "None selected"],
        ["About you", params.get("about") || "Not provided"],
        ["Submitted", formatSubmitted(params.get("timestamp"))]
    ];

    document.querySelector("#thanks-name").textContent = firstName;

    // I build the rows with textContent so typed text is never read as HTML
    answers.forEach(([label, value]) => {
        const row = document.createElement("div");
        const term = document.createElement("dt");
        const detail = document.createElement("dd");

        term.textContent = label;
        detail.textContent = value;
        row.append(term, detail);
        summary.append(row);
    });
}
