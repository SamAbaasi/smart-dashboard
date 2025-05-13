# Smart Home Dashboard 🏠

[![Nuxt](https://img.shields.io/badge/Nuxt-3.10.3-green.svg)](https://nuxt.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-blue.svg)](https://getbootstrap.com/)
[![Pinia](https://img.shields.io/badge/Pinia-2.1.7-yellow.svg)](https://pinia.vuejs.org/)

A modern IoT dashboard for managing smart home devices with real-time controls and monitoring.

![Dashboard Preview](./screenshot.png)

## Features ✨

- **Smart Room Management**
  - List all rooms with embedded devices
  - Room-specific device controls
  - Real-time status updates
- **Device Control**
  - Light brightness control (0-100%)
  - Thermostat temperature adjustment (10-40°C)
  - Instant power toggles
- **Smart UI**
  - Dark/Light theme system
  - Optimistic UI updates
  - Toast notifications
  - Responsive Bootstrap layout
  - 404 Error page
- **Advanced Architecture**
  - Server-side rendering (SSR)
  - API response caching
  - Type-safe implementation
  - Component-based structure

## Tech Stack 🛠️

- **Core**
  - Nuxt 3 (Vue 3)
  - TypeScript
  - Pinia (State Management)
- **Styling**
  - Bootstrap 5.3
  - Bootstrap Icons
  - SCSS Custom Properties
- **API**
  - Nuxt useFetch/useAsyncData
  - Laravel API Integration

## Project Structure 📁

smart-home/
├── components/
│ ├── devices/
│ │ ├── DeviceControl.vue # Device interaction panel
│ │ └── DevicePreview.vue # Real-time device status
│ └── Navbar.vue # Main navigation
├── layouts/
│ └── default.vue # Global layout
├── pages/
│ ├── index.vue # Homepage
│ └── rooms/[id].vue # Room details
├── stores/
│ ├── smartHome.ts # Device state management
│ └── toast.ts # Notification system
├── types/ # TypeScript definitions
└── api/ # API handlers

## Installation ⚙️

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/smart-home-dashboard.git
   cd smart-home-dashboard
   ```

2. **Install Dependencies**
```bash
    npm install
```
2. **Environment Setup**
Create .env file:
```bash
    API_BASE_URL=https://smart-home-api.lahzeakhari.ir
```
3. **Development Server**
```bash
npm run dev
```
3. **Development Server**
```bash
npm run dev
```

## API Integration 🌐
### The dashboard integrates with these Laravel API endpoints:

Endpoint	Method	Description
/api/rooms	GET	List all rooms
/api/rooms/{id}	GET	Get room details
/api/rooms/{id}/devices/{deviceId}	POST	Update device state
Example Usage:

```javascript
// Fetch all rooms
const { data: rooms } = await useFetch('/api/rooms', {
  headers: { 'Content-Type': 'application/json' }
})
```

## State Management 🧠
### Pinia store architecture:

```javascript
// stores/smartHome.ts
export const useSmartHomeStore = defineStore('smartHome', {
  state: () => ({
    rooms: [] as Room[],
    currentRoom: null as Room | null,
    theme: 'light' as 'light' | 'dark'
  }),
  
  actions: {
    async fetchRooms() {
      // Server-side data fetching
    },
    
    async updateDevice(roomId: number, deviceId: number, payload: Device) {
      // Optimistic update implementation
      // POST /api/rooms/{id}/devices/{deviceId}
    }
  }
})
```
## Key Components 🔑

```javascript

<template>
  <div class="device-control">
    <input 
      type="range" 
      :value="device.brightness"
      @input="updateBrightness"
      :disabled="isDisabled"
    >
  </div>
</template>

<script setup>
// Debounced updates and validation logic
</script>

```
## Performance Optimization 🚀
### Server-Side Rendering

```javascript

// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,
  nitro: { preset: 'node-server' }
})
```

### Smart Data Fetching

```javascript
const { pending, data } = useAsyncData(
  'rooms',
  () => fetchRooms(),
  { server: true, lazy: true }
)
```
