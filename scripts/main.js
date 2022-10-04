// Import other functions
import { elements } from "./elements.js";
import { loadAudio } from "./player.js";
import { loadSongInfo } from "./songinfo.js";
import { loadMessage } from "./message.js";

// Global helpers
let currentState = 'listen';

/**
 * Initialize the audio player and components
 */
function init() {
    // Load the audio
    loadAudio(elements.player);

    // Load the song info
    loadSongInfo('https://www.radioaccent.be/api/song/latest', elements.songInfo, 1500);

    // Load the message function
    loadMessage(elements.messages);
}

// Initialize the player
init();