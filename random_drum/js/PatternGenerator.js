/**
 * PatternGenerator - Handles drum pattern creation and scheduling
 */
class PatternGenerator {
    constructor(drumMachine) {
        this.drumMachine = drumMachine;
        this.drumPattern = [];
        this.totalMeasures = 4;
    }

    generateNewPattern() {
        // Randomly determine the total number of measures (1-8)
        this.totalMeasures = Math.floor(Math.random() * 8) + 1;
        
        // Clear the old pattern
        this.drumPattern = [];
        
        // For each drum, generate a random pattern
        this.drumMachine.getDrumLabels().forEach(() => {
            const hitsPerMeasure = Math.floor(Math.random() * 8) + 1; // 1-8 hits per measure
            const pattern = [];
            
            for (let measure = 0; measure < this.totalMeasures; measure++) {
                const positions = new Set(); // Use a Set to ensure unique positions
                while (positions.size < hitsPerMeasure) {
                    positions.add(Math.floor(Math.random() * 16)); // 16th notes
                }
                positions.forEach(pos => {
                    pattern.push(`${measure}:${Math.floor(pos / 4)}:${pos % 4}`);
                });
            }
            this.drumPattern.push(pattern);
        });
        
        return {
            pattern: this.drumPattern,
            measures: this.totalMeasures
        };
    }

    schedulePattern(onDrumHit) {
        // Create a new Tone.Part for the new pattern
        this.drumPattern.forEach((pattern, drumIndex) => {
            const drumName = this.drumMachine.getDrumLabel(drumIndex).toLowerCase().replace('-', '');
            
            const part = new Tone.Part((time) => {
                // Trigger the drum sound
                this.drumMachine.playDrum(drumIndex, time);
                
                // Call the callback for UI updates (like flashing labels)
                if (onDrumHit) {
                    Tone.Draw.schedule(() => onDrumHit(drumName), time);
                }
            }, pattern);
            part.start(0);
        });
    }

    getTotalMeasures() {
        return this.totalMeasures;
    }

    getCurrentPattern() {
        return this.drumPattern;
    }
} 