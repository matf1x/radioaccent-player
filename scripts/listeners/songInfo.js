/** Import the config */
import { config } from '../config.js';
import { setMediaSession } from '../instances/mediaSession.js';

/** Setup the listener */
export async function getSongInformation() {

    // Create a fetch and return it
    await fetch(config.api.pointers.song, {
        method: 'GET'
    }).then((response) => {
        if(!response.ok) {
            alert('Het lijkt er op dat er iets mis is met de internetverbinding. Probeer later opnieuw.');
            throw new Error('Song info could not be loaded from the API.');
        }
        return response.json();
    }).then((data) => {
        
        // Check if the fetched info is newer than the stored one
        if(data['start'] === config.song.data.start) return;

        // If it is newer, send the info to the config
        config.song.data = data[0];

        // Return a promise to let the script know everything was OK
        return Promise.resolve();

    }).catch((error) => {
        alert('Het lijkt er op dat er iets mis is met de internetverbinding. Probeer later opnieuw.');
        throw new Error('Song info could not be loaded from the API.');
    });
    
}

/**
 * Show the song data we received from the API
 * @param {Object} data The song data from the API
 */
export function updateSongInfo() {

    // Show the correct information
    config.song.labels.artist.innerHTML = config.song.data.artist;
    config.song.labels.title.innerHTML = config.song.data.title;
    config.song.images.cover.src = 'data:image/png;charset=utf-8;base64,' + config.song.data.cover;
    config.song.images.background.src = 'data:image/png;charset=utf-8;base64,' + config.song.data.cover;

    // Set the Media Session info
    setMediaSession();
}