// Import other functions
import { elements } from "./elements.js";
import { loadAudio } from "./player.js";
import { loadSongInfo } from "./songinfo.js";
import { loadMessage } from "./message.js";
import { checkForChromeCast } from "./chromecast.js"

/**
 * The URLs to the different API's and audio sources
 */
const config = {
    audio: {
        src: 'https://www.clubfmserver.be/accent.mp3', 
        type: 'audio/mpeg'
    },
    api: {
        songInfo: 'https://www.radioaccent.be/api/song/latest', 
        messages: 'https://www.radioaccent.be/api/messages/add'
    }
}

/**
 * Initialize the audio player and components
 */
function init() {
    // Load the audio
    loadAudio(config.audio.src, elements.player);

    // Load the song info
    loadSongInfo(config.api.songInfo, elements.songInfo, 1500);

    // Load the message function
    loadMessage(config.api.messages, elements.messages);

    // Check the chromeCast API
    checkForChromeCast(config.audio);
}

// Initialize the player
init();