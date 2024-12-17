import React, { useCallback, useState } from 'react'
import { CharacterBlock } from '../components/character_block'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { StatBlock } from '../components/stat_block'
import { WeaponBlock } from '../components/weapon_block'
import { ArtifactBlock } from '../components/artifact_block'
import { useStore } from '@src/data/providers/app_store_provider'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { GhostButton } from '@src/presentation/components/ghost.button'
import { BuildModal } from '../components/modals/build_modal'
import { findCharacter } from '@src/core/utils/finder'
import { getResonanceCount, getSetCount } from '@src/core/utils/data_format'
import { Echoes, SonataDetail } from '@src/data/db/artifacts'
import { Tooltip } from '@src/presentation/components/tooltip'
import { CommonModal } from '@src/presentation/components/common_modal'
import { CharacterSelect } from '../components/character_select'
import { TalentIcon } from '../components/tables/scaling_wrapper'
import ConditionalsObject from '@src/data/lib/stats/conditionals/conditionals'
import { SelectInput } from '@src/presentation/components/inputs/select_input'
import { calculateFinal, calculateOutOfCombat } from '@src/core/utils/calculator'
import { baseStatsObject } from '@src/data/lib/stats/baseConstant'
import { CheckboxInput } from '@src/presentation/components/inputs/checkbox'
import { SaveBuildModal } from '../components/modals/save_build_modal'
import { SaveTeamModal } from '../components/modals/save_team_modal'
import { TeamModal } from '../components/modals/team_modal'
import { AbilityBlock } from '../components/ability_block'
import classNames from 'classnames'

export const SetToolTip = observer(({ item, set }: { item: number; set: string }) => {
  const setDetail = SonataDetail[set]
  const count = item < 5 ? (item < 2 ? 0 : 2) : 5
  return (
    item >= 2 && (
      <Tooltip
        title={set}
        body={
          <div className="space-y-1">
            <p
              className={count < 2 && 'opacity-40'}
              dangerouslySetInnerHTML={{ __html: `<b>2 Piece:</b> ${setDetail?.[0]?.desc}` }}
            />
            <p
              className={count < 5 && 'opacity-40'}
              dangerouslySetInnerHTML={{ __html: `<b>5 Piece:</b> ${setDetail?.[1]?.desc}` }}
            />
          </div>
        }
        style="w-[400px]"
        key={set}
      >
        <div className="flex items-center justify-between w-full gap-3 text-xs text-white cursor-default">
          <p className="w-full line-clamp-2">{set}</p>
          <p className="px-2 py-0.5 rounded-lg bg-primary-lighter bg-opacity-40">{count}</p>
        </div>
      </Tooltip>
    )
  )
})

