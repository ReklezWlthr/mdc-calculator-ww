import { Alert } from '@src/presentation/components/alert'
import { makeAutoObservable } from 'mobx'

export interface DefaultToastType {
  title: string
  label?: string
  icon: string
  color: 'green' | 'red' | 'blue' | 'yellow'
}

export interface ToastStoreType {
  isOpen: boolean
  notification: JSX.Element
  openNotification: (options: DefaultToastType) => void
  closeNotification: () => void
  hydrate: (data: ToastStoreType) => void
}

export class Toast {
  isOpen: boolean
  notification: JSX.Element

  constructor() {
    this.isOpen = false
    this.notification = null

    makeAutoObservable(this)
  }

  openNotification(options: DefaultToastType) {
    this.isOpen = true
    this.notification = <Alert {...options} />

    setTimeout(() => {
      this.closeNotification()
    }, 3000)
  }

  closeNotification() {
    this.isOpen = false
  }

  hydrate(data: ToastStoreType) {
    if (!data) return
    this.isOpen = data.isOpen
  }
}
