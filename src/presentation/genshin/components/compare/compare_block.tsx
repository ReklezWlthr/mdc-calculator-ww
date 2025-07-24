import { useCalculator } from '@src/core/hooks/useCalculator'
import { StatsObjectKeys } from '@src/data/lib/stats/baseConstant'
import { useStore } from '@src/data/providers/app_store_provider'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { findCharacter } from '@src/core/utils/finder'
import { ScalingWrapper } from '@src/presentation/genshin/components/tables/scaling_wrapper'
import { CompareSubRows } from '@src/presentation/genshin/components/tables/compare_sub_row'
import { CompareConditionalBlock } from '@src/presentation/genshin/components/compare/compare_conditional_block'
import classNames from 'classnames'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import { StatBlock } from '@src/presentation/genshin/components/stat_block'
import React, { useCallback, useState } from 'react'
import { StatsModal } from '@src/presentation/genshin/components/modals/stats_modal'
import { CharacterSelect } from '../character_select'
import { SelectInput } from '@src/presentation/components/inputs/select_input'
import { EnemyModal } from '../modals/enemy_modal'
import { WeaponBlock } from '../weapon_block'
import { CompareTraceBlock } from './compare_trace_block'
import { ArtifactBlock } from '../artifact_block'
import { romanize } from '@src/core/utils/data_format'

