// Setup global variables
const api = 'https://www.radioaccent.be/api/song/latest';
const songElements = {
    artist: null,
    title: null,
    cover: null
};
const songInfo = {
    artist: null,
    title: null,
    cover: null,
    startTime: null
}
const triggerTime = 15000;

export function loadSongInfo(elements) {

    // Set the elements
    songElements.artist = elements.songArtist;
    songElements.title = elements.songTitle;
    songElements.cover = elements.songCover;

    // Trigger the info
    getSongInfoFromAPI();

    // Get the song from the API
    const timer = setInterval(() => {
        getSongInfoFromAPI();
    }, triggerTime);

}

// Get the song info from the API
function getSongInfoFromAPI() {

    // Setup the XMLHttpRequest
    const xhttp = new XMLHttpRequest();

    // Listen for state changes
    xhttp.onreadystatechange = function() {
        // Check if the state is 4 and request status is OK
        if(this.readyState === 4 && this.status === 200) {

            // Parse the song info
            const songApi = JSON.parse(xhttp.responseText);

            // Check if newer song is loaded
            if(songInfo.startTime !== songApi.startTime) {

                // Bind to the global variables
                songInfo.artist = songApi.artist;
                songInfo.title = songApi.title;
                songInfo.cover = songApi.cover;
                songInfo.startTime = songApi.startTime;
                
                // Set the song info into the elements
                songElements.artist.innerHTML = songInfo.artist;
                songElements.title.innerHTML = songInfo.title;
                songElements.cover.src = songInfo.cover;
            }

        }
    }

    // Load from the API
    xhttp.open("GET", api, true);

    // Send the request
    xhttp.send();

}