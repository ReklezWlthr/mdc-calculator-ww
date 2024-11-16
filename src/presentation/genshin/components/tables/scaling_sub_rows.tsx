import React from 'react'
import { IScaling } from '@src/domain/conditional'
import { TalentProperty } from '@src/domain/constant'
import classNames from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { Tooltip } from '@src/presentation/components/tooltip'
import { useStore } from '@src/data/providers/app_store_provider'
import { damageStringConstruct, ElementColor, PropertyColor } from '@src/core/utils/damageStringConstruct'

interface ScalingSubRowsProps {
  scaling: IScaling
}

export const ScalingSubRows = observer(({ scaling }: ScalingSubRowsProps) => {
  const { calculatorStore, teamStore } = useStore()
  const index = calculatorStore.selected
  const stats = calculatorStore.computedStats[index]

  const {
    component: { AvgBody, CritBody, DmgBody },
    number: { dmg, totalAvg, totalCrit },
    element,
  } = damageStringConstruct(calculatorStore, scaling, stats, teamStore.characters[index].level)

  return (
    <div className="grid items-center grid-cols-8 gap-2 pr-2 mobile:grid-cols-5 mobile:py-0.5">
      <p className="col-span-2 text-center mobile:hidden">{scaling.property}</p>
      <p className={classNames('col-span-1 text-center mobile:hidden', ElementColor[element])}>{element}</p>
      <p className="hidden col-span-2 pl-4 text-xs truncate mobile:block" title={scaling.name}>
        {scaling.name}
      </p>
      <Tooltip
        title={
          <div className="flex items-center justify-between">
            <p>{scaling.name}</p>
            <p className="text-xs font-normal text-gray">
              {scaling.property} - <span className={ElementColor[scaling.element]}>{scaling.element}</span>
            </p>
          </div>
        }
        body={DmgBody}
        style="w-[400px]"
      >
        <p className="col-span-1 text-center text-gray">{_.round(dmg).toLocaleString()}</p>
      </Tooltip>
      {_.includes([TalentProperty.HEAL, TalentProperty.SHIELD], scaling.property) ? (
        <p className="col-span-1 text-center text-gray">-</p>
      ) : (
        <Tooltip title={'CRIT: ' + scaling.name} body={CritBody} style="w-[400px]">
          <p className="col-span-1 text-center text-gray">{totalCrit.toLocaleString()}</p>
        </Tooltip>
      )}
      {_.includes([TalentProperty.HEAL, TalentProperty.SHIELD], scaling.property) ? (
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
      <p className="col-span-2 text-xs truncate mobile:hidden" title={scaling.name}>
        {scaling.name}
      </p>
    </div>
  )
})
