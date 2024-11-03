import React from 'react'
import { IScaling } from '@src/domain/conditional'
import { Element, StatIcons, Stats, TalentProperty, WeaponType } from '@src/domain/constant'
import classNames from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { Tooltip } from '@src/presentation/components/tooltip'
import { toPercentage } from '@src/core/utils/converter'
import { StatsObject, StatsObjectKeys } from '@src/data/lib/stats/baseConstant'
import { TalentStatMap } from '../../../../data/lib/stats/baseConstant'
import { useStore } from '@src/data/providers/app_store_provider'
import { findCharacter } from '@src/core/utils/finder'
import { damageStringConstruct, ElementColor, PropertyColor } from '@src/core/utils/damageStringConstruct'

interface ScalingSubRowsProps {
  scaling: IScaling
}

export const ScalingSubRows = observer(({ scaling }: ScalingSubRowsProps) => {
  const { calculatorStore, teamStore } = useStore()
  const index = calculatorStore.selected
  const stats = calculatorStore.computedStats[index]

  const team = _.map(teamStore.characters, (item, i) => ({
    name: findCharacter(item.cId)?.name,
    stats: calculatorStore.computedStats[i],
  }))

  const {
    component: { AvgBody, CritBody, DmgBody },
    number: { dmg, totalAvg, totalCrit },
    element,
  } = damageStringConstruct(team, calculatorStore, scaling, stats, teamStore.characters[index].level)

  return (
    <div className="grid items-center grid-cols-8 gap-2 pr-2">
      <p className="col-span-2 text-center">{scaling.property}</p>
      <p className={classNames('col-span-1 text-center', ElementColor[element])}>{element}</p>
      <Tooltip title={scaling.name} body={DmgBody} style="w-[400px]">
        <p className="col-span-1 text-center text-gray">{_.round(dmg).toLocaleString()}</p>
      </Tooltip>
      {_.includes([TalentProperty.HEAL, TalentProperty.SHIELD, TalentProperty.STATIC], scaling.property) ? (
        <p className="col-span-1 text-center text-gray">-</p>
      ) : (
        <Tooltip title={'CRIT: ' + scaling.name} body={CritBody} style="w-[400px]">
          <p className="col-span-1 text-center text-gray">{totalCrit.toLocaleString()}</p>
        </Tooltip>
      )}
      {_.includes([TalentProperty.HEAL, TalentProperty.SHIELD, TalentProperty.STATIC], scaling.property) ? (
        <Tooltip title={scaling.name} body={DmgBody} style="w-[400px]">
          <p className={classNames('col-span-1 font-bold text-center', PropertyColor[scaling.property] || 'text-red')}>
            {_.round(dmg).toLocaleString()}
          </p>
        </Tooltip>
      ) : (
        <Tooltip title={'Average: ' + scaling.name} body={AvgBody} style="w-[400px]">
          <p className={classNames('col-span-1 font-bold text-center', PropertyColor[scaling.property] || 'text-red')}>
            {totalAvg.toLocaleString()}
          </p>
        </Tooltip>
      )}
      <p className="col-span-2 text-xs truncate" title={scaling.name}>
        {scaling.name}
      </p>
    </div>
  )
})
