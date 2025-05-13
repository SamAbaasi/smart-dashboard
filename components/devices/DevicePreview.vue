<template>
    <div class="card">
      <div class="card-body">
        <div class="room-preview">
          <div v-for="device in devices" :key="device.id" class="device-visualization">
            <div class="device-icon">
              <i :class="getDeviceIcon(device)"></i>
            </div>
            <div class="device-info">
              <h3 class="h6">{{ device.name }}</h3>
              <div v-if="device.status" class="status-badge" :class="device.status">
                {{ device.status }}
              </div>
              <div v-if="device.brightness" class="mt-1">
                Brightness: {{ device.brightness }}%
              </div>
              <div v-if="device.temperature" class="mt-1">
                Temperature: {{ device.temperature }}°C
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import type { Device } from '~/types'

const props = defineProps<{
  devices: Device[]
}>()
  
  const getDeviceIcon = (device: Device) => {
    const icons = {
      on: device.status === 'on' ? 'bi bi-lightbulb-fill text-warning' : 'bi bi-lightbulb',
      thermostat: 'bi bi-thermometer-half',
      off: device.status === 'off' ? 'bi bi-lock-fill' : 'bi bi-unlock-fill',
      default: 'bi bi-plugin'
    }
    return icons[device.status] || icons.default
  }
  </script>
  
  <style scoped lang="scss">
  .room-preview {
    display: grid;
    gap: 1rem;
  }
  
  .device-visualization {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--bs-light-bg-subtle);
    border-radius: 0.5rem;
  }
  
  .device-icon i {
    font-size: 2rem;
  }
  
  .status-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    font-weight: bold;
    
    &.on {
      background-color: var(--bs-success-bg-subtle);
      color: var(--bs-success-text);
    }
    
    &.off {
      background-color: var(--bs-secondary-bg-subtle);
      color: var(--bs-secondary-text);
    }
  }
  </style>