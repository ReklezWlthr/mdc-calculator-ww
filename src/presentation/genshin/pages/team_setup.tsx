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
  const { teamStore, modalStore, artifactStore, settingStore } = useStore()
  const selected = teamStore.selected

  const artifactData = _.filter(artifactStore.artifacts, (item) =>
    _.includes(teamStore.characters[selected]?.equipments?.artifacts, item.id)
  )

  const char = teamStore.characters[selected]
  const charData = findCharacter(char.cId)
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

  const set = getSetCount(artifactData)
  const resonance = getResonanceCount(teamStore.characters)

  const talent = _.find(ConditionalsObject, ['id', char.cId])?.conditionals(
    char?.cons,
    char?.i,
    char?.talents,
    teamStore.characters
  )

  return (
    <div className="w-full overflow-y-auto customScrollbar">
      <div className="grid grid-cols-12 tablet:grid-cols-7 justify-center w-full gap-5 p-5 tablet:max-w-[750px] max-w-[1240px] mx-auto mobile:flex-col">
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
        <div className="col-span-3 space-y-5 mobile:w-full">
          <AbilityBlock
            char={char}
            talents={talent?.talents}
            onChange={(key, value) => teamStore.setTalentLevel(selected, key as any, value)}
            onChangeInherent={(key, value) => teamStore.setInherentSkill(selected, key as any, value)}
            onChangeStats={(index, value) => teamStore.setStatBonus(selected, index, value)}
          />
        </div>
        <div className="col-span-5 space-y-5 mobile:w-full">
          <div className="grid grid-cols-2 gap-5 mobile:grid-cols-1">
            <WeaponBlock index={selected} {...teamStore.characters[selected]?.equipments?.weapon} noClear />
            <ArtifactBlock
              index={selected}
              slot={1}
              aId={teamStore.characters[selected]?.equipments?.artifacts?.[0]}
              setArtifact={teamStore.setArtifact}
              canSwap
            />
            <ArtifactBlock
              index={selected}
              slot={2}
              aId={teamStore.characters[selected]?.equipments?.artifacts?.[1]}
              setArtifact={teamStore.setArtifact}
              canSwap
            />
            <ArtifactBlock
              index={selected}
              slot={3}
              aId={teamStore.characters[selected]?.equipments?.artifacts?.[2]}
              setArtifact={teamStore.setArtifact}
              canSwap
            />
            <ArtifactBlock
              index={selected}
              slot={4}
              aId={teamStore.characters[selected]?.equipments?.artifacts?.[3]}
              setArtifact={teamStore.setArtifact}
              canSwap
            />
            <ArtifactBlock
              index={selected}
              slot={5}
              aId={teamStore.characters[selected]?.equipments?.artifacts?.[4]}
              setArtifact={teamStore.setArtifact}
              canSwap
            />
          </div>
          <div className="grid grid-cols-2 gap-5 mobile:grid-cols-1">
            <div className="w-full px-3 py-2 space-y-1 rounded-lg bg-primary-dark h-fit">
              {_.every(set, (item) => item < 2) ? (
                <p className="text-xs text-white">No Set Bonus</p>
              ) : (
                _.map(set, (item, key) => <SetToolTip item={item} set={key} key={key} />)
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <PrimaryButton title="Equip Build" onClick={onOpenBuildModal} />
              <PrimaryButton title="Unequip All" onClick={onOpenConfirmModal} />
              <PrimaryButton title="Save Build" onClick={onOpenSaveModal} />
              <PrimaryButton title="Save Team" onClick={onOpenTeamModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
