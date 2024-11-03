import { useStore } from '@src/data/providers/app_store_provider'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback } from 'react'
import { CharacterSelect } from '../components/character_select'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import { CommonModal } from '@src/presentation/components/common_modal'
import { findCharacter, findValidName } from '@src/core/utils/finder'
import classNames from 'classnames'
import { CompareBlock } from '@src/presentation/genshin/components/compare/compare_block'
import { Tooltip } from '@src/presentation/components/tooltip'
import { swapElement } from '@src/core/utils/data_format'
import { defaultTotal } from '@src/data/stores/setup_store'
import { RenameModal } from '../components/modals/rename_modal'
import { TeamModal, TeamModalProps } from '@src/presentation/genshin/components/modals/team_modal'

export const ComparePage = observer(() => {
  const { modalStore, setupStore, settingStore } = useStore()

  const charData = findCharacter(setupStore.mainChar)

  const onOpenSaveModal = useCallback((props: TeamModalProps) => {
    modalStore.openModal(<TeamModal {...props} />)
  }, [])

  const onOpenConfirmModal = useCallback((onConfirm: () => void) => {
    modalStore.openModal(
      <CommonModal
        icon="fa-solid fa-exclamation-circle text-yellow"
        title="Comparing Session Exists"
        desc={`Do you want to change the main comparison target?\nConfirming to this will remove any Sub setups you are comparing to.`}
        onConfirm={() => {
          onConfirm()
          setupStore.setValue('comparing', Array(3))
        }}
      />
    )
  }, [])

  const onOpenCopyModal = useCallback((onConfirm: () => void) => {
    modalStore.openModal(
      <CommonModal
        icon="fa-solid fa-question-circle text-yellow"
        title="Duplicate Main Setup"
        desc={`You are about to overwrite this current setup with a copy from Main. Do you wish to proceed?`}
        onConfirm={onConfirm}
      />
    )
  }, [])

  const onOpenRenameModal = useCallback((onConfirm: (name: string) => void) => {
    modalStore.openModal(<RenameModal onSave={onConfirm} />)
  }, [])

  const onOpenSwapModal = useCallback((onConfirm: () => void) => {
    modalStore.openModal(
      <CommonModal
        icon="fa-solid fa-question-circle text-yellow"
        title="Set As Main"
        desc={`By confirming, this setup will be swapped with the current Main setup, along with any changes made to it. Do you wish to proceed?`}
        onConfirm={onConfirm}
      />
    )
  }, [])

  const onOpenRemoveModal = useCallback((onConfirm: () => void) => {
    modalStore.openModal(
      <CommonModal
        icon="fa-solid fa-question-circle text-yellow"
        title="Remove Setup"
        desc={`Do you want to remove this setup? Any changes made will not be saved.`}
        onConfirm={onConfirm}
      />
    )
  }, [])

  return (
    <div className="w-full px-5 customScrollbar">
      <div className="grid w-full grid-cols-3 gap-5 p-5 text-white max-w-[1200px] mx-auto items-end">
        <div className="space-y-1">
          <div className="flex items-center justify-between w-[244px] pr-2">
            <div className="flex items-center gap-3 pb-1">
              <p className="flex items-center gap-2 font-bold">
                <i className="text-desc fa-solid fa-star" />
                Main Setup
                <Tooltip
                  title="Quick Tips to Setup Comparison"
                  body={
                    <div className="font-normal space-y-0.5">
                      <p>
                        - You can only compare <span className="text-desc">one</span> character at a time. Switching a
                        character will end the current session and remove all Sub setups. It is recommended to switch
                        your Main setup to the desired one before switching character.
                      </p>
                      <p>- Sub setups eligible for comparison must contain the selected character.</p>
                      <p>
                        - Any changes made to setups within this page will <span className="text-red">not</span> be
                        reflected on other pages, and vice versa.
                      </p>
                      <p>
                        - Difference percentages shown in the tooltip are relative to the value of Main setup. Think of
                        the Main value as <span className="text-desc">100%</span>. Any damage components not present in
                        the Main setup will be marked as <b className="text-desc">NEW</b>.
                      </p>
                      <p>- All setups share the same enemy target setup.</p>
                      <p>
                        - Although the calculator allows multiple ability levels to be compared together, it is
                        recommended to use the same ability level across all setups for the best result, unless you
                        really want to compare them.
                      </p>
                      <p>
                        - The calculator only compare damage <span className="text-desc">at an instance</span> which may
                        be inaccurate to live rotation due to aspects like timing or buff durations. Only take it at
                        face value.
                      </p>
                    </div>
                  }
                  style="w-[450px]"
                >
                  <i className="fa-regular fa-question-circle" />
                </Tooltip>
              </p>
            </div>
            {setupStore.main && (
              <i
                title="Rename Setup"
                className="flex items-center justify-center w-6 h-6 text-xs text-orange-300 rounded-sm cursor-pointer fa-solid fa-pen bg-primary"
                onClick={() => onOpenRenameModal((name) => setupStore.setValue('main', { ...setupStore.main, name }))}
              />
            )}
          </div>
          {setupStore.main && !setupStore.mainChar && (
            <p className="text-xs text-red">Click the icon to compare the character.</p>
          )}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-primary-dark h-[64px] w-[244px]">
              {setupStore.main?.char ? (
                _.map(Array(4), (_item, index) => {
                  const main = setupStore.main?.char
                  return (
                    <CharacterSelect
                      key={`char_select_${index}`}
                      onClick={
                        main[index]
                          ? () => {
                              const handler = () => {
                                setupStore.setValue('mainChar', main[index].cId)
                                setupStore.setValue('selected', [0, index])
                              }
                              if (
                                _.some(setupStore.comparing, 'name') &&
                                main[index].cId !== setupStore.mainChar &&
                                setupStore.mainChar
                              )
                                onOpenConfirmModal(handler)
                              else {
                                handler()
                              }
                            }
                          : null
                      }
                      isSelected={main[index]?.cId && main[index]?.cId === setupStore.mainChar}
                      codeName={findCharacter(main[index]?.cId)?.codeName}
                    />
                  )
                })
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full gap-1 text-gray">
                  <p>No Main Setup</p>
                  <p className="text-xs text-zinc-400">Click + to Start Comparing</p>
                </div>
              )}
            </div>
            <PrimaryButton
              icon={setupStore.main?.char ? 'fa-solid fa-repeat' : 'fa-solid fa-plus'}
              onClick={() =>
                onOpenSaveModal({
                  onSelect: (team) => {
                    const handler = () => {
                      setupStore.setValue('main', { ...team, total: defaultTotal })
                      setupStore.setValue('mainChar', team.char[0].cId)
                      setupStore.setValue('selected', [0, 0])
                    }
                    if (setupStore.mainChar) onOpenConfirmModal(handler)
                    else {
                      handler()
                    }
                  },
                })
              }
            />
            {setupStore.mainChar && (
              <div className="w-full text-xs font-bold text-center">
                <p>Comparing</p>
                <span className="w-full text-desc line-clamp-2">{charData?.name}</span>
                <p>To</p>
              </div>
            )}
          </div>
          <p className="text-xs text-gray truncate w-[244px]">{setupStore.main?.name}</p>
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            {setupStore.mainChar &&
              _.map(setupStore.comparing, (item, tI) => (
                <div className="space-y-1" key={tI}>
                  <div className="flex items-center justify-between">
                    <p className="font-bold">Sub Setup {tI + 1}</p>
                    <div className="flex items-center gap-2 mr-2">
                      <i
                        title="Duplicate Main"
                        className="flex items-center justify-center w-6 h-6 text-xs rounded-sm cursor-pointer fa-solid fa-file bg-primary text-blue"
                        onClick={() => {
                          const handler = () => {
                            const main = setupStore.main
                            const newCompare = _.cloneDeep(setupStore.comparing)
                            newCompare.splice(tI, 1, _.cloneDeep(main))
                            const name = findValidName(_.map([setupStore.main, ...newCompare], 'name'), main.name)
                            newCompare[tI].name = name
                            const newCustom = _.cloneDeep(setupStore.custom)
                            newCustom.splice(tI + 1, 1, _.cloneDeep(setupStore.custom[0]))
                            setupStore.setValue('comparing', newCompare)
                            setupStore.setForm(tI + 1, _.cloneDeep(setupStore.forms[0]))
                            setupStore.setValue('custom', newCustom)
                          }
                          if (setupStore.comparing[tI]?.char) onOpenCopyModal(handler)
                          else handler()
                        }}
                      />
                      {!!item && (
                        <>
                          <i
                            title="Rename Setup"
                            className="flex items-center justify-center w-6 h-6 text-xs text-orange-300 rounded-sm cursor-pointer fa-solid fa-pen bg-primary"
                            onClick={() =>
                              onOpenRenameModal((name) => {
                                const newCompare = _.cloneDeep(setupStore.comparing)
                                newCompare.splice(tI, 1, { ...setupStore.comparing[tI], name })
                                setupStore.setValue('comparing', newCompare)
                              })
                            }
                          />
                          <i
                            title="Swap with Main"
                            className="flex items-center justify-center w-6 h-6 text-xs rounded-sm cursor-pointer fa-solid fa-star bg-primary text-desc"
                            onClick={() =>
                              onOpenSwapModal(() => {
                                const main = setupStore.main
                                const toBeSwapped = setupStore.comparing[tI]
                                const newCompare = _.cloneDeep(setupStore.comparing)
                                newCompare.splice(tI, 1, main)
                                setupStore.setValue('main', toBeSwapped)
                                setupStore.setValue('comparing', newCompare)
                                setupStore.setValue('forms', swapElement(setupStore.forms, 0, tI + 1))
                                setupStore.setValue('custom', swapElement(setupStore.custom, 0, tI + 1))
                                setupStore.setValue('selected', [0, setupStore.selected[1]])
                              })
                            }
                          />
                          <i
                            title="Remove Setup"
                            className="flex items-center justify-center w-6 h-6 text-xs rounded-sm cursor-pointer fa-solid fa-trash bg-primary text-red"
                            onClick={() =>
                              onOpenRemoveModal(() => {
                                const newCompare = _.cloneDeep(setupStore.comparing)
                                newCompare.splice(tI, 1)
                                newCompare.push(null)
                                setupStore.setValue('comparing', newCompare)
                                setupStore.setValue('selected', [0, 0])
                              })
                            }
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className={classNames(
                      'flex gap-3 px-2 py-2 duration-200 rounded-lg bg-primary-dark h-[64px] w-[244px]',
                      {
                        'cursor-pointer hover:ring-2 hover:ring-primary-light hover:ring-inset': setupStore.mainChar,
                      }
                    )}
                    key={tI}
                    onClick={() => {
                      if (setupStore.mainChar)
                        onOpenSaveModal({
                          onSelect: (team) => {
                            const newCompare = _.cloneDeep(setupStore.comparing)
                            newCompare.splice(tI, 1, { ...team, total: defaultTotal })
                            const name = findValidName(
                              _.map([setupStore.main, ...setupStore.comparing], 'name'),
                              team.name
                            )
                            newCompare[tI].name = name
                            setupStore.setValue('comparing', newCompare)
                          },
                          filterId: setupStore.mainChar,
                        })
                    }}
                  >
                    {setupStore.comparing?.[tI]?.char ? (
                      _.map(Array(4), (_item, index) => {
                        const team = setupStore.comparing?.[tI]?.char
                        return (
                          <CharacterSelect
                            key={`char_select_${index}`}
                            isSelected={team[index]?.cId === setupStore.mainChar}
                            codeName={findCharacter(team[index]?.cId)?.codeName}
                          />
                        )
                      })
                    ) : (
                      <p className="flex items-center justify-center w-full h-full text-gray">Add Setup</p>
                    )}
                  </div>
                  <p className="h-4 text-xs text-gray truncate w-[244px]">{item?.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      {charData && <CompareBlock />}
    </div>
  )
})
