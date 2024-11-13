import { useStore } from '@src/data/providers/app_store_provider'
import { Element } from '@src/domain/constant'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import _ from 'lodash'
import classNames from 'classnames'
import { toPercentage } from '@src/core/utils/converter'
import { observer } from 'mobx-react-lite'
import { CheckboxInput } from '@src/presentation/components/inputs/checkbox'
import { StatsObject, StatsObjectKeys } from '@src/data/lib/stats/baseConstant'
import { SelectInput } from '@src/presentation/components/inputs/select_input'
import { EnemyGroups } from '@src/data/db/enemies'
import { SelectTextInput } from '@src/presentation/components/inputs/select_text_input'
import { findEnemy } from '@src/core/utils/finder'
import React from 'react'
import { Tooltip } from '@src/presentation/components/tooltip'
import { ToggleSwitch } from '@src/presentation/components/inputs/toggle'
import { getEchoImage } from '@src/core/utils/fetcher'
import { BaseElementColor } from '../tables/compare_total_row'

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

  const reduceRes = (arr: number[]) =>
    _.reduce(
      _.map(Element),
      (acc, curr, i) => {
        acc[curr] = _.round(arr[i] * 100)
        return acc
      },
      {} as Record<Element, number>
    )

  return (
    <div className="w-[35vw] p-4 text-white rounded-xl bg-primary-dark space-y-3 font-semibold">
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
              if (v) setValue('res', reduceRes(arr))
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
      <div className="flex justify-between gap-8">
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
            <p>Elemental RES</p>
            <Tooltip
              title="Elemental RES"
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
            <div className="flex items-center gap-3">
              <p className={classNames('whitespace-nowrap text-sm w-full', item)}>{key} RES</p>
              <TextInput
                type={res[key] === Infinity ? 'text' : 'number'}
                value={res[key] === Infinity ? 'Immune' : res[key].toString()}
                onChange={(value) => store.setRes(key, value as any as number)}
                style="!w-[75px] shrink-0"
                disabled={res[key] === Infinity || !!enemyData}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
