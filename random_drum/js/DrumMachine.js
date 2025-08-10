/**
 * DrumMachine - Handles drum synthesis and sound generation
 */
class DrumMachine {
    constructor() {
        this.initializeDrums();
        this.drumLabels = ['Kick', 'Snare', 'Hi-Hat', 'Toms'];
    }

    initializeDrums() {
        // Initialize drum synths
        this.kickSynth = new Tone.MembraneSynth().toDestination();
        this.snareSynth = new Tone.NoiseSynth({
            noise: { type: 'pink' },
            envelope: { attack: 0.005, decay: 0.1, sustain: 0.0, release: 0.01 }
        }).toDestination();
        this.hihatSynth = new Tone.NoiseSynth({
            noise: { type: 'white' },
            envelope: { attack: 0.001, decay: 0.05, sustain: 0.0, release: 0.01 }
        }).toDestination();
        this.tomSynth = new Tone.MembraneSynth({
            octaves: 4,
            pitchDecay: 0.05,
        }).toDestination();

        // Store in arrays for easy access
        this.drums = {
            kick: this.kickSynth,
            snare: this.snareSynth,
            hihat: this.hihatSynth,
            toms: this.tomSynth,
        };
        
        this.drumSynths = [this.kickSynth, this.snareSynth, this.hihatSynth, this.tomSynth];
    }

    getDrumSynth(index) {
        return this.drumSynths[index];
    }

    getDrumLabel(index) {
        return this.drumLabels[index];
    }

    getDrumLabels() {
        return this.drumLabels;
    }

    getDrumSynths() {
        return this.drumSynths;
    }

    setVolume(drumType, volume) {
        if (this.drums[drumType]) {
            this.drums[drumType].volume.value = volume;
        }
    }

    playDrum(drumIndex, time) {
        const synth = this.drumSynths[drumIndex];
        const drumLabel = this.drumLabels[drumIndex];
        
        if (drumLabel === 'Snare' || drumLabel === 'Hi-Hat') {
            synth.triggerAttackRelease('8n', time);
        } else {
            synth.triggerAttackRelease('C2', '8n', time); // Kick and Toms
        }
    }
} 