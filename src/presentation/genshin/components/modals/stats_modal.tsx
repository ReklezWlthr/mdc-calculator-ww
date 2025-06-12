import React from 'react'
import { toPercentage } from '@src/core/utils/converter'
import { StatsArray, StatsObject, StatsObjectKeys } from '@src/data/lib/stats/baseConstant'
import { useStore } from '@src/data/providers/app_store_provider'
import { Stats, WeaponType } from '@src/domain/constant'
import { BulletPoint, Collapsible } from '@src/presentation/components/collapsible'
import { Tooltip } from '@src/presentation/components/tooltip'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'

interface NormalBlockProps {
  stat: string
  array: StatsArray[]
  stats: StatsObject
  flat?: boolean
}

interface ExtraBlockProps {
  stats: string
  totalValue: string
  cBase: number
  lBase?: number
  pArray: StatsArray[]
  fArray: StatsArray[]
  round?: number
}

const mergeBuffs = (arr: StatsArray[]) =>
  _.reduce(
    arr,
    (acc, curr) => {
      const exist = _.find(acc, (item) => item.name === curr.name && item.source === curr.source)
      if (exist) {
        exist.value += curr.value
        exist.base = curr.base
        exist.multiplier = (exist.multiplier || 0) + curr.multiplier || 0
      } else {
        acc.push(curr)
      }
      return _.cloneDeep(acc)
    },
    []
  )

export const AttributeBlock = ({ stat, array, stats, flat }: NormalBlockProps) => {
  const format = (v: number) => (flat ? _.floor(v).toLocaleString() : toPercentage(v))
  return (
    <div className="space-y-1">
      <p className="font-bold text-white">
        {stat} <span className="text-red">{format(_.sumBy(array, (item) => item.value))}</span>
      </p>
      <div className="space-y-1 text-xs">
        {_.map(
          mergeBuffs(array),
          (item) =>
            !!item.value && (
              <BulletPoint key={item.source + item.name}>
                {item.source} / {item.name}{' '}
                <span className={item.value < 0 ? 'text-red' : 'text-desc'}>{format(item.value)}</span>
                {!!item.base && !!item.multiplier && (
                  <>
                    {' '}
                    = {_.isNumber(item.base) ? _.floor(item.base).toLocaleString() : item.base}
                    {` \u{00d7} `}
                    <span className="text-blue">
                      {_.isNumber(item.multiplier) ? format(item.multiplier) : item.multiplier}
                    </span>
                    {item.flat && (
                      <>
                        {` + `}
                        <span className="text-heal">
                          {_.isNumber(item.flat) ? _.floor(item.flat).toLocaleString() : item.flat}
                        </span>
                      </>
                    )}
                  </>
                )}
              </BulletPoint>
            )
        )}
      </div>
    </div>
  )
}

