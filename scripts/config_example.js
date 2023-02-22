/**
 * Config file
 */
export const config = {
    api: {
        pointers: {
            song: '',
            message: ''
        },
        tokens: {
            main: ''
        }
    },
    player: {
        audio: {
            url: '',
            volume: 1
        },
        buttons: {
            playPause: document.querySelector('[data-type="playpause"]'),
            mute: document.querySelector('[data-type="mute"]'),
            volume: document.querySelector('[data-type="volume"]')
        }
    },
    song: {
        data: {
            artist: '',
            title: '',
            cover: '',
            start: ''
        },
        labels: {
            artist: document.querySelector('[data-type="artist"]'),
            title: document.querySelector('[data-type="title"]')
        },
        images: {
            cover: document.querySelector('[data-type="song-cover"]'),
            background: document.querySelector('[data-type="background-image"]')
        }
    },
    message: {
        buttons: {
            create: document.querySelector('[data-type="message"]')
        },
        modal: {
            component: document.querySelector('[data-modal="message"]'),
            form: document.querySelector('[data-form="message"]'),
            error: document.querySelector('[data-form="error"]'),
            buttons: {
                open: document.querySelector('[data-action="send-message"]'),
                close: document.querySelectorAll('[data-action="close-modal"]')
            },
            screens: {
                entry: document.querySelector('[data-screen="form"]'),
                complete: document.querySelector('[data-screen="success"]'),
            }
        }
    }
}