export const CompareBlock = observer(() => {
  const { setupStore, modalStore } = useStore()

  const tab = setupStore.tab
  const team = [setupStore.main.char, ..._.map(setupStore.comparing, (item) => item?.char)]
  const [setupIndex, charIndex] = setupStore.selected
  const focusedChar = team[setupIndex][charIndex]

  const [selectedEcho, setEcho] = useState(0)

  const selected = _.findIndex(setupStore.main?.char, (item) => item?.cId === setupStore.mainChar)
  const selectedS1 = _.findIndex(setupStore.comparing[0]?.char, (item) => item.cId === setupStore.mainChar)
  const selectedS2 = _.findIndex(setupStore.comparing[1]?.char, (item) => item.cId === setupStore.mainChar)
  const selectedS3 = _.findIndex(setupStore.comparing[2]?.char, (item) => item.cId === setupStore.mainChar)
  const char = setupStore.main?.char?.[selected]
  const charData = findCharacter(setupStore.mainChar)
  const mainCalc = useCalculator({
    teamOverride: setupStore.main?.char,
    doNotSaveStats: true,
    formOverride: setupStore.forms[0],
    indexOverride: selected,
    customOverride: setupStore.custom[0],
    initFormFunction: (f) => setupStore.initForm(0, f),
  })
  const { finalStats, mainComputed, main, ...mainContent } = mainCalc
  const sub1 = useCalculator({
    teamOverride: setupStore.comparing[0]?.char,
    doNotSaveStats: true,
    formOverride: setupStore.forms[1],
    indexOverride: selectedS1,
    customOverride: setupStore.custom[1],
    initFormFunction: (f) => setupStore.initForm(1, f),
    enabled: !!setupStore.comparing[0]?.char,
  })
  const sub2 = useCalculator({
    teamOverride: setupStore.comparing[1]?.char,
    doNotSaveStats: true,
    formOverride: setupStore.forms[2],
    indexOverride: selectedS2,
    customOverride: setupStore.custom[2],
    initFormFunction: (f) => setupStore.initForm(2, f),
    enabled: !!setupStore.comparing[1]?.char,
  })
  const sub3 = useCalculator({
    teamOverride: setupStore.comparing[2]?.char,
    doNotSaveStats: true,
    formOverride: setupStore.forms[3],
    indexOverride: selectedS3,
    customOverride: setupStore.custom[3],
    initFormFunction: (f) => setupStore.initForm(3, f),
    enabled: !!setupStore.comparing[2]?.char,
  })

  const sumStats = [
    finalStats?.[selected],
    sub1.finalStats?.[selectedS1],
    sub2.finalStats?.[selectedS2],
    sub3.finalStats?.[selectedS3],
  ]
  const allStats = [finalStats, sub1.finalStats, sub2.finalStats, sub3.finalStats]
  const levels = [
    { level: _.map(setupStore.main?.char, 'level'), selected },
    { level: _.map(setupStore.comparing?.[0]?.char, 'level'), selected: selectedS1 },
    { level: _.map(setupStore.comparing?.[1]?.char, 'level'), selected: selectedS2 },
    { level: _.map(setupStore.comparing?.[2]?.char, 'level'), selected: selectedS3 },
  ]
  const contents = [mainContent.contents, sub1.contents, sub2.contents, sub3.contents]

  const getUniqueComponent = (key: string) =>
    _.filter(
      _.uniqBy(
        _.flatMap(sumStats, (f) => f?.[key]),
        (item) => item?.name
      )
    )

  const onOpenStatsModal = useCallback(
    () =>
      modalStore.openModal(
        <StatsModal compare stats={allStats[setupIndex][charIndex]} weapon={findCharacter(focusedChar.cId)?.weapon} />
      ),
    [allStats, charData]
  )
  const onOpenEnemyModal = useCallback(
    () => modalStore.openModal(<EnemyModal stats={allStats[setupIndex][charIndex]} compare />),
    [allStats, setupIndex, charIndex]
  )

  const renderRow = (type: string) => (
    <div className="space-y-0.5">
      {_.map(getUniqueComponent(type), (item) => (
        <CompareSubRows
          key={item.name}
          scaling={_.map(
            _.map(sumStats, (f) => f?.[type]),
            (s) => _.find(s, (a) => a.name === item.name)
          )}
          stats={sumStats}
          allStats={allStats}
          level={levels}
          name={item.name}
          property={item.property}
          element={item.element}
          setupNames={_.map([setupStore.main, ...setupStore.comparing], 'name')}
        />
      ))}
    </div>
  )

  return (
    <div className="grid grid-cols-3 gap-4 px-5 mb-8 mobile:px-0 mobile:grid-cols-2">
      {_.some(sumStats) && (
        <div className="flex flex-col col-span-2 mb-5 text-sm text-white h-fit">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <p>Compare Mode</p>
              <SelectInput
                value={setupStore.mode}
                options={[
                  { name: 'Base', value: 'base' },
                  { name: 'CRIT', value: 'crit' },
                  { name: 'Average', value: 'avg' },
                  { name: 'Percentage Avg.', value: 'percent' },
                  { name: 'Absolute Avg.', value: 'abs' },
                ]}
                onChange={(v) => setupStore.setValue('mode', v)}
                style="w-[125px]"
              />
            </div>
            <PrimaryButton onClick={onOpenEnemyModal} title="Enemy Setting" style="whitespace-nowrap" />
          </div>
          <div className="flex items-center justify-center px-2 py-1 text-lg font-bold text-center rounded-t-lg bg-primary-light">
            Damage Calculation
          </div>
          <div className="flex justify-end w-full bg-primary-dark">
            <div className="grid w-4/5 grid-cols-9 gap-2 py-0.5 pr-2 text-sm font-bold text-center bg-primary-dark mobile:hidden">
              <p className="col-span-2">DMG Type</p>
              <p className="col-span-1">Attribute</p>
              <p className="col-span-1">Main</p>
              <p className="col-span-1">Sub 1</p>
              <p className="col-span-1">Sub 2</p>
              <p className="col-span-1">Sub 3</p>
              <p className="col-span-2">DMG Component</p>
            </div>
          </div>
          <div className="rounded-b-lg bg-primary-darker">
            <ScalingWrapper
              talent={main?.talents?.normal}
              element={charData.element}
              level={char.talents?.normal}
              compare
            >
              <div className="flex flex-col justify-between gap-4">{renderRow(StatsObjectKeys.BASIC_SCALING)}</div>
              <div className="flex flex-col justify-between gap-4 !my-3">
                {renderRow(StatsObjectKeys.HEAVY_SCALING)}
              </div>
              <div className="flex flex-col justify-between gap-4">{renderRow(StatsObjectKeys.MID_AIR_SCALING)}</div>
              <div className="flex flex-col justify-between gap-4">{renderRow(StatsObjectKeys.DODGE_SCALING)}</div>
            </ScalingWrapper>
            <div className="w-full my-2 border-t-2 border-primary-border" />
            <ScalingWrapper
              talent={main?.talents?.skill}
              element={charData.element}
              level={char.talents?.skill}
              compare
            >
              <div className="flex flex-col justify-between h-full gap-4">
                {renderRow(StatsObjectKeys.SKILL_SCALING)}
              </div>
            </ScalingWrapper>
            <div className="w-full my-2 border-t-2 border-primary-border" />
            <ScalingWrapper talent={main?.talents?.lib} element={charData.element} level={char.talents?.lib} compare>
              <div className="flex flex-col justify-between h-full gap-4 pb-2">
                {renderRow(StatsObjectKeys.LIB_SCALING)}
              </div>
            </ScalingWrapper>
            <div className="w-full my-2 border-t-2 border-primary-border" />
            <ScalingWrapper
              talent={main?.talents?.forte}
              element={charData.element}
              level={char.talents?.forte}
              compare
            >
              <div className="flex flex-col justify-between h-full gap-4 pb-2">
                {renderRow(StatsObjectKeys.FORTE_SCALING)}
              </div>
            </ScalingWrapper>
            <div className="w-full my-2 border-t-2 border-primary-border" />
            <ScalingWrapper
              talent={main?.talents?.intro}
              element={charData.element}
              level={char.talents?.intro}
              compare
            >
              <div className="flex flex-col justify-between h-full gap-4 pb-2">
                {renderRow(StatsObjectKeys.INTRO_SCALING)}
              </div>
            </ScalingWrapper>
            <div className="w-full my-2 border-t-2 border-primary-border" />
            <ScalingWrapper talent={main?.talents?.outro} element={charData.element} level={1} compare>
              <div className="flex flex-col justify-between h-full gap-4 pb-2">
                {renderRow(StatsObjectKeys.OUTRO_SCALING)}
              </div>
            </ScalingWrapper>
          </div>
        </div>
      )}
      {_.some(contents) && _.some(sumStats) && (
        <div className="flex flex-col items-center w-full gap-3 mobile:col-span-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="space-y-1">
              <p className="w-[136px] text-xs font-bold text-center text-white truncate">
                {setupIndex ? setupStore.comparing[setupIndex - 1]?.name : setupStore.main?.name}
              </p>
              <div className="grid grid-cols-4 gap-2 text-xs text-white">
                {_.map(Array(4), (_item, index) => (
                  <div
                    key={index}
                    className={classNames(
                      'flex items-center justify-center rounded-sm w-7 h-7 duration-200',
                      team[index]
                        ? 'bg-primary-dark cursor-pointer'
                        : 'bg-primary-darker text-primary-lighter cursor-not-allowed',
                      { 'ring-2 ring-primary-border': index === setupIndex }
                    )}
                    onClick={() => team[index] && setupStore.setValue('selected', [index, charIndex])}
                  >
                    {index === 0 ? <i className="text-desc fa-solid fa-star" /> : index}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              {_.map(team[setupIndex], (item, index) => (
                <CharacterSelect
                  key={`char_select_${index}`}
                  onClick={() => {
                    if (!team[setupIndex][index]) setupStore.setValue('tab', 'trace')
                    setupStore.setValue('selected', [setupIndex, index])
                  }}
                  isSelected={index === charIndex}
                  order={findCharacter(item.cId)?.order}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-5">
            <div
              className={classNames('rounded-lg px-2 py-1 text-white cursor-pointer duration-200', {
                'bg-primary': tab === 'trace',
              })}
              onClick={() => setupStore.setValue('tab', 'trace')}
            >
              Character
            </div>
            {focusedChar && (
              <>
                <div
                  className={classNames('rounded-lg px-2 py-1 text-white cursor-pointer duration-200', {
                    'bg-primary': tab === 'mod',
                  })}
                  onClick={() => setupStore.setValue('tab', 'mod')}
                >
                  Modifiers
                </div>
                <div
                  className={classNames('rounded-lg px-2 py-1 text-white cursor-pointer duration-200', {
                    'bg-primary': tab === 'stats',
                  })}
                  onClick={() => setupStore.setValue('tab', 'stats')}
                >
                  Stats
                </div>
                <div
                  className={classNames('rounded-lg px-2 py-1 text-white cursor-pointer duration-200', {
                    'bg-primary': tab === 'load',
                  })}
                  onClick={() => setupStore.setValue('tab', 'load')}
                >
                  Loadout
                </div>
              </>
            )}
          </div>
          {tab === 'trace' && <CompareTraceBlock team={team} char={focusedChar} />}
          {tab === 'mod' && focusedChar && (
            <CompareConditionalBlock
              stats={allStats[setupIndex]}
              content={contents[setupIndex]}
              team={team[setupIndex]}
            />
          )}
          {tab === 'stats' && focusedChar && (
            <>
              <div className="flex items-center justify-between w-full text-white">
                <p className="px-4 text-lg font-bold">
                  <span className="text-desc">✦</span> Final Stats <span className="text-desc">✦</span>
                </p>
                <PrimaryButton title="Stats Breakdown" onClick={onOpenStatsModal} />
              </div>
              <StatBlock stat={allStats[setupIndex][charIndex]} />
            </>
          )}
          {tab === 'load' && focusedChar && (
            <>
              <div className="w-[239px]">
                <WeaponBlock
                  {...focusedChar.equipments.weapon}
                  index={charIndex}
                  teamOverride={team[setupIndex]}
                  setWeapon={(i, w) => {
                    focusedChar.equipments.weapon = { ...focusedChar.equipments.weapon, ...w }
                    setupStore.setComparing(focusedChar)
                  }}
                />
              </div>
              <div className="w-full space-y-3 text-white">
                <p className="font-bold text-center">Echoes</p>
                <div className="flex justify-center gap-3">
                  {_.map([0, 1, 2, 3, 4], (item) => (
                    <div
                      key={item}
                      className={classNames(
                        'flex items-center justify-center w-8 h-8 font-bold rounded-full bg-primary-light cursor-pointer duration-200',
                        { 'ring-4 ring-primary-lighter': selectedEcho === item }
                      )}
                      onClick={() => setEcho(item)}
                    >
                      {item ? romanize(item) : <i className="fa-solid fa-star text-yellow" />}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <ArtifactBlock
                    slot={selectedEcho}
                    aId={focusedChar.equipments.artifacts[selectedEcho]}
                    index={selected}
                    setArtifact={(i, t, a) => {
                      focusedChar.equipments.artifacts.splice(t, 1, a)
                      setupStore.setComparing(focusedChar)
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
})
