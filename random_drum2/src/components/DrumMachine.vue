<script setup lang="ts">
import Drum from './Drum.vue';
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
            <Drum name="Kick"/>
            <Drum name="Snare"/>
            <Drum name="HiHat"/>
            <Drum name="Cymbal"/>
            <Drum name="Tom"/>
        </div>
    </div>
</template>

<style scoped>

</style>
