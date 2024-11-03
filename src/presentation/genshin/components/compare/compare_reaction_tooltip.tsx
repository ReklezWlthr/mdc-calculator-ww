import { toPercentage } from '@src/core/utils/converter'
import { useStore } from '@src/data/providers/app_store_provider'
import { Tooltip } from '@src/presentation/components/tooltip'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { ReactionTooltipProps } from '../tables/reaction_tooltip'
import { Element } from '@src/domain/constant'
import classNames from 'classnames'

export const CompareReactionTooltip = observer(({ meta }: { meta: ReactionTooltipProps[] }) => {
  const { calculatorStore, setupStore } = useStore()
  const mode = setupStore.mode
  const main = meta[0]

  return (
    <>
      {_.map(meta, (m, i) => {
        if (!m) return <div className="col-span-1 text-center">-</div>

        const getResMult = (element: Element, resPen: number) => calculatorStore.getResMult(element, resPen || 0)
        const getDmg = ({ base, mult, emBonus, dmg, element, resPen }: ReactionTooltipProps) => {
          const resMult = getResMult(element, resPen || 0)
          return base * mult * (1 + emBonus + dmg) * resMult
        }
        const getAmpDmg = (props: ReactionTooltipProps) => {
          return (getDmg(props) + props.add) * (1 + props.cd) * props.amp
        }

        const getFormatDmg = (props: ReactionTooltipProps) => (mode === 'base' ? getDmg(props) : getAmpDmg(props))

        const compare = getFormatDmg(m) - getFormatDmg(main)
        const p = (getFormatDmg(m) - getFormatDmg(main)) / getFormatDmg(main)
        const percent = getDmg(main) ? (compare >= 0 ? '+' : '') + toPercentage(p) : 'NEW'
        const abs = (compare >= 0 ? '+' : '') + _.floor(getFormatDmg(m) - getFormatDmg(main)).toLocaleString()
        const diff = _.includes(['percent', 'abs'], mode)

        const formulaString = `<b class="text-red">${_.round(
          getDmg(m)
        ).toLocaleString()}</b> = <b class="text-indigo-400">${
          m.mult
        }</b> <i class="text-[10px]">Reaction Multiplier</i> \u{00d7} <b>${_.round(
          m.base
        ).toLocaleString()}</b> <i class="text-[10px]">Base DMG</i>${
          m.emBonus + m.dmg ? ` \u{00d7} (1 + <b class="text-yellow">${toPercentage(m.emBonus + m.dmg)}</b>)` : ''
        } \u{00d7} <b class="text-teal-200">${toPercentage(
          getResMult(m.element, m.resPen)
        )}</b> <i class="text-[10px]">RES</i>`

        const ampString = `<b class="text-red">${_.round(getAmpDmg(m)).toLocaleString()}</b> = <b>${_.round(
          getDmg(m)
        ).toLocaleString()}</b>${
          m.amp > 1
            ? ` \u{00d7} <b class="text-amber-400">${toPercentage(m.base)}</b> <i class="text-[10px]">AMP</i>`
            : ''
        }${
          m.add ? ` \u{00d7} <b class="text-violet-300">${toPercentage(m.add)}</b> <i class="text-[10px]">ADD</i>` : ''
        }${
          m.cd
            ? ` \u{00d7} <span class="inline-flex items-center h-4">(1 + <b class="inline-flex items-center h-4"><img class="w-4 h-4 mx-1" src="/asset/icons/stat_crit_dmg.png" />${toPercentage(
                m.cd
              )}</b>)</span>`
            : ''
        }`

        return (
          <div className="col-span-1 text-start">
            <Tooltip
              title={
                <div className="flex items-center justify-between gap-2">
                  <div className="w-1/2">
                    <p className="w-full text-xs font-normal truncate text-gray">{m.title}</p>
                    <p>
                      {m.name === 'Swirl' ? `${m.element} ` : ''}
                      {m.name}
                    </p>
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
                            {toPercentage(compare / getDmg(main))}
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
                <div className="space-y-1">
                  <p className="whitespace-nowrap" dangerouslySetInnerHTML={{ __html: formulaString }} />
                  {!!m.emBonus && (
                    <p className="text-xs">
                      EM Bonus: <span className="text-desc">{toPercentage(m.emBonus)}</span>
                    </p>
                  )}
                  {!!m.dmg && (
                    <p className="text-xs">
                      Reaction Bonus: <span className="text-desc">{toPercentage(m.dmg)}</span>
                    </p>
                  )}
                  {!!(m.amp > 1 || m.add || m.cd) && (
                    <div className="pt-1.5 border-t-2 border-primary-border">
                      <p className="font-bold text-white">Amplified</p>
                      <p className="whitespace-nowrap" dangerouslySetInnerHTML={{ __html: ampString }} />
                    </div>
                  )}
                </div>
              }
              style="w-fit"
            >
              {i ? (
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
                  {mode === 'percent' ? percent : mode === 'abs' ? abs : _.round(getFormatDmg(m)).toLocaleString()}
                  {compare > 0 && !diff && <i className="ml-1 text-[10px] fa-solid fa-caret-up text-lime-400" />}
                  {compare < 0 && !diff && <i className="ml-1 text-[10px] fa-solid fa-caret-down text-red" />}
                  {compare === 0 && !diff && <i className="ml-1 text-[10px] fa-solid fa-minus text-blue" />}
                </p>
              ) : (
                <p className="col-span-1 text-xs text-center">{_.round(getFormatDmg(m)).toLocaleString()}</p>
              )}
            </Tooltip>
          </div>
        )
      })}
    </>
  )
})
