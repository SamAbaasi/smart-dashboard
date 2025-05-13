import { defineStore } from 'pinia'
import type { Device, Room } from '~/types'
import { useToast } from '~/composables/useToast'
import { fetchRooms as fetchRoomsApi, fetchRoom as fetchRoomApi } from '~/api/room'
import { updateDevice as updateDeviceApi } from '~/api/device'

export const useSmartHomeStore = defineStore('smartHome', () => {
  const toast = useToast()

  const rooms = ref<Room[]>([])
  const currentRoom = ref<Room | null>(null)
  const savedTheme = useCookie<'light' | 'dark'>('theme', { default: () => 'light' })
  const theme = ref<'light' | 'dark'>(savedTheme.value)
  const error = ref<string | null>(null)
  const updatedDevice = ref<Device | null>(null)
  const updatingDeviceId = ref<number | null>(null)
  const loading = ref(false)

  const fetchRooms = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetchRoomsApi()
      rooms.value = response
    } catch (err) {
      error.value = 'Failed to load rooms'
      toast.error(error.value)
    } finally {
      loading.value = false
    }
  }

  const fetchRoom = async (id: number) => {
    loading.value = true
    currentRoom.value = null
    error.value = null
    try {
      const room = await fetchRoomApi(id)
      currentRoom.value = reactive({
        ...room,
        devices: room.devices as Device[],
      })
    } catch (err) {
      error.value = 'Room not found'
      toast.error(error.value)
    } finally {
      loading.value = false
    }
  }

const updateDeviceState = async (
  roomId: number,
  deviceId: number,
  payload: Partial<Device>
) => {
  loading.value = true
  error.value = null

  const originalDevice = currentRoom.value?.devices.find(d => d.id === deviceId)
  if (!originalDevice) {
    loading.value = false
    return
  }

  const optimisticDevice = { ...originalDevice, ...payload }
  updatedDevice.value = optimisticDevice

  if (currentRoom.value) {
    currentRoom.value.devices = currentRoom.value.devices.map(device =>
      device.id === deviceId ? optimisticDevice : device
    )
  }

  updatingDeviceId.value = deviceId

  try {
    const realUpdatedDevice = await updateDeviceApi(roomId, deviceId, payload)
    updatedDevice.value = realUpdatedDevice
    if (currentRoom.value) {
      currentRoom.value.devices = currentRoom.value.devices.map(device =>
        device.id === deviceId ? realUpdatedDevice : device
      )
    }
    toast.success('Device updated successfully')
    return realUpdatedDevice
  } catch (err) {
    console.error(err)
    error.value = 'Failed to update device'
    toast.error(error.value)

    if (currentRoom.value && originalDevice) {
      currentRoom.value.devices = currentRoom.value.devices.map(device =>
        device.id === deviceId ? originalDevice : device
      )
    }

    updatedDevice.value = originalDevice
  } finally {
    updatingDeviceId.value = null
    loading.value = false
  }
}


  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-bs-theme', theme.value)
    savedTheme.value = theme.value
    toast.info(`Switched to ${theme.value} mode`)
  }

  return {
    rooms,
    currentRoom,
    theme,
    error,
    loading,
    updatingDeviceId,
    fetchRooms,
    fetchRoom,
    updateDeviceState,
    toggleTheme,
    updatedDevice
  }
})
