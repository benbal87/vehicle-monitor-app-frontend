import { MatDialogConfig } from '@angular/material/dialog'

export type Notification = {
  id: number
  message: string
}

export type Vehicle = {
  id: number
  latitude: number
  longitude: number
  notifications: Array<Notification>
}

export interface NotificationDialogData {
  vehicle: Vehicle
}

export interface NotificationDialogProps extends MatDialogConfig {
  data: NotificationDialogData
}

export type Location = { lat: number, lng: number }
