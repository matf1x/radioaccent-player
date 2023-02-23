export function update(data) {
    // Check if Media Session is accessable
    if('mediaSession' in navigator) {
        // Now, Set the song Info
        navigator.mediaSession.metadata = new MediaMetadata({
            title: data.title,
            artist: data.artist,
            album: "Radio Accent",
            artwork: [
                { src: 'data:image/png;charset=utf-8;base64,' + data.cover,   sizes: '300x300' }
            ]
        });
    }
}