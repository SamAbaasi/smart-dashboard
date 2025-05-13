<template>
    <footer class="bg-primary text-white py-3 mt-auto shadow-sm">
      <div class="container d-flex justify-content-between align-items-center flex-wrap">
        <p class="mb-0">&copy; {{ currentYear }} Smart Home Inc. All rights reserved.</p>
        <ul class="nav">
          <li class="nav-item">
            <NuxtLink to="/privacy" class="nav-link text-white">Privacy</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/terms" class="nav-link text-white">Terms</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/contact" class="nav-link text-white">Contact</NuxtLink>
          </li>
        </ul>
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  const currentYear = new Date().getFullYear()
  </script>
  
  <style scoped>
  .nav-link {
    padding: 0 0.5rem;
  }
  
  .nav-link:hover {
    text-decoration: underline;
  }
  </style>
  