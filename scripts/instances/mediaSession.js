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

                // Check the audio volume
                if(audio.volume > 0) {
                    audio.volume = 0; 
                    config.player.buttons.volume.value = 0;
                    config.player.buttons.mute.classList.remove('fa-volume-high');
                    config.player.buttons.mute.classList.add('fa-volume-xmark');
                } else {
                    audio.volume = config.player.audio.volume;
                    config.player.buttons.volume.value = (config.player.audio.volume * 100);
                    config.player.buttons.mute.classList.remove('fa-volume-xmark');
                    config.player.buttons.mute.classList.add('fa-volume-high');
                } 
            });

            // Listen for volume change
            config.player.buttons.volume.addEventListener('input', () => {
                // Get the selected volume
                const vol = config.player.buttons.volume.value / 100;
                
                // Update the audio
                audio.volume = vol;
                config.player.audio.volume = vol;

                // Check if volume is 0, then change the icon
                if(vol == 0) {
                    config.player.buttons.mute.classList.remove('fa-volume-high');
                    config.player.buttons.mute.classList.add('fa-volume-xmark');
                } else if(vol > 0 && vol < 0.35) {
                    config.player.buttons.mute.classList.remove('fa-volume-xmark');
                    config.player.buttons.mute.classList.add('fa-volume-high');
                }
            });
            
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
            config.player.buttons.playPause.classList.remove('fa-circle-play');
            config.player.buttons.playPause.classList.add('fa-circle-pause');
        });

        // Set the onPlay
        audio.addEventListener('pause', () => {
            config.player.buttons.playPause.classList.remove('fa-circle-pause');
            config.player.buttons.playPause.classList.add('fa-circle-play');
        });

        // Set the onPlay
        audio.addEventListener('waiting', () => {
            config.player.buttons.playPause.classList.remove('fa-circle-pause');
            config.player.buttons.playPause.classList.add('fa-compact-disc');
        });

        // Set the onPlay
        audio.addEventListener('error', () => {
            config.player.buttons.playPause.classList.remove('fa-circle-pause');
            config.player.buttons.playPause.classList.add('fa-circle-play');
        });

        // Send a resolve to let the caller know we are OK
        resolve(audio);

    } catch(e) {
        // Send a reject to let the user know something went wrong
        reject(new Error('Er liep iets fout bij het opstarten van de audio'));
    }

})