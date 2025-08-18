<script setup lang="ts">
import Drum from './Drum.vue';
</script>

<template>
    <div class="control-panel">
        <div class="control-row">
            <button class="btn-secondary">Generate</button>
            <button class="btn-danger">Play</button>
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
