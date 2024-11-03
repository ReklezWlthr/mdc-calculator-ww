import React from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from 'src/data/providers/app_store_provider'
import classNames from 'classnames'

export const Toast = observer(() => {
  //---------------------
  // Hooks
  //---------------------
  const { toastStore } = useStore()
  //---------------------
  // RENDER
  //---------------------
  return (
    <div className="relative flex justify-center pointer-events-none">
      <div
        className={classNames('absolute z-[9999] flex justify-end transition-all duration-500 top-0', {
          '-translate-y-40': !toastStore.isOpen,
          'translate-y-4': toastStore.isOpen,
        })}
      >
        {toastStore.notification}
      </div>
    </div>
  )
})