export const TeamSetup = observer(() => {
  const { teamStore, modalStore, artifactStore } = useStore()
  const selected = teamStore.selected

  const artifactData = _.filter(artifactStore.artifacts, (item) =>
    _.includes(teamStore.characters[selected]?.equipments?.artifacts, item.id)
  )

  const char = teamStore.characters[selected]
  const raw = calculateOutOfCombat(
    _.cloneDeep(baseStatsObject),
    selected,
    teamStore.characters,
    artifactData,
    _.size(_.filter(teamStore.characters, (item) => !!item.cId)) >= 4,
    false
  )
  const stats = calculateFinal(raw)

  const onOpenSaveModal = useCallback(() => {
    modalStore.openModal(<SaveBuildModal index={selected} />)
  }, [selected])

  const onOpenBuildModal = useCallback(() => {
    modalStore.openModal(<BuildModal index={selected} />)
  }, [selected])

  const onOpenTeamModal = useCallback(() => {
    modalStore.openModal(<SaveTeamModal />)
  }, [])

  const onOpenSetupModal = useCallback(() => {
    modalStore.openModal(<TeamModal onSelect={(team) => teamStore.setValue('characters', team.char)} hideCurrent />)
  }, [selected])

  const onOpenConfirmModal = useCallback(() => {
    modalStore.openModal(
      <CommonModal
        icon="fa-solid fa-question-circle text-yellow"
        title="Unequip All"
        desc="This will unequip everything from this character, including weapons and artifacts. Do you wish to proceed?"
        onConfirm={() => teamStore.unequipAll(selected)}
      />
    )
  }, [selected])

  const ActionButtons = () => (
    <div className="grid grid-cols-2 gap-2">
      <PrimaryButton title="Equip Build" onClick={onOpenBuildModal} />
      <PrimaryButton title="Unequip All" onClick={onOpenConfirmModal} />
      <PrimaryButton title="Save Build" onClick={onOpenSaveModal} />
      <PrimaryButton title="Save Team" onClick={onOpenTeamModal} />
    </div>
  )

  const set = getSetCount(artifactData)
  const totalCost = _.sumBy(artifactData, (item) => item.cost)

  const talent = _.find(ConditionalsObject, ['id', char.cId])?.conditionals(
    char?.cons,
    char?.i,
    char?.talents,
    teamStore.characters
  )

  const [mobileTab, setMobileTab] = useState('forte')

  const maxTalentLevel = _.max([1, (char.ascension - 1) * 2])

  return (
    <div className="w-full overflow-y-auto customScrollbar mobile:overflow-visible">
      <div className="grid grid-cols-12 tablet:grid-cols-12 justify-center w-full gap-5 p-5 tablet:max-w-[1100px] max-w-[1240px] mx-auto mobile:grid-cols-4">
        <div className="col-span-4 mobile:w-full">
          <div className="flex items-center justify-between w-full gap-4 pt-1 pb-3">
            <div className="flex items-center justify-center w-full gap-4">
              {_.map(teamStore?.characters, (item, index) => (
                <CharacterSelect
                  key={`char_select_${index}`}
                  onClick={() => teamStore.setValue('selected', index)}
                  isSelected={index === selected}
                  order={findCharacter(item.cId)?.order}
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-2">
              <PrimaryButton
                onClick={onOpenSetupModal}
                icon="fa-solid fa-user-group text-sm"
                style="!rounded-full w-[42px]"
              />
            </div>
          </div>
          <CharacterBlock index={selected} />
          <div className="h-5" />
          <StatBlock stat={stats} />
        </div>
        <div className="hidden grid-cols-2 overflow-hidden text-white border divide-x rounded-lg mobile:grid col-span-full border-primary-border divide-primary-border">
          <p
            className={classNames(
              'py-1 text-center duration-200 cursor-pointer',
              mobileTab === 'forte' ? 'bg-primary' : 'bg-primary-dark'
            )}
            onClick={() => setMobileTab('forte')}
          >
            Forte Nodes
          </p>
          <p
            className={classNames(
              'py-1 text-center duration-200 cursor-pointer',
              mobileTab === 'loadout' ? 'bg-primary' : 'bg-primary-dark'
            )}
            onClick={() => setMobileTab('loadout')}
          >
            Build Loadout
          </p>
        </div>
        <div
          className={classNames(
            'col-span-3 mobile:col-span-full space-y-5 mobile:pb-6',
            mobileTab === 'forte' ? 'mobile:block' : 'mobile:hidden'
          )}
        >
          <AbilityBlock
            char={char}
            talents={talent?.talents}
            onChange={(key, value) => teamStore.setTalentLevel(selected, key as any, value)}
            onChangeInherent={(key, value) => teamStore.setInherentSkill(selected, key as any, value)}
            onChangeStats={(index, value) => teamStore.setStatBonus(selected, index, value)}
          />
          <div className="space-y-2">
            <p className="font-bold text-center text-white">Quick Config</p>
            <div className="px-3 py-2 text-xs text-center rounded-lg text-gray bg-primary-dark">
              Click to quickly max out some parts of the Resonator
              <p className="italic text-desc">
                Note: Maxed Forte levels will not exceed the current Resonator's Ascension
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <PrimaryButton
                title="Everything"
                onClick={() => {
                  teamStore.setMemberInfo(selected, { level: 90, ascension: 6 })
                  teamStore.setWeapon(selected, { level: 90, ascension: 6 })
                  teamStore.setMemberInfo(selected, {
                    growth: Array(8).fill(true),
                    i: { i1: true, i2: true },
                    talents: {
                      forte: maxTalentLevel,
                      intro: maxTalentLevel,
                      lib: maxTalentLevel,
                      normal: maxTalentLevel,
                      skill: maxTalentLevel,
                    },
                  })
                }}
                small
              />
              <PrimaryButton
                title="Level"
                onClick={() => teamStore.setMemberInfo(selected, { level: 90, ascension: 6 })}
                small
              />
              <PrimaryButton
                title="Weapon"
                onClick={() => teamStore.setWeapon(selected, { level: 90, ascension: 6 })}
                small
              />
              <PrimaryButton
                title="Forte"
                onClick={() =>
                  teamStore.setMemberInfo(selected, {
                    growth: Array(8).fill(true),
                    i: { i1: true, i2: true },
                    talents: {
                      forte: maxTalentLevel,
                      intro: maxTalentLevel,
                      lib: maxTalentLevel,
                      normal: maxTalentLevel,
                      skill: maxTalentLevel,
                    },
                  })
                }
                small
              />
            </div>
          </div>
        </div>
        <div
          className={classNames(
            'col-span-5 mobile:col-span-full space-y-5',
            mobileTab === 'loadout' ? 'mobile:block' : 'mobile:hidden'
          )}
        >
          <div className="grid grid-cols-2 gap-5 mobile:grid-cols-1">
            <div className="mobile:flex mobile:justify-center">
              <WeaponBlock index={selected} {...teamStore.characters[selected]?.equipments?.weapon} noClear />
            </div>
            {_.map(Array(5), (_i, i) => (
              <div className="mobile:flex mobile:justify-center" key={i}>
                <ArtifactBlock
                  index={selected}
                  slot={i + 1}
                  aId={teamStore.characters[selected]?.equipments?.artifacts?.[i]}
                  setArtifact={teamStore.setArtifact}
                  canSwap
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-5 mobile:grid-cols-1 mobile:max-w-[230px] mobile:mx-auto">
            <div className="space-y-2">
              <div className="flex justify-between w-full px-3 py-2 text-xs text-white rounded-lg bg-primary-dark h-fit">
                <p>Total Echo Cost</p>
                <p>
                  <span className={totalCost > 12 && 'text-red font-bold'}>{totalCost}</span> / 12
                </p>
              </div>
              <div className="w-full px-3 py-2 space-y-1 rounded-lg bg-primary-dark h-fit">
                {_.every(set, (item) => item < 2) ? (
                  <p className="text-xs text-white">No Set Bonus</p>
                ) : (
                  _.map(set, (item, key) => <SetToolTip item={item} set={key} key={key} />)
                )}
              </div>
            </div>
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  )
})
