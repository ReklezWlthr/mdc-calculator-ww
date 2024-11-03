import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

export const BulletPoint = observer(({ children, color }: { children: React.ReactNode; color?: string }) => {
  return (
    <p className="pl-3">
      <span className={classNames('mr-2', color || 'text-blue')}>✦</span>
      {children}
    </p>
  )
})

export const Collapsible = observer(
  ({
    label,
    children,
    childRight,
  }: {
    label: React.ReactNode
    children: React.ReactNode | React.ReactNode[]
    childRight?: React.ReactNode
  }) => {
    const [open, setOpen] = useState(false)

    return (
      <div className="space-y-1 text-sm transition-all duration-200 rounded-lg bg-primary-darker text-gray">
        <div className="flex items-center p-3 cursor-pointer gap-x-3" onClick={() => setOpen(!open)}>
          <div className="text-base font-bold text-white">{label}</div>
          {childRight}
        </div>
        <div
          className={classNames(
            'space-y-1 transition-all duration-200 overflow-hidden px-3',
            open ? 'max-h-screen pb-3' : 'max-h-0'
          )}
        >
          {children}
        </div>
      </div>
    )
  }
)
