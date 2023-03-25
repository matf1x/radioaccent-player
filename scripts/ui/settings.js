let htmlElements = null;
let audioConfig = null;

/**
 * Load the settings modal and the event listeners
 * @param {*} elements the HTML elements
 * @param {*} audio the audio settings
 */
export function loadSettings(elements, audio, player) {

    // Set the global elements
    htmlElements = elements
    audioConfig = audio;

    // Load the correct info
    loadQualitySettings(player);

    // Listen to the settings button
    htmlElements.player.settings.buttons.open.addEventListener("click", () => {
        // Toggle the popup
        htmlElements.player.settings.containers.popup.classList.toggle('show')
    })

    // Listen for the quality button
    htmlElements.player.settings.buttons.quality.addEventListener('click', () => {
        // Toggle the popup
        htmlElements.player.settings.containers.main.classList.toggle('show')
        htmlElements.player.settings.containers.quality.classList.toggle('show')
    })
}

/**
 * Load the options into the settings box
 */
function loadQualitySettings(player) {

    // Get the current selected quality from the localCache
    const currentStreamKey = ("streamIndex" in localStorage) ? localStorage.getItem("streamIndex") : 0

    // Set the correct info in button
    htmlElements.player.settings.buttons.quality.innerHTML = `Audiokwaliteit: <span>${audioConfig.streams[currentStreamKey].bitrate}kbps</span>`

    // First, create the header
    const title = document.createElement('p')
    title.classList.add('title')
    title.innerText = 'Kies de audiokwaliteit'

    // Add to the holder
    htmlElements.player.settings.containers.quality.append(title)

    // Get the keys
    const streams = Object.keys(audioConfig.streams)
    
    // Loop over 
    streams.forEach((key, index) => {
        const stream = audioConfig.streams[key];
        const button = document.createElement('button');
        button.innerText = `${stream.bitrate}kbps - ${stream.type}`;
        button.addEventListener('click', () => {
            reloadPlayer(player, audioConfig.streams[key].url)
            changeGeneralQualityButton(audioConfig.streams[key].bitrate)
            closePopUp()
            localStorage.setItem("streamIndex", key)
            localStorage.setItem("stream", audioConfig.streams[key].url)
        })
        htmlElements.player.settings.containers.quality.append(button);
    })

}

/**
 * Reload the audio player
 * @param {Audio} player The player element
 */
function reloadPlayer(player, url) {
    player.pause()
    player.src = url
    player.load()
    player.play()
}

function changeGeneralQualityButton(bitrate) {
    htmlElements.player.settings.buttons.quality.innerHTML = `Audiokwaliteit: <span>${bitrate}kbps</span>`
}

function closePopUp() {
    htmlElements.player.settings.containers.popup.classList.toggle('show')
    htmlElements.player.settings.containers.main.classList.toggle('show')
    htmlElements.player.settings.containers.quality.classList.toggle('show')
}