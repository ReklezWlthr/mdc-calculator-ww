import { useStore } from '@src/data/providers/app_store_provider'
import { Element } from '@src/domain/constant'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import _ from 'lodash'
import classNames from 'classnames'
import { toPercentage } from '@src/core/utils/converter'
import { observer } from 'mobx-react-lite'
import { StatsObject, StatsObjectKeys } from '@src/data/lib/stats/baseConstant'
import { EnemyGroups } from '@src/data/db/enemies'
import { SelectTextInput } from '@src/presentation/components/inputs/select_text_input'
import { findEnemy } from '@src/core/utils/finder'
import React, { useEffect } from 'react'
import { Tooltip } from '@src/presentation/components/tooltip'
import { getEchoImage } from '@src/core/utils/fetcher'
import { BaseElementColor } from '@src/core/utils/damageStringConstruct'
import { ToggleSwitch } from '@src/presentation/components/inputs/toggle'

export const EnemyModal = observer(({ stats, compare }: { stats: StatsObject; compare?: boolean }) => {
  const { calculatorStore, teamStore, setupStore } = useStore()
  const store = compare ? setupStore : calculatorStore
  const { res, level, enemy } = store
  const setValue: (key: string, value: any) => void = store.setValue
  const charLevel = compare
    ? setupStore.selected[0] === 0
      ? setupStore.main.char[setupStore.selected[1]].level
      : setupStore.team[setupStore.selected[0] - 1].char[setupStore.selected[1]].level
    : teamStore.characters[calculatorStore.selected]?.level
  const rawDef = 8 * +level + 792
  const pen = stats?.getValue(StatsObjectKeys.DEF_PEN)
  const red = stats?.getValue(StatsObjectKeys.DEF_REDUCTION)
  const def = rawDef * (1 - pen) * (1 - red)
  const defMult = store.getDefMult(charLevel, pen, red)

  const enemyGroups = _.orderBy(EnemyGroups, 'name', 'asc')
  const enemyData = findEnemy(enemy)

  const reduceRes = (arr: number[], toa: boolean) =>
    _.reduce(
      _.map(Element),
      (acc, curr, i) => {
        const value = toa ? (arr[i] === 0.4 ? 0.6 : arr[i] === 0.1 ? 0.2 : arr[i]) : arr[i]
        acc[curr] = _.round(value * 100)
        return acc
      },
      {} as Record<Element, number>
    )

  useEffect(() => {
    if (!enemyData) setValue('toa', false)
  }, [enemyData])

  useEffect(() => {
    if (!enemyData) return
    setValue('res', reduceRes(enemyData?.res, store.toa))
  }, [store.toa])

  return (
    <div className="w-[35dvw] mobile:w-[350px] p-4 text-white rounded-xl bg-primary-dark space-y-3 font-semibold">
      <p>Target Enemy Setting</p>
      <div className="flex w-full gap-3">
        <div className="w-full space-y-1">
          <p className="text-sm">Enemy Preset</p>
          <SelectTextInput
            options={_.map(enemyGroups, (item) => ({
              name: item.name,
              value: item.name,
              img: getEchoImage(item.icon),
            }))}
            onChange={(v) => {
              const enemyData = findEnemy(v?.name)
              const arr = enemyData?.res
              setValue('enemy', v?.value || '')
              setValue('stun', false)
              setValue('shielded', false)
              if (v) setValue('res', reduceRes(arr, store.toa))
            }}
            value={enemy}
            placeholder="Custom"
          />
        </div>
        <div className="space-y-1 shrink-0">
          <p className="text-sm">Level</p>
          <TextInput
            type="number"
            min={1}
            value={level.toString()}
            onChange={(value) => setValue('level', parseFloat(value) || 0)}
            style="!w-[100px]"
          />
        </div>
      </div>
      <div className="flex justify-between gap-8 mobile:gap-6 mobile:flex-col">
        <div className="space-y-5">
          <div className="space-y-1">
            <p>DEF</p>
            <div className="flex flex-wrap items-center px-2 py-1 text-sm font-normal rounded-lg gap-x-2 bg-primary-darker w-fit text-gray">
              <p className="font-bold text-yellow">{_.round(def).toLocaleString()}</p>
              <p>=</p>
              <p>
                (792 + 8 &#215; <b className="text-red">{level}</b>)
              </p>
              {!!pen && (
                <p>
                  &#215;
                  <span className="ml-2">
                    (1 - <b className="text-red">{toPercentage(pen)}</b>)
                  </span>
                </p>
              )}
              {!!red && (
                <p>
                  &#215;
                  <span className="ml-2">
                    (1 - <b className="text-red">{toPercentage(red)}</b>)
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <p className="pt-2">DEF Multiplier</p>
            <div className="flex items-center gap-2 px-2 py-1 text-sm font-normal rounded-lg bg-primary-darker w-fit text-gray">
              <p className="font-bold text-orange-300">{toPercentage(defMult)}</p>
              <p>= 1 - </p>
              <div className="flex flex-col gap-y-1">
                <p className="text-center">
                  <b className="text-yellow">{_.round(def).toLocaleString()}</b>
                </p>
                <div className="h-0 border-[1.5px] border-primary-border" />
                <p className="text-center">
                  <b className="text-yellow">{_.round(def).toLocaleString()}</b> + (
                  <b className="text-blue">{charLevel}</b> &#215; 8) + 800
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-2 text-sm">
            <p>Attribute RES</p>
            <Tooltip
              title="Attribute RES"
              body={
                <div className="font-normal">
                  <p>
                    Reduces DMG received by a certain percentage. Values shown here are the target's base RES unaffected
                    by PEN or reductions.
                  </p>
                  <p>
                    RES can become negative but will also become only <span className="text-desc">half</span> as
                    effective. Similarly, RES above <span className="text-desc">80%</span> will gradually become less
                    effective as the value increases.
                  </p>
                </div>
              }
              style="w-[400px]"
            >
              <i className="fa-regular fa-question-circle text-gray" />
            </Tooltip>
          </div>
          {_.map(BaseElementColor, (item, key: Element) => (
            <div className="flex items-center gap-3" key={key}>
              <p className={classNames('whitespace-nowrap text-sm w-full', item)}>{key} RES</p>
              <TextInput
                type="number"
                value={res[key].toString()}
                onChange={(value) => store.setRes(key, value as any as number)}
                style="!w-[75px] shrink-0"
                disabled={!!enemyData}
              />
            </div>
          ))}
          <div className="flex items-center justify-between px-2 py-2 rounded-lg bg-primary-darker">
            <div className="flex items-center gap-2 text-sm">
              <p>ToA Buff</p>
              <Tooltip
                title="Attribute RES"
                body={
                  <div className="font-normal">
                    <p>
                      Some enemies in Tower of Adversity have their <b>Attribute RES</b> increased to{' '}
                      <span className="text-desc">20/60%</span> instead of the usual{' '}
                      <span className="text-desc">10/40%</span>. Use this toggle to boost their RES.
                    </p>
                    <p>
                      This toggle is only available while using <b>Enemy Preset</b>.
                    </p>
                  </div>
                }
                style="w-[400px]"
              >
                <i className="fa-regular fa-question-circle text-gray" />
              </Tooltip>
            </div>
            <ToggleSwitch enabled={store.toa} onClick={(e) => setValue('toa', e)} disabled={!enemyData} />
          </div>
        </div>
      </div>
    </div>
  )
})
