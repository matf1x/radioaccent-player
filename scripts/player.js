// Imports media sessions
import { updateMediaSession } from "./mediaSession.js";

// Global variables
const playerElements = {
    audio: null,
    playpause: {
        button: null,
        icon: null
    },
    volume: {
        button: null,
        icon: null,
        slider: null,
        value: 100
    },
    status: null,
    playing: false
}

/**
 * Initalize the audio player, set the correct elements to the variables. This will also load the audio and prepare for auto play.
 * After that, we listen for button changes, check if we can autoplay and update the Media Session API
 * @param {String} url The URL to the audio file
 * @param {object} elements The following elements are needed: Audio player, play/pause button & icon, volume button & icon + status element.
 */
export function loadAudio(url, elements) {

    try {
        // Set the audioContainer
        playerElements.audio = elements.source.audio;
        playerElements.playpause.button = elements.interactive.playPause;
        playerElements.playpause.icon = elements.icons.playPause;
        playerElements.status = elements.labels.status;
        playerElements.volume.button = elements.interactive.volume;
        playerElements.volume.icon = elements.icons.volume;
        playerElements.volume.slider = elements.interactive.volumeSlider;

        // First, set the source
        playerElements.audio.src = url;
        playerElements.audio.volume = 0.7;

        // Reload the audio
        playerElements.audio.load();

        // Listen if the audio can be played
        playerElements.audio.oncanplay = () => {
            // Toggle The play state, listen for State changes & start listening for the play/pause button
            listenForStateChanges();
            listenForButtonInteraction();
            checkForAutoPlay();
            listenForAudioVolumeChange();
            updateMediaSession();
        }
    } catch(err) {
        playerElements.status.innerHTML = 'Error whilest loading the stream'
    }
    
}

/**
 * Check if the Autoplay is fired. otherwise, show message to user to click play
 */
function checkForAutoPlay() {
    const result = playerElements.audio.play();
    if(result !== undefined) {
        result.then(_ => {
            playerElements.playing = !playerElements.playing;
        }).catch(error => {
            playerElements.status.innerHTML = 'Klik op play om te luisteren'
         });
    }
}

/**
 * Toggle the Play state of the player
 */
function togglePlayState() {
    try {
        // First, check the state
        if(playerElements.playing) {
            playerElements.audio.pause();
        } else {
            playerElements.audio.play();
            updateMediaSession();
        }        
        playerElements.playing = !playerElements.playing;
    } catch(e) {
        playerElements.status.innerHTML = 'Error whilest loading the stream';
    }
    
}

/**
 * Listen for the different button interactions
 */
function listenForButtonInteraction() {
    // Play/Pause button
    playerElements.playpause.button.addEventListener('click', () => {
        // First, check the state
        togglePlayState();
    });

    // Listen for the Volume button
    playerElements.volume.button.addEventListener('click', () => {
        // Check if audio is muted or not
        if(playerElements.audio.volume > 0.0) {
            playerElements.audio.volume = 0.0;
            playerElements.volume.slider.value = 0;
            applyFill(playerElements.volume.slider);
            playerElements.volume.icon.classList.replace("fa-volume-high", "fa-volume-xmark");
        } else {
            playerElements.audio.volume = playerElements.volume.value / 100;
            playerElements.volume.slider.value = playerElements.volume.value;
            applyFill(playerElements.volume.slider);
            playerElements.volume.icon.classList.replace("fa-volume-xmark", "fa-volume-high");
        }
    });
}

/**
 * Listen for changes in the audio
 */
function listenForAudioVolumeChange() {

    // Init fill to the slider
    applyFill(playerElements.volume.slider);

    // Listen for chages in the input
    playerElements.volume.slider.addEventListener('input', (e) => {

        // Save the new volume
        playerElements.volume.value = e.target.value;

        // Set the volume to the player
        playerElements.audio.volume = playerElements.volume.value / 100;

        // Check if volume is 0 to show the audio off icon
        if(playerElements.audio.volume == 0)
            playerElements.volume.icon.classList.replace("fa-volume-high", "fa-volume-xmark");
        else
            playerElements.volume.icon.classList.replace("fa-volume-xmark", "fa-volume-high");

        // Apply the style to the slider
        applyFill(e.target);
    })

}

/**
 * Change the style of the slider
 * @param {*} slider The slider element
 */
function applyFill(slider) {

    // Setup helpers
    const options = {
        fill: 'rgba(222, 222, 222, 1)',
        background: "rgba(222, 222, 222, 0.214)"
    };

    const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
    const bg = `linear-gradient(90deg, ${options.fill} ${percentage}%, ${options.background} ${percentage +
        0.1}%)`;
    slider.style.background = bg;

}   

/**
 * Listen for state changes
 */
function listenForStateChanges() {
    // Listen for buffers
    playerElements.audio.onwaiting = () => {
        playerElements.status.innerHTML = 'Buffering';
    }

    // Listen for abortion
    playerElements.audio.onabort  = () => {
        playerElements.status.innerHTML = 'Loading aborted';
    }

    // Listen when player is paused
    playerElements.audio.onpause = () => {
        playerElements.playpause.icon.classList.replace("fa-pause", "fa-play");
    }

    // Listen when player is playing
    playerElements.audio.onplaying = () => {
        playerElements.status.innerHTML = '';
        playerElements.playpause.icon.classList.replace("fa-play", "fa-pause");
    }

    // Listen when player return a error
    playerElements.audio.onerror  = () => {
        playerElements.status.innerHTML = 'Error whilest loading the stream';
    }
}