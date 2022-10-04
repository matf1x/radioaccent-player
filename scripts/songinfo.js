// Import media session
import { updateMediaSession } from "./mediaSession.js";

// Setup global variables
let songElements = {};
const songInfo = {
    artist: null,
    title: null,
    cover: null,
    startTime: null
}

/**
 * Initialize the local variables, call the API for the current song info and trigger the updater every set amount of time.
 * @param {String} api URL to the API
 * @param {Object} elements The HTML elements list (see elements.js)
 * @param {Integer} triggerTime The time it needs to refresh the song info (in ms)
 */
export function loadSongInfo(api, elements, triggerTime) {

    // Set the elements
    songElements = elements;

    // Trigger the info
    getSongInfoFromAPI(api);

    // Get the song from the API
    const timer = setInterval(() => {
        getSongInfoFromAPI(api);
    }, triggerTime);

}

/**
 * Get the current song information from the API
 * @returns {songInfo} List with artist, title, cover and startTime
 */
export function getSongInfo() {
    return songInfo;
}

/**
 * Get the current song info from an XHTTP request and put them into the songInfo object.
 * We also update the songInfo in the player + updating the MediaSession
 * @param {String} api The URL of the API
 */
function getSongInfoFromAPI(api) {

    // Setup the XMLHttpRequest
    const xhttp = new XMLHttpRequest();

    // Listen for state changes
    xhttp.onreadystatechange = function() {
        // Check if the state is 4 and request status is OK
        if(this.readyState === 4 && this.status === 200) {

            // Parse the song info
            const songApi = JSON.parse(xhttp.responseText);

            // Check if newer song is loaded
            if(songInfo.startTime !== songApi.startTime) {

                // Bind to the global variables
                songInfo.artist = songApi.artist;
                songInfo.title = songApi.title;
                songInfo.cover = songApi.cover;
                songInfo.startTime = songApi.startTime;
                
                // Set the song info into the elements
                songElements.artist.innerHTML = songInfo.artist;
                songElements.title.innerHTML = songInfo.title;
                songElements.cover.src = songInfo.cover;

                updateMediaSession();
            }

        }
    }

    // Load from the API
    xhttp.open("GET", api, true);

    // Send the request
    xhttp.send();

}