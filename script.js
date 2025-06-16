// Get references to the audio element and the control button
const backgroundAudio = document.getElementById('backgroundAudio');
const audioControlButton = document.getElementById('audioControlButton');

// Flag to track audio state
// Initialize as false because autoplay is not desired; user must click to start.
let isPlaying = false;

// Function to toggle audio playback and button text
function toggleAudioPlayback() {
    if (isPlaying) {
        // If currently playing, pause the audio
        backgroundAudio.pause();
        audioControlButton.textContent = 'Play Sound //'; // Change button text to "Play"
        isPlaying = false; // Update state
    } else {
        // If currently paused, attempt to play the audio
        // .play() returns a Promise, which is important for handling autoplay policies.
        backgroundAudio.play().then(() => {
            // This block runs if playback successfully started
            audioControlButton.textContent = 'Stop Sound //'; // Change button text to "Stop"
            isPlaying = true; // Update state
        }).catch(error => {
            // This block runs if playback was prevented (e.g., by browser autoplay policy)
            console.warn('Audio playback prevented:', error);
            // Keep button text as "Play Sound //" and state as false,
            // as the audio did not actually start playing.
            audioControlButton.textContent = 'Play Sound //';
            isPlaying = false;
            // You could add a visible message to the user here, e.g.,
            // alert('Your browser requires a direct interaction to play audio. Please try clicking the button again, or ensure your browser settings allow media playback.');
        });
    }
}

// Add event listener to the button to trigger playback toggle
audioControlButton.addEventListener('click', toggleAudioPlayback);

// Set initial button text and state when the DOM is fully loaded.
// This ensures the button always starts as "Play Sound //" when the page loads.
document.addEventListener('DOMContentLoaded', () => {
    audioControlButton.textContent = 'Play Sound //';
    isPlaying = false; // Confirm initial state is not playing
});

// The window.onload listener is not strictly necessary for this logic without autoplay,
// but it's harmless if left.
window.addEventListener('load', () => {
    // No specific action needed here as playback is user-initiated via button click.
});
