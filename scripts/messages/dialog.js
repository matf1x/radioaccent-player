export function toggleModal(type, elements) {
  if (type === "open") {
    // open the modal
    elements.message.modal.component.showModal()
  } else if (type === "close") {
    // Close the modal
    elements.message.modal.component.close()

    // reset the form
    elements.message.modal.form.reset()

    // Reset the screens
    elements.message.modal.screens.complete.classList.remove("visible")
    elements.message.modal.screens.entry.classList.add("visible")
  }
}

export async function listenForButtons(elements) {
  // Listen for the close button
  elements.message.modal.buttons.close.forEach((item) => {
    item.addEventListener("click", function () {
      toggleModal("close", elements)
    });
  });

  // Listen for reset of the form
  elements.message.modal.form.addEventListener("reset", function (e) {
    toggleModal("close", elements)
  });

  // Listen for submit of the form
  elements.message.modal.form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const { submit } = await import("./api.js")
    submit(elements)
      .then(() => {
        elements.message.modal.screens.entry.classList.remove("visible")
        elements.message.modal.screens.complete.classList.add("visible")
        setTimeout(() => {
          toggleModal("close", elements)
        }, 5000);
      })
      .catch((e) => {
        config.message.modal.error.innerHTML = e.getMessage()
        config.message.modal.error.classList.add("visible")
      });
  });
}
