import { useStore } from '@src/data/providers/app_store_provider'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { StatsObjectKeys } from '../../../../data/lib/stats/baseConstant'
import { Element, Stats } from '@src/domain/constant'
import _ from 'lodash'
import { SelectInput } from '@src/presentation/components/inputs/select_input'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import { CustomSetterT } from '@src/data/stores/setup_store'

export const isFlat = (key: string) =>
  _.includes([Stats.ATK, Stats.HP, Stats.DEF, Stats.EM], key) || _.includes(key, '_F_')

export const CustomModal = observer(({ setCustomValue }: { setCustomValue?: CustomSetterT }) => {
  const { calculatorStore, modalStore } = useStore()

  const [selectedTab, setSelectedTab] = useState('stats')
  const [selectedElement, setSelectedElement] = useState(Element.PYRO)
  const [selectedTalent, setSelectedTalent] = useState('BASIC')

  const set = setCustomValue || calculatorStore.setCustomValue

  const [key, setKey] = useState(StatsObjectKeys[Stats.ALL_DMG])
  const [value, setValue] = useState('0')

  const options = {
    stats: [
      { name: Stats.ALL_DMG, value: Stats.ALL_DMG },
      { name: Stats.HP, value: Stats.HP },
      { name: Stats.P_HP, value: Stats.P_HP },
      { name: Stats.ATK, value: Stats.ATK },
      { name: Stats.P_ATK, value: Stats.P_ATK },
      { name: Stats.DEF, value: Stats.DEF },
      { name: Stats.P_DEF, value: Stats.P_DEF },
      { name: Stats.EM, value: Stats.EM },
      { name: Stats.ER, value: Stats.ER },
      { name: Stats.HEAL, value: Stats.HEAL },
      { name: Stats.I_HEALING, value: Stats.I_HEALING },
      { name: Stats.CRIT_RATE, value: Stats.CRIT_RATE },
      { name: Stats.CRIT_DMG, value: Stats.CRIT_DMG },
      { name: Stats.SHIELD, value: Stats.SHIELD },
    ],
    element: [
      { name: 'Percentage Bonus', value: 'percentage' },
      { name: 'Flat Bonus', value: 'flat' },
    ],
    talent: [
      { name: 'Percentage Bonus', value: '_DMG' },
      { name: 'Flat Bonus', value: '_F_DMG' },
      { name: 'CRIT Rate', value: '_CR' },
      { name: 'CRIT DMG', value: '_CD' },
    ],
    reaction: [
      { name: 'Swirl', value: StatsObjectKeys.SWIRL_DMG },
      { name: 'Melt', value: StatsObjectKeys.MELT_DMG },
      { name: 'Vaporize', value: StatsObjectKeys.VAPE_DMG },
      { name: 'Overloaded', value: StatsObjectKeys.OVERLOAD_DMG },
      { name: 'Superconduct', value: StatsObjectKeys.SUPERCONDUCT_DMG },
      { name: 'Electro-Charged', value: StatsObjectKeys.TASER_DMG },
      { name: 'Shattered', value: StatsObjectKeys.SHATTER_DMG },
      { name: 'Bloom', value: StatsObjectKeys.BLOOM_DMG },
      { name: 'Hyperbloom', value: StatsObjectKeys.HYPERBLOOM_DMG },
      { name: 'Burgeon', value: StatsObjectKeys.BURGEON_DMG },
      { name: 'Burning', value: StatsObjectKeys.BURNING_DMG },
      { name: 'Spread', value: StatsObjectKeys.SPREAD_DMG },
      { name: 'Aggravate', value: StatsObjectKeys.AGGRAVATE_DMG },
    ],
    debuff: [
      { name: 'DEF Reduction', value: StatsObjectKeys.DEF_REDUCTION },
      { name: 'All-Type RES Reduction', value: StatsObjectKeys.ALL_TYPE_RES_PEN },
      { name: 'Physical RES Reduction', value: StatsObjectKeys.PHYSICAL_RES_PEN },
      { name: 'Pyro RES Reduction', value: StatsObjectKeys.PYRO_RES_PEN },
      { name: 'Hydro RES Reduction', value: StatsObjectKeys.HYDRO_RES_PEN },
      { name: 'Cryo RES Reduction', value: StatsObjectKeys.CRYO_RES_PEN },
      { name: 'Electro RES Reduction', value: StatsObjectKeys.ELECTRO_RES_PEN },
      { name: 'Anemo RES Reduction', value: StatsObjectKeys.ANEMO_RES_PEN },
      { name: 'Geo RES Reduction', value: StatsObjectKeys.GEO_RES_PEN },
      { name: 'Dendro RES Reduction', value: StatsObjectKeys.DENDRO_RES_PEN },
    ],
  }

  const elements = _.map(Element, (item) => ({ name: item, value: item }))
  const talent = [
    { name: 'Normal Attack', value: 'BASIC' },
    { name: 'Charged Attack', value: 'CHARGE' },
    { name: 'Plunging Attack', value: 'PLUNGE' },
    { name: 'Elemental Skill', value: 'SKILL' },
    { name: 'Elemental Burst', value: 'BURST' },
  ]

  const Tab = ({ title, value, defaultKey }: { title: string; value: string; defaultKey: any }) => (
    <div
      className={classNames('rounded-lg px-2 py-1 text-white cursor-pointer duration-200 text-sm', {
        'bg-primary': selectedTab === value,
      })}
      onClick={() => {
        setSelectedTab(value)
        setKey(defaultKey)
      }}
    >
      {title}
    </div>
  )

  const onAddMod = () => {
    const v = parseFloat(value)
    if (selectedTab === 'stats') {
      set(-1, StatsObjectKeys[key], v, true)
    }
    if (selectedTab === 'element') {
      if (key === 'percentage') set(-1, StatsObjectKeys[`${selectedElement} DMG%`] as any, v, true)
      if (key === 'flat') set(-1, StatsObjectKeys[`${selectedElement.toUpperCase()}_F_DMG`] as any, v, true)
    }
    if (selectedTab === 'talent') {
      set(-1, StatsObjectKeys[selectedTalent + key] as any, v, true)
    }
    if (_.includes(['reaction', 'debuff'], selectedTab)) {
      set(-1, key as any, v, true, selectedTab === 'debuff')
    }
    modalStore.closeModal()
  }

  return (
    <div className="p-3 space-y-4 rounded-lg bg-primary-dark w-[450px]">
      <p className="text-lg font-bold text-white">Add Custom Modifier</p>
      <div className="flex justify-center pb-2 border-b gap-x-1 border-primary-border">
        <Tab title="Stats" value="stats" defaultKey={StatsObjectKeys[Stats.ALL_DMG]} />
        <Tab title="Element" value="element" defaultKey={options.element[0].value} />
        <Tab title="Talent" value="talent" defaultKey={options.talent[0].value} />
        <Tab title="Reaction" value="reaction" defaultKey={StatsObjectKeys.SWIRL_DMG} />
        <Tab title="Debuffs" value="debuff" defaultKey={options.debuff[0].value} />
      </div>
      <div className="grid items-center grid-cols-3 pb-4 border-b gap-x-3 border-primary-border">
        {selectedTab === 'stats' && (
          <SelectInput
            value={key}
            onChange={(v) => setKey(v)}
            options={options.stats}
            style="col-span-2 !w-1/2 mx-auto"
          />
        )}
        {selectedTab === 'element' && (
          <>
            <SelectInput value={selectedElement} onChange={(v) => setSelectedElement(v as any)} options={elements} />
            <SelectInput value={key} onChange={(v) => setKey(v)} options={options.element} />
          </>
        )}
        {selectedTab === 'talent' && (
          <>
            <SelectInput value={selectedTalent} onChange={(v) => setSelectedTalent(v as any)} options={talent} />
            <SelectInput value={key} onChange={(v) => setKey(v)} options={options.talent} />
          </>
        )}
        {selectedTab === 'reaction' && (
          <>
            <SelectInput value={key} onChange={(v) => setKey(v)} options={options.reaction} />
            <p className="text-sm text-gray">Percentage Bonus</p>
          </>
        )}
        {selectedTab === 'debuff' && (
          <SelectInput
            value={key}
            onChange={(v) => setKey(v)}
            options={options.debuff}
            style="col-span-2 !w-2/3 mx-auto"
          />
        )}
        <TextInput
          type="number"
          value={value?.toString()}
          onChange={(v) => setValue(v)}
          style="col-start-3 !w-1/2 mx-auto"
        />
      </div>
      <div className="flex justify-end">
        <PrimaryButton title="Add Modifier" onClick={onAddMod} />
      </div>
    </div>
  )
})
