import { MouseEventHandler, useState } from 'react'
import classNames from 'classnames'

export interface GhostButtonPropsType {
  onClick: MouseEventHandler<HTMLButtonElement>
  title?: string
  disabled?: boolean
  icon?: string | React.ReactNode
  tooltip?: string
}

export const GhostButton = ({ onClick, title, disabled, icon, tooltip }: GhostButtonPropsType) => {
  //---------------------
  // CONST
  //---------------------
  const colorClasses = classNames(
    {
      'border-primary-light hover:border-primary-lighter active:scale-95 text-white cursor-pointer duration-200': !disabled,
    },
    {
      'border-primary-border text-primary-border cursor-not-allowed': disabled,
    }
  )

  //---------------------
  // RENDER
  //---------------------
  return (
    <button
      className={classNames('py-2 px-3 rounded-lg border bg-transparent', colorClasses)}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      title={tooltip}
    >
      {icon && <>{typeof icon === 'string' ? <i className={icon} /> : <>{icon}</>}</>}
      {title && <p className="text-sm font-bold">{title}</p>}
    </button>
  )
}
