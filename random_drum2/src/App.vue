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
  border: 2px solid #ccc;
  border-radius: 6px;
  background-color: #f8f8f8;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.1s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.control-row button:hover {
  background-color: #e8e8e8;
  border-color: #999;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.control-row button:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  background-color: #d8d8d8;
  border-color: #666;
}

/* All buttons now use the same styling as Hit buttons */
</style>
