import _ from 'lodash'
import { Characters } from '@src/data/db/characters'
import { useStore } from '@src/data/providers/app_store_provider'
import { observer } from 'mobx-react-lite'
import { Element, ITeamChar, Tags, WeaponIcon, WeaponType } from '@src/domain/constant'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { useParams } from '@src/core/hooks/useParams'
import classNames from 'classnames'
import { RarityGauge } from '@src/presentation/components/rarity_gauge'
import { useMemo } from 'react'
import { DefaultWeapon } from '@src/data/stores/team_store'
import { DefaultBuild } from '@src/data/stores/build_store'
import { findWeapon, isSubsetOf } from '@src/core/utils/finder'
import getConfig from 'next/config'
import { TagSelectInput } from '@src/presentation/components/inputs/tag_select_input'
import { Tooltip } from '@src/presentation/components/tooltip'
import { BulletPoint } from '@src/presentation/components/collapsible'
import { getAvatar, getElementImage, getSideAvatar, getTalentWeaponImage } from '@src/core/utils/fetcher'

const { publicRuntimeConfig } = getConfig()

interface CharacterModalProps {
  index: number
  setChar?: (index: number, value: Partial<ITeamChar>) => void
}

export const CharacterModal = observer(({ index, setChar }: CharacterModalProps) => {
  const { teamStore, modalStore, buildStore, charStore, settingStore } = useStore()
  const { setParams, params } = useParams({
    searchWord: '',
    element: [],
    weapon: [],
    tags: [],
  })

  const selectedWeaponData = findWeapon(teamStore.characters[index]?.equipments?.weapon?.wId)

  const charSetter = setChar || teamStore.setMemberInfo

  const filteredChar = useMemo(
    () =>
      _.filter(
        Characters.sort((a, b) => a.name.localeCompare(b.name)),
        (item) => {
          const regex = new RegExp(params.searchWord, 'i')
          const nameMatch = item.name.match(regex)
          const elmMatch = _.size(params.element) ? _.includes(params.element, item.element) : true
          const weaponMatch = _.size(params.weapon) ? _.includes(params.weapon, item.weapon) : true
          const tagsMatch = _.size(params.tags) ? isSubsetOf(params.tags, item.tags) : true

          return nameMatch && elmMatch && weaponMatch && !!tagsMatch
        }
      ),
    [params]
  )

  const FilterIcon = ({ type, value }: { type: 'element' | 'weapon'; value: Element | WeaponType }) => {
    const array = type === 'element' ? params.element : params.weapon
    const checked = _.includes(array, value)
    return (
      <div
        className={classNames('w-8 h-8 duration-200 rounded-full cursor-pointer hover:bg-primary-lighter', {
          'bg-primary-lighter': checked,
          'p-0.5': type === 'weapon',
        })}
        onClick={() => setParams({ [type]: checked ? _.without(array, value) : [...array, value] })}
        title={value}
      >
        <img src={type === 'element' ? getElementImage(value) : getTalentWeaponImage(value)} />
      </div>
    )
  }

  return (
    <div className="desktop:w-[1220px] tablet:w-[85vw] mobile:w-[85vw] mobile:h-[80vh] p-4 text-white rounded-xl bg-primary-dark space-y-3 font-semibold">
      <div className="flex items-center gap-6 mobile:gap-2 mobile:flex-col">
        <div className="flex items-center gap-6">
          <p className="shrink-0">Select a Resonator</p>
          <TextInput
            onChange={(value) => setParams({ searchWord: value })}
            value={params.searchWord}
            placeholder="Search Resonator Name"
          />
        </div>
        <div className="flex gap-2">
          <FilterIcon type="element" value={Element.FUSION} />
          <FilterIcon type="element" value={Element.GLACIO} />
          <FilterIcon type="element" value={Element.ELECTRO} />
          <FilterIcon type="element" value={Element.AERO} />
          <FilterIcon type="element" value={Element.SPECTRO} />
          <FilterIcon type="element" value={Element.HAVOC} />
        </div>
        <div className="flex gap-2">
          <FilterIcon type="weapon" value={WeaponType.SWORD} />
          <FilterIcon type="weapon" value={WeaponType.BROADBLADE} />
          <FilterIcon type="weapon" value={WeaponType.GAUNTLET} />
          <FilterIcon type="weapon" value={WeaponType.PISTOLS} />
          <FilterIcon type="weapon" value={WeaponType.RECTIFIER} />
        </div>
        <TagSelectInput
          options={_.map(Tags, (item) => ({ name: item, value: item }))}
          onChange={(v) => setParams({ tags: v })}
          placeholder="Select Combat Roles (Match All)"
          small
          style="w-[250px]"
          values={params.tags}
          onlyShowCount
        />
      </div>
      <div className="grid w-full grid-cols-10 tablet:grid-cols-7 mobile:grid-cols-3 gap-4 max-h-[70vh] mobile:h-[60vh] overflow-y-auto hideScrollbar rounded-lg">
        {_.map(filteredChar, (item) => {
          const owned = _.includes(_.map(charStore.characters, 'cId'), item.id)
          const codeName = item.order === '4' && settingStore.settings.travelerGender === 'zhujue' ? '5' : item.order
          return (
            <div
              className="w-full text-xs duration-200 border rounded-lg cursor-pointer bg-primary border-primary-border hover:scale-95"
              onClick={() => {
                const build = _.find(buildStore.builds, (build) => build.isDefault && build.cId === item.id)
                const char = _.find(charStore.characters, (char) => char.cId === item.id)
                if (item.weapon !== selectedWeaponData?.type && teamStore.characters[index]?.equipments?.weapon)
                  teamStore.setWeapon(index, DefaultWeapon(item.weapon))
                charSetter(index, {
                  cId: item.id,
                  ascension: char?.ascension || 0,
                  level: char?.level || 1,
                  talents: char?.talents || { normal: 1, skill: 1, lib: 1, forte: 1, intro: 1 },
                  equipments: build ? { weapon: build.weapon, artifacts: build.artifacts } : DefaultBuild(item.weapon),
                  cons: char?.cons || 0,
                  i: char?.i || { i1: false, i2: false },
                  growth: char?.growth || Array(8).fill(false),
                })
                modalStore.closeModal()
              }}
              key={item.name}
            >
              <div className="relative">
                <img src={getElementImage(item.element)} className="absolute w-7 h-7 top-1.5 left-1.5 z-[1]" />
                {owned && (
                  <div className="absolute px-1.5 py-1 text-xs rounded-lg top-1 right-1 bg-primary font-bold z-[1]">
                    S{_.find(charStore.characters, ['cId', item.id])?.cons || 0}
                  </div>
                )}
                {item.beta && (
                  <div className="absolute right-0 px-1.5 text-xs py-0.5 font-bold rounded-l-md bottom-6 bg-rose-600 z-[1]">
                    Beta
                  </div>
                )}
                <div className="absolute bg-primary-darker py-0.5 px-1.5 rounded-full right-1 bottom-0.5 z-[1]">
                  <RarityGauge rarity={item.rarity} />
                </div>
                <div className="flex items-end justify-center overflow-hidden rounded-t-lg bg-primary-darker aspect-square">
                  <img src={getSideAvatar(codeName)} className="object-cover" />
                </div>
              </div>
              <p className="w-full px-2 py-1 text-center truncate">{item.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
})
