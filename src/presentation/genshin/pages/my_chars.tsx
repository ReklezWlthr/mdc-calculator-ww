import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { useStore } from '@src/data/providers/app_store_provider'
import { useParams } from '@src/core/hooks/useParams'
import React, { useCallback, useMemo, useState } from 'react'
import { findCharacter } from '@src/core/utils/finder'
import { Characters } from '@src/data/db/characters'
import { RarityGauge } from '@src/presentation/components/rarity_gauge'
import classNames from 'classnames'
import conditionals from '@src/data/lib/stats/conditionals/conditionals'
import { getBaseStat } from '@src/core/utils/data_format'
import { AscensionGrowth } from '@src/domain/scaling'
import { Element, TravelerIconName, WeaponIcon, WeaponType } from '@src/domain/constant'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { CharDetail } from '../components/char_detail'
import { getAvatar, getElementImage, getTalentWeaponImage } from '@src/core/utils/fetcher'

export const MyCharacters = observer(() => {
  const { charStore, settingStore } = useStore()
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
          'w-6 h-6 flex items-center justify-center duration-200 rounded-full cursor-pointer hover:bg-primary-lighter',
          {
            'bg-primary-lighter': checked,
          }
        )}
        onClick={() => setParams({ [type]: checked ? _.without(array, value) : [...array, value] })}
        title={value}
      >
        <img
          src={type === 'element' ? getElementImage(value) : getTalentWeaponImage(value)}
          className={classNames({ 'scale-[80%]': type === 'element' })}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center w-full gap-5 p-5 max-w-[1200px] mx-auto">
      <div className="flex w-full h-full gap-x-10">
        <div className="flex flex-col w-[30%] h-full gap-y-2 shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-white">My Characters</p>
            <TextInput
              onChange={(value) => setParams({ searchWord: value })}
              value={params.searchWord}
              placeholder="Search Character Name"
              style="!w-1/2"
            />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex gap-1">
              <FilterIcon type="element" value={Element.ANEMO} />
              <FilterIcon type="element" value={Element.PYRO} />
              <FilterIcon type="element" value={Element.HYDRO} />
              <FilterIcon type="element" value={Element.CRYO} />
              <FilterIcon type="element" value={Element.ELECTRO} />
              <FilterIcon type="element" value={Element.GEO} />
              <FilterIcon type="element" value={Element.DENDRO} />
            </div>
            <div className="flex gap-1">
              <FilterIcon type="weapon" value={WeaponType.SWORD} />
              <FilterIcon type="weapon" value={WeaponType.CLAYMORE} />
              <FilterIcon type="weapon" value={WeaponType.POLEARM} />
              <FilterIcon type="weapon" value={WeaponType.BOW} />
              <FilterIcon type="weapon" value={WeaponType.CATALYST} />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 pr-2 mt-1 rounded-lg customScrollbar">
            {_.map(filteredChar, (item) => {
              const owned = _.includes(_.map(charStore.characters, 'cId'), item.id)
              const codeName = item.codeName === 'Player' ? settingStore.settings.travelerGender : item.codeName
              return (
                <div
                  className={classNames(
                    'w-full text-xs text-white duration-200 border rounded-lg cursor-pointer bg-primary-bg border-primary-border hover:scale-95',
                    owned ? 'border-opacity-100' : 'border-opacity-30'
                  )}
                  onClick={() => charStore.setValue('selected', item.id)}
                  key={item.name}
                >
                  <div className={classNames('relative', owned ? 'opacity-100' : 'opacity-30')}>
                    <img
                      src={getElementImage(item.element)}
                      className="absolute w-6 h-6 top-1 left-1"
                    />
                    {owned && (
                      <div className="absolute px-1.5 py-1 rounded-full top-1 right-1 bg-primary-light font-bold">
                        C{_.find(charStore.characters, ['cId', item.id])?.cons || 0}
                      </div>
                    )}
                    {item.beta && (
                      <div className="absolute right-0 px-1 rounded-l-[4px] bottom-5 bg-rose-600 text-[10px] font-semibold">
                        Beta
                      </div>
                    )}
                    <div className="absolute bg-primary-darker px-1 rounded-full right-1 bottom-0.5">
                      <RarityGauge rarity={item.rarity} isSpecial={item.region === 'Unknown'} textSize="text-[10px]" />
                    </div>
                    <img
                      src={getAvatar(codeName)}
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
        <CharDetail />
      </div>
    </div>
  )
})