export const StatsModal = observer(
  ({ stats, weapon, compare }: { stats: StatsObject; weapon: WeaponType; compare?: boolean }) => {
    const { calculatorStore } = useStore()

    const ExtraBlock = ({ stats, totalValue, cBase, lBase = 0, pArray, fArray, round = 0 }: ExtraBlockProps) => (
      <div className="space-y-1">
        <p className="font-bold text-white">
          {stats} <span className="text-red">{totalValue}</span>
        </p>
        <div className="space-y-1 text-xs">
          <BulletPoint>
            Character Base {stats} <span className="text-desc">{_.floor(cBase, round).toLocaleString()}</span>
          </BulletPoint>
          {!!lBase && (
            <BulletPoint>
              Weapon Base {stats} <span className="text-desc">{_.floor(lBase, round).toLocaleString()}</span>
            </BulletPoint>
          )}
          {_.map(mergeBuffs(pArray), (item) => {
            const c = _.floor((cBase + lBase) * item.value, round).toLocaleString()
            return (
              !!item.value && (
                <BulletPoint key={item.source + item.name}>
                  {item.source} / {item.name} <span className={item.value < 0 ? 'text-red' : 'text-desc'}>{c}</span> ={' '}
                  {_.floor(cBase + lBase, round).toLocaleString()} {`\u{00d7}`}{' '}
                  <span className="text-blue">{toPercentage(item.value)}</span>
                </BulletPoint>
              )
            )
          })}
          {_.map(
            mergeBuffs(fArray),
            (item) =>
              !!item.value && (
                <BulletPoint key={item.source + item.name}>
                  {item.source} / {item.name}{' '}
                  <span className="text-desc">{_.floor(item.value, round).toLocaleString()}</span>
                  {!!item.base && !!item.multiplier && (
                    <>
                      {' '}
                      = {_.isNumber(item.base) ? _.floor(item.base).toLocaleString() : item.base} {`\u{00d7}`}{' '}
                      <span className="text-blue">
                        {_.isNumber(item.multiplier) ? toPercentage(+item.multiplier) : item.multiplier}
                      </span>
                      {item.flat && (
                        <>
                          {' '}
                          +{' '}
                          <span className="text-heal">
                            {_.isNumber(item.flat) ? _.floor(item.flat).toLocaleString() : item.flat}
                          </span>
                        </>
                      )}
                    </>
                  )}
                </BulletPoint>
              )
          )}
        </div>
      </div>
    )

    // const defMult =
    //   1 - stats.getDef() / (stats.getDef() + 200 + 10 * +(compare ? setupStore.level : calculatorStore.level))

    return (
      <div className="w-[65dvw] mobile:w-[400px] mobile:max-h-[80dvh] mobile:overflow-y-auto bg-primary-dark rounded-lg p-3 space-y-2">
        <p className="text-lg font-bold text-white">Stats Breakdown</p>
        <Collapsible label="Basic Stats">
          <div className="grid grid-cols-2 gap-10 mobile:grid-cols-1 mobile:gap-2">
            <div className="space-y-2">
              <ExtraBlock
                stats="HP"
                cBase={stats.BASE_HP}
                lBase={0}
                totalValue={_.floor(stats.getHP()).toLocaleString()}
                pArray={stats[Stats.P_HP]}
                fArray={stats[Stats.HP]}
              />
              <ExtraBlock
                stats="ATK"
                cBase={stats.BASE_ATK_C}
                lBase={stats.BASE_ATK_L}
                totalValue={_.floor(stats.getAtk()).toLocaleString()}
                pArray={stats[Stats.P_ATK]}
                fArray={stats[Stats.ATK]}
              />
              <ExtraBlock
                stats="DEF"
                cBase={stats.BASE_DEF}
                lBase={0}
                totalValue={_.floor(stats.getDef()).toLocaleString()}
                pArray={stats[Stats.P_DEF]}
                fArray={stats[Stats.DEF]}
              />
            </div>
            <div className="space-y-2">
              <AttributeBlock stats={stats} stat="Crit. Rate" array={stats[Stats.CRIT_RATE]} />
              <AttributeBlock stats={stats} stat="Crit. DMG" array={stats[Stats.CRIT_DMG]} />
              <AttributeBlock stats={stats} stat="Healing Bonus" array={stats[Stats.HEAL]} />
              <AttributeBlock stats={stats} stat="Incoming Healing Bonus" array={stats[StatsObjectKeys.I_HEAL]} />
              <AttributeBlock stats={stats} stat="Energy Regen" array={stats[Stats.ER]} />
            </div>
          </div>
        </Collapsible>
        <Collapsible label="DMG Bonuses">
          <div className="grid grid-cols-2 gap-10 mobile:grid-cols-1 mobile:gap-2">
            <div className="space-y-2">
              <AttributeBlock stats={stats} stat="All-Type DMG Bonus" array={stats[Stats.ALL_DMG]} />
              <AttributeBlock
                stats={stats}
                stat="Glacio DMG Bonus"
                array={_.concat(stats[Stats.GLACIO_DMG], stats[Stats.ATTR_DMG])}
              />
              <AttributeBlock
                stats={stats}
                stat="Fusion DMG Bonus"
                array={_.concat(stats[Stats.FUSION_DMG], stats[Stats.ATTR_DMG])}
              />
              <AttributeBlock
                stats={stats}
                stat="Electro DMG Bonus"
                array={_.concat(stats[Stats.ELECTRO_DMG], stats[Stats.ATTR_DMG])}
              />
              <AttributeBlock
                stats={stats}
                stat="Aero DMG Bonus"
                array={_.concat(stats[Stats.AERO_DMG], stats[Stats.ATTR_DMG])}
              />
              <AttributeBlock
                stats={stats}
                stat="Spectro DMG Bonus"
                array={_.concat(stats[Stats.SPECTRO_DMG], stats[Stats.ATTR_DMG])}
              />
              <AttributeBlock
                stats={stats}
                stat="Havoc DMG Bonus"
                array={_.concat(stats[Stats.HAVOC_DMG], stats[Stats.ATTR_DMG])}
              />
            </div>
            <div className="space-y-2">
              <AttributeBlock stats={stats} stat="Basic Attack Bonus" array={stats[Stats.BASIC_DMG]} />
              <AttributeBlock stats={stats} stat="Heavy Attack Bonus" array={stats[Stats.HEAVY_DMG]} />
              <AttributeBlock stats={stats} stat="Dodge Counter DMG Bonus" array={stats[Stats.DODGE_DMG]} />
              <AttributeBlock stats={stats} stat="Res. Skill DMG Bonus" array={stats[Stats.SKILL_DMG]} />
              <AttributeBlock stats={stats} stat="Res. Liberation DMG Bonus" array={stats[Stats.LIB_DMG]} />
              <AttributeBlock stats={stats} stat="Outro Skill DMG Bonus" array={stats[Stats.OUTRO_DMG]} />
              <AttributeBlock stats={stats} stat="Coordinated Attack DMG Bonus" array={stats[Stats.COORD_DMG]} />
            </div>
          </div>
        </Collapsible>
        <Collapsible label="DMG Amplify">
          <div className="grid grid-cols-2 gap-10 mobile:grid-cols-1 mobile:gap-2">
            <div className="space-y-2">
              <AttributeBlock stats={stats} stat="All-Type DMG AMP" array={stats.AMP} />
              <AttributeBlock stats={stats} stat="Glacio DMG AMP" array={stats.GLACIO_AMP} />
              <AttributeBlock stats={stats} stat="Fusion DMG AMP" array={stats.FUSION_AMP} />
              <AttributeBlock stats={stats} stat="Electro DMG AMP" array={stats.ELECTRO_AMP} />
              <AttributeBlock stats={stats} stat="Aero DMG AMP" array={stats.AERO_AMP} />
              <AttributeBlock stats={stats} stat="Spectro DMG AMP" array={stats.SPECTRO_AMP} />
              <AttributeBlock stats={stats} stat="Havoc DMG AMP" array={stats.HAVOC_AMP} />
            </div>
            <div className="space-y-2">
              <AttributeBlock stats={stats} stat="Basic Attack AMP" array={stats.BASIC_AMP} />
              <AttributeBlock stats={stats} stat="Heavy Attack AMP" array={stats.HEAVY_AMP} />
              <AttributeBlock stats={stats} stat="Res. Skill AMP" array={stats.SKILL_AMP} />
              <AttributeBlock stats={stats} stat="Res. Liberation AMP" array={stats.LIB_AMP} />
              <AttributeBlock stats={stats} stat="Coordinated Attack AMP" array={stats.COORD_AMP} />
              <AttributeBlock stats={stats} stat="Spectro Frazzle AMP" array={stats.FRAZZLE_AMP} />
              <AttributeBlock stats={stats} stat="Aero Erosion AMP" array={stats.EROSION_AMP} />
            </div>
          </div>
        </Collapsible>
        <Collapsible label="PEN">
          <div className="grid grid-cols-2 gap-10 mobile:grid-cols-1 mobile:gap-2">
            <div className="space-y-2">
              <AttributeBlock stats={stats} stat="DEF PEN" array={stats.DEF_PEN} />
              <AttributeBlock stats={stats} stat="All-Type RES PEN" array={stats.ALL_TYPE_RES_PEN} />
              <AttributeBlock stats={stats} stat="Glacio RES PEN" array={stats.GLACIO_RES_PEN} />
              <AttributeBlock stats={stats} stat="Fusion RES PEN" array={stats.FUSION_RES_PEN} />
            </div>
            <div className="space-y-2">
              <AttributeBlock stats={stats} stat="Electro RES PEN" array={stats.ELECTRO_RES_PEN} />
              <AttributeBlock stats={stats} stat="Aero RES PEN" array={stats.AERO_RES_PEN} />
              <AttributeBlock stats={stats} stat="Spectro RES PEN" array={stats.SPECTRO_RES_PEN} />
              <AttributeBlock stats={stats} stat="Havoc RES PEN" array={stats.HAVOC_RES_PEN} />
            </div>
          </div>
        </Collapsible>
      </div>
    )
  }
)
