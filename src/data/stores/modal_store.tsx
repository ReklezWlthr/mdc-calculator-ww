import { makeAutoObservable } from 'mobx'
import { enableStaticRendering, Observer } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

interface ModalContentType {
  title: string
  content?: string | React.ReactNode
}

interface ActionButtonType {
  confirm?: () => void | null | Promise<any>
  cancel?: () => void | null | Promise<any>
}

export interface DefaultModalType {
  content: ModalContentType
  actionButton: ActionButtonType
  icon?: string | React.ReactNode
  textButton?: { confirm?: string; cancel?: string }
  onCloseModal?: () => void
}

export interface ModalStoreType {
  isOpen: boolean
  modal: JSX.Element
  isLoading: boolean
  style?: string
  hydrate: (data: ModalStoreType) => void
  closeModal: () => void
  onCloseModal: () => void
  setValue: <k extends keyof this>(key: k, value: this[k]) => void
  openModal: (modal: JSX.Element) => void
}

export class Modal {
  isOpen: boolean
  modal: JSX.Element
  isLoading: boolean
  style?: string
  onCloseModal: () => void

  constructor() {
    this.isOpen = false
    this.modal = null
    this.isLoading = false
    this.style = ''
    this.onCloseModal = () => null

    makeAutoObservable(this)
  }

  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value
  }

  openModal(modal: JSX.Element, onCloseModal?: () => void) {
    this.isOpen = true
    this.onCloseModal = onCloseModal
    this.modal = modal
  }

  closeModal() {
    this.isOpen = false
    this.onCloseModal = () => null
  }

  hydrate = (data: ModalStoreType) => {
    if (!data) return

    this.isOpen = data.isOpen || false
    this.modal = data.modal || null
    this.isLoading = data.isLoading || false
    this.style = data.style || ''
  }
}
