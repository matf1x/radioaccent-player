# Radio Accent Audio Player
This repository contains the code for the Audio Player that's used by Radio Accent.
This is a custom audio player that includes the controls for the audio (start/stop and volume), and also a way to send messaged to the studio.

## Why
There are a lot of audio players out there. But we are always trying something new so this was a way of trying the HTML5 Audio element + also trying to learn new stuff like fetch.

## Dependencies
[SASS](https://www.npmjs.com/package/sass)

## Configuration
### Javascript
First, fill in the API routes in `scripts/config_example.js` and also the correct URL to the audio file. After that, rename the file to `config.js` so that the main script can find it.

When you try to edit the SCSS files, you need to run the following code in the terminal to render a new CSS file. These will me stored in the `dist/` folder.

	npm run sass

## Roadmap
There are some features we want to add in the future. These are added to the Roadmap.
If you want something else, let us know. In that way, we can add it to the roadmap.

* [x] Media Session API
* [ ] Chromecast function
* [ ] Send files with a message (ex. Photo, Video ...)
 
## License
Copyright (c) 2019 Radio Accent & Fabian Tack