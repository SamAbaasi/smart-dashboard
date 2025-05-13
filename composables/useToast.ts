import { useToastStore } from "~/stores/toast"

export function useToast() {
  const toastStore = useToastStore()

  const success = (message: string, boldMessage = '') =>
    toastStore.addToast({ message, variant: 'success', boldMessage })

  const error = (message: string, boldMessage = '') =>
    toastStore.addToast({ message, variant: 'danger', boldMessage })

  const info = (message: string, boldMessage = '') =>
    toastStore.addToast({ message, variant: 'info', boldMessage })

  const warning = (message: string, boldMessage = '') =>
    toastStore.addToast({ message, variant: 'warning', boldMessage })

  return {
    success,
    error,
    info,
    warning,
    clearAll: toastStore.clearAll,
    toasts: toastStore.toasts,
    removeToast: toastStore.removeToast
  }
}
