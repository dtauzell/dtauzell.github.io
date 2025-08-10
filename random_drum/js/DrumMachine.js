/**
 * Base DrumMachine class - Abstract interface for different drum machine implementations
 */
class DrumMachine {
    constructor() {
        if (this.constructor === DrumMachine) {
            throw new Error('DrumMachine is an abstract class and cannot be instantiated directly');
        }
        this.drumLabels = [];
        this.drumSynths = [];
    }

    // Abstract methods that must be implemented by subclasses
    initializeDrums() {
        throw new Error('initializeDrums() must be implemented by subclass');
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
        throw new Error('setVolume() must be implemented by subclass');
    }

    playDrum(drumIndex, time) {
        throw new Error('playDrum() must be implemented by subclass');
    }
} 