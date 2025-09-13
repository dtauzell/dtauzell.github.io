<script setup lang="ts">
import Led from './Led.vue';
import { ref, onMounted } from 'vue';
import { DrumSound } from '@/lib/DrumSound';

const props = defineProps<{
  drumSound: DrumSound;// array of objects
}>();

const led = ref<typeof Led | null>(null);

const hit = () => {
    led.value?.blink(50);
    props.drumSound.hit();
}

// Function to make LED blink when drum is played
const blinkLed = () => {
    led.value?.blink(50);
};

// Set up the callback when component is mounted
onMounted(() => {
    props.drumSound.setOnPlayCallback(blinkLed);
});

// Function to update quantization for this drum sound
const updateQuantization = (value: number) => {
    console.log(`Updating quantization to ${value}`);
    props.drumSound.setQuantization(value);
};

// Function to convert linear slider value to logarithmic volume
const linearToLogVolume = (linearValue: number): number => {
    // Convert linear 0-1 range to logarithmic minVolume to 0 dB range
    // Use exponential curve: small movements near 0 dB, large movements near minVolume
    const minVolume = props.drumSound.getMinimumVolume();
    return minVolume + ((0 - minVolume) * Math.pow(linearValue, 0.3));
};

// Function to convert logarithmic volume to linear slider value
const logToLinearVolume = (logVolume: number): number => {
    // Convert logarithmic minVolume to 0 dB range to linear 0-1 range
    // Inverse of the above function
    const minVolume = props.drumSound.getMinimumVolume();
    return Math.pow((logVolume - minVolume) / (0 - minVolume), 1/0.3);
};

// Function to update volume with logarithmic scaling
const updateVolume = (linearValue: number) => {
    const logVolume = linearToLogVolume(linearValue);
    props.drumSound.setVolume(logVolume);
};
</script>

<template>
    <div class="drum-strip">
        <div class="drum-control">{{ drumSound.getName() }}</div>
        <div class="drum-control">
            <Led ref="led"/>
        </div>
        <div class="drum-control">
            Vol: <input 
                type="range" 
                :id="`volume-${drumSound.getId()}`" 
                min="0" 
                max="1" 
                step="0.01"
                :value="logToLinearVolume(drumSound.getVolume())" 
                @input="(event) => updateVolume(Number((event.target as HTMLInputElement).value))"
                class="w-full" 
            />
            <span class="volume-display">{{ Math.round(drumSound.getVolume()) }}dB</span>
        </div>
        <div class="drum-control">
            <select 
                :id="`quantization-${drumSound.getId()}`" 
                :value="drumSound.getQuantization()" 
                @change="(event) => updateQuantization(Number((event.target as HTMLSelectElement).value))"
                class="quantization-select"
            >
                <option value="4">Quarter Note</option>
                <option value="8">Eighth Note</option>
                <option value="16">Sixteenth Note</option>
            </select>
        </div>
        <div class="drum-control">
            <button @click="hit">Hit</button>
        </div>
    </div>
</template>

<style scoped>
.drum-strip {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 10px 0;
    border: 1px solid #ccc;
    border-radius: 2px;
    width: 100%;
    max-width: 600px;
}

.drum-control {
    padding: 10px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.quantization-select {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    font-size: 14px;
}

label {
    font-weight: bold;
    min-width: 80px;
}

button {
    padding: 8px 16px;
    border: 2px solid #ccc;
    border-radius: 6px;
    background-color: #f8f8f8;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.1s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:hover {
    background-color: #e8e8e8;
    border-color: #999;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

button:active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    background-color: #d8d8d8;
    border-color: #666;
}
</style>