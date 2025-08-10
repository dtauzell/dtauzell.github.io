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
        // Initialize sample players for each drum type
        this.kickPlayer = new Tone.Player().toDestination();
        this.snarePlayer = new Tone.Player().toDestination();
        this.hihatPlayer = new Tone.Player().toDestination();
        this.tomPlayer = new Tone.Player().toDestination();

        // Store in arrays for easy access
        this.drums = {
            kick: this.kickPlayer,
            snare: this.snarePlayer,
            hihat: this.hihatPlayer,
            toms: this.tomPlayer,
        };
        
        this.drumSynths = [this.kickPlayer, this.snarePlayer, this.hihatPlayer, this.tomPlayer];

        // Load sample URLs (you can customize these)
        this.loadSamples();
    }

    loadSamples() {
        // Example sample URLs - replace with your actual sample files
        const sampleUrls = {
            kick: 'samples/kick.wav',
            snare: 'samples/snare.wav',
            hihat: 'samples/hihat.wav',
            toms: 'samples/tom.wav'
        };

        // Load each sample
        Object.entries(sampleUrls).forEach(([drumType, url]) => {
            this.drums[drumType].load(url).catch(error => {
                console.warn(`Failed to load ${drumType} sample:`, error);
                // Fallback to a simple beep if sample fails to load
                this.createFallbackSound(drumType);
            });
        });
    }

    createFallbackSound(drumType) {
        // Create a simple fallback sound if sample loading fails
        let fallbackSynth;
        
        switch(drumType) {
            case 'kick':
                fallbackSynth = new Tone.MonoSynth({
                    oscillator: { type: 'sine' },
                    envelope: { attack: 0.01, decay: 0.2, sustain: 0.0, release: 0.1 }
                }).toDestination();
                break;
            case 'snare':
                fallbackSynth = new Tone.NoiseSynth({
                    noise: { type: 'white' },
                    envelope: { attack: 0.001, decay: 0.2, sustain: 0.0, release: 0.1 }
                }).toDestination();
                break;
            case 'hihat':
                fallbackSynth = new Tone.MetalSynth({
                    frequency: 200,
                    envelope: { attack: 0.001, decay: 0.1, sustain: 0.0, release: 0.01 }
                }).toDestination();
                break;
            case 'toms':
                fallbackSynth = new Tone.MonoSynth({
                    oscillator: { type: 'triangle' },
                    envelope: { attack: 0.01, decay: 0.3, sustain: 0.0, release: 0.2 }
                }).toDestination();
                break;
        }
        
        if (fallbackSynth) {
            // Replace the failed player with the fallback synth
            this.drums[drumType] = fallbackSynth;
            this.drumSynths[this.drumLabels.indexOf(drumType.charAt(0).toUpperCase() + drumType.slice(1))] = fallbackSynth;
            
            // Override the playDrum method for this specific drum type
            const originalPlayDrum = this.playDrum.bind(this);
            this.playDrum = function(drumIndex, time) {
                const drumLabel = this.drumLabels[drumIndex];
                const drumType = drumLabel.toLowerCase().replace('-', '');
                
                if (drumType === drumType && this.drums[drumType] === fallbackSynth) {
                    // Use fallback synth with note
                    if (drumType === 'kick' || drumType === 'toms') {
                        fallbackSynth.triggerAttackRelease('C2', '8n', time);
                    } else {
                        fallbackSynth.triggerAttackRelease('8n', time);
                    }
                } else {
                    // Use original method
                    originalPlayDrum.call(this, drumIndex, time);
                }
            }.bind(this);
        }
    }

    setVolume(drumType, volume) {
        if (this.drums[drumType]) {
            this.drums[drumType].volume.value = volume;
        }
    }

    playDrum(drumIndex, time) {
        const player = this.drumSynths[drumIndex];
        const drumLabel = this.drumLabels[drumIndex];
        
        // Play the sample at its original pitch (no pitch shifting)
        player.start(time);
        
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
