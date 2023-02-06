/** Import the config */
import { config } from '../config.js';
import { setMediaSession } from '../instances/mediaSession.js';

/** Setup the listener */
export function getSongInformation() {

    // Fetch the information
    fetch(config.api.pointers.song, {
        method: 'GET'
    }).then((data) => {
        if(!data.ok) { alert('De song informatie kon niet opgehaald worden.'); }
        return data.json();
    }).then((data) => {
        showSongInfo(data[0]);
    }).catch((error) => {
        alert('De song informatie kon niet opgehaald worden.');
    });

}

/**
 * Show the song data we received from the API
 * @param {Object} data The song data from the API
 */
function showSongInfo(data) {

    // Check if the data is same as the current one
    // If it is the same song, stop the process
    if(data['start'] === config.song.data.start) return;

    // Else, set the song info to the config holder
    config.song.data = data;

    // Show the correct information
    config.song.labels.artist.innerHTML = data['artist'];
    config.song.labels.title.innerHTML = data['title'];
    config.song.images.cover.src = 'data:image/png;charset=utf-8;base64,' + data['cover'];
    config.song.images.background.src = 'data:image/png;charset=utf-8;base64,' + data['cover'];

    // Set the Media Session info
    setMediaSession();
}