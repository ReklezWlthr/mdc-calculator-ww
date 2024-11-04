import { StatsObject } from '@src/data/lib/stats/baseConstant'
import { ITalent, ITalentDisplay } from '@src/domain/conditional'
import { Element, Stats } from '@src/domain/constant'
import classNames from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import getConfig from 'next/config'
import { ElementIconColor, TalentIcon } from './tables/scaling_wrapper'
import { useStore } from '@src/data/providers/app_store_provider'
import { ElementColor } from '@src/core/utils/damageStringConstruct'

const { publicRuntimeConfig } = getConfig()

export const TooltipBody = ({
  talent,
  stats,
  unlocked,
}: {
  talent: ITalentDisplay
  stats?: StatsObject
  unlocked: boolean
}) => {
  const statForScale = {
    [Stats.ATK]: stats?.getAtk(),
    [Stats.DEF]: stats?.getDef(),
    [Stats.HP]: stats?.getHP(),
    [Stats.ER]: stats?.[Stats.ER],
    [Stats.HEAL]: stats?.[Stats.HEAL],
  }

  return (
    <div className="space-y-3">
      <p dangerouslySetInnerHTML={{ __html: talent?.content }} />
      {!!_.size(talent?.value) && unlocked && stats && (
        <div>
          {_.map(talent?.value, (item) => (
            <p key={item.name}>
              {item.name}: <span className="text-desc">{item.value.scaling(statForScale[item.value.stat])}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export const ConsCircle = observer(
  ({ talents, element, cons, name }: { talents: ITalent; element: Element; cons: number; name: string }) => {
    const { settingStore } = useStore()

    return (
      <div className="space-y-5">
        <div className="flex flex-col justify-around w-[252px] h-[252px]">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary-bg">
              <TalentIcon
                talent={talents?.c1}
                element={element}
                active={cons >= 1}
                tooltipSize="w-[30vw]"
                type={talents?.c1?.trace}
              />
            </div>
          </div>
          <div className="flex justify-between px-3">
            <div className="rounded-full bg-primary-bg">
              <TalentIcon
                talent={talents?.c6}
                element={element}
                active={cons >= 6}
                tooltipSize="w-[30vw]"
                type={talents?.c6?.trace}
              />
            </div>
            <div className="rounded-full bg-primary-bg">
              <TalentIcon
                talent={talents?.c2}
                element={element}
                active={cons >= 2}
                tooltipSize="w-[30vw]"
                type={talents?.c2?.trace}
              />
            </div>
          </div>
          <div className="relative flex items-center justify-center h-12 -z-50">
            <div className="w-1/2 px-1 font-bold text-center">
              <p>Resonance Chain</p>
              <p className={ElementColor[element]}>✦</p>
              <p>{name}</p>
            </div>
            <div
              className={classNames(
                'absolute -translate-x-1/2 -translate-y-1/2 rounded-full w-[200px] h-[200px] ring top-1/2 left-1/2 bg-opacity-0 ring-opacity-50 pointer-events-none',
                ElementIconColor[element]
              )}
            />
            <div
              className={classNames(
                'absolute -translate-x-1/2 -translate-y-1/2 rounded-full w-[180px] h-[180px] ring top-1/2 left-1/2 bg-opacity-0 ring-opacity-25 pointer-events-none',
                ElementIconColor[element]
              )}
            />
          </div>
          <div className="flex justify-between px-3">
            <div className="rounded-full bg-primary-bg">
              <TalentIcon
                talent={talents?.c5}
                element={element}
                active={cons >= 5}
                tooltipSize="w-[30vw]"
                type={talents?.c5?.trace}
              />
            </div>
            <div className="rounded-full bg-primary-bg">
              <TalentIcon
                talent={talents?.c3}
                element={element}
                active={cons >= 3}
                tooltipSize="w-[30vw]"
                type={talents?.c3?.trace}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="rounded-full bg-primary-bg">
              <TalentIcon
                talent={talents?.c4}
                element={element}
                active={cons >= 4}
                tooltipSize="w-[30vw]"
                type={talents?.c4?.trace}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
)
