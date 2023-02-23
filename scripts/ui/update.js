/**
 * Update the song information on the UI
 * @param {Object} elements The UI elements
 * @param {Object} song The song data
 * @returns 
 */
export function updateSong(elements, song) {
    
    // Update the song information
    elements.song.labels.artist.innerHTML = song.artist;
    elements.song.labels.title.innerHTML = song.title;
    elements.song.images.cover.src = 'data:image/png;charset=utf-8;base64,' + song.cover;
    //elements.song.images.background.src = 'data:image/png;charset=utf-8;base64,' + song.cover;

    // Return to stop this function
    return;
}

/**
 * Update the UI to show the full player when loaded
 * @param {Object} elements The UI elements
 */
export async function showFullPlayer(elements) {
    const { icons } = await import('../config.js');
    elements.player.holder.classList.remove('is-loading');
    elements.message.buttons.create.innerHTML = icons.message + ' <span>Stuur bericht</span>';
    elements.player.buttons.playPause.innerHTML = icons.play;
}

export async function updateMediaSession(player, data) {
    // import the media session handler
    const { update } = await import('../ui/mediaSession.js');
    update(data);
}