/**
 * Get the data from the API
 */
export async function getData() {

    // Load the getData function
    const { getData } = await import('./getData.js')
    let songData = null
    
    // Check for errors
    await getData().then((response) => {
        if(!response.ok) return new Error('Er liep iets fout bij het laden van de player! probeer later opnieuw!')
        return response.json()
    .then((data) => {
        songData = data[0]
    })
    }).catch((error) => {
        throw new Error('Er liep iets fout bij het laden van de player! probeer later opnieuw!')
    })

    // Return value
    return songData

}