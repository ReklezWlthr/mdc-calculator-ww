import { Fragment } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from 'src/data/providers/app_store_provider'
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames'

export const Modal = observer(() => {
  //---------------------
  // Hooks
  //---------------------
  const store = useStore()

  //---------------------
  // RENDER
  //---------------------
  return (
    <>
      <Transition show={store.modalStore.isOpen} as={Fragment}>
        <Dialog
          onClose={() => {
            store.modalStore.onCloseModal?.()
            store.modalStore.closeModal()
          }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 "
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 pt-14 bg-primary-bg/80" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={classNames(
                  'z-50 flex justify-center pt-[10vh] pb-[6vh] w-screen h-screen pointer-events-none overflow-y-auto hideScrollbar',
                  store.modalStore.style
                )}
              >
                <div className="pointer-events-auto h-fit">
                  {store.modalStore.isOpen && store.modalStore.modal}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
})
