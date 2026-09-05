// footer: current year and when this page was last modified
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last updated: ${document.lastModified}`;
