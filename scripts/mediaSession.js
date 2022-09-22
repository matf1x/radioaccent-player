// Imports song info
import { getSongInfo } from "./songinfo.js";

/**
 * Setup a MediaSession with info from the SongInfo class
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
            artwork: [
                { src: songInfo.cover,   sizes: '300x300' }
            ]
        });

    }
}