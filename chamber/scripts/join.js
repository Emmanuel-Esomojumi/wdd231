const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}


const modalButtons = document.querySelectorAll("[data-modal]");

modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            modal.showModal();
        }
    });
});


const closeButtons = document.querySelectorAll(".modal-close");

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});


const dialogs = document.querySelectorAll("dialog");

dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
        const dialogBox = dialog.getBoundingClientRect();

        const clickedOutside =
            event.clientX < dialogBox.left ||
            event.clientX > dialogBox.right ||
            event.clientY < dialogBox.top ||
            event.clientY > dialogBox.bottom;

        if (clickedOutside) {
            dialog.close();
        }
    });
});