import { listenForMessages } from './listeners/message.js'
import { getSongInformation } from './listeners/songInfo.js'
import { newAudioSession } from './instances/mediaSession.js'

/**
 * Start the listeners
 */
// The initialization
(function() {

    // Get the song information
    getSongInformation();

    // Startup the new Media Session
    newAudioSession();

    // Set a timer to launch the getSongInformation every 15 seconds
    const poll = setInterval(function() {
        getSongInformation();
    }, 15000);

    // Start listening to Events
    listenForMessages();

})();