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
</script>

<template>
    <div class="drum-strip">
        <div class="drum-control">{{ drumSound.getName() }}</div>
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