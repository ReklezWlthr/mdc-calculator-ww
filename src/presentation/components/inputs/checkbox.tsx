import React from 'react'
import classNames from 'classnames'

type CheckboxInputProps = {
  label?: string
  onClick: (v: boolean) => void
  disabled?: boolean
  checked: boolean
  small?: boolean
}

export const CheckboxInput = ({ label, onClick, disabled, checked, small }: CheckboxInputProps) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <label htmlFor={label} onClick={() => !disabled && onClick(!checked)}>
      <div
        className={classNames('rounded-[4px]', small ? 'w-3 h-3' : 'w-4 h-4', {
          'bg-white': !disabled && !checked,
          'bg-primary': disabled && !checked,
          'bg-primary-lighter': checked && !disabled,
          'bg-primary-light': checked && disabled,
          'cursor-not-allowed text-primary': disabled,
          'cursor-pointer text-white': !disabled,
          'border border-dark-4': !checked,
        })}
      >
        <i
          className={classNames(
            'fa-solid flex justify-center items-center fa-check',
            small ? 'w-3 h-3 text-[8px]' : 'w-4 h-4 text-[10px]'
          )}
        />
      </div>
    </label>
  )
}
