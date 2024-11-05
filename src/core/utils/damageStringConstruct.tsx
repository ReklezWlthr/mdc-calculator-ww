import { StatsObject, StatsObjectKeys, TalentStatMap } from '@src/data/lib/stats/baseConstant'
import { IScaling } from '@src/domain/conditional'
import { Element, StatIcons, Stats, TalentProperty } from '@src/domain/constant'
import { toPercentage } from '@src/core/utils/converter'
import _ from 'lodash'
import { CalculatorStore } from '@src/data/stores/calculator_store'
import React from 'react'
import { SetupStore } from '@src/data/stores/setup_store'
import { BaseElementColor } from '@src/presentation/genshin/components/tables/compare_total_row'

export const PropertyColor = {
  [TalentProperty.HEAL]: 'text-heal',
  [TalentProperty.SHIELD]: 'text-indigo-300',
}

export const ElementColor = {
  ...BaseElementColor,
  ...PropertyColor,
}

export const damageStringConstruct = (
  team: { name: string; stats: StatsObject }[],
  calculatorStore: CalculatorStore | SetupStore,
  scaling: IScaling,
  stats: StatsObject,
  level: number
) => {
  if (!scaling || !stats || !level) return

  const element = scaling.element
  const isDamage = !_.includes([TalentProperty.SHIELD, TalentProperty.HEAL], scaling.property)

  const talentDmg = stats.getValue(Stats[`${TalentStatMap[scaling.property]}_DMG`]) || 0
  const talentFlat = stats.getValue(`${TalentStatMap[scaling.property]}_F_DMG`) || 0
  const talentCr = stats.getValue(`${TalentStatMap[scaling.property]}_CR`) || 0
  const talentCd = stats.getValue(`${TalentStatMap[scaling.property]}_CD`) || 0
  const talentAmp = stats.getValue(`${TalentStatMap[scaling.property]}_AMP`) || 0
  const elementDmg = stats.getValue(`${element} DMG%`)
  const elementCd = stats.getValue(`${element.toUpperCase()}_CD`) || 0
  const elementFlat = stats.getValue(`${element.toUpperCase()}_F_DMG`) || 0
  const elementAmp = stats.getValue(`${element.toUpperCase()}_AMP`) || 0
  const defPen =
    (stats.getValue(StatsObjectKeys.DEF_PEN) || 0) +
    (scaling.defPen || 0) +
    (stats.getValue(`${TalentStatMap[scaling.property]}_DEF_PEN`) || 0)

  const defMult = calculatorStore.getDefMult(level, defPen, stats.getValue(StatsObjectKeys.DEF_REDUCTION)) || 1
  const resMult = isDamage
    ? calculatorStore.getResMult(
        element as any,
        (stats.getValue(`${element.toUpperCase()}_RES_PEN`) || 0) +
          (stats.getValue(StatsObjectKeys.ALL_TYPE_RES_PEN) || 0)
      )
    : 1
  const enemyMod = isDamage ? defMult * resMult : 1

  const statForScale = {
    [Stats.ATK]: stats.getAtk(),
    [Stats.DEF]: stats.getDef(),
    [Stats.HP]: stats.getHP(),
  }

  const healing = stats.getValue(Stats.HEAL)
  const bonusDMG =
    (scaling.bonus || 0) +
    (TalentProperty.SHIELD === scaling.property
      ? 0
      : TalentProperty.HEAL === scaling.property
      ? healing
      : stats.getValue(Stats.ALL_DMG) + elementDmg + talentDmg)
  const amp = isDamage ? talentAmp + elementAmp + stats.getValue(StatsObjectKeys.AMP) : 0
  const raw =
    _.sumBy(
      scaling.value,
      (item) => item.scaling * (item.override || statForScale[item.multiplier]) * (item.hits || 1)
    ) +
    (scaling.flat || 0) +
    elementFlat +
    talentFlat
  const dmg =
    raw *
    (1 + bonusDMG) *
    (scaling.multiplier || 1) *
    (1 + amp) *
    enemyMod *
    (calculatorStore.dmgMode === 'total' ? scaling.hit || 1 : 1)

  const totalCr = _.max([_.min([stats.getValue(Stats.CRIT_RATE) + (scaling.cr || 0) + talentCr, 1]), 0])
  const totalCd = stats.getValue(Stats.CRIT_DMG) + (scaling.cd || 0) + talentCd + elementCd
  const totalFlat = (scaling.flat || 0) + elementFlat + talentFlat

  const totalCrit = _.round(dmg * totalCd)
  const totalAvg = _.round(dmg * (1 + (totalCd - 1) * totalCr))

  const scalingArray = _.map(
    scaling.value,
    (item) =>
      `<span class="inline-flex items-center h-4">(<b class="inline-flex items-center h-4"><img class="w-4 h-4 mx-1" src="${
        StatIcons[item.multiplier]
      }" />${_.round(
        item.override || statForScale[item.multiplier]
      ).toLocaleString()}</b><span class="mx-1"> \u{00d7} </span><b>${toPercentage(item.scaling, 2)}</b>${
        item.hits ? `<span class="ml-1"> \u{00d7} <b class="text-desc">${item.hits}</b></span>` : ''
      })</span>`
  )
  const baseScaling = _.join(scalingArray, ' + ')
  const shouldWrap = !!totalFlat || scaling.value.length > 1
  const baseWithFlat = totalFlat ? _.join([baseScaling, _.round(totalFlat).toLocaleString()], ' + ') : baseScaling

  const formulaString = `<b class="${PropertyColor[scaling.property] || 'text-red'}">${_.round(
    dmg
  ).toLocaleString()}</b> = ${shouldWrap ? `(${baseWithFlat})` : baseWithFlat}${
    scaling.hit && calculatorStore.dmgMode === 'total'
      ? ` \u{00d7} <b class="text-desc">${scaling.hit}</b> <i class="text-[10px]">HITS</i>`
      : ''
  }${
    bonusDMG > 0
      ? ` \u{00d7} (1 + <b class="${ElementColor[scaling.element]}">${toPercentage(
          bonusDMG
        )}</b>  <i class="text-[10px]">BONUS</i>)`
      : ''
  }${
    amp > 0 ? ` \u{00d7} (1 + <b class="text-lime-400">${toPercentage(amp)}</b>  <i class="text-[10px]">AMP</i> )` : ''
  }${scaling.multiplier > 0 ? ` \u{00d7} <b class="text-indigo-300">${toPercentage(scaling.multiplier, 2)}</b>` : ''}${
    elementAmp > 1 ? ` \u{00d7} <b class="text-amber-400">${toPercentage(elementAmp, 2)}</b>` : ''
  }${
    isDamage
      ? ` \u{00d7} <b class="text-orange-300">${toPercentage(
          defMult,
          2
        )}</b> <i class="text-[10px]">DEF</i> \u{00d7} <b class="text-teal-200">${toPercentage(
          resMult,
          2
        )}</b> <i class="text-[10px]">RES</i>`
      : ''
  }`

  const critString = `<b class="${PropertyColor[scaling.property] || 'text-red'}">${_.round(
    dmg * totalCd
  ).toLocaleString()}</b> = <b>${_.round(
    dmg
  ).toLocaleString()}</b> \u{00d7} <span class="inline-flex items-center h-4">(<b class="inline-flex items-center h-4"><img class="w-4 h-4 mx-1" src="${
    StatIcons[Stats.CRIT_DMG]
  }" />${toPercentage(totalCd)}</b>)</span>`

  const avgString = `<b class="${PropertyColor[scaling.property] || 'text-red'}">${_.round(
    dmg * (1 + (totalCd - 1) * totalCr)
  ).toLocaleString()}</b> = <b>${_.round(
    dmg
  ).toLocaleString()}</b> \u{00d7} <span class="inline-flex items-center h-4">(<b class="inline-flex items-center h-4"><img class="w-4 h-4 mx-1" src="${
    StatIcons[Stats.CRIT_DMG]
  }" />${toPercentage(
    totalCd
  )}</b><span class="ml-1"> \u{00d7} </span><b class="inline-flex items-center h-4"><img class="w-4 h-4 mx-1" src="${
    StatIcons[Stats.CRIT_RATE]
  }" />${toPercentage(totalCr)}</b>)</span>`

  const DmgBody = (
    <div className="space-y-1">
      <p dangerouslySetInnerHTML={{ __html: formulaString }} />
      {!!scaling.bonus && (
        <p className="text-xs">
          Talent-Exclusive Bonus: <span className="text-desc">{toPercentage(scaling.bonus)}</span>
        </p>
      )}
      {!!elementDmg && (
        <p className="text-xs">
          {element} Bonus: <span className="text-desc">{toPercentage(elementDmg)}</span>
        </p>
      )}
      {!!talentDmg && (
        <p className="text-xs">
          {scaling.property} Bonus: <span className="text-desc">{toPercentage(talentDmg)}</span>
        </p>
      )}
    </div>
  )

  const CritBody = (
    <div className="space-y-1">
      <p dangerouslySetInnerHTML={{ __html: critString }} />
      {!!scaling.cd && (
        <p className="text-xs">
          Talent-Exclusive CRIT DMG: <span className="text-desc">{toPercentage(scaling.cd)}</span>
        </p>
      )}
      {!!elementCd && (
        <p className="text-xs">
          {element} CRIT DMG: <span className="text-desc">{toPercentage(elementCd)}</span>
        </p>
      )}
      {!!talentCd && (
        <p className="text-xs">
          {scaling.property} CRIT DMG: <span className="text-desc">{toPercentage(talentCd)}</span>
        </p>
      )}
    </div>
  )

  const AvgBody = (
    <div className="space-y-1">
      <p dangerouslySetInnerHTML={{ __html: avgString }} />
      {!!scaling.cr && (
        <p className="text-xs">
          Talent-Exclusive CRIT Rate: <span className="text-desc">{toPercentage(scaling.cr)}</span>
        </p>
      )}
      {!!talentCr && (
        <p className="text-xs">
          {scaling.property} CRIT Rate: <span className="text-desc">{toPercentage(talentCr)}</span>
        </p>
      )}
    </div>
  )

  return {
    string: { formulaString, critString, avgString },
    component: {
      DmgBody,
      CritBody,
      AvgBody,
    },
    number: { dmg, totalCrit, totalAvg },
    element,
  }
}

export type StringConstructor = ReturnType<typeof damageStringConstruct>