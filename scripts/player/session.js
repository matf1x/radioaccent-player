/**
 * Create a new audio session
 */
export const newSession = new Promise(async (resolve, reject) => {
    // Put info into a try/catch to catch errors
    try {
        // Import config
        const { elements, audio } = await import('../config.js');

        // Check if localStorage settings are found
        // if not, create them
        if(!('volume' in localStorage)) localStorage.setItem('volume', audio.volume);
        if(!('streamIndex' in localStorage)) localStorage.setItem('streamIndex', 0);
        if(!('stream' in localStorage)) localStorage.setItem('stream', audio.streams[localStorage.getItem('streamIndex')].url);
        if('volume' in localStorage) elements.player.volume.slider.value = (localStorage.getItem('volume') * 100);
    
        // Setup the audio player
        const player = new Audio();
        player.autoplay = false;
        player.volume = (localStorage.getItem('volume') ? localStorage.getItem('volume') : audio.volume );
        player.src = (localStorage.getItem('stream') ? localStorage.getItem('stream') : audio.streams[0].url );

        // Check if the audio can play
        player.addEventListener('canplay', () => resolve({player, elements, audio}));
    } catch(e) {
        // Throw a error
        reject(new Error(e.getMessage()));
    }
});