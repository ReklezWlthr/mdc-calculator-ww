import { observer } from 'mobx-react-lite'
import { ArtifactSetterT } from './modals/artifact_list_modal'
import { useCallback, useEffect, useState } from 'react'
import { CommonModal } from '@src/presentation/components/common_modal'
import { useStore } from '@src/data/providers/app_store_provider'
import _ from 'lodash'
import { findCharacter } from '@src/core/utils/finder'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import classNames from 'classnames'
import { WeaponBlock } from './weapon_block'
import { DefaultCharacter } from '@src/data/stores/team_store'
import { ArtifactBlock } from './artifact_block'

export const BuildDetail = observer(
  ({ selected, setSelected }: { selected: string; setSelected: (value: string) => void }) => {
    const { modalStore, buildStore, toastStore } = useStore()

    const selectedBuild = _.find(buildStore.builds, ['id', selected])

    const [note, setNote] = useState(selectedBuild?.note || '')
    const [editing, setEditing] = useState(false)
    useEffect(() => {
      setNote(selectedBuild?.note || '')
      setEditing(false)
    }, [selectedBuild])

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

    return selected ? (
      <div className="w-full space-y-4 mobile:bg-primary-bg mobile:border mobile:border-primary-border mobile:rounded-lg mobile:w-[400px] mobile:max-h-[80vh] mobile:overflow-y-auto mobile:py-3 mobile:px-3">
        <div className="grid items-center grid-cols-2 gap-5 mobile:grid-cols-1">
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
        <div className="grid grid-cols-3 gap-5 mobile:grid-cols-1">
          <div className="flex justify-center">
            <WeaponBlock
              {...selectedBuild?.weapon}
              index={0}
              teamOverride={[{ ...DefaultCharacter, cId: selectedBuild.cId }]}
              setWeapon={(_i, value) =>
                buildStore.editBuild(selected, { weapon: { ...selectedBuild.weapon, ...value } })
              }
              noClear
            />
          </div>
          {_.map(Array(5), (_i, i) => (
            <div className="flex justify-center" key={i}>
              <ArtifactBlock slot={i + 1} aId={selectedBuild?.artifacts?.[i]} setArtifact={setArtifact} canSwap />
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="w-full h-[620px] rounded-lg bg-primary-darker flex items-center justify-center text-gray text-2xl font-bold mobile:hidden">
        Selected a Build to Preview
      </div>
    )
  }
)
