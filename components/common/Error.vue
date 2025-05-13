<template>
    <div class="d-flex flex-column align-items-center justify-content-center">
      <div class="text-center">
        <h1 class="display-1 fw-bold text-primary">404</h1>
        <p class="fs-3">Page not found</p>
        <p class="lead">The page you're looking for doesn't exist or has been moved.</p>
        
        <NuxtLink 
          to="/" 
          class="btn btn-primary btn-lg mt-4"
          aria-label="Return to home page"
        >
          <i class="bi bi-house-door me-2"></i>
          Back to Home
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <style scoped>
  </style>