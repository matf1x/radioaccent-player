/** Import the config */
import { config } from '../config.js';

/**
 * Start a new Audio Session
 */
export function newAudioSession() {

    // Start the audio player
    startAudioPlayer
        .then((audio) => { 

            // Listen to play button click
            config.player.buttons.playPause.addEventListener('click', () => {
                // Check if the audio is paused. if so, start the audio. Otherwise, pause the audio
                if(audio.paused) audio.play(); else audio.pause();
            });

            // Listen for the mute button
            config.player.buttons.mute.addEventListener('click', () => {

                // Get the button icon
                let buttonIcon = config.player.buttons.mute.querySelector('.fa-solid');

                // Check the audio volume
                if(audio.volume > 0) {
                    audio.volume = 0; 
                    buttonIcon.classList.remove('fa-volume-high');
                    buttonIcon.classList.add('fa-volume-xmark');
                } else {
                    audio.volume = config.player.audio.volume;
                    buttonIcon.classList.remove('fa-volume-xmark');
                    buttonIcon.classList.add('fa-volume-high');
                } 
            })
            
        })
        .catch(alert);
}

/**
 * Setup the Media Session information
 * @param {Object} args The arguments we need to show in the Media Session
 */
export function setMediaSession(args) {
    // Check if Media Session is accessable
    if('mediaSession' in navigator) {
        // Now, Set the song Info
        navigator.mediaSession.metadata = new MediaMetadata({
            title: config.song.data.title,
            artist: config.song.data.artist,
            album: "Radio Accent",
            artwork: [
                { src: 'data:image/png;charset=utf-8;base64,' + config.song.data.cover,   sizes: '300x300' }
            ]
        });
    }
}

/**
 * Start the audio player
 */
const startAudioPlayer = new Promise((resolve, reject) => {

    // Setup a try/catch
    try {

        // Setup a new Audio
        const audio = new Audio();
        audio.autoplay = false;
        audio.volume = config.player.audio.volume;
        audio.src = config.player.audio.url;

        // Set the onPlay
        audio.addEventListener('playing', () => {
            let buttonIcon = config.player.buttons.playPause.querySelector('.fa-solid');
            buttonIcon.classList.remove('fa-circle-play');
            buttonIcon.classList.add('fa-circle-pause');
        });

        // Set the onPlay
        audio.addEventListener('pause', () => {
            let buttonIcon = config.player.buttons.playPause.querySelector('.fa-solid');
            buttonIcon.classList.remove('fa-circle-pause');
            buttonIcon.classList.add('fa-circle-play');
        });

        // Set the onPlay
        audio.addEventListener('waiting', () => {
            let buttonIcon = config.player.buttons.playPause.querySelector('.fa-solid');
            buttonIcon.classList.remove('fa-circle-pause');
            buttonIcon.classList.add('fa-compact-disc');
        });

        // Set the onPlay
        audio.addEventListener('error', () => {
            let buttonIcon = config.player.buttons.playPause.querySelector('.fa-solid');
            buttonIcon.classList.remove('fa-circle-pause');
            buttonIcon.classList.add('fa-circle-play');
        });

        // Send a resolve to let the caller know we are OK
        resolve(audio);

    } catch(e) {
        // Send a reject to let the user know something went wrong
        reject(new Error('Er liep iets fout bij het opstarten van de audio'));
    }

})