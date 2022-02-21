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
    songCover: document.querySelector('#playerSongImage'),
    songArtist: document.querySelector('#playerSongArtist'),
    songTitle: document.querySelector('#playerSongTitle'),
    playerPlayPause: document.querySelector('#playPause'),
    playerPlayPauseIcon: document.querySelector('#playPauseIcon'),
    playerStatus: document.querySelector('#status'),
    playerVolumeBtn: document.querySelector('#playVolumeIcon'),
    playerVolumeIcon: document.querySelector('#playVolumeIcon'),
    playerAudio: document.querySelector('#audio'),
    playerVolumeSlider: document.querySelector('#volumeSlider')
}