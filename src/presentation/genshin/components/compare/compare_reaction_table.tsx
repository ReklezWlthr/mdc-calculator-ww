import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import _ from 'lodash'
import { Tooltip } from '@src/presentation/components/tooltip'
import { BaseReactionDmg } from '@src/domain/scaling'
import { Element, Stats } from '@src/domain/constant'
import { ElementColor } from '@src/core/utils/damageStringConstruct'
import { CalculatorT, useCalculator } from '@src/core/hooks/useCalculator'
import { useStore } from '@src/data/providers/app_store_provider'
import { CrystallizeTooltip } from '../tables/crystallize_tooltip'
import { ReactionTooltip } from '../tables/reaction_tooltip'
import { CompareReactionTooltip } from './compare_reaction_tooltip'
import { CompareCrystallizeTooltip } from './compare_crystallize_tooltip'

export const CompareReactionTable = observer(({ meta }: { meta: CalculatorT[] }) => {
  const { setupStore } = useStore()

  return (
    <div className="flex flex-col col-span-2 text-sm rounded-lg bg-primary-darker h-fit">
      <p className="px-2 py-1 text-lg font-bold text-center rounded-t-lg bg-primary-light">Transformative Reactions</p>
      <div className="grid w-full grid-cols-8 gap-2 py-0.5 pr-2 text-sm font-bold text-center bg-primary-dark items-center">
        <p className="col-span-3">Reaction</p>
        <p className="col-span-1">Element</p>
        <p className="col-span-1">Main</p>
        <p className="col-span-1">Sub 1</p>
        <p className="col-span-1">Sub 2</p>
        <p className="col-span-1">Sub 3</p>
      </div>
      <div className="py-1 rounded-b-lg bg-primary-darker">
        {_.map(meta?.[0]?.transformative, (item, oi) => {
          const element = _.filter(_.uniq(_.map(meta, (item) => item.transformative[oi]?.element)))
          return (
            <div className="grid w-full grid-cols-8 gap-2 py-0.5 pr-2 text-sm text-center" key={item.name}>
              <div className="flex items-center justify-center w-full col-span-3 gap-2 font-bold">
                <p>{item.name}</p>
                {item.name === 'Shattered' && (
                  <div className="text-start">
                    <Tooltip
                      title="Shatter Reaction"
                      body={
                        <div className="font-normal">
                          Only Blunt attacks (e.g. Claymore attacks, most Plunging attacks, most{' '}
                          <b className="text-genshin-geo">Geo</b> attacks, and explosions) can trigger Shatter Reaction.
                          However, for simplicity's sake, this row will be shown on all characters, regardless of them
                          having any Blunt attacks.
                        </div>
                      }
                      style="w-[450px]"
                    >
                      <i className="fa-regular fa-question-circle" />
                    </Tooltip>
                  </div>
                )}
              </div>
              <p className={classNames('col-span-1', _.size(element) > 1 ? 'text-gray' : ElementColor[item.element])}>
                {_.size(element) > 1 ? 'Various' : item.element}
              </p>
              <CompareReactionTooltip
                meta={_.map(meta, (m, i) => {
                  const team = i ? setupStore.comparing[i - 1] : setupStore.main
                  const char = _.find(team?.char, (item) => item.cId === setupStore.mainChar)

                  if (!char) return null

                  return { ...m?.transformative[oi], base: BaseReactionDmg[char.level - 1], title: team?.name }
                })}
              />
            </div>
          )
        })}
        {meta?.[0]?.mainComputed?.ELEMENT === Element.GEO && (
          <div className="grid w-full grid-cols-8 gap-2 py-0.5 pr-2 text-sm text-center">
            <p className="col-span-3 font-bold">Crystallize</p>
            <p className="col-span-1 text-indigo-300">Shield</p>
            <CompareCrystallizeTooltip
              meta={_.map(meta, (m, i) => {
                const team = i ? setupStore.comparing[i - 1] : setupStore.main
                const char = _.find(team?.char, (item) => item.cId === setupStore.mainChar)

                if (!char) return null

                return {
                  title: team?.name,
                  em: m?.mainComputed?.getEM(),
                  level: char?.level,
                  shieldStrength: m?.mainComputed?.getValue(Stats.SHIELD),
                }
              })}
            />
          </div>
        )}
      </div>
    </div>
  )
})
