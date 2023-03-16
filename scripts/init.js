/**
 * Initialize the player
 */
export async function init() {

  // Load the required files to initialize the player
  const { song, audio, elements } = await import("./config.js")
  const { loadSettings } = await import("./ui/settings.js")
  
  // Check if the device is online (connected to a wireless network/carrier)
  if(navigator.onLine) {
    // Load the correct files
    const player = await import("./player/main.js")
    player.start
    .then(async (resp) => {

      // Load the settings
      loadSettings(elements, audio, resp.player);

      // Get the song data
      let songCall = await import("./song/main.js")
      try {
        // Get the current song
        const songData = await songCall.getData()

        // Set the data to the helper
        song.data = songData

        // Set the UI
        const ui = await import("./ui/update.js")
        ui.updateSong(resp.elements, song.data)
        ui.showFullPlayer(resp.elements)
        ui.updateMediaSession(resp.player, song.data)

        // Listen for player events
        player.listen(resp)

        // Listen for message button click
        resp.elements.message.buttons.create.addEventListener(
          "click",
          async () => {
            const modal = await import("./messages/main.js")
            modal.toggleModal("open", resp.elements)
          }
        );

        // Setup a reloader for the song information
        setInterval(async () => {
          // Call the song API
          const songData = await songCall.getData()

          // Check if the song is newer than we already have
          if (songData["start"] === song.data.start) {
            return
          }

          // Set the data to the helper
          song.data = songData

          // Set the UI
          ui.updateSong(resp.elements, song.data)
          ui.updateMediaSession(resp.player, song.data)
        }, song.reload)
      } catch (error) {
        alert(error)
      }
    })
    .catch((e) => {
      // Go to the offline page because something went wrong
      // This will be triggerd mostly when the device is not connected to the internet
      window.location = './offline.html'
    })
  } else {
    window.location = './offline.html'
  }
}
