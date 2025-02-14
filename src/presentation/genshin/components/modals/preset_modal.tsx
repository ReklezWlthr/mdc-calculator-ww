import { useStore } from '@src/data/providers/app_store_provider'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'
import { StatsObjectKeys, StatsObjectKeysT } from '../../../../data/lib/stats/baseConstant'
import { StatIcons, Stats } from '@src/domain/constant'
import _ from 'lodash'
import { CustomSetterT } from '@src/data/stores/setup_store'
import { ModifierPresets } from '@src/data/db/preset'
import { useParams } from '@src/core/hooks/useParams'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { TagSelectInput } from '@src/presentation/components/inputs/tag_select_input'
import { isSubsetOf } from '@src/core/utils/finder'

export const isFlat = (key: string) => _.includes([Stats.ATK, Stats.HP, Stats.DEF], key) || _.includes(key, '_F_')

export const PresetModal = observer(({ setCustomValue }: { setCustomValue?: CustomSetterT }) => {
  const { calculatorStore, modalStore } = useStore()

  const { params, setParams } = useParams({
    name: '',
    stats: [],
  })

  const set = setCustomValue || calculatorStore.setCustomValue

  const statsOptions = _.map(
    [
      Stats.HP,
      Stats.ATK,
      Stats.DEF,
      Stats.P_HP,
      Stats.P_ATK,
      Stats.P_DEF,
      Stats.ER,
      Stats.CRIT_RATE,
      Stats.CRIT_DMG,
      Stats.HEAL,
      Stats.GLACIO_DMG,
      Stats.FUSION_DMG,
      Stats.ELECTRO_DMG,
      Stats.AERO_DMG,
      Stats.SPECTRO_DMG,
      Stats.HAVOC_DMG,
      Stats.BASIC_DMG,
      Stats.HEAVY_DMG,
      Stats.SKILL_DMG,
      Stats.LIB_DMG,
    ],
    (item) => ({
      name: item,
      value: item,
      img: StatIcons[item],
    })
  )

  const filteredPreset = useMemo(() => {
    let result = _.cloneDeep(ModifierPresets)
    if (params.name.length)
      result = _.filter(result, (r) => {
        const regex = new RegExp(params.name, 'i')
        return !!r.name.match(regex)
      })
    if (params.stats.length) result = _.filter(result, (r) => isSubsetOf(params.stats, _.map(r.property, 'stat')))
    return _.orderBy(result, ['order', 'name'], ['asc', 'asc'])
  }, [params.name, params.stats])

  const onAddMod = (obj: { value: number; stat: StatsObjectKeysT }) => {
    const v = obj?.value
    const s = obj?.stat
    set(-1, StatsObjectKeys[s as any], v, true)

    modalStore.closeModal()
  }

  return (
    <div className="p-3 space-y-4 rounded-lg bg-primary-dark w-[820px] mobile:w-[400px]">
      <div className="flex justify-between gap-4 mobile:flex-col">
        <p className="text-lg font-bold text-white">Select Modifier Preset</p>
        <div className="grid grid-cols-2 gap-3 mobile:w-full">
          <TextInput
            value={params.name}
            onChange={(v) => setParams({ name: v })}
            placeholder="Search Preset Name"
            style="w-[220px] mobile:w-full"
          />
          <TagSelectInput
            options={statsOptions}
            values={params.stats}
            onChange={(v) => setParams({ stats: v })}
            placeholder="Preset Stats - Match All"
            style="w-[220px] mobile:w-full"
            maxSelection={2}
            renderAsText
          />
        </div>
      </div>
      <div className="grid items-center grid-cols-4 gap-3 px-4 pb-4 mobile:grid-cols-2 max-h-[70dvh] overflow-y-scroll hideScrollbar">
        {_.map(filteredPreset, (item) => (
          <div
            onClick={() => _.forEach(item?.property, (p) => onAddMod(p))}
            className="flex flex-col items-center px-2 py-2 border-2 rounded-lg cursor-pointer border-primary-lighter h-[135px] w-full hover:bg-primary duration-200"
            key={item?.name}
          >
            <div className="flex items-center justify-center w-10 h-10">{item?.icon}</div>
            <p className="mt-2 text-xs text-center text-gray">{item?.type}</p>
            <p className="w-full text-sm font-bold text-center text-white truncate">{item?.name}</p>
            <div>
              {_.map(item?.property, (p) => (
                <p className="text-xs text-center text-gray" key={p?.stat}>
                  {p?.stat}{' '}
                  <span className="text-desc">
                    +{p?.value?.toLocaleString()}
                    {!p?.flat && '%'}
                  </span>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})
