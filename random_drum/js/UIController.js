/**
 * UIController - Handles user interface interactions and DOM manipulation
 */
class UIController {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.generateBtn = document.getElementById('generateBtn');
        this.tempoSlider = document.getElementById('tempoSlider');
        this.tempoDisplay = document.getElementById('tempoDisplay');
        this.measuresDisplay = document.getElementById('measuresDisplay');
        this.drumMachineSelector = document.getElementById('drumMachineSelector');
        
        // Volume sliders
        this.volumeSliders = {
            kick: document.getElementById('kickVol'),
            snare: document.getElementById('snareVol'),
            hihat: document.getElementById('hihatVol'),
            toms: document.getElementById('tomsVol')
        };
    }

    setupEventListeners() {
        // Tempo slider
        this.tempoSlider.addEventListener('input', (e) => {
            const newTempo = parseInt(e.target.value, 10);
            this.tempoDisplay.textContent = `${newTempo} BPM`;
            this.onTempoChange?.(newTempo);
        });

        // Volume sliders
        Object.entries(this.volumeSliders).forEach(([drumType, slider]) => {
            slider.addEventListener('input', (e) => {
                this.onVolumeChange?.(drumType, e.target.value);
            });
        });

        // Generate button
        this.generateBtn.addEventListener('click', () => {
            this.onGeneratePattern?.();
        });

        // Play/Pause button
        this.playPauseBtn.addEventListener('click', () => {
            this.onPlayPause?.();
        });

        // Drum machine selector
        this.drumMachineSelector.addEventListener('change', (e) => {
            this.onDrumMachineChange?.(e.target.value);
        });
    }

    updatePlayPauseButton(isPlaying) {
        if (isPlaying) {
            this.playPauseBtn.textContent = 'Pause';
            this.playPauseBtn.classList.remove('bg-green-600', 'hover:bg-green-500');
            this.playPauseBtn.classList.add('bg-red-600', 'hover:bg-red-500');
        } else {
            this.playPauseBtn.textContent = 'Play';
            this.playPauseBtn.classList.remove('bg-red-600', 'hover:bg-red-500');
            this.playPauseBtn.classList.add('bg-green-600', 'hover:bg-green-500');
        }
    }

    updateMeasuresDisplay(measures) {
        this.measuresDisplay.textContent = measures;
    }

    flashDrumLabel(drumName) {
        const label = document.getElementById(`${drumName}Label`);
        if (label) {
            label.classList.add('flash');
            setTimeout(() => {
                label.classList.remove('flash');
            }, 100); // Flash for 100ms
        }
    }

    showCustomAlert(message) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #334155;
            color: #e2e8f0;
            padding: 20px 40px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
            z-index: 1000;
            text-align: center;
            max-width: 80vw;
        `;
        modal.innerHTML = `
            <p class="mb-4">${message}</p>
            <button onclick="this.parentNode.remove()" class="bg-violet-700 hover:bg-violet-600 text-white font-bold py-1 px-4 rounded-lg">OK</button>
        `;
        document.body.appendChild(modal);
    }

    // Event handler setters
    setOnTempoChange(callback) {
        this.onTempoChange = callback;
    }

    setOnVolumeChange(callback) {
        this.onVolumeChange = callback;
    }

    setOnGeneratePattern(callback) {
        this.onGeneratePattern = callback;
    }

    setOnPlayPause(callback) {
        this.onPlayPause = callback;
    }

    setOnDrumMachineChange(callback) {
        this.onDrumMachineChange = callback;
    }
} 