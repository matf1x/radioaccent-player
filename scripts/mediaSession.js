// Imports song info
import { getSongInfo } from "./songinfo.js";

/**
 * Setup the MediaSession API and fill with the current song info from songinfo.js
 */
export function updateMediaSession() {
    // Check if media session is available
    if('mediaSession' in navigator) {

        // Get the current song info
        const songInfo = getSongInfo();

        // Setup the Meta Data
        navigator.mediaSession.metadata = new MediaMetadata({
            title: songInfo.artist,
            artist: songInfo.title,
            album: "Radio Accent - Jouw Radio, Jouw Accent",
            artwork: [
                { src: 'https://www.radioaccent.be/player/assets/covers/96x96.png',   sizes: '96x96' },
                { src: 'https://www.radioaccent.be/player/assets/covers/128x128.png',   sizes: '128x128' },
                { src: songInfo.cover,   sizes: '300x300' }
            ]
        });

    }
}