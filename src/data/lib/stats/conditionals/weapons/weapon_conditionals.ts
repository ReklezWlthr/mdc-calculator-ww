import { calcRefinement } from '@src/core/utils/data_format'
import { checkBuffExist, findCharacter, findContentById } from '@src/core/utils/finder'
import { IWeaponContent } from '@src/domain/conditional'
import { Element, Stats } from '@src/domain/constant'
import _ from 'lodash'
import { StatsObject } from '../../baseConstant'
import { toPercentage } from '@src/core/utils/converter'

export const WeaponConditionals: IWeaponContent[] = [
  {
    type: 'toggle',
    text: `Ageless Marking`,
    show: true,
    default: true,
    id: '21010026_1',
    scaling: (base, form, r) => {
      if (form['21010026_1']) {
        base.SKILL_DMG.push({
          value: calcRefinement(0.24, 0.06, r),
          name: 'Ageless Marking',
          source: `Ages of Harvest`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Ethereal Endowment`,
    show: true,
    default: true,
    id: '21010026_2',
    scaling: (base, form, r) => {
      if (form['21010026_2']) {
        base.SKILL_DMG.push({
          value: calcRefinement(0.24, 0.06, r),
          name: 'Ethereal Endowment',
          source: `Ages of Harvest`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `ATK Bonus Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 2,
    id: '21020015',
    scaling: (base, form, r) => {
      if (form['21020015']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.06, 0.015, r) * form['21020015'],
          name: 'Passive',
          source: `Emerald of Genesis`,
        })
      }
      return base
    },
  },
]

export const WeaponAllyConditionals: IWeaponContent[] = []

export const WeaponTeamConditionals: IWeaponContent[] = []
