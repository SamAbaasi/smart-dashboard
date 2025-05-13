import { defineStore } from 'pinia'
import type { Toast, ToastVariant } from '~/types'

let toastIdCounter = 0
const toastTimers = new Map<number, ReturnType<typeof setTimeout>>()

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[]
  }),

  getters: {
    allToasts: (state) => state.toasts
  },

  actions: {
    addToast(payload: {
      message: string
      variant?: ToastVariant
      boldMessage?: string
      timeout?: number
    }) {
      const id = ++toastIdCounter

      const toast: Toast = {
        id,
        message: payload.message,
        variant: payload.variant ?? 'success',
        boldMessage: payload.boldMessage ?? '',
        show: true
      }

      this.toasts.push(toast)

      const timerId = setTimeout(() => {
        this.removeToast(id)
      }, payload.timeout ?? 5000)

      toastTimers.set(id, timerId)
    },

    removeToast(id: number) {
      const index = this.toasts.findIndex((t) => t.id === id)
      if (index !== -1) {
        const timerId = toastTimers.get(id)
        if (timerId) clearTimeout(timerId)
        toastTimers.delete(id)
        this.toasts.splice(index, 1)
      }
    },

    clearAll() {
      this.toasts.forEach((toast) => {
        const timerId = toastTimers.get(toast.id)
        if (timerId) clearTimeout(timerId)
      })
      toastTimers.clear()
      this.toasts = []
    }
  }
})
