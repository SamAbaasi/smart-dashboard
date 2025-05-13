 <template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">{{ room.name }}</h5>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <span class="badge bg-primary">
          {{ room.devices.length }} devices
        </span>
        <DeviceStatus :devices="room.devices" />
      </div>
      <NuxtLink 
        :to="`/rooms/${room.id}`"
        class="btn btn-outline-primary w-100"
      >
        View Details
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Room } from '~/types'

defineProps<{
  room: Room
}>()
</script>
  
  <style scoped>
  .card {
    transition: transform 0.2s ease;
    overflow: hidden;
    cursor: pointer;
  }
  .card:hover {
    transform: scale(1.02);
  }
  .card-footer {
    z-index: 2;
    position: relative;
  }
  </style>
  