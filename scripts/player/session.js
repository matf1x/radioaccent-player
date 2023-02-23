/**
 * Create a new audio session
 */
export const newSession = new Promise(async (resolve, reject) => {
    // Put info into a try/catch to catch errors
    try {
        // Import config
        const { elements, audio } = await import('../config.js');

        // Setup the audio player
        const player = new Audio();
        player.autoplay = false;
        player.volume = audio.config.volume;
        player.src = audio.config.url;

        // Check if the audio can play
        player.addEventListener('canplay', () => resolve({player, elements, audio}));
    } catch(e) {
        // Throw a error
        reject(new Error(e.getMessage()));
    }
});