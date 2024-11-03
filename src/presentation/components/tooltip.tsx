import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { Fragment, MouseEvent, useCallback, useEffect, useRef, useState } from 'react'

export type TooltipPositionT = 'top' | 'bottom' | 'left' | 'right'

export const Tooltip = observer(
  ({
    children,
    title,
    body,
    position = 'right',
    style,
    containerStyle,
  }: {
    children: React.ReactElement
    title?: React.ReactNode
    body: React.ReactNode
    position?: TooltipPositionT
    style?: string
    containerStyle?: string
  }) => {
    const [hovered, setHovered] = useState(false)
    const [ref, setRef] = useState<HTMLElement>(null)

    const EDGE_MARGIN = 16
    const MAIN_MARGIN = 16

    useEffect(() => {
      if (ref && hovered) {
        const main = ref.previousSibling as HTMLDivElement

        if (main) {
          // Get calculated tooltip coordinates and size
          const tooltip_rect = ref?.getBoundingClientRect()
          const text_rect = main?.getBoundingClientRect()
          let width = tooltip_rect.width * (100 / 95)
          let height = tooltip_rect.height * (100 / 95)

          const x = text_rect.left + window.scrollX
          const y = text_rect.top + window.scrollY

          if (height >= window.innerHeight - EDGE_MARGIN * 2) {
            ref.style.width = width * 1.35 + 'px'
            width = width * 1.35
            height = (ref?.getBoundingClientRect()?.height || height) * 1.075
          }

          // Define tooltip's position
          let posX =
            position === 'right'
              ? x + text_rect?.width + MAIN_MARGIN
              : position === 'left'
              ? x - width - MAIN_MARGIN
              : x
          let posY =
            position === 'top'
              ? y - height - MAIN_MARGIN
              : position === 'bottom'
              ? y + text_rect?.height + MAIN_MARGIN
              : y
          // Position tooltip
          ref.style.top = posY + 'px'
          ref.style.left = posX + 'px'

          // Corrections if out of window
          // Check right
          const rightOverflow = posX + width + EDGE_MARGIN - window.innerWidth
          if (rightOverflow > 0) posX = position === 'right' ? x - width - EDGE_MARGIN : posX - rightOverflow
          // Check left
          const leftOverflow = posX + MAIN_MARGIN
          if (leftOverflow < 0) posX = position === 'left' ? x + text_rect?.width + MAIN_MARGIN : posX - leftOverflow
          // Check top
          const topOverflow = posY + MAIN_MARGIN
          if (topOverflow < 0) posY = position === 'top' ? y + text_rect?.height + MAIN_MARGIN : posY - topOverflow
          // Check bottom
          const bottomOverflow = posY + height + EDGE_MARGIN - window.innerHeight
          if (bottomOverflow > 0) posY = position === 'bottom' ? y - height - EDGE_MARGIN : posY - bottomOverflow

          // Apply corrected position
          ref.style.top = posY + 'px'
          ref.style.left = posX + 'px'
        }
      }
    }, [position, hovered, ref])

    return (
      <div className={classNames('text-sm text-gray', containerStyle)}>
        {React.cloneElement(children, {
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
          className: classNames(children.props?.className, 'cursor-help'),
        })}
        <Transition
          show={hovered}
          as="div"
          ref={setRef}
          enter="ease-out duration-300 transition-transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className={classNames(
            'z-[2000] absolute px-3 py-2 rounded-lg bg-primary-dark shadow-md border border-primary space-y-1 text-[13px]',
            hovered ? 'visible' : 'invisible',
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
        </Transition>
      </div>
    )
  }
)
