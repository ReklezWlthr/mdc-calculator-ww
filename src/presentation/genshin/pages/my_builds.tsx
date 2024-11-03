import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { useStore } from '@src/data/providers/app_store_provider'
import { useParams } from '@src/core/hooks/useParams'
import { BuildBlock } from '../components/build_block'
import { WeaponBlock } from '../components/weapon_block'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ArtifactBlock } from '../components/artifact_block'
import { findCharacter } from '@src/core/utils/finder'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import classNames from 'classnames'
import { CommonModal } from '@src/presentation/components/common_modal'
import { DefaultCharacter } from '@src/data/stores/team_store'
import { ArtifactSetterT as ArtifactSetterT } from '../components/modals/artifact_list_modal'

export const MyBuilds = observer(() => {
  const { buildStore, modalStore, toastStore } = useStore()
  const { params, setParams } = useParams({
    searchWord: '',
  })

  const [selected, setSelected] = useState('')
  const selectedBuild = _.find(buildStore.builds, ['id', selected])

  const [note, setNote] = useState(selectedBuild?.note || '')
  const [editing, setEditing] = useState(false)
  useEffect(() => {
    setNote(selectedBuild?.note || '')
    setEditing(false)
  }, [selectedBuild])

  const builds = params.searchWord
    ? _.filter(
        buildStore.builds,
        (item) =>
          _.includes(findCharacter(item.cId)?.name?.toLowerCase(), params.searchWord.toLowerCase()) ||
          _.includes(item.name.toLowerCase(), params.searchWord.toLowerCase())
      )
    : buildStore.builds
  const groupedBuild = _.groupBy(builds, 'cId')

  const onOpenDefaultModal = useCallback(() => {
    modalStore.openModal(
      <CommonModal
        icon="fa-solid fa-star text-desc"
        title="Set Build as Default"
        desc="Are you sure you want to set this build as default? Default build will be automatically equipped when selecting a character."
        onConfirm={() => {
          buildStore.setDefault(selected)
          toastStore.openNotification({
            title: 'Set Default Successfully',
            icon: 'fa-solid fa-circle-check',
            color: 'green',
          })
        }}
      />
    )
  }, [selected])

  const onOpenNoteModal = useCallback(() => {
    modalStore.openModal(
      <CommonModal
        icon="fa-solid fa-question-circle text-desc"
        title="Save Change"
        desc="Are you sure you want to save the change?"
        onConfirm={() => {
          buildStore.editBuild(selected, { note })
          setEditing(false)
          toastStore.openNotification({
            title: 'Note Edited Successfully',
            icon: 'fa-solid fa-circle-check',
            color: 'green',
          })
        }}
      />
    )
  }, [selected, note])

  const onOpenConfirmModal = useCallback(() => {
    modalStore.openModal(
      <CommonModal
        icon="fa-solid fa-exclamation-circle text-red"
        title="Delete Build"
        desc="Are you sure you want to delete this build? Deleting build will NOT delete designated artifacts."
        onConfirm={() => {
          buildStore.deleteBuild(selected)
          setSelected('')
          toastStore.openNotification({
            title: 'Build Deleted Successfully',
            icon: 'fa-solid fa-circle-check',
            color: 'green',
          })
        }}
      />
    )
  }, [selected])

  const setArtifact: ArtifactSetterT = (_i, type, value) => {
    const clone = _.cloneDeep(selectedBuild.artifacts)
    clone.splice(type - 1, 1, value)
    buildStore.editBuild(selected, { artifacts: clone })
  }

  return (
    <div className="flex flex-col items-center w-full gap-5 p-5 max-w-[1200px] mx-auto">
      <div className="flex w-full h-full gap-x-5">
        <div className="flex flex-col w-1/3 h-full gap-2 shrink-0">
          <div className="flex items-center gap-6 mr-4">
            <p className="text-2xl font-bold text-white shrink-0">My Builds</p>
            <TextInput
              value={params.searchWord}
              onChange={(v) => setParams({ searchWord: v })}
              placeholder={`Search for Build's Name or Owner`}
            />
          </div>
          <div className="flex flex-col w-full h-full gap-2 pr-1 overflow-y-auto rounded-lg customScrollbar">
            {_.size(buildStore.builds) ? (
              _.map(groupedBuild, (build, owner) => (
                <BuildBlock
                  key={_.join(_.map(build, 'id'), '_')}
                  owner={owner}
                  build={build}
                  onClick={setSelected}
                  selected={selected}
                />
              )).sort((a, b) => findCharacter(a.props.owner)?.name?.localeCompare(findCharacter(b.props.owner)?.name))
            ) : (
              <div className="flex items-center justify-center w-full h-full rounded-lg bg-primary-darker text-gray">
                No Saved Build
              </div>
            )}
          </div>
        </div>
        {selected ? (
          <div className="w-full space-y-4">
            <div className="grid items-center grid-cols-2 gap-5">
              <div className="w-full">
                <p className="text-sm text-primary-lighter">{findCharacter(selectedBuild?.cId)?.name}</p>
                <p className="w-full text-2xl font-bold text-white truncate">{selectedBuild?.name}</p>
              </div>
              <div className="flex items-center justify-end gap-x-2 shrink-0">
                <div className="p-3 space-y-1.5 text-xs rounded-lg text-gray bg-primary-darker w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white">Note:</p>
                    {editing ? (
                      <div className="flex gap-1">
                        <i
                          className="flex items-center justify-center w-5 h-5 text-xs rounded-sm cursor-pointer fa-solid fa-times text-red bg-primary"
                          onClick={() => {
                            setNote(selectedBuild?.note || '')
                            setEditing(false)
                          }}
                        />
                        <i
                          className="flex items-center justify-center w-5 h-5 text-xs rounded-sm cursor-pointer fa-solid fa-check text-heal bg-primary"
                          onClick={onOpenNoteModal}
                        />
                      </div>
                    ) : (
                      <i
                        className="flex items-center justify-center w-5 h-5 text-xs rounded-sm cursor-pointer fa-solid fa-pen bg-primary"
                        onClick={() => setEditing(true)}
                      />
                    )}
                  </div>
                  {editing ? (
                    <TextInput value={note} onChange={setNote} small placeholder="Enter Build Note" />
                  ) : (
                    <p className="px-1">{selectedBuild?.note || 'None'}</p>
                  )}
                </div>
                <PrimaryButton
                  icon={classNames('fa-solid fa-star text-desc flex justify-center h-[26px] items-center', {
                    'opacity-30': selectedBuild.isDefault,
                  })}
                  onClick={(event) => {
                    event.stopPropagation()
                    onOpenDefaultModal()
                  }}
                  disabled={selectedBuild.isDefault}
                  style="w-11 h-11 shrink-0"
                />
                <PrimaryButton
                  icon="fa-solid fa-trash flex justify-center items-center"
                  onClick={(event) => {
                    event.stopPropagation()
                    onOpenConfirmModal()
                  }}
                  style="w-11 !h-11 shrink-0"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <WeaponBlock
                {...selectedBuild?.weapon}
                index={0}
                teamOverride={[{ ...DefaultCharacter, cId: selectedBuild.cId }]}
                setWeapon={(_i, value) =>
                  buildStore.editBuild(selected, { weapon: { ...selectedBuild.weapon, ...value } })
                }
                noClear
              />
              <ArtifactBlock piece={4} aId={selectedBuild?.artifacts?.[3]} setArtifact={setArtifact} canSwap />
              <ArtifactBlock piece={2} aId={selectedBuild?.artifacts?.[1]} setArtifact={setArtifact} canSwap />
              <ArtifactBlock piece={5} aId={selectedBuild?.artifacts?.[4]} setArtifact={setArtifact} canSwap />
              <ArtifactBlock piece={1} aId={selectedBuild?.artifacts?.[0]} setArtifact={setArtifact} canSwap />
              <ArtifactBlock piece={3} aId={selectedBuild?.artifacts?.[2]} setArtifact={setArtifact} canSwap />
            </div>
          </div>
        ) : (
          <div className="w-full h-[620px] rounded-lg bg-primary-darker flex items-center justify-center text-gray text-2xl font-bold">
            Selected a Build to Preview
          </div>
        )}
      </div>
    </div>
  )
})
