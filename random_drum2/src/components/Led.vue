<template>
    <div 
      :class="['led-basic', colorClass, { off: !isOn }]"
      :style="ledStyle"
    ></div>
  </template>
  
  <script setup lang="ts">
  import { type CSSProperties,ref, computed, defineProps, defineExpose, onUnmounted, type Ref } from 'vue'
  
  // Type definitions
  type LEDColor = 'red' | 'green' | 'blue'
  
  interface LEDStyle extends CSSProperties {
    background: string
    boxShadow: string
  }
  
  interface ColorMap {
    [key: string]: string
  }
  
  interface ExposedMethods {
    blink: (milliseconds?: number) => void
    turnOn: () => void
    turnOff: () => void
    toggle: () => void
    isOn: () => boolean
  }
  
  // Props interface
  interface Props {
    color?: LEDColor
  }
  
  // Props with defaults and validation
  const props = withDefaults(defineProps<Props>(), {
    color: 'green'
  })
  
  // Validate color prop
  const isValidColor = (color: string): color is LEDColor => {
    return ['red', 'green', 'blue'].includes(color.toLowerCase())
  }
  
  if (!isValidColor(props.color)) {
    console.warn(`Invalid LED color: ${props.color}. Using 'red' as fallback.`)
  }
  
  // Reactive state
  const isOn: Ref<boolean> = ref(false)
  let blinkTimeout: ReturnType<typeof setTimeout> | null = null
  
  // Computed properties
  const colorClass = computed((): string => props.color.toLowerCase())
  
  const ledStyle = computed((): LEDStyle => {
    const colors: ColorMap = {
      red: '#ff0000',
      green: '#00ff00',
      blue: '#0080ff'
    }
    
    const color: string = colors[props.color.toLowerCase()] || colors.red
    
    if (!isOn.value) {
      return {
        background: '#333',
        boxShadow: 'none'
      }
    }
    
    return {
      background: color,
      boxShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`
    }
  })
  
  // Methods
  const blink = (milliseconds: number =50): void => {
    // Validate milliseconds parameter
    if (milliseconds < 0) {
      console.warn('Blink duration cannot be negative. Using 500ms as fallback.')
      milliseconds = 500
    }
    
    // Clear any existing timeout
    if (blinkTimeout) {
      clearTimeout(blinkTimeout)
    }
    
    // Turn LED on
    isOn.value = true
    
    // Turn LED off after specified milliseconds
    blinkTimeout = setTimeout(() => {
      isOn.value = false
      blinkTimeout = null
    }, milliseconds)
  }
  
  const turnOn = (): void => {
    if (blinkTimeout) {
      clearTimeout(blinkTimeout)
      blinkTimeout = null
    }
    isOn.value = true
  }
  
  const turnOff = (): void => {
    if (blinkTimeout) {
      clearTimeout(blinkTimeout)
      blinkTimeout = null
    }
    isOn.value = false
  }
  
  const toggle = (): void => {
    if (blinkTimeout) {
      clearTimeout(blinkTimeout)
      blinkTimeout = null
    }
    isOn.value = !isOn.value
  }
  
  const getLEDState = (): boolean => isOn.value
  
  // Expose methods to parent components with proper typing
  const exposedMethods: ExposedMethods = {
    blink,
    turnOn,
    turnOff,
    toggle,
    isOn: getLEDState
  }
  
  defineExpose(exposedMethods)
  
  // Cleanup on unmount
  onUnmounted((): void => {
    if (blinkTimeout) {
      clearTimeout(blinkTimeout)
    }
  })
  </script>
  
  <style scoped>
  .led-basic {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transition: all 0.1s ease;
    display: inline-block;
  }
  
  .led-basic.off {
    background: #333 !important;
    box-shadow: none !important;
  }
  </style>