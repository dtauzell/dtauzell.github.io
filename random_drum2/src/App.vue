<script setup lang="ts">
import DrumMachine from './components/DrumMachine.vue'
</script>

<template>

  <main>
    <DrumMachine />
  </main>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

.control-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
}

/* Button styling */
.control-row button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>
