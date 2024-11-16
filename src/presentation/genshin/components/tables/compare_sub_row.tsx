import { IScaling } from '@src/domain/conditional'
import { Element, TalentProperty } from '@src/domain/constant'
import classNames from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { Tooltip } from '@src/presentation/components/tooltip'
import { toPercentage } from '@src/core/utils/converter'
import { StatsObject } from '@src/data/lib/stats/baseConstant'
import { useStore } from '@src/data/providers/app_store_provider'
import { StringConstructor, damageStringConstruct } from '@src/core/utils/damageStringConstruct'
import { CheckboxInput } from '@src/presentation/components/inputs/checkbox'
import React, { useEffect, useState } from 'react'
import { BaseElementColor } from './compare_total_row'

interface ScalingSubRowsProps {
  scaling: IScaling[]
  stats: StatsObject[]
  allStats: StatsObject[][]
  level: { level: number[]; selected: number }[]
  name: string
  setupNames: string[]
  property: string
  element: string
}

export const propertyColor = {
  [TalentProperty.HEAL]: 'text-heal',
  [TalentProperty.SHIELD]: 'text-indigo-300',
}

export const ElementColor = {
  ...BaseElementColor,
  ...propertyColor,
}

export const CompareSubRows = observer(
  ({ scaling, stats, allStats, level, name, property, element, setupNames }: ScalingSubRowsProps) => {
    const { setupStore } = useStore()

    const mode = setupStore.mode
    const [main, sub1, sub2, sub3] = _.map(Array(4), (_v, index) =>
      damageStringConstruct(setupStore, scaling[index], stats[index], level[index].level[level[index].selected])
    )

    const noCrit = _.includes([TalentProperty.HEAL, TalentProperty.SHIELD], property)

    const getDmg = (obj: StringConstructor) => {
      return (
        (noCrit || mode === 'base'
          ? obj?.number.dmg
          : mode === 'crit'
          ? obj?.number.totalCrit
          : obj?.number.totalAvg) || 0
      )
    }

    const Body = ({ obj }: { obj: StringConstructor }) => (
      <div className="space-y-1.5">
        <div>
          {!noCrit && <p className="font-bold text-white">Base</p>}
          {obj.component.DmgBody}
        </div>
        {!noCrit && (
          <>
            <div className="pt-1.5 border-t-2 border-primary-border">
              <p className="font-bold text-white">Crit</p>
              {obj.component.CritBody}
            </div>
            <div className="pt-1.5 border-t-2 border-primary-border">
              <p className="font-bold text-white">Average</p>
              {obj.component.AvgBody}
            </div>
          </>
        )}
      </div>
    )

    const SubDmgBlock = ({ title, obj }: { title: string; obj: StringConstructor }) => {
      const compare = getDmg(obj) - getDmg(main)
      const p = (getDmg(obj) - getDmg(main)) / getDmg(main)
      const percent = getDmg(main) ? (compare >= 0 ? '+' : '') + toPercentage(p) : 'NEW'
      const abs = (compare >= 0 ? '+' : '') + _.floor(getDmg(obj) - getDmg(main)).toLocaleString()
      const diff = _.includes(['percent', 'abs'], mode)
      return obj ? (
        <Tooltip
          title={
            <div className="flex items-center justify-between gap-2">
              <div className="w-1/2">
                <p className="w-full text-xs font-normal truncate text-gray">{title}</p>
                <p>{name}</p>
              </div>
              <div className="flex flex-col items-end gap-y-1 shrink-0">
                {main ? (
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <p
                      className={classNames('text-xs', {
                        'text-lime-300': compare > 0,
                        'text-red': compare < 0,
                        'text-blue': compare === 0,
                      })}
                    >
                      {compare >= 0 && '+'}
                      {toPercentage(compare / getDmg(main))}
                    </p>
                    <p className="text-xs font-normal">from Main</p>
                  </div>
                ) : (
                  <p className="text-xs text-desc">NEW</p>
                )}
              </div>
            </div>
          }
          body={<Body obj={obj} />}
          style="w-[450px] mobile:w-[400px]"
        >
          <p
            className={classNames(
              'col-span-1 text-xs text-center',
              diff
                ? {
                    'text-lime-300': compare > 0 && getDmg(main),
                    'text-desc': compare > 0 && !getDmg(main),
                    'text-red': compare < 0,
                    'text-blue': compare === 0,
                  }
                : ''
            )}
          >
            {mode === 'percent' ? percent : mode === 'abs' ? abs : _.floor(getDmg(obj)).toLocaleString()}
            {compare > 0 && !diff && <i className="ml-1 text-[10px] fa-solid fa-caret-up text-lime-400" />}
            {compare < 0 && !diff && <i className="ml-1 text-[10px] fa-solid fa-caret-down text-red" />}
            {compare === 0 && !diff && <i className="ml-1 text-[10px] fa-solid fa-minus text-blue" />}
          </p>
        </Tooltip>
      ) : (
        <p className="col-span-1 text-center text-gray">-</p>
      )
    }

    return (
      <div className="grid items-center grid-cols-9 gap-2 pr-2 mobile:grid-cols-6 mobile:py-0.5">
        <p className="col-span-2 text-center mobile:hidden">{property}</p>
        <p className={classNames('col-span-1 text-center mobile:hidden', ElementColor[element])}>{element}</p>
        <p className="hidden col-span-2 pl-4 text-xs truncate mobile:block" title={name}>
          {name}
        </p>
        {main ? (
          <Tooltip
            title={
              <div className="flex items-center justify-between">
                <div className="w-1/2">
                  <p className="w-full text-xs font-normal truncate text-gray">{setupNames[0]}</p>
                  <p>{name}</p>
                </div>
              </div>
            }
            body={<Body obj={main} />}
            style="w-[450px] mobile:w-[400px]"
          >
            <p className="col-span-1 text-xs text-center">{_.floor(getDmg(main)).toLocaleString()}</p>
          </Tooltip>
        ) : (
          <p className="col-span-1 text-center text-gray">-</p>
        )}
        <SubDmgBlock obj={sub1} title={setupNames[1]} />
        <SubDmgBlock obj={sub2} title={setupNames[2]} />
        <SubDmgBlock obj={sub3} title={setupNames[3]} />
        <p className="col-span-2 text-xs truncate mobile:hidden" title={name}>
          {name}
        </p>
      </div>
    )
  }
)
