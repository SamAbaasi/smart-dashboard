<template>
  <div>
    <h1 class="mb-4">Smart Home Rooms</h1>
    <LoadingSpinner v-if="pending" />
    <ErrorAlert v-else-if="error" :message="error" />
    <div v-else class="row g-4">
      <div 
        v-for="room in rooms" 
        :key="room.id"
        class="col-md-6 col-lg-4"
      >
        <RoomCard 
          :room="room"
          :loading="loading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { 
  rooms,
  fetchRooms,
  loading,
  error 
} = useSmartHomeStore()

const { pending } = await useAsyncData(
  'rooms',
  async () => {
    await fetchRooms()
    return rooms
  },
  {
    server: true,
    immediate: true,
    watch: [() => rooms.length]
  }
)

onMounted(async () => {
  if (!rooms.length && !pending && !error) {
    await fetchRooms()
  }
})
</script>