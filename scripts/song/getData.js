/**
 * Get the data from the API
 */
export const getData = new Promise(async (resolve, reject) => {
    // Get the API
    const { api, song } = await import('../config.js');

    // Fetch the information from the API
    await fetch(api.pointers.song, { 
        method: 'GET'
    }).then((response) => {
        if(!response.ok) reject(new Error('No network connection'));
        return response.json();
    }).then((data) => {
        // Check if the current song is reloaded
        if(data[0]['start'] === song.data.start) reject(new Error('Same song is loaded'));
        song.data = data[0];
        resolve(song.data);
    });
});