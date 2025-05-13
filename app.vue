<template>
  <div>
    <Toast />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useSmartHomeStore } from '@/stores/smartHome'

const store = useSmartHomeStore()

// Initialize theme on mount
onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', store.theme)
})

// Optional: Add global transition
useHead({
  htmlAttrs: {
    class: 'transition-colors duration-300'
  }
})
</script>

<style>
/* Global transition styles */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Global scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bs-body-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--bs-primary);
  border-radius: 4px;
}
</style>