import { ref, type Ref } from 'vue'
import { useToast } from '~/composables/useToast'

interface UseApiProps<ResponseType> {
  apiMethod: (params?: Record<string, any>) => Promise<ResponseType>
  successCallback?: (data: ResponseType) => void
  failedCallback?: (error: any) => void
}

interface UseApiReturn<ResponseType> {
  pending: Ref<boolean>
  request: (params?: Record<string, any>) => Promise<ResponseType>
}

export function useAPI<ResponseType>({
  apiMethod,
  successCallback,
  failedCallback,
}: UseApiProps<ResponseType>): UseApiReturn<ResponseType> {
  const pending = ref(false)
  const toast = useToast()

  const handleError = (error: any) => {
    const status = error?.response?.status || error?.status

    let message = 'An unexpected error occurred'

    if (status === 401) {
      message = 'Unauthorized. Please log in again.'
    } else if (status === 404) {
      message = 'Not found. Please check your request.'
    } else if (status === 500) {
      message = 'Internal server error. Try again later.'
    } else if (error?.message) {
      message = error.message
    }

    toast.error(message)
  }

  const request = async (params?: Record<string, any>): Promise<ResponseType> => {
    pending.value = true

    try {
      const response = await apiMethod(params)
      successCallback?.(response)
      return response
    } catch (error) {
      handleError(error)
      failedCallback?.(error)
      throw error
    } finally {
      pending.value = false
    }
  }

  return {
    pending,
    request,
  }
}
