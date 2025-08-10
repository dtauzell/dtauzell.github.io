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
        this.drumMachineSelector = new DrumMachineSelector();
        this.drumMachine = this.drumMachineSelector.createDrumMachine('synth');
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

        this.uiController.setOnDrumMachineChange((machineType) => {
            this.handleDrumMachineChange(machineType);
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

    handleDrumMachineChange(machineType) {
        try {
            console.log(`Switching from ${this.drumMachineSelector.getCurrentType()} to ${machineType}`);
            
            // Stop current playback
            if (this.audioManager.getPlayState()) {
                this.audioManager.stop();
            }

            // Switch to new drum machine
            this.drumMachine = this.drumMachineSelector.switchTo(machineType);
            
            console.log(`New drum machine type: ${this.drumMachine.constructor.name}`);
            
            // Update pattern generator with new drum machine
            this.patternGenerator = new PatternGenerator(this.drumMachine);
            
            // Reset volume sliders to default values for the new machine
            this.resetVolumeSliders();
            
            // Generate a new pattern with the new machine
            this.generateNewPattern();
            
            // Update UI to show it's not playing
            this.uiController.updatePlayPauseButton(false);
            
            console.log(`Successfully switched to ${machineType} drum machine`);
        } catch (error) {
            console.error('Error switching drum machine:', error);
            this.uiController.showCustomAlert(`Error switching drum machine: ${error.message}`);
        }
    }

    resetVolumeSliders() {
        // Reset volume sliders to default values
        const defaultVolumes = {
            kick: -6,
            snare: -6,
            hihat: -8,
            toms: -10
        };

        Object.entries(defaultVolumes).forEach(([drumType, volume]) => {
            // Update the slider value
            const slider = document.getElementById(`${drumType}Vol`);
            if (slider) {
                slider.value = volume;
            }
            // Set the volume on the new drum machine
            this.drumMachine.setVolume(drumType, volume);
        });
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