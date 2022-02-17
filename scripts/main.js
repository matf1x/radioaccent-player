// Import other functions
import { elements } from "./elements.js";
import { loadAudio } from "./player.js";
import { loadSongInfo } from "./songinfo.js";
import { loadMessage } from "./message.js";

// Global helpers
let currentState = 'listen';

// Load the audio
loadAudio(elements);

// Load the song info
loadSongInfo(elements)

// Load the message function
loadMessage(elements);