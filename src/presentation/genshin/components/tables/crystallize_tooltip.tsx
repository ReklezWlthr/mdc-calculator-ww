import { toPercentage } from '@src/core/utils/converter'
import { findCharacter } from '@src/core/utils/finder'
import { TransformativeT } from '@src/data/lib/stats/conditionals/transformative'
import { useStore } from '@src/data/providers/app_store_provider'
import { Element, Stats } from '@src/domain/constant'
import { BaseCrystallizeShield } from '@src/domain/scaling'
import { Tooltip } from '@src/presentation/components/tooltip'
import classNames from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'

export interface CrystallizeTooltipProps {
  em: number
  level: number
  onElement?: boolean
}

export const CrystallizeTooltip = observer(({ em, level, onElement }: CrystallizeTooltipProps) => {
  const { teamStore, calculatorStore } = useStore()
  const team = _.map(teamStore.characters, (item, i) => ({
    name: findCharacter(item.cId)?.name,
    stats: calculatorStore.computedStats[i],
  }))

  const emBonus = 4.44 * (em / (em + 1400))
  const base = BaseCrystallizeShield[level - 1]
  const calc = base * (1 + emBonus)

  const raw = calc
  const shieldValue = (shieldStrength: number) => raw * ((onElement ? 2.5 : 1) * (1 + shieldStrength))

  return (
    <Tooltip
      title="Teammate Shield Strength"
      body={
        <div className="grid grid-cols-2 gap-1 text-xs">
          {_.map(
            team,
            (item) =>
              item && (
                <p key={item.name}>
                  {item.name}:{' '}
                  <span className="text-desc">
                    {_.round(shieldValue(item.stats.getValue(Stats.SHIELD))).toLocaleString()}
                  </span>
                </p>
              )
          )}
        </div>
      }
      style="w-[300px]"
    >
      <p className={classNames('w-full font-bold text-center', onElement ? 'text-desc' : 'text-indigo-300')}>
        {_.round(raw * (onElement ? 2.5 : 1)).toLocaleString()}
      </p>
    </Tooltip>
  )
})
