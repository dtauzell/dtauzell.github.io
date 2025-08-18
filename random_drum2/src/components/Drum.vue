<script setup lang="ts">
import Led from './Led.vue';
import { ref } from 'vue';
defineProps(['name'])

const led = ref<typeof Led | null>(null);

const hit = () => {
    led.value?.blink(50);
}
</script>

<template>
    <div class="drum-strip">
        <div class="drum-control">{{ name }}</div>
        <div class="drum-control">
            <Led ref="led"/>
        </div>
        <div class="drum-control">
            Vol: <input type="range" id="{{name}}Volume" min="-10" max="0" value="-2" class="w-full" />
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
}
</style>