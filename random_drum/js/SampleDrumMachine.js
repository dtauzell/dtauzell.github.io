/**
 * SampleDrumMachine - Handles drum sound generation using audio samples
 */
class SampleDrumMachine extends DrumMachine {
    constructor() {
        super(); // Call the parent constructor
        this.drumLabels = ['Kick', 'Snare', 'Hi-Hat', 'Toms'];
        this.samples = {};
        this.initializeDrums();
    }

    initializeDrums() {
        // Initialize different synth types to simulate samples (for testing)
        // In production, you'd use Tone.Player with actual sample files
        this.kickPlayer = new Tone.MonoSynth({
            oscillator: { type: 'sine' },
            envelope: { attack: 0.01, decay: 0.2, sustain: 0.0, release: 0.1 }
        }).toDestination();
        
        this.snarePlayer = new Tone.NoiseSynth({
            noise: { type: 'white' },
            envelope: { attack: 0.001, decay: 0.2, sustain: 0.0, release: 0.1 }
        }).toDestination();
        
        this.hihatPlayer = new Tone.MetalSynth({
            frequency: 200,
            envelope: { attack: 0.001, decay: 0.1, sustain: 0.0, release: 0.01 }
        }).toDestination();
        
        this.tomPlayer = new Tone.MonoSynth({
            oscillator: { type: 'triangle' },
            envelope: { attack: 0.01, decay: 0.3, sustain: 0.0, release: 0.2 }
        }).toDestination();

        // Store in arrays for easy access
        this.drums = {
            kick: this.kickPlayer,
            snare: this.snarePlayer,
            hihat: this.hihatPlayer,
            toms: this.tomPlayer,
        };
        
        this.drumSynths = [this.kickPlayer, this.snarePlayer, this.hihatPlayer, this.tomPlayer];
    }

    setVolume(drumType, volume) {
        if (this.drums[drumType]) {
            this.drums[drumType].volume.value = volume;
        }
    }

    playDrum(drumIndex, time) {
        const player = this.drumSynths[drumIndex];
        const drumLabel = this.drumLabels[drumIndex];
        
        // Start the sample at the specified time
        if (drumLabel === 'Kick') {
            player.triggerAttackRelease('C2', '8n', time);
        } else if (drumLabel === 'Snare') {
            player.triggerAttackRelease('8n', time);
        } else if (drumLabel === 'Hi-Hat') {
            player.triggerAttackRelease('8n', time);
        } else if (drumLabel === 'Toms') {
            player.triggerAttackRelease('C2', '8n', time);
        }
        
        // Debug log to verify which machine is playing
        console.log(`SampleDrumMachine playing ${drumLabel}`);
    }

    // Method to load custom samples
    loadCustomSample(drumType, url) {
        if (this.drums[drumType]) {
            this.drums[drumType].load(url).catch(error => {
                console.error(`Failed to load custom ${drumType} sample:`, error);
            });
        }
    }

    // Method to set sample-specific parameters
    setSampleParameters(drumType, parameters) {
        if (this.drums[drumType]) {
            Object.assign(this.drums[drumType], parameters);
        }
    }
}
