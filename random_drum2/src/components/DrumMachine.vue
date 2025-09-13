<script setup lang="ts">
import Drum from './Drum.vue';
import { DrumKitA } from '@/lib/DrumKit';
import { generatePattern } from '@/lib/DrumPatternGenerator';
import * as Tone from 'tone';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const handleGlobalClick = async (): Promise<void> => {
    if (Tone.getContext().state === 'suspended') {
        console.log("Starting audio context ...")
        await Tone.start();
        console.log('Tone.js audio context started');
    }
};

onMounted((): void => {
    document.addEventListener('click', handleGlobalClick);
});

onUnmounted((): void => {
    document.removeEventListener('click', handleGlobalClick);
});

const isPlaying = ref(false);
var drumKit = DrumKitA;
const currentParts = ref<Tone.Part[]>([]);

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
        }, pattern.getHits());
        part.loop = true;
        part.loopStart = 0;
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
        const patterns = generatePattern(drumKit, 4);
        console.log(`Pattern: ${patterns}`);
        startPattern(patterns);
    }
}

function generateNewPattern(): void {
    // Generate new pattern
    const patterns = generatePattern(drumKit, 4);
    console.log(`New Pattern: ${patterns}`);

    // Stop current playback if playing
    if (isPlaying.value) {
        stopCurrentPattern();
        startPattern(patterns);
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
