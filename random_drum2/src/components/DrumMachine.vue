<script setup lang="ts">
import Drum from './Drum.vue';
import { DrumKitA } from '@/lib/DrumKit';
import { DrumPattern } from '@/lib/DrumPattern';
import { generatePattern } from '@/lib/DrumPatternGenerator';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import * as Tone from 'tone';

const emit = defineEmits(['pattern-generated', 'tick']);

const handleGlobalClick = async (): Promise<void> => {
    if (Tone.getContext().state === 'suspended') {
        console.log("Starting audio context ...")
        await Tone.start();
        console.log('Tone.js audio context started');
    }
};

onMounted((): void => {
    document.addEventListener('click', handleGlobalClick);
    Tone.Transport.scheduleRepeat((time) => {
        const position = Tone.Transport.position.toString();
        const parts = position.split(':');
        const measure = parseInt(parts[0]) % 4;
        const quarter = parseInt(parts[1]);
        const sixteenth = parseFloat(parts[2]);
        const currentQuarter = measure * 4 + quarter;
        emit('tick', currentQuarter);
    }, '16n');
});

onUnmounted((): void => {
    document.removeEventListener('click', handleGlobalClick);
});

const isPlaying = ref(false);
var drumKit = DrumKitA;
const currentParts = ref<Tone.Part[]>([]);
var currentPattern: DrumPattern[] = [];

function stopCurrentPattern(): void {
    // Stop all current parts
    currentParts.value.forEach((part) => {
        part.stop();
        part.dispose();
    });
    currentParts.value = [];
    
    // Stop transport
    Tone.getTransport().stop();
    isPlaying.value = false;
}

function startPattern(patterns: any[]): void {
    patterns.forEach(pattern => {
        const part = new Tone.Part((time: number) => {
            pattern.getDrum().hit(time);
        }, pattern.getHits(), { humanize: true });
        part.loop = true;
        part.loopStart = 0;
        part.loopEnd = '4m';
        part.start(0);
        currentParts.value.push(part);
    });

    Tone.getTransport().start();
    isPlaying.value = true;
}

function playOrPause(): void {
    if (isPlaying.value) {
        stopCurrentPattern();
    } else {
        if( currentPattern.length === 0 ) {
            currentPattern = generatePattern(drumKit, 4);
            emit('pattern-generated', currentPattern.map(p => p.getHitsAsArray()));
        }
        console.log(`Pattern: ${currentPattern}`);
        startPattern(currentPattern);
    }
}

function generateNewPattern(): void {
    // Generate new pattern
    currentPattern = generatePattern(drumKit, 4);
    emit('pattern-generated', currentPattern.map(p => p.getHitsAsArray()));
    console.log(`New Pattern: ${currentPattern}`);

    // Stop current playback if playing
    if (isPlaying.value) {
        stopCurrentPattern();
        startPattern(currentPattern);
    }
   
}

const playPauseText = computed<string>(() => {
    return isPlaying.value ? "Stop" : "Play"
});


</script>

<template>
    <div class="control-panel">
        <div class="control-row">
            <button @click="generateNewPattern">Generate</button>
            <button @click="playOrPause">{{ playPauseText }}</button>
        </div>
        <div class="control-row">
            <Drum v-for="sound in DrumKitA.getSounds()" :drum-sound="sound" />
        </div>
    </div>
</template>

<style scoped></style>
