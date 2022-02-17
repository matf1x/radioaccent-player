// Global variables
const url = "https://www.clubfmserver.be/accent.mp3";
const playerElements = {
    audio: null,
    playpause: {
        button: null,
        icon: null
    },
    volume: {
        button: null,
        icon: null
    },
    status: null,
    playing: false
}

/**
 * Load the audio into the audio container
 * @param {object} elements The following elements are needed: Audio player, play/pause button & icon, volume button & icon + status element.
 */
export function loadAudio(elements) {

    try {
        // Set the audioContainer
        playerElements.audio = elements.playerAudio;
        playerElements.playpause.button = elements.playerPlayPause;
        playerElements.playpause.icon = elements.playerPlayPauseIcon;
        playerElements.status = elements.playerStatus;
        playerElements.volume.button = elements.playerVolumeBtn;
        playerElements.volume.icon = elements.playerVolumeIcon;

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
            checkForAutoPlay()
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
 * Toggle the Playing state of the player
 */
function togglePlayState() {
    try {
        // First, check the state
        if(playerElements.playing) {
            playerElements.audio.pause();
        } else {
            playerElements.audio.play();
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
    })

    // Listen for the Volume button
    playerElements.volume.button.addEventListener('click', () => {
        // Check if audio is muted or not
        if(playerElements.audio.volume > 0.0) {
            playerElements.audio.volume = 0.0;
            playerElements.volume.icon.classList.replace("fa-volume-high", "fa-volume-xmark");
        } else {
            playerElements.audio.volume = 0.7;
            playerElements.volume.icon.classList.replace("fa-volume-xmark", "fa-volume-high");
        }
    })
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