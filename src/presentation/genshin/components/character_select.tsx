import { getSideAvatar } from '@src/core/utils/fetcher'
import { useStore } from '@src/data/providers/app_store_provider'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'

export const CharacterSelect = observer(
  ({
    onClick,
    isSelected,
    order,
    ringColor = 'ring-primary-lighter',
  }: {
    onClick?: () => void
    isSelected: boolean
    order: string
    ringColor?: string
  }) => {
    const { settingStore } = useStore()

    const codeName = order === '4' && settingStore?.settings?.travelerGender === 'zhujue' ? '5' : order

    return (
      <div
        className={classNames('w-12 h-12 rounded-full bg-primary duration-200 relative shrink-0 overflow-hidden', {
          'hover:ring-2 ring-primary-light': onClick && !isSelected,
          [classNames('ring-4', ringColor)]: isSelected,
          'cursor-pointer': onClick,
        })}
        onClick={onClick}
      >
        <img src={getSideAvatar(codeName)} className="absolute scale-110" />
      </div>
    )
  }
)
