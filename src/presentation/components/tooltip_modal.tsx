import { Transition } from '@headlessui/react'
import { useStore } from '@src/data/providers/app_store_provider'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { Fragment, MouseEvent, useCallback, useEffect, useRef, useState } from 'react'

export const TooltipModal = observer(
  ({
    children,
    title,
    body,
    style,
    containerStyle,
  }: {
    children: React.ReactElement
    title?: React.ReactNode
    body: React.ReactNode
    style?: string
    containerStyle?: string
  }) => {
    const { modalStore } = useStore()

    const onOpen = () => {
      modalStore.openModal(
        <div
          className={classNames(
            'px-3 py-2 rounded-lg bg-primary-dark shadow-md border border-primary space-y-1 text-[13px] text-gray mobile:max-h-[80dvh] mobile:overflow-y-auto',
            style
          )}
        >
          {!!title && (
            <>
              <div className="text-sm font-bold text-white">{title}</div>
              <div className="h-0 border-t border-primary-lighter" />
            </>
          )}
          {body}
        </div>
      )
    }

    return (
      <div className={classNames('text-sm text-gray', containerStyle)}>
        {React.cloneElement(children, {
          onClick: () => onOpen(),
          className: classNames(children.props?.className, 'cursor-pointer'),
        })}
      </div>
    )
  }
)
