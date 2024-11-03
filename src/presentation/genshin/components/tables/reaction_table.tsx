import { observer } from 'mobx-react-lite'
import { ReactionTooltip } from './reaction_tooltip'
import classNames from 'classnames'
import _ from 'lodash'
import { Tooltip } from '@src/presentation/components/tooltip'
import { BaseReactionDmg } from '@src/domain/scaling'
import { CrystallizeTooltip } from './crystallize_tooltip'
import { Element } from '@src/domain/constant'
import { ElementColor } from '@src/core/utils/damageStringConstruct'
import { useCalculator } from '@src/core/hooks/useCalculator'
import { useStore } from '@src/data/providers/app_store_provider'

export const ReactionTable = observer(() => {
  const { teamStore, calculatorStore } = useStore()
  const { selected } = calculatorStore

  const { mainComputed, transformative } = useCalculator({ doNotSaveStats: true })

  const char = teamStore.characters[selected]

  return (
    <div className="flex flex-col col-span-2 text-sm rounded-lg bg-primary-darker h-fit">
      <p className="px-2 py-1 text-lg font-bold text-center rounded-t-lg bg-primary-light">Transformative Reactions</p>
      <div className="grid w-full grid-cols-9 gap-2 py-0.5 pr-2 text-sm font-bold text-center bg-primary-dark items-center">
        <p className="col-span-3">Reaction</p>
        <p className="col-span-2">Element</p>
        <p className="col-span-2">Base</p>
        <div className="flex items-center justify-center col-span-2 gap-2 text-start">
          <p>Amplified</p>
          <Tooltip
            title="Amplified Reaction"
            body={
              <div className="space-y-1 font-normal text-start">
                <p>
                  For Swirl Reactions, this represents the <b className="text-genshin-anemo">Swirl DMG</b> amplified by
                  either Vaporize, Melt or Aggravate Reaction.
                </p>
                <p>
                  For Bloom-related Reactions, this represents the <b className="text-genshin-dendro">Dendro Core</b>
                  's Crit DMG caused by Nahida's C2.
                </p>
                <p>Burning Reactions can be affected by both.</p>
                <p>
                  Finally, for Crystallize, this represents the shield's Absorption Value against its own{' '}
                  <b>Elemental Type</b>.
                </p>
              </div>
            }
            style="w-[400px]"
          >
            <i className="text-sm fa-regular fa-question-circle" />
          </Tooltip>
        </div>
      </div>
      <div className="py-1 rounded-b-lg bg-primary-darker">
        {_.map(transformative, (item) => {
          const base = BaseReactionDmg[char.level - 1] * item.mult * (1 + item.emBonus + item.dmg)
          return (
            <div className="grid w-full grid-cols-9 gap-2 py-0.5 pr-2 text-sm text-center" key={item.name}>
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
              <p className={classNames('col-span-2', ElementColor[item.element])}>{item.element}</p>
              <div className="col-span-2 text-start">
                <ReactionTooltip {...item} base={BaseReactionDmg[char.level - 1]} />
              </div>
              <p
                className={classNames('col-span-2', {
                  'font-bold text-desc': item.amp > 1 || item.add || item.cd,
                })}
              >
                {item.amp > 1 || item.add || item.cd
                  ? _.round((base + item.add) * (1 + item.cd) * item.amp).toLocaleString()
                  : '-'}
              </p>
            </div>
          )
        })}
        {mainComputed?.ELEMENT === Element.GEO && (
          <div className="grid w-full grid-cols-9 gap-2 py-0.5 pr-2 text-sm text-center">
            <p className="col-span-3 font-bold">Crystallize</p>
            <p className="col-span-2 text-indigo-300">Shield</p>
            <div className="col-span-2 text-start">
              <CrystallizeTooltip em={mainComputed?.getEM()} level={char?.level} onElement={false} />
            </div>
            <div className="col-span-2 text-start">
              <CrystallizeTooltip em={mainComputed?.getEM()} level={char?.level} onElement={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
})
