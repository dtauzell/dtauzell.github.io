<script setup lang="ts">
import Drum from './Drum.vue';
import { DrumKitA } from '@/lib/DrumKit';
import * as Tone from 'tone';

const handleClick = async () => {
  try {
    // Your async operation
    await Tone.start();
    console.log('Audio started');
    
    // Handle success
  } catch (error) {
    console.error('Error:', error);
    // Handle error
  } 
};

</script>

<template>
    <div class="control-panel">
        <div class="control-row">
            <button class="btn-secondary">Generate</button>
            <button @click="handleClick" class="btn-danger">Play</button>
        </div>
        <div class="control-row">
        <Drum v-for="sound in DrumKitA.getSounds()":drum-sound="sound"/>
        </div>
    </div>
</template>

<style scoped>

</style>
