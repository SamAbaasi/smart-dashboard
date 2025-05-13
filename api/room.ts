import type { Room } from '~/types'
const baseUrl = "https://smart-home-api.lahzeakhari.ir"

export const fetchRooms = async (): Promise<Room[]> => {

  const { data, error } = await useFetch(`${baseUrl}/api/rooms`, {
    method: 'GET',
  })

  if (error.value) {
    throw new Error(error.value.message || 'Failed to fetch rooms')
  }

  return data.value as Room[]
}
export const fetchRoom = async (id: number): Promise<Room> => {
  const { data, error } = await useFetch(`${baseUrl}/api/rooms/${id}`, {
    method: 'GET',
  })

  if (error.value) {
    throw new Error(error.value.message || 'Failed to fetch room')
  }

  return data.value as Room
}
