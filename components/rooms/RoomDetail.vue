<template>
    <div>
      <h2 class="mb-4">{{ room.name }}</h2>
      <div v-if="room.devices.length" class="row g-3">
        <div v-for="device in room.devices" :key="device.id" class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ device.name }}</h5>
              <p>Status: <span :class="device.status === 'on' ? 'text-success' : 'text-muted'">{{ device.status }}</span></p>
              <p v-if="device.brightness !== null">Brightness: {{ device.brightness }}%</p>
              <p v-if="device.temperature !== null">Temperature: {{ device.temperature }}°</p>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-muted">No devices found in this room.</p>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    room: {
      type: Object,
      required: true
    }
  });
  </script>
  
  <style scoped>
  </style>