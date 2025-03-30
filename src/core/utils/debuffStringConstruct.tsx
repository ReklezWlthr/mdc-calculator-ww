import { StatsObject, StatsObjectKeys, TalentStatMap } from '@src/data/lib/stats/baseConstant'
import { IScaling } from '@src/domain/conditional'
import { Element, StatIcons, Stats, TalentProperty } from '@src/domain/constant'
import { toPercentage } from '@src/core/utils/converter'
import _ from 'lodash'
import { CalculatorStore } from '@src/data/stores/calculator_store'
import React from 'react'
import { SetupStore } from '@src/data/stores/setup_store'
import { ElementColor, PropertyColor } from './damageStringConstruct'

export const debuffStringConstruct = (
  calculatorStore: CalculatorStore | SetupStore,
  element: Element,
  stats: StatsObject,
  level: number,
  stack: number
) => {
  const defPen = stats.getValue(StatsObjectKeys.DEF_PEN) || 0

  const defMult = calculatorStore.getDefMult(level, defPen, stats.getValue(StatsObjectKeys.DEF_REDUCTION)) || 1
  const resMult = calculatorStore.getResMult(
    element as any,
    (stats.getValue(`${element.toUpperCase()}_RES_PEN`) || 0) + (stats.getValue(StatsObjectKeys.ALL_TYPE_RES_PEN) || 0)
  )

  const enemyMod = defMult * resMult

  let amp = 0
  let raw = 0

  switch (element) {
    case Element.SPECTRO: {
      amp = stats.getValue(StatsObjectKeys.FRAZZLE_AMP)
      const growth = 0.8125
      raw = stack ? 1103 * (1 + growth * (stack - 1)) : 0
      break
    }
    case Element.AERO: {
      const growth = 2.5
      raw = stack ? 1653.5 * (growth * (stack - 1) || 1) : 0
      break
    }
  }
  const dmg = raw * (1 + amp) * enemyMod

  const baseScaling = `<b class="text-amber-200">${_.round(
    raw,
    1
  ).toLocaleString()}</b>  <i class="text-[10px]">BASE</i>`

  const formulaString = `<b class="text-red">${_.round(dmg).toLocaleString()}</b> = ${baseScaling}${
    amp > 0 ? ` \u{00d7} (1 + <b class="text-lime-400">${toPercentage(amp)}</b>  <i class="text-[10px]">AMP</i> )` : ''
  } \u{00d7} <b class="text-orange-300">${toPercentage(
    defMult,
    2
  )}</b> <i class="text-[10px]">DEF</i> \u{00d7} <b class="text-teal-200">${toPercentage(
    resMult,
    2
  )}</b> <i class="text-[10px]">RES</i>`

  const DmgBody = <p dangerouslySetInnerHTML={{ __html: formulaString }} />

  return {
    string: formulaString,
    component: DmgBody,
    number: dmg,
    element,
  }
}

export type DebuffStringConstructor = ReturnType<typeof debuffStringConstruct>
