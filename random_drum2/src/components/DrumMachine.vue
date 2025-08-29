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

function playOrPause(): void {

    if (isPlaying.value) {
        isPlaying.value = false;
        Tone.getTransport().stop()
    }
    else {
        isPlaying.value = true;

        const patterns = generatePattern(drumKit, 4);
        console.log(`Pattern: ${patterns}`)
        patterns.forEach(pattern => {
            const part = new Tone.Part((time: number) => {
                pattern.getDrum().hit(time);
            }, pattern.getHits());
            part.loop = true;
            part.loopStart = 0;
            part.start(0)
        });

        Tone.getTransport().start();
    }
}

const playPauseText = computed<string>(() => {
    return isPlaying.value ? "Stop" : "Play"
});


</script>

<template>
    <div class="control-panel">
        <div class="control-row">
            <button class="btn-secondary">Generate</button>
            <button class="btn-danger" v-on:click="playOrPause">{{ playPauseText }}</button>
        </div>
        <div class="control-row">
            <Drum v-for="sound in DrumKitA.getSounds()" :drum-sound="sound" />
        </div>
    </div>
</template>

<style scoped></style>
