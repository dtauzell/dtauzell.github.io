<script setup lang="ts">
import Led from './Led.vue';
import { ref, onMounted, watch, computed } from 'vue';
import { DrumSound } from '@/lib/DrumSound';

const props = defineProps<{
  drumSound: DrumSound;// array of objects
}>();

const led = ref<typeof Led | null>(null);
const volumeDb = ref(props.drumSound.getVolume());

const quarterNoteProbability = ref(props.drumSound.getQuarterNoteProbability());
const eighthNoteProbability = ref(props.drumSound.getEighthNoteProbability());
const sixteenthNoteProbability = ref(props.drumSound.getSixteenthNoteProbability());

watch(quarterNoteProbability, (newValue) => {
    props.drumSound.setQuarterNoteProbability(newValue);
});

watch(eighthNoteProbability, (newValue) => {
    props.drumSound.setEighthNoteProbability(newValue);
});

watch(sixteenthNoteProbability, (newValue) => {
    props.drumSound.setSixteenthNoteProbability(newValue);
});

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
    volumeDb.value = logVolume;
};

const volume = computed({
    get: () => logToLinearVolume(props.drumSound.getVolume()),
    set: (newValue) => updateVolume(newValue)
});


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
                v-model.number="volume"
                class="w-full" 
            />
            <span class="volume-display">{{ Math.round(volumeDb) }}dB</span>
        </div>
        <div class="drum-control">
            1/4: <input 
                type="range" 
                :id="`quarter-note-probability-${drumSound.getId()}`" 
                min="0" 
                max="1" 
                step="0.01"
                v-model.number="quarterNoteProbability"
                class="w-full" 
            />
            <span class="probability-display">{{ Math.round(quarterNoteProbability * 100) }}%</span>
        </div>
        <div class="drum-control">
            1/8: <input
                type="range"
                :id="`eighth-note-probability-${drumSound.getId()}`"
                min="0"
                max="1"
                step="0.01"
                v-model.number="eighthNoteProbability"
                class="w-full"
            />
            <span class="probability-display">{{ Math.round(eighthNoteProbability * 100) }}%</span>
        </div>
        <div class="drum-control">
            1/16: <input
                type="range"
                :id="`sixteenth-note-probability-${drumSound.getId()}`"
                min="0"
                max="1"
                step="0.01"
                v-model.number="sixteenthNoteProbability"
                class="w-full"
            />
            <span class="probability-display">{{ Math.round(sixteenthNoteProbability * 100) }}%</span>
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
    width: 250px;
    max-width: 600px;
}

.drum-control {
    padding: 10px 0;
    display: flex;
    align-items: center;
    gap: 10px;
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