import { Listbox, Menu, Transition } from '@headlessui/react'
import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'

type KebabProps = {
  label?: string
  options: {
    title: React.ReactNode
    img?: string
    onClick?: () => void
  }[]
  style?: string
  icon?: string
}

export const Kebab = ({ label, options, style, icon }: KebabProps) => {
  return (
    <Menu
      as="div"
      className={classNames('relative font-normal', style, {
        'w-full': !style,
      })}
    >
      <Menu.Button className="relative flex shadow-light-01 justify-between items-center px-2 py-1 border rounded-lg text-sm transition-all duration-300 w-full min-h-[30px]">
        <div className="flex items-center">
          <div>{label && <i className={icon} />}</div>
          <div className="text-sm truncate">{label}</div>
        </div>
      </Menu.Button>
      <Transition
        enter="transition duration-150 ease-out origin-top"
        enterFrom="transform scale-y-0 opacity-0"
        enterTo="transform scale-y-100 opacity-100"
        leave="transition duration-150 ease-out origin-top"
        leaveFrom="transform scale-y-100 opacity-100"
        leaveTo="transform scale-y-0 opacity-0"
        className="relative z-[1000]"
      >
        <Menu.Items className="absolute z-50 w-full mt-1 overflow-auto text-sm text-white rounded-md bg-primary-darker max-h-60 dropdownScrollbar">
          {_.map(options, (item, i) => (
            <Menu.Item
              as="div"
              key={`${item.title}_${i}`}
              className="relative z-50 flex items-center px-2 py-1 cursor-pointer select-none"
            >
              {item.img && <img src={item.img} className="object-cover w-6 h-6 mr-2" />}
              <span className="block truncate">{item.title}</span>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
