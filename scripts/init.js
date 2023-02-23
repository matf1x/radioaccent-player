/**
 * Initialize the player
 */
export async function init() {
    // Load the correct files
    const player = await import('./player/main.js');
    player.start.then(async (resp) => {
        // Get the song data
        let song = await import('./song/main.js');
        song.getData.then(async (data) => {
            // Set the UI
            const ui = await import('./ui/update.js');
            ui.updateSong(resp.elements, data);
            ui.showFullPlayer(resp.elements);
            ui.updateMediaSession(resp.player, data);
            player.listen(resp);
        }).catch((e) => { console.log(e); alert('Er liep iets fout bij het laden van de player! probeer later opnieuw'); });

    }).catch((e) => { alert('Er liep iets fout bij het laden van de player! probeer later opnieuw'); });
}