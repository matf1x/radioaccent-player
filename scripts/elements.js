export const elements = {
    messages: {
        modal: document.querySelector('#messageModal'),
        openButton: document.querySelector('#openNewMessage'),
        submitButton: document.querySelector('#submitMessage'),
        closeButton: document.querySelector('#closeMessage'),
        form: document.querySelector('#messageForm'),
        inputs: {
            fullName: document.querySelector('#inputFullName'),
            mail: document.querySelector('#inputMail'),
            phone: document.querySelector('#inputPhone'),
            message: document.querySelector('#inputMessage')
        }
    },
    songInfo: {
        artist: document.querySelector('#playerSongArtist'),
        title: document.querySelector('#playerSongTitle'),
        cover: document.querySelector('#playerSongImage')
    },
    player: {
        source: {
            audio: document.querySelector('#audio')
        },
        interactive: {
            playPause: document.querySelector('#playPause'),
            volume: document.querySelector('#playVolumeIcon'),
            volumeSlider: document.querySelector('#volumeSlider')
        },
        icons: {
            playPause: document.querySelector('#playPauseIcon'),
            volume: document.querySelector('#playVolumeIcon'),
        },
        labels: {
            status: document.querySelector('#status')
        }
    }
}