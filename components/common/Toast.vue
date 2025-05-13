<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1055">
    <TransitionGroup name="toast-fade" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast align-items-center text-white mb-2 fade show"
        :class="`bg-${toast.variant}`"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">
            <strong v-if="toast.boldMessage">{{ toast.boldMessage }}: </strong>
            {{ toast.message }}
          </div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            @click="removeToast(toast.id)"
          />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const {toasts, removeToast} = useToast()
</script>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.5s ease;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
}
</style>
