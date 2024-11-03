import React from 'react'
import { Switch } from '@headlessui/react'
import classNames from 'classnames'

type ToggleSwitchProps = {
  enabled?: boolean
  disabled?: boolean
  onClick: (checked: boolean) => void
}

export const ToggleSwitch = ({ enabled, disabled, onClick }: ToggleSwitchProps) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <Switch
      checked={enabled || false}
      disabled={disabled}
      onChange={onClick}
      className={classNames(`relative inline-flex h-6 w-11 items-center rounded-full shrink-0 focus:outline-none`, {
        'bg-primary-light': enabled && !disabled,
        'bg-primary': !enabled && !disabled,
        'bg-primary-dark cursor-not-allowed': !enabled && disabled,
        'bg-primary-subtle cursor-not-allowed': enabled && disabled,
      })}
    >
      <span
        aria-hidden="true"
        className={classNames(
          'pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-light-02 ring-0 transition duration-300 ease-in-out',
          {
            'translate-x-[22px]': enabled,
            'translate-x-0.5': !enabled,
            'bg-gray': !disabled,
            'bg-primary-lighter': disabled,
          }
        )}
      />
    </Switch>
  )
}
