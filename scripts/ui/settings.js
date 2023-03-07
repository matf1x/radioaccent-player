export function loadSettings(elements) {
    // Listen to the settings button
    elements.player.buttons.settings.addEventListener("click", () => {
        // Open the modal
        elements.player.modal.component.showModal()

        // Listen for the closing button
        const closeBtn = elements.player.modal.component.querySelectorAll('[data-action="close-modal"]');
        closeBtn.forEach(btn => {
            // Add the close action to every close button
            btn.addEventListener('click', () => {
                elements.player.modal.component.close()
            })
        })

        // Listen for field changes
        elements.player.modal.fields.quality.addEventListener('change', (e) => {
            // Get the selected quality
            const quality = e.target.value
        })

        // Listen for submit buttons
        elements.player.modal.component.querySelector('[data-action="save-settings"]').addEventListener('click', () => {
            alert('Dit is nog niet mogelijk!')
        })
    })
}