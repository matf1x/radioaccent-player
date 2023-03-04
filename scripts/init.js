/**
 * Initialize the player
 */
export async function init() {

    // Load the correct files
    const player = await import('./player/main.js')
    player.start.then(async (resp) => {
        // Get the song data
        let songCall = await import('./song/main.js')
        try {
            // Get the current song
            const songData = await songCall.getData()

            // Load the config file
            const { song } = await import('./config.js')

            // Set the data to the helper
            song.data = songData;

            // Set the UI
            const ui = await import('./ui/update.js')
            ui.updateSong(resp.elements, song.data)
            ui.showFullPlayer(resp.elements)
            ui.updateMediaSession(resp.player, song.data)

            // Listen for player events
            player.listen(resp)

            // Listen for message button click
            resp.elements.message.buttons.create.addEventListener('click', async() => {
                const modal = await import('./messages/main.js')
                modal.toggleModal('open', resp.elements)
            })

            // Setup a reloader for the song information
            setInterval(async () => {
                // Call the song API
                const songData = await songCall.getData()

                // Check if the song is newer than we already have
                if(songData['start'] === song.data.start) {
                    console.log('Same song')
                    return
                }

                // Set the data to the helper
                song.data = songData;

                // Set the UI
                ui.updateSong(resp.elements, song.data)
                ui.updateMediaSession(resp.player, song.data)
            }, song.reload);

        } catch(error) {
            // Show the error
            console.log(error)
            alert(error)
        }
    }).catch((e) => { alert('Er liep iets fout bij het laden van de player! probeer later opnieuw') })
}