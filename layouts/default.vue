<template>
  <div class="d-flex flex-column min-vh-100">
    <AppHeader />
    <main class="flex-grow-1 py-4">
      <div class="container">
        <transition name="fade" mode="out-in">
          <LoadingSpinner v-if="loading" />
          <slot v-else />
        </transition>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
<script setup lang="ts">

const { loading } = useSmartHomeStore()

</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>