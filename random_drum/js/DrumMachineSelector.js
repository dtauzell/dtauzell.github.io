/**
 * DrumMachineSelector - Manages switching between different drum machine types
 */
class DrumMachineSelector {
    constructor() {
        this.availableMachines = {
            'synth': SynthDrumMachine,
            'sample': SampleDrumMachine
        };
        this.currentMachine = null;
        this.currentType = 'sample'; // Default to synth
    }

    createDrumMachine(type) {
        if (!this.availableMachines[type]) {
            throw new Error(`Unknown drum machine type: ${type}`);
        }

        // Clean up previous machine if it exists
        if (this.currentMachine) {
            this.cleanupMachine(this.currentMachine);
        }

        // Create new machine
        this.currentMachine = new this.availableMachines[type]();
        this.currentType = type;

        return this.currentMachine;
    }

    getCurrentMachine() {
        return this.currentMachine;
    }

    getCurrentType() {
        return this.currentType;
    }

    getAvailableTypes() {
        return Object.keys(this.availableMachines);
    }

    switchTo(type) {
        if (type === this.currentType) {
            return this.currentMachine; // Already using this type
        }
        return this.createDrumMachine(type);
    }

    cleanupMachine(machine) {
        // Clean up any resources if needed
        if (machine && typeof machine.cleanup === 'function') {
            machine.cleanup();
        }
    }

    // Method to add new drum machine types dynamically
    registerMachineType(name, machineClass) {
        this.availableMachines[name] = machineClass;
    }
}
