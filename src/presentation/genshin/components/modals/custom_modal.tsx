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

export const isFlat = (key: string) => _.includes([Stats.ATK, Stats.HP, Stats.DEF], key) || _.includes(key, '_F_')

export const CustomModal = observer(({ setCustomValue }: { setCustomValue?: CustomSetterT }) => {
  const { calculatorStore, modalStore } = useStore()

  const [selectedTab, setSelectedTab] = useState('stats')

  const set = setCustomValue || calculatorStore.setCustomValue

  const [key, setKey] = useState(StatsObjectKeys[Stats.HP])
  const [value, setValue] = useState('0')

  const options = {
    stats: [
      { name: Stats.HP, value: Stats.HP },
      { name: Stats.P_HP, value: Stats.P_HP },
      { name: Stats.ATK, value: Stats.ATK },
      { name: Stats.P_ATK, value: Stats.P_ATK },
      { name: Stats.DEF, value: Stats.DEF },
      { name: Stats.P_DEF, value: Stats.P_DEF },
      { name: Stats.ER, value: Stats.ER },
      { name: Stats.HEAL, value: Stats.HEAL },
      { name: Stats.CRIT_RATE, value: Stats.CRIT_RATE },
      { name: Stats.CRIT_DMG, value: Stats.CRIT_DMG },
    ],
    bonus: [
      { name: Stats.ALL_DMG, value: Stats.ALL_DMG },
      { name: Stats.GLACIO_DMG, value: Stats.GLACIO_DMG },
      { name: Stats.FUSION_DMG, value: Stats.FUSION_DMG },
      { name: Stats.ELECTRO_DMG, value: Stats.ELECTRO_DMG },
      { name: Stats.AERO_DMG, value: Stats.AERO_DMG },
      { name: Stats.SPECTRO_DMG, value: Stats.SPECTRO_DMG },
      { name: Stats.HAVOC_DMG, value: Stats.HAVOC_DMG },
      { name: Stats.BASIC_DMG, value: Stats.BASIC_DMG },
      { name: Stats.HEAVY_DMG, value: Stats.HEAVY_DMG },
      { name: Stats.DODGE_DMG, value: Stats.DODGE_DMG },
      { name: Stats.SKILL_DMG, value: Stats.SKILL_DMG },
      { name: Stats.LIB_DMG, value: Stats.LIB_DMG },
      { name: Stats.OUTRO_DMG, value: Stats.OUTRO_DMG },
    ],
    amp: [
      { name: 'DMG Amplify', value: StatsObjectKeys.AMP },
      { name: 'Basic Attack Amplify', value: StatsObjectKeys.BASIC_AMP },
      { name: 'Heavy Attack Amplify', value: StatsObjectKeys.HEAVY_AMP },
      { name: 'Coordinated Attack Amplify', value: StatsObjectKeys.COORD_AMP },
      { name: 'Res. Skill Amplify', value: StatsObjectKeys.SKILL_AMP },
      { name: 'Res. Liberation Amplify', value: StatsObjectKeys.LIB_AMP },
      { name: 'Glacio DMG Amplify', value: StatsObjectKeys.GLACIO_AMP },
      { name: 'Fusion DMG Amplify', value: StatsObjectKeys.FUSION_AMP },
      { name: 'Electro DMG Amplify', value: StatsObjectKeys.ELECTRO_AMP },
      { name: 'Aero DMG Amplify', value: StatsObjectKeys.AERO_AMP },
      { name: 'Spectro DMG Amplify', value: StatsObjectKeys.SPECTRO_AMP },
      { name: 'Havoc DMG Amplify', value: StatsObjectKeys.HAVOC_AMP },
    ],
    pen: [
      { name: 'DEF PEN', value: StatsObjectKeys.DEF_PEN },
      { name: 'Glacio RES PEN', value: StatsObjectKeys.GLACIO_RES_PEN },
      { name: 'Fusion RES PEN', value: StatsObjectKeys.FUSION_RES_PEN },
      { name: 'Electro RES PEN', value: StatsObjectKeys.ELECTRO_RES_PEN },
      { name: 'Aero RES PEN', value: StatsObjectKeys.AERO_RES_PEN },
      { name: 'Spectro RES PEN', value: StatsObjectKeys.SPECTRO_RES_PEN },
      { name: 'Havoc RES PEN', value: StatsObjectKeys.HAVOC_RES_PEN },
    ],
  }

  const Tab = ({ title, value }: { title: string; value: string }) => (
    <div
      className={classNames('rounded-lg px-2 py-1 text-white cursor-pointer duration-200 text-sm', {
        'bg-primary': selectedTab === value,
      })}
      onClick={() => {
        setSelectedTab(value)
        setKey(options[value][0].value)
      }}
    >
      {title}
    </div>
  )

  const onAddMod = () => {
    const v = parseFloat(value)
    set(-1, StatsObjectKeys[key], v, true)

    modalStore.closeModal()
  }

  return (
    <div className="p-3 space-y-4 rounded-lg bg-primary-dark w-[400px]">
      <p className="text-lg font-bold text-white">Add Custom Modifier</p>
      <div className="flex justify-center pb-2 border-b gap-x-1 border-primary-border">
        <Tab title="Basic Stats" value="stats" />
        <Tab title="DMG Bonus" value="bonus" />
        <Tab title="DMG Amplify" value="amp" />
        <Tab title="PEN" value="pen" />
      </div>
      <div className="grid items-center grid-cols-3 px-4 pb-4 border-b gap-x-5 border-primary-border">
        <SelectInput value={key} onChange={(v) => setKey(v)} options={options[selectedTab]} style="col-span-2" />
        <TextInput type="number" value={value?.toString()} onChange={(v) => setValue(v)} style="col-start-3" />
      </div>
      <div className="flex justify-end">
        <PrimaryButton title="Add Modifier" onClick={onAddMod} />
      </div>
    </div>
  )
})
