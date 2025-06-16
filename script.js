 // Get references to the audio element and the control button
        const backgroundAudio = document.getElementById('backgroundAudio');
        const audioControlButton = document.getElementById('audioControlButton');

        // Flag to track audio state
        let isPlaying = true; // Audio starts playing due to autoplay

        // Function to toggle audio playback and button text
        function toggleAudioPlayback() {
            if (isPlaying) {
                backgroundAudio.pause();
                audioControlButton.textContent = 'Play Sound //';
            } else {
                // To handle browser autoplay policies, try to play on user interaction
                backgroundAudio.play().catch(error => {
                    console.warn('Autoplay prevented:', error);
                    // Inform the user if autoplay was explicitly blocked
                    // (e.g., show a temporary message)
                });
                audioControlButton.textContent = 'Stop Sound //';
            }
            isPlaying = !isPlaying; // Toggle the state
        }

        // Add event listener to the button
        audioControlButton.addEventListener('click', toggleAudioPlayback);

        // Optional: Handle cases where autoplay is blocked by the browser.
        // Modern browsers often block autoplay with sound unless there's user interaction.
        // This attempts to play the audio once the user interacts with *any* part of the page.
        // A more robust solution might involve a specific "Play Sound" button that is visible
        // immediately if autoplay fails.
        document.addEventListener('DOMContentLoaded', () => {
            // Check if audio is already playing (might be blocked)
            if (backgroundAudio.paused && backgroundAudio.readyState >= 2) { // readyState 2 means enough data to play
                 isPlaying = false; // Initial state is paused if autoplay failed
                 audioControlButton.textContent = 'Play Sound //';
            } else {
                // If it attempts to autoplay, assume it's playing initially
                isPlaying = true;
                audioControlButton.textContent = 'Stop Sound //';
            }
        });

        // Ensure the audio tries to play when the document is ready (important for Safari/iOS)
        // This is a common workaround for iOS autoplay restrictions.
        window.addEventListener('load', () => {
            if (backgroundAudio.paused) {
                backgroundAudio.play().catch(error => {
                    console.warn('Autoplay on load prevented:', error);
                    isPlaying = false;
                    audioControlButton.textContent = 'Play Sound //';
                });
            }
        });
