import classNames from 'classnames'

export const PillInput = ({
  value,
  onClick,
  onClear,
  style,
  disabled,
  placeholder,
  small,
}: {
  value: string
  onClick: () => void
  onClear?: () => void
  style?: string
  disabled?: boolean
  placeholder?: string
  small?: boolean
}) => {
  return (
    <div
      className={classNames(
        'group flex items-center px-2 py-1 border rounded-lg transition-colors duration-300 font-normal truncate w-full gap-1',
        small ? 'text-xs' : 'text-sm',
        value && !disabled ? 'text-gray' : 'text-primary-light',
        disabled
          ? 'cursor-not-allowed bg-primary-bg border-primary'
          : 'cursor-pointer hover:border-primary-lighter bg-primary-darker border-primary-light',
        style
      )}
      onClick={() => !disabled && onClick()}
    >
      <p className="w-full truncate transition-none">{value || placeholder || '-'}</p>
      {onClear && (
        <i
          className={classNames(
            'text-sm transition duration-100 opacity-0 fa-solid fa-times-circle text-primary-light w-0',
            {
              'group-hover:opacity-100 group-hover:w-fit cursor-pointer': !disabled,
            }
          )}
          onClick={(event) => {
            event.stopPropagation()
            !disabled && onClear()
          }}
        />
      )}
    </div>
  )
}
