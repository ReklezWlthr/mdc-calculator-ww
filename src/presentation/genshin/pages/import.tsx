import classNames from 'classnames'
import _ from 'lodash'
import { useLocalUpdater } from '@src/core/hooks/useLocalUpdater'
import { useStore } from '@src/data/providers/app_store_provider'
import { CommonModal } from '@src/presentation/components/common_modal'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useState } from 'react'
import { DefaultCharacter } from '@src/data/stores/team_store'
import { DefaultAccount } from '@src/data/stores/character_store'

export const ImportExport = observer(() => {
  const { modalStore, importStore, toastStore } = useStore()

  const { data, updateData } = useLocalUpdater('wuwa')

  const [imported, setImported] = useState('')

  const saveFile = async (blob: Blob, suggestedName: string) => {
    const blobURL = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobURL
    a.download = suggestedName
    a.style.display = 'none'
    document.body.append(a)
    a.click()
    // Revoke the blob URL and remove the element.
    setTimeout(() => {
      URL.revokeObjectURL(blobURL)
      a.remove()
    }, 1000)
  }

  const onOpenConfirmModal = useCallback((char: number, build: number, artifact: number, onConfirm: () => void) => {
    modalStore.openModal(
      <CommonModal
        icon="fa-solid fa-circle-question text-yellow"
        title="Overwrite Data?"
        desc={`The data contains ${char} resonators, ${build} builds and ${artifact} echoes.\nAre you sure you want to overwrite the current data with this?`}
        onConfirm={onConfirm}
      />
    )
  }, [])

  return (
    <div className="w-full h-full pb-5 overflow-y-auto mobile:overflow-visible">
      <div
        className={classNames(
          'flex flex-col w-full gap-5 p-5 text-white max-w-[1200px] mx-auto',
          _.size(importStore.characters) ? 'h-fit' : 'h-full'
        )}
      >
        <div className="space-y-4">
          <div className="text-2xl font-bold">Import/Export Your Calculator Data</div>
          <div className="px-4 py-3 space-y-3 rounded-lg bg-primary-dark w-fit">
            <div className="space-y-1">
              <p className="text-xl font-bold">
                <span className="text-desc">✦</span> File Data
              </p>
              <p className="text-xs text-gray"> - Import/Export Your Data via Exported JSON File</p>
            </div>
            <div className="flex gap-x-2">
              <PrimaryButton
                title="Export to File"
                onClick={() => {
                  const blob = new Blob([data], { type: 'text/json;charset=utf-8' })
                  saveFile(blob, 'mdc_ww_export.json')
                }}
              />
              <PrimaryButton
                title="Import from File"
                onClick={() => {
                  document.getElementById('importer').click()
                }}
              />
            </div>
          </div>
          <div className="px-4 py-3 space-y-3 rounded-lg bg-primary-dark w-fit">
            <div className="space-y-1">
              <p className="text-xl font-bold">
                <span className="text-desc">✦</span> Text Data
              </p>
              <p className="text-xs text-gray"> - Import/Export Your Data via Copied Text</p>
              <p className="text-xs text-gray"> - Recommended for Mobile Use</p>
            </div>
            <PrimaryButton
              title="Copy to Clipboard"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(data)
                  toastStore.openNotification({
                    title: 'Data Copied to Clipboard',
                    icon: 'fa-solid fa-circle-check',
                    color: 'green',
                  })
                } catch (err) {
                  toastStore.openNotification({
                    title: 'Something Went Wrong',
                    icon: 'fa-solid fa-circle-exclamation',
                    color: 'red',
                  })
                }
              }}
            />
            <p className="font-bold">Import From Text:</p>
            <textarea
              value={imported}
              onChange={(e) => setImported(e.target.value)}
              onFocus={(e) => e.target.select()}
              className="border rounded-lg bg-primary-darker border-primary-light w-[500px] mobile:w-[350px] h-[150px] px-3 py-2 text-primary-lighter text-sm block customScrollbar"
            />
            <PrimaryButton
              title="Import Data"
              disabled={!imported}
              onClick={() => {
                try {
                  const data = JSON.parse(imported)
                  if (data?.format !== 'MDC')
                    return toastStore.openNotification({
                      title: 'No Data Found or JSON Format Mismatched',
                      icon: 'fa-solid fa-exclamation-circle',
                      color: 'red',
                    })
                  onOpenConfirmModal(data?.characters?.length, data?.builds?.length, data?.artifacts?.length, () => {
                    localStorage.setItem(`wuwa_local_storage`, imported)
                    updateData(imported)
                    toastStore.openNotification({
                      title: 'Data Imported Successfully',
                      icon: 'fa-solid fa-circle-check',
                      color: 'green',
                    })
                  })
                } catch (err) {
                  toastStore.openNotification({
                    title: 'Something Went Wrong',
                    icon: 'fa-solid fa-circle-exclamation',
                    color: 'red',
                  })
                }
              }}
            />
          </div>
          <div className="px-4 py-3 space-y-3 rounded-lg bg-primary-dark w-fit">
            <div className="space-y-1">
              <p className="text-xl font-bold">
                <span className="text-red">✦</span> Clear Data
              </p>
              <p className="text-xs text-gray"> - Clear All Calculator Data; Proceed With Caution</p>
            </div>
            <PrimaryButton
              title="Clear Data"
              onClick={() => {
                modalStore.openModal(
                  <CommonModal
                    icon="fa-solid fa-circle-exclamation text-red"
                    title="Clear Data?"
                    desc={`You are about to clear all calculator data.\nAre you sure you want to proceed?`}
                    onConfirm={() => {
                      localStorage.removeItem(`wuwa_local_storage`)
                      updateData(
                        JSON.stringify({
                          team: Array(3).fill(DefaultCharacter),
                          artifacts: [],
                          builds: [],
                          characters: DefaultAccount,
                          setup: [],
                        })
                      )
                      toastStore.openNotification({
                        title: 'Data Deleted Successfully',
                        icon: 'fa-solid fa-circle-check',
                        color: 'green',
                      })
                    }}
                  />
                )
              }}
            />
          </div>
          <input
            id="importer"
            className="hidden"
            type="file"
            multiple={false}
            accept=".json"
            onChange={(event) => {
              const file = event.target.files[0]
              const reader = new FileReader()
              reader.addEventListener('load', (event) => {
                const data = JSON.parse(event.target.result.toString())
                if (data?.format !== 'MDC')
                  return toastStore.openNotification({
                    title: 'No Data Found or JSON Format Mismatched',
                    icon: 'fa-solid fa-exclamation-circle',
                    color: 'red',
                  })
                onOpenConfirmModal(data?.characters?.length, data?.builds?.length, data?.artifacts?.length, () => {
                  localStorage.setItem(`wuwa_local_storage`, event.target.result.toString())
                  updateData(event.target.result.toString())
                  toastStore.openNotification({
                    title: 'Data Imported Successfully',
                    icon: 'fa-solid fa-circle-check',
                    color: 'green',
                  })
                })
              })
              reader.readAsText(file)
            }}
          />
        </div>
      </div>
    </div>
  )
})
