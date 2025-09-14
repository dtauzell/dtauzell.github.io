<template>
  <div class="pattern-visualizer">
    <div v-for="(row, rowIndex) in pattern" :key="rowIndex" class="drum-row">
      <div class="drum-name">{{ drumNames[rowIndex] }}</div>
      <div
        v-for="(beat, beatIndex) in row"
        :key="beatIndex"
        :class="[
          'beat',
          { active: beat === 1 },
          { 'measure-separator': (beatIndex % 16) === 0 && beatIndex > 0},
          { 'quarter-note': (beatIndex % 4) === 0 },
          { 'current-quarter': Math.floor(beatIndex / 4) === currentQuarter && beatIndex % 4 === 0 }
        ]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pattern: number[][],
  drumNames: string[],
  currentQuarter: number
}>()
</script>

<style scoped>
.pattern-visualizer {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 20px;
  overflow-x: auto;
}

.drum-row {
  display: flex;
  align-items: center;
  gap: 2px;
}

.drum-name {
  width: 80px;
  text-align: right;
  padding-right: 10px;
  font-size: 12px;
}

.beat {
  width: 15px;
  height: 15px;
  border: 1px solid #ccc;
}

.beat.active {
  background-color: lightgreen;
}

.beat.active.quarter-note {
  background-color: darkgreen;
}

.beat.quarter-note.current-quarter {
  border-left: 1px solid red;
}

.measure-separator {
  margin-left: 5px;
}
</style>
