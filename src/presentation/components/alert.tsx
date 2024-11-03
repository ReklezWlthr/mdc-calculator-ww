import classNames from 'classnames'
import React from 'react'

export interface AlertProps {
  title: string
  label?: string
  icon: string
  color: 'green' | 'red' | 'blue' | 'yellow'
}

export const Alert = ({ title, label, icon = 'fa fa-circle-info', color = 'green' }: AlertProps) => {
  //---------------------
  // HANDLER
  //---------------------
  const style = {
    green: {
      text: 'text-white',
      icon: 'text-heal',
      bgColor: 'bg-primary-dark',
    },
    red: {
      text: 'text-white',
      icon: 'text-red',
      bgColor: 'bg-primary-dark',
    },
    blue: {
      text: 'text-white',
      icon: 'text-blue',
      bgColor: 'bg-primary-dark',
    },
    yellow: {
      text: 'text-white',
      icon: 'text-desc',
      bgColor: 'bg-primary-dark',
    },
  }
  //---------------------
  // RENDER
  //---------------------
  return (
    <div
      data-cy="core-notification"
      className={classNames(
        'p-4 rounded-md flex items-center gap-x-3 w-[75vw]',
        style[color]?.bgColor,
        style[color]?.text
      )}
    >
      <i className={classNames(icon, style[color]?.icon)}></i>
      <div className="flex flex-col">
        <p className="text-sm">{title}</p>
        {label && <p className="mt-2 text-sm">{label}</p>}
      </div>
    </div>
  )
}
