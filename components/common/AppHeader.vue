<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <header class="navbar navbar-expand-lg bg-primary text-white shadow-sm">
        <div class="container-fluid d-flex justify-content-between align-items-center">
          <h1 class="h4 m-0" id="dashboard-title">Smart Home Dashboard</h1>

          <nav aria-label="Main navigation">
            <ul class="navbar-nav d-flex flex-row gap-3">
              <li class="nav-item">
                <NuxtLink
                  to="/"
                  class="nav-link text-white"
                  aria-label="Go to home page"
                >
                  <i class="bi bi-house-door me-1" aria-hidden="true"></i>
                  Home
                </NuxtLink>

              </li>
            </ul>
          </nav>
        </div>
      </header>

      <button 
        class="btn btn-light d-flex align-items-center gap-2"
        @click="store.toggleTheme"
        aria-label="Toggle between light and dark theme"
      >
        <i 
          class="bi transition-color"
          :class="store.theme === 'light' ? 'bi-moon' : 'bi-sun'"
          aria-hidden="true"
        ></i>
        {{ store.theme === 'light' ? 'Dark' : 'Light' }} Mode
      </button>
    </div>
  </nav>
</template>


<script setup lang="ts">
const store = useSmartHomeStore()
</script>

<style scoped>
.bi {
  transition: color 0.3s ease;
}
.nav-link {
  transition: color 0.3s ease, background-color 0.3s ease;
  border-radius: 0.25rem;
  outline: none;
}
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}
.nav-link:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
  background-color: rgba(255, 255, 255, 0.15);
}
</style>
