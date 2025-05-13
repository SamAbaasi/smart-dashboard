<template>
  <div 
    class="device-control card mb-3"
    :class="{ 'opacity-50': updating }"
  >
    <div class="card-body">
      <h3 class="h6 mb-3">{{ device.name }}</h3>
      
      <template v-if="device.brightness !== null">
        <div class="form-check form-switch mb-3">
          <input
            type="checkbox"
            class="form-check-input"
            :checked="device.status === 'on'"
            :disabled="updating"
            @change="updateStatus"
          >
          <label class="form-check-label">Power</label>
        </div>
        
        <input
          type="range"
          class="form-range"
          :value="device.brightness"
          :disabled="isBrightnessDisabled"
          @input="updateBrightness"
        >
      </template>

      <template v-else-if="device.temperature !== null">
        <div class="input-group">
          <input
            type="number"
            class="form-control"
            :value="device.temperature"
            :disabled="updating"
            @change="updateTemperature"
          >
          <span class="input-group-text">°C</span>
        </div>
      </template>

      <template v-else>
        <div class="form-check form-switch">
          <input
            type="checkbox"
            class="form-check-input"
            :checked="device.status === 'on'"
            :disabled="updating"
            @change="updateStatus"
          >
          <label class="form-check-label">Power</label>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import type { Device } from '~/types'

const props = defineProps<{
  device: Device
  roomId: number
  updating?: boolean
}>()

const emit = defineEmits<{
  (e: 'update', payload: Partial<Device>): void
}>()

// Debounce brightness updates
const { debounced: debouncedBrightness, cancel:cancelBrightness } = useDebounce(
  (value: number) => emit('update', { brightness: value }),
  300 // 300ms delay
)

const { debounced: debouncedTemp, cancel: cancelTemp } = useDebounce(
  (value: number) => emit('update', { temperature: value }),
  300 // 300ms delay
)

onUnmounted(() => {
  cancelBrightness()
  cancelTemp()
})

const isBrightnessDisabled = computed(() => {
  console.log("sami ss", props.device);
  
  return props.updating || props.device.status === 'off'
})

// Watch and cancel debounce if brightness should be disabled
watch(isBrightnessDisabled, (disabled) => {
  if (disabled) {
    cancelBrightness()
  }
})

const updateBrightness = (event: Event) => {
  const target = getInputTarget(event)
  if (target && !isBrightnessDisabled.value) {
    const value = clamp(parseInt(target.value), 0, 100)
    debouncedBrightness(value)
  }
}

const updateStatus = (event: Event) => {
  const target = getInputTarget(event)
  if (target) {
    emit('update', { status: target.checked ? 'on' : 'off' })
  }
}

const updateTemperature = (event: Event) => {
  const target = getInputTarget(event)
  if (target) {
    const temp = parseInt(target.value, 10)
    debouncedTemp(temp)
  }
}
</script>

<style scoped>
.device-control {
  transition: all 0.2s ease;
}

.opacity-50 {
  opacity: 0.5;
  pointer-events: none;
}
</style>