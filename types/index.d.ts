declare module '~/types' {

export type ToastVariant = 'success' | 'danger' | 'info' | 'warning'

export interface Toast {
  id: number
  message: string
  variant: ToastVariant
  boldMessage?: string
  show: boolean
}

export interface Device {
  id: number;
  room_id: number;
  name: string;
  status: 'on' | 'off';
  brightness: number | null;
  temperature: number | null;
  created_at: string;
  updated_at: string;
}

  
  export interface Room {
    id: number
    name: string
    created_at: string
    updated_at: string
    devices: Device[]
  }
  
  export type Toast = ReturnType<typeof useToast>['toasts']['value'][number]
}