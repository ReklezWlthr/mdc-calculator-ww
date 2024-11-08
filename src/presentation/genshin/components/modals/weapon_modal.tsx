import _ from 'lodash'
import { Weapons } from '@src/data/db/weapons'
import { useStore } from '@src/data/providers/app_store_provider'
import { observer } from 'mobx-react-lite'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { useParams } from '@src/core/hooks/useParams'
import { useMemo } from 'react'
import { RarityGauge } from '@src/presentation/components/rarity_gauge'
import { IWeaponEquip, StatIcons, Stats, WeaponType } from '@src/domain/constant'
import classNames from 'classnames'
import { findCharacter } from '@src/core/utils/finder'
import getConfig from 'next/config'
import { Tooltip } from '@src/presentation/components/tooltip'
import { formatWeaponString, getWeaponBase, getWeaponBonus } from '@src/core/utils/data_format'
import { toPercentage } from '@src/core/utils/converter'
import { getWeaponImage } from '@src/core/utils/fetcher'
import { staticWeapons } from '../weapon_block'

const { publicRuntimeConfig } = getConfig()

interface WeaponModalProps {
  index: number
  pathOverride?: WeaponType
  setWeapon?: (index: number, info: Partial<IWeaponEquip>) => void
}

export const WeaponModal = observer(({ index, setWeapon, pathOverride }: WeaponModalProps) => {
  const { teamStore, modalStore } = useStore()
  const { setParams, params } = useParams({
    searchWord: '',
    stat: [],
  })

  const set = setWeapon || teamStore.setWeapon

  const filteredWeapon = useMemo(
    () =>
      _.filter(
        _.orderBy(Weapons, ['rarity', 'name'], ['desc', 'asc']),
        (item) => {
          const regex = new RegExp(params.searchWord, 'i')
          const nameMatch = item.name.match(regex)
          const data = findCharacter(teamStore.characters[index]?.cId)
          const typeMatch = (pathOverride || data?.weapon) === item.type
          const statMatch = _.size(params.stat) ? _.includes(params.stat, item.ascStat) : true

          return nameMatch && typeMatch && statMatch
        }
      ),
    [params]
  )

  const FilterIcon = ({ stat }: { stat: Stats }) => {
    const checked = _.includes(params.stat, stat)
    return (
      <div
        className={classNames('w-8 h-8 duration-200 rounded-full cursor-pointer hover:bg-primary-lighter', {
          'bg-primary-light': checked,
        })}
        onClick={() => setParams({ stat: checked ? _.without(params.stat, stat) : [...params.stat, stat] })}
        title={stat}
      >
        <img src={StatIcons[stat]} className="p-1" />
      </div>
    )
  }

  return (
    <div className="w-[85vw] max-w-[1240px] p-4 text-white rounded-xl bg-primary-dark space-y-3 font-semibold">
      <div className="flex items-center gap-6">
        <p className="shrink-0">Select a Weapon</p>
        <div className="w-1/3">
          <TextInput
            onChange={(value) => setParams({ searchWord: value })}
            value={params.searchWord}
            placeholder="Search Weapon Name"
          />
        </div>
        <div className="flex gap-2">
          <FilterIcon stat={Stats.P_HP} />
          <FilterIcon stat={Stats.P_ATK} />
          <FilterIcon stat={Stats.P_DEF} />
          <FilterIcon stat={Stats.ER} />
          <FilterIcon stat={Stats.CRIT_RATE} />
          <FilterIcon stat={Stats.CRIT_DMG} />
        </div>
      </div>
      <div className="grid w-full grid-cols-11 gap-4 max-h-[70vh] overflow-y-auto hideScrollbar rounded-lg">
        {_.map(filteredWeapon, (item) => {
          const minAtk = getWeaponBase(item?.baseAtk, 1, 1)
          const maxAtk = getWeaponBase(item?.baseAtk, 90, 6)
          const minStat = toPercentage(item.baseStat || 0)
          const maxStat = toPercentage(getWeaponBonus(item.baseStat, 90) || 0)

          return (
            <Tooltip
              title={
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-normal text-primary-lighter">{item.type}</p>
                    <p>{item.name}</p>
                  </div>
                  <div className="w-fit">
                    <RarityGauge rarity={item.rarity} />
                  </div>
                </div>
              }
              body={
                <div>
                  <div className="grid grid-cols-3 gap-2">
                    <p>
                      <b>Base ATK</b>: <span className="text-blue">{_.round(minAtk)}</span>{' '}
                      <span className="text-desc">({_.round(maxAtk)})</span>
                    </p>
                    <p className="col-span-2">
                      <b>{item.ascStat}</b>: <span className="text-blue">{minStat}</span>{' '}
                      <span className="text-desc">({maxStat})</span>
                    </p>
                  </div>
                  <div className="my-1 border-t border-primary-light" />
                  <b>{item.desc.name}</b>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatWeaponString(item?.desc?.detail, item?.desc?.properties, 1),
                    }}
                    className="font-normal"
                  />
                </div>
              }
              style="w-[500px]"
            >
              <div
                className="text-xs duration-200 border rounded-lg cursor-pointer bg-primary border-primary-border hover:scale-95"
                onClick={() => {
                  set(index, { wId: item.id })
                  if (_.includes(staticWeapons, item.id)) set(index, { refinement: 1 })
                  modalStore.closeModal()
                }}
                key={item.name}
              >
                <div className="relative">
                  <img
                    src={StatIcons[item.ascStat]}
                    className="absolute w-6 h-6 p-1 rounded-full top-2 left-2 bg-primary"
                    title={item.ascStat}
                  />
                  {item.beta && (
                    <div className="absolute right-0 px-1.5 text-xs py-0.5 font-bold rounded-l-md bottom-6 bg-rose-600">
                      Beta
                    </div>
                  )}
                  <div className="absolute bg-primary-darker py-0.5 px-1.5 rounded-full right-1 bottom-0.5">
                    <RarityGauge rarity={item.rarity} />
                  </div>
                  <img
                    src={getWeaponImage(item?.id)}
                    className="object-contain rounded-t-lg bg-primary-darker aspect-square"
                  />
                </div>
                <div className="w-full h-10 px-2 py-1">
                  <p className="text-center line-clamp-2">{item.name}</p>
                </div>
              </div>
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
})
