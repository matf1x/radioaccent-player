/**
 * General config
 */
let poll;

/**
 * Get the data from the API
 */
export async function getData() {
    // Get the API
    const { api } = await import('../config.js');

    // Return a fetch request
    return fetch(api.pointers.song, { 
        method: 'GET'
    })
}
/*export const getData = new Promise(async (resolve, reject) => {
    

    // Fetch the information from the API
    const promise = await fetch(api.pointers.song, { 
        method: 'GET'
    }).then(function (response) {
        if(!response.ok) reject(new Error('No network connection'));
        return response.json();
    }).then(function(data) {
        // Check if the current song is reloaded
        if(data[0]['start'] === song.data.start) reject(new Error('Same song is loaded'))
        song.data = data[0];
        resolve(song.data);
    });

    // Setup a interval system to reload this info every X amount of time
    if(!poll) {
        poll = setInterval(function() {
            promise.then(function(data) {
                console.log(data)
            })
        }, song.reload)
    }
});*/