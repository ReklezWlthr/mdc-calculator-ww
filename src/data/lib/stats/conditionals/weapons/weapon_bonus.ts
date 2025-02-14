import { StatsObject } from '../../baseConstant'
import { calcRefinement } from '../../../../../core/utils/data_format'
import { Element, ITeamChar, Stats, TalentProperty } from '@src/domain/constant'
import _ from 'lodash'
import { findCharacter } from '@src/core/utils/finder'
import { toPercentage } from '@src/core/utils/converter'

const WeaponBonus: {
  id: string
  scaling: (base: StatsObject, refinement: number, team?: ITeamChar[]) => StatsObject
}[] = [
  {
    id: '21010011',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Training Broadblade`,
        name: `Passive`,
        value: calcRefinement(0.04, 0.01, r),
      })
      return base
    },
  },
  {
    id: '21020011',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Training Sword`,
        name: `Passive`,
        value: calcRefinement(0.04, 0.01, r),
      })
      return base
    },
  },
  {
    id: '21030011',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Training Pistols`,
        name: `Passive`,
        value: calcRefinement(0.04, 0.01, r),
      })
      return base
    },
  },
  {
    id: '21040011',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Training Gauntlets`,
        name: `Passive`,
        value: calcRefinement(0.04, 0.01, r),
      })
      return base
    },
  },
  {
    id: '21050011',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Training Rectifier`,
        name: `Passive`,
        value: calcRefinement(0.04, 0.01, r),
      })
      return base
    },
  },
  {
    id: '21010012',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Tyro Broadblade`,
        name: `Passive`,
        value: calcRefinement(0.05, 0.0125, r),
      })
      return base
    },
  },
  {
    id: '21020012',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Tyro Sword`,
        name: `Passive`,
        value: calcRefinement(0.05, 0.0125, r),
      })
      return base
    },
  },
  {
    id: '21030012',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Tyro Pistols`,
        name: `Passive`,
        value: calcRefinement(0.05, 0.0125, r),
      })
      return base
    },
  },
  {
    id: '21040012',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Tyro Gauntlets`,
        name: `Passive`,
        value: calcRefinement(0.05, 0.0125, r),
      })
      return base
    },
  },
  {
    id: '21050012',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Tyro Rectifier`,
        name: `Passive`,
        value: calcRefinement(0.05, 0.0125, r),
      })
      return base
    },
  },
  {
    id: '21010023',
    scaling: (base, r) => {
      base.SKILL_SCALING.push({
        name: `Temperance Healing`,
        value: [{ scaling: calcRefinement(0.03, 0.0075, r), multiplier: Stats.HP }],
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      return base
    },
  },
  {
    id: '21020023',
    scaling: (base, r) => {
      base.LIB_SCALING.push({
        name: `Vanquish Healing`,
        value: [{ scaling: calcRefinement(0.05, 0.0125, r), multiplier: Stats.HP }],
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      return base
    },
  },
  {
    id: '21030023',
    scaling: (base, r) => {
      base.DODGE_SCALING.push({
        name: `Alacrity Healing`,
        value: [{ scaling: calcRefinement(0.016, 0.004, r), multiplier: Stats.HP }],
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      return base
    },
  },
  {
    id: '21040023',
    scaling: (base, r) => {
      base.BASIC_SCALING.push({
        name: `Rejuvenate Healing`,
        value: [{ scaling: calcRefinement(0.005, 0.0015, r), multiplier: Stats.HP }],
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      return base
    },
  },
  {
    id: '21050023',
    scaling: (base, r) => {
      base.INTRO_SCALING.push({
        name: `Augment Healing`,
        value: [{ scaling: calcRefinement(0.05, 0.0125, r), multiplier: Stats.HP }],
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      return base
    },
  },
  {
    id: '21010034',
    scaling: (base, r) => {
      base.BASIC_SCALING.push({
        name: `Broadblade#41 Healing`,
        value: [{ scaling: calcRefinement(0.5, 0.0125, r), multiplier: Stats.HP }],
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      return base
    },
  },
  {
    id: '21010053',
    scaling: (base, r) => {
      base[Stats.BASIC_DMG].push({
        source: `Guardian Broadblade`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      base[Stats.HEAVY_DMG].push({
        source: `Guardian Broadblade`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21010053',
    scaling: (base, r) => {
      base[Stats.SKILL_DMG].push({
        source: `Guardian Sword`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21030053',
    scaling: (base, r) => {
      base[Stats.SKILL_DMG].push({
        source: `Guardian Pistols`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21040053',
    scaling: (base, r) => {
      base[Stats.LIB_DMG].push({
        source: `Guardian Gauntlets`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21050053',
    scaling: (base, r) => {
      base[Stats.BASIC_DMG].push({
        source: `Guardian Rectifier`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      base[Stats.HEAVY_DMG].push({
        source: `Guardian Rectifier`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21010016',
    scaling: (base, r) => {
      base[Stats.ATTR_DMG].push({
        source: `Verdant Summit`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21010026',
    scaling: (base, r) => {
      base[Stats.ATTR_DMG].push({
        source: `Ages of Harvest`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21050016',
    scaling: (base, r) => {
      base[Stats.ATTR_DMG].push({
        source: `Stringmaster`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21040016',
    scaling: (base, r) => {
      base[Stats.ATTR_DMG].push({
        source: `Verity's Handle`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21010015',
    scaling: (base, r) => {
      base[Stats.ER].push({
        source: `Lustrous Razor`,
        name: `Passive`,
        value: calcRefinement(0.128, 0.032, r),
      })
      return base
    },
  },
  {
    id: '21020016',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Blazing Brilliance`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21020026',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Red Spring`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21020015',
    scaling: (base, r) => {
      base[Stats.ER].push({
        source: `Emerald of Genesis`,
        name: `Passive`,
        value: calcRefinement(0.128, 0.032, r),
      })
      return base
    },
  },
  {
    id: '21020034',
    scaling: (base, r) => {
      base.HEAVY_SCALING.push({
        name: `Sword#18 Healing`,
        value: [{ scaling: calcRefinement(0.05, 0.0125, r), multiplier: Stats.HP }],
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      return base
    },
  },
  {
    id: '21030034',
    scaling: (base, r) => {
      base.FORTE_SCALING.push({
        name: `Pistols#26 Healing`,
        value: [{ scaling: calcRefinement(0.05, 0.0125, r), multiplier: Stats.HP }],
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      return base
    },
  },
  {
    id: '21030034',
    scaling: (base, r) => {
      base.DODGE_SCALING.push({
        name: `Gauntlets#21 Healing`,
        value: [{ scaling: calcRefinement(0.05, 0.0125, r), multiplier: Stats.HP }],
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      return base
    },
  },
  {
    id: '21050034',
    scaling: (base, r) => {
      base.SKILL_SCALING.push({
        name: `Rectifier#25 Healing`,
        value: [{ scaling: calcRefinement(0.05, 0.0125, r), multiplier: Stats.HP }],
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      return base
    },
  },
  {
    id: '21030015',
    scaling: (base, r) => {
      base[Stats.ER].push({
        source: `Abyss Surges`,
        name: `Passive`,
        value: calcRefinement(0.128, 0.032, r),
      })
      return base
    },
  },
  {
    id: '21040015',
    scaling: (base, r) => {
      base[Stats.ER].push({
        source: `Static Mist`,
        name: `Passive`,
        value: calcRefinement(0.128, 0.032, r),
      })
      return base
    },
  },
  {
    id: '21050015',
    scaling: (base, r) => {
      base[Stats.ER].push({
        source: `Cosmic Ripples`,
        name: `Passive`,
        value: calcRefinement(0.128, 0.032, r),
      })
      return base
    },
  },
  {
    id: '21050026',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Rime-Draped Sprouts`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21050027',
    scaling: (base, r) => {
      base[Stats.P_HP].push({
        source: `Stellar Symphony`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21030016',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Death and Dance`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21040026',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Tragicomedy`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
  {
    id: '21020036',
    scaling: (base, r) => {
      base[Stats.CRIT_RATE].push({
        source: `Unflickering Valor`,
        name: `Passive`,
        value: calcRefinement(0.08, 0.02, r),
      })
      return base
    },
  },
  {
    id: '21050046',
    scaling: (base, r) => {
      base[Stats.P_ATK].push({
        source: `Luminous Hymn`,
        name: `Passive`,
        value: calcRefinement(0.12, 0.03, r),
      })
      return base
    },
  },
]

export default WeaponBonus
