// Import
import { cancelPlayer, resumePlayer } from './player.js'

// Global variables
let context;

/**
 * Check if we can use the ChromeCast API in this case
 */
export function checkForChromeCast(audio) {

    // Set the audio info into the variables
    mediaSources = audio;

    // Check if the Api is available
    window['__onGCastApiAvailable'] = function (isAvailable) {
        if(isAvailable && cast.framework) {
            initChromeCast();
        }
    }
} 

/**
 * Send a message to the chromecast app
 * @param {string} message The message we need to send to the chromecast
 */
export function sendMessage(message) {

    // Get the current session
    const session = context.getCurrentSession();

    // Check there is a chromecast session
    if(session) {
        // Send the message we want to be handled
        session.sendMessage('urn:x-cast:com.radioaccent.chromecast', message);
    }
}

/**
 * Initialize the ChromeCast API and set the correct options + load the media
 */
function initChromeCast() {
    // Create the framework
    cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: 'A9FA6614',
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });

    context = cast.framework.CastContext.getInstance();
    context.addEventListener(
    cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
    function(event) {
        switch (event.sessionState) {
        case cast.framework.SessionState.SESSION_STARTED:
            cancelPlayer();
            break;
        case cast.framework.SessionState.SESSION_RESUMED:
            cancelPlayer();
            break;
        case cast.framework.SessionState.SESSION_ENDED:
            resumePlayer();
            break;
        }
    });
}