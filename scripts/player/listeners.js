/** Global variables */
let elements = null;
let player = null;
let audio = null;

/**
 * Start the listeners for the buttons
 */
function buttonListener() {
    // Listen for the mute button
    elements.player.buttons.mute.addEventListener('click', () => {
        // Check if the volume is higher than 0
        if(player.volume > 0) {
            player.volume = 0;
            elements.player.volume.slider.value = 0;
            changeButtonIcon(elements.player.buttons.mute, 'volumeMute');
        } else {
            player.volume = audio.config.volume;
            elements.player.volume.slider.value = (audio.config.volume * 100);
            changeButtonIcon(elements.player.buttons.mute, 'volumeHigh');
        }
    });

    // Listen to play button click
    elements.player.buttons.playPause.addEventListener('click', () => {
        // Check if the audio is paused. if so, start the audio. Otherwise, pause the audio
        if(player.paused) player.play(); else player.pause();
    });

    // Listen for volume change
    elements.player.volume.slider.addEventListener('input', () => {
        // Get the selected volume
        const vol = elements.player.volume.slider.value / 100;
        
        // Update the audio
        player.volume = vol;
        audio.config.volume = vol;

        // Check if volume is 0, then change the icon
        if(vol == 0) {
            changeButtonIcon(elements.player.buttons.mute, 'volumeMute');
        } else {
            changeButtonIcon(elements.player.buttons.mute, 'volumeHigh');
        }
    });
}

/**
 * Start the listeners for the buttons
 */
function playerListener() {
    // Set the Audio State listeners
    player.addEventListener('playing', () => {changeButtonIcon(elements.player.buttons.playPause, 'pause');});
    player.addEventListener('pause', () => {changeButtonIcon(elements.player.buttons.playPause, 'play');});
    player.addEventListener('error', () => {changeButtonIcon(elements.player.buttons.playPause, 'play');});
    player.addEventListener('abort', () => {changeButtonIcon(elements.player.buttons.playPause, 'play');});
    player.addEventListener('waiting', () => {changeButtonIcon(elements.player.buttons.playPause, 'play');});
}

/**
 * Change the icon from a button
 * @param {Element} btnElement The button Element that needs to be modified
 * @param {String} currentIcon The current icon that is shown
 * @param {String} newIcon The new icon that needs to be shown */ 
async function changeButtonIcon(btnElement, newIcon) {
    const { icons } = await import('../config.js');
    btnElement.innerHTML = icons[newIcon];
}

/**
 * Initialize the listeners
 */
export function initListeners(resp) {
    // Attacht variables to global variables
    player = resp.player;
    elements = resp.elements;
    audio = resp.audio;

    // Start the listeners
    playerListener();
    buttonListener();
}