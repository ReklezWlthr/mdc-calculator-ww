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
    id: '21010026',
    scaling: (base, r) => {
      base[Stats.ALL_DMG].push({
        source: `Ages of Harvest`,
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
]

export default WeaponBonus
