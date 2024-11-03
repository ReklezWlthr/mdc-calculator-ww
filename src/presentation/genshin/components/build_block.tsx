import { findCharacter } from '@src/core/utils/finder'
import { useStore } from '@src/data/providers/app_store_provider'
import { IBuild } from '@src/domain/constant'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { BuildModalBlock } from './modals/build_modal'
import _ from 'lodash'
import { getAvatar } from '@src/core/utils/fetcher'

interface BuildBlockProps {
  owner: string
  build: IBuild[]
  onClick: (id: string) => void
  selected: string
}

export const BuildBlock = observer(({ build, owner, onClick, selected }: BuildBlockProps) => {
  const { settingStore } = useStore()

  const char = findCharacter(owner)

  const [open, setOpen] = useState(false)
  const characterData = findCharacter(owner)
  const codeName =
    characterData?.codeName === 'Player' ? settingStore.settings.travelerGender : characterData?.codeName || ''

  return (
    <div>
      <div
        className="flex items-center w-full h-10 overflow-hidden text-white duration-200 rounded-lg cursor-pointer shrink-0 bg-primary-dark"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="relative w-16 h-full overflow-hidden shrink-0">
          <div className="absolute top-0 left-0 z-10 w-full h-full from-8% to-40% bg-gradient-to-l from-primary-dark to-transparent" />
          <img src={getAvatar(codeName)} className="object-cover h-16 aspect-square scale-[300%] -ml-0.5 -mt-0.5" />
        </div>
        <div className="flex items-center justify-between w-full px-2">
          <div className="flex items-center justify-center gap-2">
            <p className="font-bold text-gray line-clamp-1">{char.name}</p>
            <p className="flex items-center justify-center w-5 h-5 text-xs font-bold rounded-md bg-primary-light">
              {_.size(build)}
            </p>
          </div>
          <i
            className={classNames('duration-150 fa-solid fa-caret-down text-primary-lighter', { 'rotate-180': open })}
          />
        </div>
      </div>
      <div
        className={classNames(
          'text-white overflow-hidden duration-200 pl-2 ml-3 border-l-2 border-primary-lighter',
          open ? 'max-h-screen' : 'max-h-0'
        )}
      >
        {_.map(build, (item) => (
          <div
            key={item.id}
            className="mt-2 duration-150 cursor-pointer active:scale-[98%]"
            onClick={() => onClick(item.id)}
          >
            <BuildModalBlock
              build={item}
              button={
                <i
                  className={classNames(
                    'fa-solid fa-caret-right duration-300 mr-1 text-4xl text-primary-light',
                    selected === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                  )}
                />
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
})
