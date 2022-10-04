# radioaccent-player
This repository holds the Audio Player for Radio Accent, an local radio station from Belgium.

## Why
We created a unique player specific for the needs of the radio station. The player must handle the audio itself, but also includes a messaging system to the studio.

## Dependencies
[SASS](https://www.npmjs.com/package/sass)

## Configuration
*Javascript*
Update in 'scripts/main.js' the correct path to the audio file, the url for the songInfo API and the url of the messaging API.

You can also update the album to your station name in the 'scripts/mediaSession.js' file.

## Roadmap
[x] Media Session API
[ ] Chromecast function
[ ] Send files with a message (ex. Photo, Video ...)
 
## License
Copyright (c) 2019 Radio Accent & Fabian Tack