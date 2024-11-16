import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { useStore } from '@src/data/providers/app_store_provider'
import { useParams } from '@src/core/hooks/useParams'
import React, { useEffect, useMemo } from 'react'
import { Characters } from '@src/data/db/characters'
import { RarityGauge } from '@src/presentation/components/rarity_gauge'
import classNames from 'classnames'
import { Element, WeaponType } from '@src/domain/constant'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { CharDetail } from '../components/char_detail'
import { getElementImage, getSideAvatar, getTalentWeaponImage } from '@src/core/utils/fetcher'
import { ElementIcon } from '../components/element_icon'

export const MyCharacters = observer(() => {
  const { charStore, settingStore, modalStore } = useStore()
  const { setParams, params } = useParams({
    searchWord: '',
    element: [],
    weapon: [],
  })

  const filteredChar = useMemo(
    () =>
      _.filter(
        Characters.sort((a, b) => a.name.localeCompare(b.name)),
        (item) => {
          const regex = new RegExp(params.searchWord, 'i')
          const nameMatch = item.name.match(regex)
          const elmMatch = _.size(params.element) ? _.includes(params.element, item.element) : true
          const weaponMatch = _.size(params.weapon) ? _.includes(params.weapon, item.weapon) : true

          return nameMatch && elmMatch && weaponMatch
        }
      ),
    [params]
  )

  const FilterIcon = ({ type, value }: { type: 'element' | 'weapon'; value: Element | WeaponType }) => {
    const array = type === 'element' ? params.element : params.weapon
    const checked = _.includes(array, value)
    return (
      <div
        className={classNames(
          'w-6 h-6 mobile:w-7 mobile:h-7 flex items-center justify-center duration-200 rounded-full cursor-pointer hover:bg-primary-lighter',
          {
            'bg-primary-lighter': checked,
          }
        )}
        onClick={() => setParams({ [type]: checked ? _.without(array, value) : [...array, value] })}
        title={value}
      >
        {type === 'element' ? (
          <ElementIcon element={value as Element} size="w-4 h-4 mobile:w-5 mobile:h-5" />
        ) : (
          <img src={getTalentWeaponImage(value)} />
        )}
      </div>
    )
  }

  useEffect(() => {
    const close = () => {
      if (window.innerWidth < 430) {
        modalStore.closeModal()
      }
    }
    window.addEventListener('resize', close)
    window.addEventListener('orientationchange', close)

    return () => {
      window.removeEventListener('resize', close)
      window.removeEventListener('orientationchange', close)
    }
  }, [])

  return (
    <div className="flex flex-col items-center w-full gap-5 p-5 max-w-[1200px] mx-auto mobile:h-full">
      <div className="flex w-full h-full gap-x-10">
        <div className="flex flex-col w-[30%] h-full gap-y-2 shrink-0 mobile:w-full">
          <div className="flex items-center justify-between gap-5">
            <p className="text-2xl font-bold text-white shrink-0">My Resonators</p>
            <TextInput
              onChange={(value) => setParams({ searchWord: value })}
              value={params.searchWord}
              placeholder="Search Resonator Name"
            />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex gap-1">
              <FilterIcon type="element" value={Element.GLACIO} />
              <FilterIcon type="element" value={Element.FUSION} />
              <FilterIcon type="element" value={Element.ELECTRO} />
              <FilterIcon type="element" value={Element.AERO} />
              <FilterIcon type="element" value={Element.SPECTRO} />
              <FilterIcon type="element" value={Element.HAVOC} />
            </div>
            <div className="flex gap-1">
              <FilterIcon type="weapon" value={WeaponType.SWORD} />
              <FilterIcon type="weapon" value={WeaponType.BROADBLADE} />
              <FilterIcon type="weapon" value={WeaponType.PISTOLS} />
              <FilterIcon type="weapon" value={WeaponType.GAUNTLET} />
              <FilterIcon type="weapon" value={WeaponType.RECTIFIER} />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 pr-2 mt-1 rounded-lg mobile:pr-0 mobile:max-h-[calc(100vh-200px)] customScrollbar mobile:hideScrollbar">
            {_.map(filteredChar, (item) => {
              const owned = _.includes(_.map(charStore.characters, 'cId'), item.id)
              const codeName =
                item.order === '4' && settingStore.settings.travelerGender === 'zhujue' ? '5' : item.order
              return (
                <div
                  className={classNames(
                    'w-full text-xs text-white duration-200 border rounded-lg cursor-pointer bg-primary-bg border-primary-border hover:scale-95',
                    owned ? 'border-opacity-100' : 'border-opacity-30'
                  )}
                  onClick={() => {
                    charStore.setValue('selected', item.id)
                    if (window.innerWidth <= 430) {
                      modalStore.openModal(<CharDetail />)
                    }
                  }}
                  key={item.name}
                >
                  <div className={classNames('relative', owned ? 'opacity-100' : 'opacity-30')}>
                    <div className="absolute top-1.5 left-1.5">
                      <ElementIcon element={item.element} size="w-4 h-4" />
                    </div>
                    {owned && (
                      <div className="absolute px-1.5 py-1 rounded-full top-1 right-1 bg-primary-light font-bold">
                        S{_.find(charStore.characters, ['cId', item.id])?.cons || 0}
                      </div>
                    )}
                    {item.beta && (
                      <div className="absolute right-0 px-1 rounded-l-[4px] bottom-5 bg-rose-600 text-[10px] font-semibold">
                        Beta
                      </div>
                    )}
                    <div className="absolute bg-primary-darker px-1 rounded-full right-1 bottom-0.5">
                      <RarityGauge rarity={item.rarity} textSize="text-[10px]" />
                    </div>
                    <img
                      src={getSideAvatar(codeName)}
                      className="object-contain rounded-t-lg bg-primary-darker aspect-square"
                    />
                  </div>
                  <p
                    className={classNames(
                      'w-full px-2 py-1 text-center truncate bg-primary',
                      owned ? 'opacity-100' : 'opacity-30'
                    )}
                  >
                    {item.name}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="mobile:hidden">
          <CharDetail />
        </div>
      </div>
    </div>
  )
})
