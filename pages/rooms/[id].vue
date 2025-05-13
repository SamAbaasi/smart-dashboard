<template>
  <div>
    <LoadingSpinner v-if="loading" />

    <template v-else-if="currentRoom">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>{{ currentRoom.name }}</h1>
        <NuxtLink 
          to="/" 
          class="btn btn-outline-secondary"
          aria-label="Back to rooms"
        >
        <i class="bi bi-arrow-left" aria-hidden="true"></i>
        Back
        </NuxtLink>
      </div>

      <div class="row g-4">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">Device Controls</div>
            <div class="card-body">
                <DeviceControl
                  v-for="device in currentRoom.devices"
                  :key="device.id"
                  :device="device"
                  :room-id="currentRoom.id"
                  :updating="updatingDeviceId === device.id || loading"
                  @update="(payload) => handleDeviceUpdate(device.id, payload)"
                />
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <DevicePreview 
            :devices="currentRoom.devices"
            :updating-id="updatingDeviceId"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import type { Device } from '~/types'

const route = useRoute()
const { 
  currentRoom, 
  fetchRoom, 
  loading, 
  updateDeviceState, 
  updatingDeviceId ,
  updatedDevice
} = useSmartHomeStore()

const roomId = computed(() => {
  const id = parseInt(route.params.id as string, 10)
  return isNaN(id) ? 0 : id
})

const { pending } = await useAsyncData(
  `room-${roomId.value}`,
  async () => {
    if (roomId.value > 0) {
      await fetchRoom(roomId.value)
    }
  },
  {
    server: true,
    watch: [roomId],
    immediate: true
  }
)

watch(roomId, async (newId) => {
  if (newId > 0 && !pending.value) {
    await fetchRoom(newId)
  }
})

const handleDeviceUpdate = async (deviceId: number, payload: Partial<Device>) => {
  if (roomId.value > 0 && currentRoom?.devices?.some(d => d.id === deviceId)) {
    await updateDeviceState(roomId.value, deviceId, payload)
  }
}
</script>
