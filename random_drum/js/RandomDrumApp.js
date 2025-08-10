/**
 * RandomDrumApp - Main application class that coordinates all components
 */
class RandomDrumApp {
    constructor() {
        this.checkToneAvailability();
    }

    checkToneAvailability() {
        if (typeof Tone !== 'undefined') {
            this.initialize();
        } else {
            this.showError("Error: Tone.js library failed to load. Please try refreshing the page.");
        }
    }

    initialize() {
        // Initialize all components
        this.audioManager = new AudioManager();
        this.drumMachine = new DrumMachine();
        this.patternGenerator = new PatternGenerator(this.drumMachine);
        this.uiController = new UIController();

        this.setupEventHandlers();
        this.generateInitialPattern();
    }

    setupEventHandlers() {
        // Set up UI event handlers
        this.uiController.setOnTempoChange((tempo) => {
            this.audioManager.setTempo(tempo);
        });

        this.uiController.setOnVolumeChange((drumType, volume) => {
            this.drumMachine.setVolume(drumType, volume);
        });

        this.uiController.setOnGeneratePattern(() => {
            this.handleGeneratePattern();
        });

        this.uiController.setOnPlayPause(() => {
            this.handlePlayPause();
        });
    }

    async handleGeneratePattern() {
        try {
            // Stop the transport if it's running
            if (this.audioManager.getPlayState()) {
                this.audioManager.stop();
            }
            
            // Start audio context if needed
            const contextStarted = await this.audioManager.startAudioContext();
            
            // Generate a new pattern
            this.generateNewPattern();
            
            // Start playing and update UI
            this.audioManager.play();
            this.uiController.updatePlayPauseButton(true);
        } catch (error) {
            console.error("An error occurred during pattern generation or playback:", error);
            this.uiController.showCustomAlert(`An error occurred. Check the console for details: ${error.message}`);
        }
    }

    async handlePlayPause() {
        try {
            const contextStarted = await this.audioManager.startAudioContext();

            const wasPlaying = this.audioManager.getPlayState();
            if (wasPlaying) {
                this.audioManager.pause();
            } else {
                this.audioManager.play();
            }
            
            this.uiController.updatePlayPauseButton(!wasPlaying);
        } catch (error) {
            console.error("An error occurred with the play/pause functionality:", error);
            this.uiController.showCustomAlert(`An error occurred. Check the console for details: ${error.message}`);
        }
    }

    generateNewPattern() {
        // Clear any existing pattern from the transport
        this.audioManager.clearTransport();
        
        // Generate the new pattern
        const result = this.patternGenerator.generateNewPattern();
        
        // Update UI with new measures count
        this.uiController.updateMeasuresDisplay(result.measures);
        
        // Configure transport loop length
        this.audioManager.setLoopLength(result.measures);

        // Schedule the new pattern with drum hit callback
        this.patternGenerator.schedulePattern((drumName) => {
            this.uiController.flashDrumLabel(drumName);
        });
    }

    generateInitialPattern() {
        this.generateNewPattern();
    }

    showError(message) {
        // Create a simple error display for when Tone.js fails to load
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #dc2626;
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            z-index: 1000;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
    }
}

// Initialize the app when the window loads
window.onload = () => {
    new RandomDrumApp();
}; 