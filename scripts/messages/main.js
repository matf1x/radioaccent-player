// Setup dialog
export async function toggleModal(type, elements) {
  const dialog = await import("./dialog.js")
  dialog.toggleModal(type, elements)
  dialog.listenForButtons(elements)
}
