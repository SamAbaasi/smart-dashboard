import type { Device } from '~/types'
const baseUrl = "https://smart-home-api.lahzeakhari.ir"
export const updateDevice = async (
  roomId: number,
  deviceId: number,
  payload: any
): Promise<Device> => {
  const { data, error } = await useFetch(`${baseUrl}/api/rooms/${roomId}/devices/${deviceId}`, {
    method: 'POST',
    body: payload,
  })

  if (error.value) {
    throw new Error(error.value.message || 'Failed to update device')
  }

  return data.value as Device
}
