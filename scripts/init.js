// Import states
import { config } from './config.js';
import { getSongInformation, updateSongInfo } from './listeners/songInfo.js';
import { newAudioSession } from './instances/mediaSession.js';
import { listenForMessages } from './listeners/message.js';

/**
 * Initialize the player in the correct way
 */
export async function initPlayer() {
    // First, we try to load the Song Information
    if(newAudioSession()) {
        try {
            // Get the song information and wait for it
            getSongInformation().then(() => {
                // Finish the loading proces
                config.player.holder.classList.remove('is-loading');
                config.player.buttons.playPause.classList.add('fa-circle-play');
                config.message.buttons.create.innerHTML = '<i class="fa-regular fa-comments"></i> <span>Stuur bericht</span>';

                // Show the song information
                updateSongInfo();

                // Create a interval to reload the song information
                const poll = setInterval(function() {
                    getSongInformation().then(() => {
                        updateSongInfo();
                    });
                }, 15000);

                // Start listening to Events
                listenForMessages();
            });
        } catch(error) {
            // Log the error for debugging purposes
            console.log(error);
        }
    }
}