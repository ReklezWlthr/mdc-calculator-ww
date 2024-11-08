import { observer } from 'mobx-react-lite'
import _ from 'lodash'
import { toPercentage } from '@src/core/utils/converter'

import { StatsObject, StatsObjectKeys } from '@src/data/lib/stats/baseConstant'
import { Stats } from '@src/domain/constant'

interface StatBlockProps {
  stat: StatsObject
}

export const StatBlock = observer(({ stat }: StatBlockProps) => {
  const DataRow = ({ title, value }: { title: string; value: number | string }) => {
    return (
      <div className="flex items-center gap-2 text-xs">
        <p className="shrink-0">{title}</p>
        <hr className="w-full border border-primary-border" />
        <p className="font-normal text-gray">{value.toLocaleString()}</p>
      </div>
    )
  }

  const ExtraDataRow = ({ title, base, bonus }: { title: string; base: number; bonus: number }) => {
    return (
      <div className="flex items-center gap-2 text-xs">
        <p className="shrink-0">{title}</p>
        <hr className="w-full border border-primary-border" />
        <div className="flex flex-col items-end shrink-0">
          <p className="font-normal text-gray">{_.floor(base + bonus).toLocaleString()}</p>
          <p className="font-normal text-neutral-400 text-[9px]">
            {_.floor(base).toLocaleString()}
            <span className="text-sky-300">{` +${_.floor(bonus).toLocaleString()}`}</span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid w-full grid-flow-col grid-cols-2 p-4 font-bold text-white rounded-lg grid-rows-9 gap-y-1 gap-x-5 bg-primary-dark">
      <ExtraDataRow
        title="HP"
        base={stat?.BASE_HP}
        bonus={stat?.BASE_HP * stat?.getValue(Stats.P_HP) + stat?.getValue(Stats.HP)}
      />
      <ExtraDataRow
        title="ATK"
        base={stat?.BASE_ATK}
        bonus={stat?.BASE_ATK * stat?.getValue(Stats.P_ATK) + stat?.getValue(Stats.ATK)}
      />
      <ExtraDataRow
        title="DEF"
        base={stat?.BASE_DEF}
        bonus={stat?.BASE_DEF * stat?.getValue(Stats.P_DEF) + stat?.getValue(Stats.DEF)}
      />
      <DataRow title="Crit. Rate" value={toPercentage(stat?.getValue(Stats.CRIT_RATE))} />
      <DataRow title="Crit. DMG" value={toPercentage(stat?.getValue(Stats.CRIT_DMG))} />
      <DataRow title="Basic ATK DMG%" value={toPercentage(stat?.getValue(Stats.BASIC_DMG))} />
      <DataRow title="Heavy ATK DMG%" value={toPercentage(stat?.getValue(Stats.HEAVY_DMG))} />
      <DataRow title="Skill DMG%" value={toPercentage(stat?.getValue(Stats.SKILL_DMG))} />
      <DataRow title="Liberation DMG%" value={toPercentage(stat?.getValue(Stats.LIB_DMG))} />
      <DataRow
        title="Glacio DMG%"
        value={toPercentage(stat?.getValue(Stats.GLACIO_DMG) + stat?.getValue(Stats.ATTR_DMG))}
      />
      <DataRow
        title="Fusion DMG%"
        value={toPercentage(stat?.getValue(Stats.FUSION_DMG) + stat?.getValue(Stats.ATTR_DMG))}
      />
      <DataRow
        title="Electro DMG%"
        value={toPercentage(stat?.getValue(Stats.ELECTRO_DMG) + stat?.getValue(Stats.ATTR_DMG))}
      />
      <DataRow
        title="Aero DMG%"
        value={toPercentage(stat?.getValue(Stats.AERO_DMG) + stat?.getValue(Stats.ATTR_DMG))}
      />
      <DataRow
        title="Spectro DMG%"
        value={toPercentage(stat?.getValue(Stats.SPECTRO_DMG) + stat?.getValue(Stats.ATTR_DMG))}
      />
      <DataRow
        title="Havoc DMG%"
        value={toPercentage(stat?.getValue(Stats.HAVOC_DMG) + stat?.getValue(Stats.ATTR_DMG))}
      />
      <DataRow title="DMG%" value={toPercentage(stat?.getValue(Stats.ALL_DMG))} />
      <DataRow title="Healing Bonus" value={toPercentage(stat?.getValue(Stats.HEAL))} />
      <DataRow title="Energy Regen" value={toPercentage(stat?.getValue(Stats.ER))} />
    </div>
  )
})
