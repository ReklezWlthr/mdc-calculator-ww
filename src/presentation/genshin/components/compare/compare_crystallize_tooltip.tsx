import { toPercentage } from '@src/core/utils/converter'
import { useStore } from '@src/data/providers/app_store_provider'
import { Tooltip } from '@src/presentation/components/tooltip'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { BaseCrystallizeShield } from '@src/domain/scaling'
import { CrystallizeTooltipProps } from '../tables/crystallize_tooltip'

export interface CompareCrystallizeTooltipProps extends CrystallizeTooltipProps {
  shieldStrength?: number
  title: string
}

export const CompareCrystallizeTooltip = observer(({ meta }: { meta: CompareCrystallizeTooltipProps[] }) => {
  const { setupStore } = useStore()
  const mode = setupStore.mode
  const main = meta[0]

  return (
    <>
      {_.map(meta, (m, i) => {
        if (!m) return <div className="col-span-1 text-center">-</div>

        const getShieldValue = (obj: CompareCrystallizeTooltipProps, onElement: boolean) => {
          const emBonus = 4.44 * (obj.em / (obj.em + 1400))
          const base = BaseCrystallizeShield[obj.level - 1]
          const calc = base * (1 + emBonus)

          const raw = calc
          return raw * ((onElement ? 2.5 : 1) * (1 + obj.shieldStrength))
        }

        const currShield = getShieldValue(m, false)
        const onElementShield = getShieldValue(m, true)
        const mainShield = getShieldValue(main, false)
        const compare = currShield - mainShield
        const p = (currShield - mainShield) / mainShield
        const percent = mainShield ? (compare >= 0 ? '+' : '') + toPercentage(p) : 'NEW'
        const abs = (compare >= 0 ? '+' : '') + _.floor(currShield - mainShield).toLocaleString()
        const diff = _.includes(['percent', 'abs'], mode)

        return (
          <div className="col-span-1 text-start">
            <Tooltip
              title={
                <div className="flex items-center justify-between gap-2">
                  <div className="w-1/2">
                    <p className="w-full text-xs font-normal truncate text-gray">{m.title}</p>
                    <p>Self Shield Strength</p>
                  </div>
                  {!!i && (
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
                            {toPercentage(compare / mainShield)}
                          </p>
                          <p className="text-xs font-normal">from Main</p>
                        </div>
                      ) : (
                        <p className="text-xs text-desc">NEW</p>
                      )}
                    </div>
                  )}
                </div>
              }
              body={
                <div className="grid grid-cols-2 pt-1 text-xs gap-x-3">
                  <p>
                    On-Element: <span className="text-desc">{_.round(onElementShield).toLocaleString()}</span>
                  </p>
                  <p>
                    Off-Element: <span className="text-desc">{_.round(currShield).toLocaleString()}</span>
                  </p>
                </div>
              }
              style="w-[300px]"
            >
              {i ? (
                <p
                  className={classNames(
                    'col-span-1 text-xs text-center',
                    diff
                      ? {
                          'text-lime-300': compare > 0 && mainShield,
                          'text-desc': compare > 0 && !mainShield,
                          'text-red': compare < 0,
                          'text-blue': compare === 0,
                        }
                      : ''
                  )}
                >
                  {mode === 'percent' ? percent : mode === 'abs' ? abs : _.round(currShield).toLocaleString()}
                  {compare > 0 && !diff && <i className="ml-1 text-[10px] fa-solid fa-caret-up text-lime-400" />}
                  {compare < 0 && !diff && <i className="ml-1 text-[10px] fa-solid fa-caret-down text-red" />}
                  {compare === 0 && !diff && <i className="ml-1 text-[10px] fa-solid fa-minus text-blue" />}
                </p>
              ) : (
                <p className="col-span-1 text-xs text-center">{_.round(currShield).toLocaleString()}</p>
              )}
            </Tooltip>
          </div>
        )
      })}
    </>
  )
})
