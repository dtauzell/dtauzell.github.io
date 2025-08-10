/**
 * AudioManager - Handles Tone.js context and transport management
 */
class AudioManager {
    constructor() {
        this.isPlaying = false;
        this.setupTransport();
    }

    setupTransport() {
        Tone.Transport.loop = true;
        Tone.Transport.loopStart = '0m';
    }

    async startAudioContext() {
        if (Tone.context.state !== 'running') {
            await Tone.start();
            return true; // Indicates context was started
        }
        return false; // Context was already running
    }

    play() {
        Tone.Transport.start();
        this.isPlaying = true;
    }

    pause() {
        Tone.Transport.pause();
        this.isPlaying = false;
    }

    stop() {
        Tone.Transport.stop();
        this.isPlaying = false;
    }

    setTempo(bpm) {
        Tone.Transport.bpm.value = bpm;
    }

    setLoopLength(measures) {
        Tone.Transport.loopEnd = `${measures}m`;
    }

    clearTransport() {
        Tone.Transport.cancel();
    }

    getPlayState() {
        return this.isPlaying;
    }
} 