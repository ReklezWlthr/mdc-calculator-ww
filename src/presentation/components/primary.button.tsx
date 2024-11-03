import React, { MouseEventHandler } from 'react'
import classNames from 'classnames'

export interface PrimaryButtonPropsType {
  onClick: MouseEventHandler<HTMLButtonElement>
  title?: string
  disabled?: boolean
  icon?: string | React.ReactNode
  style?: string
  loading?: boolean
  small?: boolean
}

export const PrimaryButton = ({ onClick, title, disabled, icon, style, loading, small }: PrimaryButtonPropsType) => {
  //---------------------
  // CONST
  //---------------------
  const colorClasses = classNames(
    {
      'border-primary-lighter hover:border-primary-light bg-primary-lighter hover:bg-primary-light active:scale-95 text-white cursor-pointer duration-200':
        !disabled,
    },
    {
      'bg-primary-darker border-primary text-primary-border cursor-not-allowed': disabled,
    }
  )

  //---------------------
  // RENDER
  //---------------------
  return (
    <button
      className={classNames(
        'h-fit border',
        colorClasses,
        style,
        small ? 'py-1 px-2 rounded-md' : 'py-2 px-3 rounded-lg'
      )}
      disabled={disabled || loading}
      onClick={!(disabled || loading) ? onClick : undefined}
    >
      {icon && !loading && <>{typeof icon === 'string' ? <i className={icon} /> : <>{icon}</>}</>}
      {title && !loading && <p className={classNames('font-bold', small ? 'text-xs' : 'text-sm')}>{title}</p>}
      {loading && (
        <i className="flex items-center justify-center w-5 h-5 text-sm fa-solid fa-circle-notch animate-spin" />
      )}
    </button>
  )
}
